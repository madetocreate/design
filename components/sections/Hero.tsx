'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Premium image collage - positioned to create depth and overlap
const heroImages = [
  { id: 1, src: 'https://picsum.photos/seed/arch1/600/800', top: '8%', left: '2%', width: 280, height: 380, z: 1, speed: 0.08 },
  { id: 2, src: 'https://picsum.photos/seed/arch2/500/700', top: '15%', left: '18%', width: 240, height: 320, z: 2, speed: 0.12 },
  { id: 3, src: 'https://picsum.photos/seed/arch3/700/900', top: '5%', left: '38%', width: 320, height: 420, z: 4, speed: 0.05 },
  { id: 4, src: 'https://picsum.photos/seed/arch4/600/800', top: '12%', left: '58%', width: 280, height: 360, z: 3, speed: 0.1 },
  { id: 5, src: 'https://picsum.photos/seed/arch5/500/700', top: '8%', left: '78%', width: 220, height: 300, z: 2, speed: 0.15 },
  { id: 6, src: 'https://picsum.photos/seed/arch6/400/600', top: '35%', left: '10%', width: 200, height: 280, z: 3, speed: 0.07 },
  { id: 7, src: 'https://picsum.photos/seed/arch7/500/650', top: '32%', left: '45%', width: 260, height: 340, z: 5, speed: 0.06 },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setLoaded(true);

    // Parallax on scroll
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      const images = containerRef.current.querySelectorAll('.hero-image');

      images.forEach((img, i) => {
        const speed = heroImages[i]?.speed || 0.1;
        const translateY = scrollY * speed;
        const scale = 1 - (scrollY * 0.0002);
        (img as HTMLElement).style.transform = `translateY(${translateY}px) scale(${Math.max(0.9, scale)})`;
        (img as HTMLElement).style.opacity = String(Math.max(0, 1 - scrollY * 0.001));
      });
    };

    // Subtle mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Noise texture overlay for premium feel */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Background Image Collage */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      >
        {heroImages.map((img, i) => (
          <div
            key={img.id}
            className={`hero-image absolute transition-all duration-1000 ease-out ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              top: img.top,
              left: img.left,
              zIndex: img.z,
              width: `clamp(${img.width * 0.5}px, ${img.width * 0.18}vw, ${img.width}px)`,
              height: `clamp(${img.height * 0.5}px, ${img.height * 0.18}vw, ${img.height}px)`,
              transitionDelay: `${i * 150}ms`,
            }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={img.src}
                alt=""
                fill
                className="object-cover scale-105 hover:scale-110 transition-transform duration-700"
                priority={i < 4}
              />
              {/* Subtle gradient overlay on each image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/30 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/50 via-transparent to-transparent z-10" />

      {/* Main Logo Text - Large Typography */}
      <div className="relative z-20 text-center px-4">
        <h1
          className={`font-light tracking-[-0.04em] leading-[0.85] transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            fontSize: 'clamp(5rem, 18vw, 14rem)',
            transitionDelay: '600ms',
          }}
        >
          <span className="inline-block">Design</span>
          <sup
            className="inline-block text-[0.15em] ml-2 opacity-40 align-top"
            style={{ marginTop: '0.2em' }}
          >
            ®
          </sup>
        </h1>
      </div>

      {/* Bottom bar with info */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="container">
          <div className="flex items-end justify-between py-8 border-t border-[var(--color-border)]">
            {/* Left - Tagline */}
            <div
              className={`transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '900ms' }}
            >
              <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[var(--color-foreground-muted)]">
                Digital Design Studio
              </p>
            </div>

            {/* Center - Scroll indicator */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 bottom-16 flex flex-col items-center gap-3 transition-all duration-700 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-foreground-subtle)]">
                Scroll
              </span>
              <div className="w-px h-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-foreground-muted)] to-transparent animate-pulse" />
              </div>
            </div>

            {/* Right - Year */}
            <div
              className={`transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <p className="text-xs md:text-sm tracking-[0.2em] text-[var(--color-foreground-muted)] tabular-nums">
                © 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
