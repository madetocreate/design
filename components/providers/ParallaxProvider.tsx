'use client';

import React, { useEffect, useRef, useCallback, createContext, useContext, useMemo } from 'react';

interface ParallaxLayerConfig {
  speed: number;
  direction?: 'vertical' | 'horizontal' | 'both';
  scale?: { start: number; end: number };
  opacity?: { start: number; end: number };
}

interface ParallaxContextValue {
  registerLayer: (ref: HTMLElement, config: ParallaxLayerConfig) => void;
  unregisterLayer: (ref: HTMLElement) => void;
}

const ParallaxContext = createContext<ParallaxContextValue | null>(null);

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

function ease(t: number): number {
  return t * t * (3 - 2 * t);
}

export function ParallaxContainer({
  children,
  smoothing = 0.07,
  mouseParallax = false,
  className,
  style,
}: {
  children: React.ReactNode;
  smoothing?: number;
  mouseParallax?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const layersRef = useRef<Map<HTMLElement, {
    config: ParallaxLayerConfig;
    current: Record<string, number>;
    target: Record<string, number>;
  }>>(new Map());
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const registerLayer = useCallback((ref: HTMLElement, config: ParallaxLayerConfig) => {
    layersRef.current.set(ref, {
      config,
      current: { x: 0, y: 0, scale: config.scale?.start ?? 1, opacity: config.opacity?.start ?? 1 },
      target: { x: 0, y: 0, scale: config.scale?.start ?? 1, opacity: config.opacity?.start ?? 1 },
    });
  }, []);

  const unregisterLayer = useCallback((ref: HTMLElement) => {
    layersRef.current.delete(ref);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    function getProgress(el: HTMLElement): number {
      const rect = el.getBoundingClientRect();
      return 1 - (rect.top + rect.height) / (window.innerHeight + rect.height);
    }

    function onScroll() {
      layersRef.current.forEach((data, el) => {
        const rawProgress = getProgress(el);
        const progress = ease(Math.max(0, Math.min(1, rawProgress)));
        const offset = (progress - 0.5) * 2;
        const { config } = data;
        const dir = config.direction || 'vertical';

        if (dir === 'vertical' || dir === 'both') data.target.y = offset * config.speed * 200;
        if (dir === 'horizontal' || dir === 'both') data.target.x = offset * config.speed * 200;
        if (config.scale) data.target.scale = lerp(config.scale.start, config.scale.end, progress);
        if (config.opacity) data.target.opacity = lerp(config.opacity.start, config.opacity.end, progress);
      });
    }

    function onMouseMove(e: MouseEvent) {
      if (!mouseParallax) return;
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function update() {
      layersRef.current.forEach((data, el) => {
        const { current: cur, target: tgt, config } = data;
        cur.x = lerp(cur.x, tgt.x, smoothing);
        cur.y = lerp(cur.y, tgt.y, smoothing);
        cur.scale = lerp(cur.scale, tgt.scale, smoothing);
        cur.opacity = lerp(cur.opacity, tgt.opacity, smoothing);

        let mx = 0, my = 0;
        if (mouseParallax) {
          mx = mouseRef.current.x * config.speed * 20;
          my = mouseRef.current.y * config.speed * 20;
        }

        const transforms = [
          `translate3d(${(cur.x + mx).toFixed(2)}px, ${(cur.y + my).toFixed(2)}px, 0)`,
        ];
        if (Math.abs(cur.scale - 1) > 0.001) transforms.push(`scale(${cur.scale.toFixed(4)})`);

        el.style.transform = transforms.join(' ');
        if (config.opacity) el.style.opacity = String(cur.opacity.toFixed(3));
      });
      rafRef.current = requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    if (mouseParallax) window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (mouseParallax) window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
      layersRef.current.forEach((_, el) => {
        el.style.transform = '';
        el.style.opacity = '';
      });
    };
  }, [smoothing, mouseParallax]);

  const contextValue = useMemo(() => ({ registerLayer, unregisterLayer }), [registerLayer, unregisterLayer]);

  return (
    <ParallaxContext.Provider value={contextValue}>
      <div className={className} style={style}>
        {children}
      </div>
    </ParallaxContext.Provider>
  );
}

export function ParallaxLayer({
  speed,
  direction,
  scale,
  opacity,
  children,
  className,
  style,
}: ParallaxLayerConfig & {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const ctx = useContext(ParallaxContext);

  useEffect(() => {
    if (!ref.current || !ctx) return;
    const el = ref.current;
    ctx.registerLayer(el, { speed, direction, scale, opacity });
    return () => ctx.unregisterLayer(el);
  }, [speed, direction, scale, opacity, ctx]);

  return (
    <div ref={ref} className={className} style={{
      willChange: 'transform, opacity',
      ...style,
    }}>
      {children}
    </div>
  );
}
