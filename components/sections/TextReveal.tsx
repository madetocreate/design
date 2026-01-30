'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export function TextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lines = container.querySelectorAll('.reveal-line');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.2 }
    );

    lines.forEach((line) => observer.observe(line));

    return () => observer.disconnect();
  }, []);

  const textLines = [
    'Design®',
    'provides a full',
    'range of services',
    'for digital',
    'experiences',
    'and brand',
    'solutions turnkey',
    'for modern',
    'businesses',
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Marquee */}
      <div className="relative mb-24 py-8 border-y border-[var(--color-border)] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-6xl md:text-8xl font-light tracking-tighter mx-8">
              Future by Design® <span className="text-[var(--color-primary)]">•</span>{' '}
            </span>
          ))}
        </div>
      </div>

      {/* Text Reveal */}
      <div ref={containerRef} className="container">
        <div className="max-w-5xl mx-auto">
          {textLines.map((line, i) => (
            <div
              key={i}
              className="reveal-line overflow-hidden"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <h2
                className="text-heading-1 md:text-5xl lg:text-6xl font-light tracking-tight py-2 transform translate-y-full opacity-0 transition-all duration-700 ease-out"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                {line}
              </h2>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <p className="text-body text-lg">
            Design<sup className="text-xs">®</sup> — is a studio for digital design and development.
            We create projects with precision, within budget and with an exceptional level of quality.
          </p>
        </div>
      </div>

      <style jsx>{`
        .reveal-line.revealed h2 {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="relative py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-label text-[var(--color-foreground-muted)] mb-4">About us</p>
            <h2 className="text-heading-2 mb-8">
              We will help <span className="block">you to implement</span>
              <span className="text-[var(--color-primary)]">any design</span>
              <Link href="/services" className="inline-block ml-2 text-[var(--color-accent)] hover:underline">
                solutions
              </Link>
            </h2>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-body text-lg mb-8">
              Design<sup className="text-xs">®</sup> — is a studio for digital design and development.
              We create projects with precision, within budget and with an exceptional level of quality.
            </p>

            <div className="flex gap-4">
              <Link href="/about" className="btn">
                About company
              </Link>
              <Link href="/services" className="btn">
                Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
