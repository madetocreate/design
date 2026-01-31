'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Hero tiles - overlapping around center text like selemen.liqium.com
const heroImages = [
  // Top-left large
  { id: 1, src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', top: '5%', left: '2%', width: '22vw', height: '28vh', z: 2, speed: 0.3 },
  // Top-center-left small
  { id: 2, src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80', top: '8%', left: '20%', width: '14vw', height: '18vh', z: 1, speed: -0.2 },
  // Center-left tall (overlaps text)
  { id: 3, src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80', top: '18%', left: '26%', width: '16vw', height: '35vh', z: 3, speed: 0.15 },
  // Bottom-left
  { id: 4, src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80', top: '62%', left: '5%', width: '24vw', height: '28vh', z: 2, speed: -0.25 },
  // Top-right
  { id: 5, src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80', top: '2%', left: '58%', width: '22vw', height: '26vh', z: 2, speed: 0.2 },
  // Bottom-right
  { id: 6, src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80', top: '58%', left: '54%', width: '22vw', height: '30vh', z: 3, speed: -0.3 },
  // Right tall (overlaps text)
  { id: 7, src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&q=80', top: '12%', left: '62%', width: '16vw', height: '38vh', z: 1, speed: 0.35 },
  // Far right small
  { id: 8, src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80', top: '5%', left: '80%', width: '16vw', height: '22vh', z: 2, speed: -0.15 },
];

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);

    const handleScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.8), 1);
      setScrollProgress(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Smooth mouse follow loop
    function updateMouse() {
      currentMouse.current.x += (mouseRef.current.x - currentMouse.current.x) * 0.05;
      currentMouse.current.y += (mouseRef.current.y - currentMouse.current.y) * 0.05;

      tilesRef.current.forEach((tile, i) => {
        if (!tile) return;
        const img = heroImages[i];
        const mx = currentMouse.current.x * img.speed * 25;
        const my = currentMouse.current.y * img.speed * 25;
        tile.style.transform = `translate3d(${mx.toFixed(2)}px, ${my.toFixed(2)}px, 0)`;
      });

      rafRef.current = requestAnimationFrame(updateMouse);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    if (window.innerWidth >= 768) {
      rafRef.current = requestAnimationFrame(updateMouse);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative h-[140vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-[60]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Image Tiles - positioned around center text */}
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <div
              key={img.id}
              ref={(el) => { tilesRef.current[index] = el; }}
              className="absolute will-change-transform"
              style={{ left: img.left, top: img.top, zIndex: img.z }}
            >
              <div
                className={`overflow-hidden transition-all duration-[1.2s] ease-out ${
                  loaded
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 translate-y-8'
                }`}
                style={{
                  width: img.width,
                  height: img.height,
                  transitionDelay: `${150 + index * 120}ms`,
                }}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  priority={index < 4}
                />
                {/* Subtle dark overlay for depth */}
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/30 via-transparent to-transparent z-10 pointer-events-none" />

        {/* Main Text - on top of tiles */}
        <div
          className="relative z-20 text-center px-4"
          style={{
            transform: `translateY(${scrollProgress * 100}px)`,
            opacity: 1 - scrollProgress * 1.2,
          }}
        >
          <h1
            className={`font-light tracking-[-0.03em] leading-[0.85] transition-all duration-[1.2s] ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
            style={{
              fontSize: 'clamp(3.5rem, 13vw, 11rem)',
              transitionDelay: '400ms',
              mixBlendMode: 'difference',
            }}
          >
            <span className="inline-block">Studio Meyer</span>
            <span className="inline-block text-[0.12em] align-top ml-2 text-[var(--color-accent)]">®</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20"
          style={{
            top: '63%',
            transform: `translate(-50%, ${scrollProgress * 60}px)`,
            opacity: 1 - scrollProgress * 1.5,
          }}
        >
          <p
            className={`text-sm md:text-base tracking-[0.4em] uppercase text-[var(--color-foreground-muted)] transition-all duration-[1.2s] ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            Digital Design Studio
          </p>
        </div>

        {/* Bottom bar */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20"
          style={{ opacity: 1 - scrollProgress * 2.5 }}
        >
          <div className="container">
            <div className="flex items-end justify-between py-8 border-t border-[var(--color-border)]">
              <div
                className={`transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '800ms' }}
              >
                <p className="text-xs tracking-[0.2em] uppercase text-[var(--color-foreground-subtle)]">
                  Based in Germany
                </p>
              </div>

              {/* Scroll indicator */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-20 flex flex-col items-center gap-3 transition-all duration-700 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: '1000ms' }}
              >
                <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-foreground-subtle)]">
                  Scroll
                </span>
                <div className="w-px h-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-foreground-muted)] to-transparent animate-pulse" />
                </div>
              </div>

              <div
                className={`transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '900ms' }}
              >
                <p className="text-xs tracking-[0.2em] text-[var(--color-foreground-subtle)] tabular-nums">
                  © 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
