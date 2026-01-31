'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CtaSection } from '@/components/sections/CtaSection';

const services = [
  {
    id: 'webdesign',
    number: '01',
    color: '#c8a97e',
    features: ['Responsive Design', 'UI/UX Design', 'Motion Design', 'SEO & Performance', 'CMS Integration'],
    icon: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
  },
  {
    id: 'ai',
    number: '02',
    color: '#2dd4bf',
    features: ['AI Chatbots', 'Workflow Automation', 'Content Generation', 'Data Analysis', 'Personalisierung'],
    icon: (
      <>
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
        <path d="M6 10v1a6 6 0 0 0 12 0v-1" />
        <path d="M12 17v5" />
        <path d="M8 22h8" />
      </>
    ),
  },
];

const steps = {
  de: [
    { number: '01', title: 'Abo wählen', description: 'Paket auswählen oder Kontakt aufnehmen. Kein Telefonat nötig — alles läuft digital.' },
    { number: '02', title: 'Onboarding', description: 'Wir erfassen Ihre Wünsche und Informationen online. Schnell, strukturiert und unkompliziert.' },
    { number: '03', title: 'Wir liefern', description: 'Design, Code, Hosting — wir kümmern uns um alles. Schnelle Auslieferung, alles inklusive.' },
    { number: '04', title: 'Weiterentwicklung', description: 'Monatliche Updates, neue Features und kontinuierliche Optimierung. Ihre Website wächst mit Ihnen.' },
  ],
  en: [
    { number: '01', title: 'Choose a plan', description: 'Select a package or get in touch. No phone call needed — everything runs digitally.' },
    { number: '02', title: 'Onboarding', description: 'We capture your wishes and information online. Fast, structured and straightforward.' },
    { number: '03', title: 'We deliver', description: 'Design, code, hosting — we take care of everything. Fast delivery, all inclusive.' },
    { number: '04', title: 'Continuous growth', description: 'Monthly updates, new features and continuous optimization. Your website grows with you.' },
  ],
  es: [
    { number: '01', title: 'Elige un plan', description: 'Selecciona un paquete o contáctanos. Sin llamadas — todo funciona digitalmente.' },
    { number: '02', title: 'Onboarding', description: 'Capturamos tus deseos e información online. Rápido, estructurado y sin complicaciones.' },
    { number: '03', title: 'Entregamos', description: 'Diseño, código, hosting — nos encargamos de todo. Entrega rápida, todo incluido.' },
    { number: '04', title: 'Crecimiento continuo', description: 'Actualizaciones mensuales, nuevas funciones y optimización continua. Tu web crece contigo.' },
  ],
};

type LocaleKey = 'de' | 'en' | 'es';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function ServicesPage() {
  const t = useTranslations('services');
  const heroReveal = useScrollReveal();
  const cardsReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [locale, setLocale] = useState<string>('de');

  useEffect(() => {
    const pathLocale = window.location.pathname.split('/')[1];
    if (['de', 'en', 'es'].includes(pathLocale)) setLocale(pathLocale);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-[var(--color-background)]">
      {/* === HERO === */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute w-[60vw] h-[60vw] rounded-full blur-[120px] transition-transform duration-[2s]"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)',
              top: '10%',
              left: '20%',
              transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
            }}
          />
          <div
            className="absolute w-[40vw] h-[40vw] rounded-full blur-[100px] transition-transform duration-[2s]"
            style={{
              background: 'radial-gradient(circle, rgba(200,169,126,0.25), transparent 70%)',
              bottom: '10%',
              right: '10%',
              transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
            }}
          />
        </div>

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div ref={heroReveal.ref} className="container relative z-10 text-center max-w-5xl">
          <div className={`transition-all duration-700 ${heroReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1.5 border border-[var(--color-border)] rounded-full text-[10px] tracking-[0.4em] uppercase text-[var(--color-foreground-muted)] mb-8">
              {t('subtitle')}
            </span>
          </div>
          <h1
            className={`text-5xl md:text-7xl lg:text-[5.5rem] font-light tracking-tight leading-[1.05] mb-8 transition-all duration-1000 ${heroReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {t('heroTitle')}
            <br />
            <span className="text-[var(--color-accent)]">{t('heroHighlight')}</span>
          </h1>
          <p
            className={`text-lg md:text-xl text-[var(--color-foreground-muted)] max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 ${heroReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '400ms' }}
          >
            {t('heroDescription')}
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-foreground-subtle)]">Scroll</span>
          <div className="w-px h-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-foreground-muted)] to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* === SERVICE CARDS — 2 Cards, centered, bigger === */}
      <section className="py-32 md:py-40">
        <div className="container max-w-5xl">
          <div className="text-center mb-24">
            <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-foreground-muted)] mb-6">
              {t('subtitle')}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              {t('title')}
            </h2>
          </div>

          <div ref={cardsReveal.ref} className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                visible={cardsReveal.visible}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* === PROCESS SECTION — Better designed === */}
      <section className="py-32 md:py-40">
        <div className="container max-w-6xl">
          <div className="text-center mb-24">
            <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-foreground-muted)] mb-6">
              {locale === 'de' ? 'Unser Prozess' : locale === 'es' ? 'Nuestro Proceso' : 'Our Process'}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              {locale === 'de' ? 'Wie wir arbeiten' : locale === 'es' ? 'Cómo trabajamos' : 'How we work'}
            </h2>
          </div>

          <div ref={processReveal.ref} className="grid md:grid-cols-2 gap-6 md:gap-8">
            {(steps[locale as LocaleKey] || steps.de).map((step, i) => (
              <div
                key={step.number}
                className={`relative overflow-hidden rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-border-hover)] p-10 md:p-12 transition-all duration-700 hover:-translate-y-1 hover:shadow-lg ${
                  processReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Large background number */}
                <span className="absolute top-4 right-6 text-[7rem] font-extralight leading-none tracking-tighter text-[var(--color-foreground)] opacity-[0.04] select-none">
                  {step.number}
                </span>

                <div className="relative z-10">
                  <span className="inline-block text-xs tracking-[0.3em] uppercase text-[var(--color-accent)] mb-6">
                    Schritt {step.number}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-4">{step.title}</h3>
                  <p className="text-base text-[var(--color-foreground-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <CtaSection />
    </div>
  );
}

/* === SERVICE CARD COMPONENT — Centered bullets === */
function ServiceCard({
  service,
  index,
  visible,
  t,
}: {
  service: (typeof services)[0];
  index: number;
  visible: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  const [hovered, setHovered] = useState(false);
  const [mouseLocal, setMouseLocal] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouseLocal({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  const titleKey = `${service.id}.title` as any;
  const descKey = `${service.id}.description` as any;

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-2xl border border-[var(--color-border)] overflow-hidden transition-all duration-700 cursor-pointer ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        transform: visible
          ? hovered
            ? `perspective(1000px) rotateX(${mouseLocal.y * -2}deg) rotateY(${mouseLocal.x * 2}deg) scale(1.01)`
            : 'none'
          : 'translateY(64px)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setMouseLocal({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Glow follow cursor */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none -z-0"
        style={{
          background: service.color,
          left: `calc(50% + ${mouseLocal.x * 120}px - 200px)`,
          top: `calc(50% + ${mouseLocal.y * 120}px - 200px)`,
        }}
      />

      {/* Content — Centered */}
      <div className="relative z-10 p-10 md:p-14 lg:p-16 text-center min-h-[500px] flex flex-col justify-between">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center border border-[var(--color-border)] transition-all duration-500 group-hover:border-transparent"
            style={{ backgroundColor: hovered ? `${service.color}15` : 'transparent' }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="transition-colors duration-500"
              style={{ color: hovered ? service.color : 'var(--color-foreground-muted)' }}
            >
              {service.icon}
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h3
            className="text-3xl md:text-4xl font-light tracking-tight mb-4 transition-colors duration-500"
            style={{ color: hovered ? service.color : 'var(--color-foreground)' }}
          >
            {t(titleKey)}
          </h3>

          <p className="text-base text-[var(--color-foreground-muted)] leading-relaxed max-w-sm mx-auto">
            {t(descKey)}
          </p>
        </div>

        {/* Features — Centered */}
        <div className="flex flex-wrap justify-center gap-3">
          {service.features.map((feature, fi) => (
            <span
              key={feature}
              className="px-4 py-1.5 text-[11px] tracking-wider uppercase rounded-full border transition-all duration-500"
              style={{
                borderColor: hovered ? `${service.color}40` : 'var(--color-border)',
                color: hovered ? service.color : 'var(--color-foreground-muted)',
                transitionDelay: `${fi * 50}ms`,
              }}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
