'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export function CtaSection({ variant = 'pricing' }: { variant?: 'contact' | 'pricing' }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #050505 0%, #0a0a0a 30%, #111111 60%, #0a0a0a 100%)',
      }}
    >
      {/* Glossy shine overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          background: 'linear-gradient(160deg, transparent 30%, rgba(255,255,255,0.15) 45%, transparent 55%)',
        }}
      />

      {/* Pulsing red glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full blur-[180px] animate-cta-pulse"
          style={{ background: 'radial-gradient(circle, rgba(255,82,104,0.25), transparent 70%)' }}
        />
      </div>

      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2
            className={`text-4xl md:text-6xl lg:text-8xl font-light tracking-tight leading-[1.1] text-white mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            Bereit für Ihren
            <span className="block text-accent">digitalen Auftritt?</span>
          </h2>

          <p
            className={`text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-16 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Premium-Webdesign ab 199 €/Monat. Design, Code und Hosting aus einer Hand.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-[400ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link
              href={variant === 'contact' ? '/contact' : '/pricing'}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base tracking-wider uppercase text-accent border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300 rounded-sm backdrop-blur-sm"
            >
              {variant === 'contact' ? 'Kontakt aufnehmen' : 'Preise ansehen'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href={variant === 'contact' ? '/pricing' : '/contact'}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base tracking-wider uppercase border border-white/10 text-white/50 hover:border-white/30 hover:text-white/80 transition-all duration-300 rounded-sm"
            >
              {variant === 'contact' ? 'Preise ansehen' : 'Kontakt aufnehmen'}
            </Link>
          </div>
        </div>
      </div>

      {/* Pulse animation */}
      <style jsx>{`
        @keyframes cta-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }
        .animate-cta-pulse {
          animation: cta-pulse 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
