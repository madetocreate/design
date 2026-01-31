'use client';

import { useEffect, useRef, useState } from 'react';

interface MarqueeTextProps {
  text?: string;
  speed?: number;
  className?: string;
}

export function MarqueeText({
  text = 'Future by Studio Meyer®',
  speed = 50,
  className = '',
}: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState(1);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? 1 : -1);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`relative py-24 md:py-32 overflow-hidden ${className}`}>
      {/* Marquee Container */}
      <div className="relative">
        <div
          ref={containerRef}
          className="flex whitespace-nowrap"
          style={{
            animation: `marquee ${speed}s linear infinite`,
            animationDirection: scrollDirection > 0 ? 'normal' : 'reverse',
          }}
        >
          {/* Repeat text multiple times for seamless loop */}
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tight mx-8 text-[var(--color-foreground)]/10 hover:text-[var(--color-foreground)]/30 transition-colors duration-500 cursor-default select-none"
            >
              {text}
              <span className="inline-block mx-8 text-[var(--color-accent)]/20">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Gradient fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-background)] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--color-background)] to-transparent pointer-events-none z-10" />

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
