'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const textLines = [
  'Studio Meyer®',
  'provides a full',
  'range of services',
  'for digital',
  'design and',
  'web development',
  'solutions turnkey',
  'for modern',
  'businesses',
];

const floatingImages = [
  { src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80', x: 10, y: 15, parallax: -80 },
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80', x: 75, y: 25, parallax: -120 },
  { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80', x: 85, y: 60, parallax: -200 },
];

export function TextRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate overall scroll progress through the section
      const totalHeight = rect.height - windowHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
      setScrollProgress(progress);

      // Calculate which lines should be visible
      const newVisibleLines: number[] = [];
      const linesPerScroll = textLines.length / 0.8; // Complete by 80% scroll

      for (let i = 0; i < textLines.length; i++) {
        const lineThreshold = i / linesPerScroll;
        if (progress >= lineThreshold) {
          newVisibleLines.push(i);
        }
      }

      setVisibleLines(newVisibleLines);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[300vh] bg-[var(--color-background)]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Floating images with parallax */}
        {floatingImages.map((img, index) => (
          <div
            key={index}
            className="absolute w-32 md:w-48 h-48 md:h-64 opacity-20 pointer-events-none"
            style={{
              left: `${img.x}%`,
              top: `${img.y}%`,
              transform: `translateY(${scrollProgress * img.parallax}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <Image
              src={img.src}
              alt=""
              fill
              className="object-cover rounded-sm"
            />
          </div>
        ))}

        {/* Text container */}
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            {textLines.map((line, index) => {
              const isVisible = visibleLines.includes(index);
              const delay = index * 50;

              return (
                <div
                  key={index}
                  className="overflow-hidden"
                >
                  <div
                    className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] transition-all duration-700 ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-full'
                    }`}
                    style={{
                      transitionDelay: `${delay}ms`,
                    }}
                  >
                    {line}
                    {/* Reveal overlay effect */}
                    <div
                      className={`absolute inset-0 bg-[var(--color-accent)] origin-left transition-transform duration-500 ${
                        isVisible ? 'scale-x-0' : 'scale-x-100'
                      }`}
                      style={{
                        transitionDelay: `${delay + 100}ms`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:block">
          <div className="h-48 w-px bg-[var(--color-border)] relative">
            <div
              className="absolute top-0 left-0 w-full bg-[var(--color-accent)] transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
