'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { CtaSection } from '@/components/sections/CtaSection';

const values = {
  de: [
    { title: 'Qualität vor Quantität', description: 'Wir nehmen nur Projekte an, denen wir 100% geben können. Lieber weniger, aber dafür die besten Websites der Branche.' },
    { title: 'Transparenz', description: 'Feste Preise, klare Kommunikation, keine Überraschungen. Sie wissen immer, woran Sie sind.' },
    { title: 'Ownership', description: 'Nach 12 Monaten gehört die Website Ihnen — mit allem Drum und Dran. Kein Vendor Lock-in, kein Kleingedrucktes.' },
    { title: 'Performance', description: 'Jede Website wird auf Geschwindigkeit optimiert. 90+ Lighthouse Scores sind für uns Standard, nicht Ausnahme.' },
  ],
  en: [
    { title: 'Quality over quantity', description: 'We only take on projects we can give 100% to. Fewer projects, but the best websites in the industry.' },
    { title: 'Transparency', description: 'Fixed prices, clear communication, no surprises. You always know where you stand.' },
    { title: 'Ownership', description: 'After 12 months, the website is yours — with everything included. No vendor lock-in, no fine print.' },
    { title: 'Performance', description: 'Every website is optimized for speed. 90+ Lighthouse scores are our standard, not the exception.' },
  ],
  es: [
    { title: 'Calidad sobre cantidad', description: 'Solo aceptamos proyectos a los que podemos dedicar el 100%. Menos proyectos, pero los mejores sitios web de la industria.' },
    { title: 'Transparencia', description: 'Precios fijos, comunicación clara, sin sorpresas. Siempre sabes dónde estás.' },
    { title: 'Propiedad', description: 'Después de 12 meses, el sitio web es tuyo — con todo incluido. Sin vendor lock-in, sin letra pequeña.' },
    { title: 'Rendimiento', description: 'Cada sitio web está optimizado para velocidad. Puntuaciones Lighthouse de 90+ son nuestro estándar, no la excepción.' },
  ],
};

const techStack = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion',
  'Sanity CMS', 'Medusa.js', 'Vercel', 'Node.js',
];

type LocaleKey = 'de' | 'en' | 'es';

export default function AboutPage() {
  const t = useTranslations('about');
  const [locale, setLocale] = useState<string>('de');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const pathLocale = window.location.pathname.split('/')[1];
    if (['de', 'en', 'es'].includes(pathLocale)) setLocale(pathLocale);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="bg-[var(--color-background)]">
      {/* Hero */}
      <section className="min-h-[60vh] flex items-center justify-center pt-32 pb-16">
        <div className="container text-center max-w-4xl">
          <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-foreground-muted)] mb-6">
            {t('subtitle')}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-foreground-muted)] max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" data-reveal className="py-24 border-t border-[var(--color-border)]">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mx-auto">
            <div
              className={`transition-all duration-700 ${
                isVisible('story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-foreground-muted)] mb-4">
                {t('storyTitle')}
              </p>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
                {t('storyText')}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" data-reveal className="py-24">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-foreground-muted)] mb-4">
              {t('valuesTitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {(values[locale as LocaleKey] || values.de).map((value, index) => (
              <div
                key={index}
                className={`p-8 md:p-10 border border-[var(--color-border)] rounded-2xl hover:border-[var(--color-border-hover)] transition-all duration-700 ${
                  isVisible('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="text-4xl font-light text-[var(--color-foreground)]/10 mb-4 block">
                  0{index + 1}
                </span>
                <h3 className="text-xl font-light tracking-tight mb-3">{value.title}</h3>
                <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" data-reveal className="py-24 border-t border-[var(--color-border)]">
        <div className="container max-w-4xl text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-foreground-muted)] mb-4">
            {t('approachTitle')}
          </p>
          <p
            className={`text-2xl md:text-3xl lg:text-4xl font-light tracking-tight leading-[1.3] transition-all duration-700 ${
              isVisible('approach') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {t('approachText')}
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" data-reveal className="py-24 border-t border-[var(--color-border)]">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-foreground-muted)] mb-4">
              Tech Stack
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <span
                key={tech}
                className={`px-5 py-2.5 text-sm tracking-wider border border-[var(--color-border)] rounded-full text-[var(--color-foreground-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-500 ${
                  isVisible('tech') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </div>
  );
}
