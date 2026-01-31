'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LottieIcon } from '@/components/ui/LottieIcon';

// Free Lottie animations from LottieFiles CDN
const serviceLotties = {
  webDesign: 'https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159f/IGmMCqhzpt.json',
  development: 'https://lottie.host/cc309045-3a42-4b43-927e-1f1e3e15370f/JMDDJqfAvP.json',
  ai: 'https://lottie.host/f8ac tried-4f6b-4b8a-b5d3-3e8b0b7b6e2a/placeholder.json',
  branding: 'https://lottie.host/5b2e9f16-9c8e-4b8e-b5d3-3e8b0b7b6e2a/placeholder.json',
};

const services = [
  {
    id: 'webdesign',
    number: '01',
    color: '#c8a97e',
    features: ['Responsive Design', 'UI/UX Design', 'Motion Design', 'Prototyping'],
  },
  {
    id: 'development',
    number: '02',
    color: '#6366f1',
    features: ['Next.js & React', 'TypeScript', 'API Integration', 'Performance'],
  },
  {
    id: 'ai',
    number: '03',
    color: '#2dd4bf',
    features: ['AI Chatbots', 'Automation', 'Content Generation', 'Data Analysis'],
  },
  {
    id: 'branding',
    number: '04',
    color: '#f472b6',
    features: ['Brand Strategy', 'Visual Identity', 'Logo Design', 'Brand Guidelines'],
  },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          function update(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function ServicesPage() {
  const t = useTranslations('services');
  const heroReveal = useScrollReveal();
  const statsReveal = useScrollReveal();
  const cardsReveal = useScrollReveal();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
        {/* Animated gradient background */}
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

        {/* Noise */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div ref={heroReveal.ref} className="container relative z-10 text-center max-w-5xl">
          {/* Label */}
          <div
            className={`transition-all duration-700 ${
              heroReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block px-4 py-1.5 border border-[var(--color-border)] rounded-full text-[10px] tracking-[0.4em] uppercase text-[var(--color-foreground-muted)] mb-8">
              {t('subtitle')}
            </span>
          </div>

          {/* Title */}
          <h1
            className={`text-5xl md:text-7xl lg:text-[5.5rem] font-light tracking-tight leading-[1.05] mb-8 transition-all duration-1000 ${
              heroReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {t('heroTitle') || 'Wir bauen digitale'}
            <br />
            <span className="text-[var(--color-accent)]">
              {t('heroHighlight') || 'Erlebnisse'}
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-lg md:text-xl text-[var(--color-foreground-muted)] max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 ${
              heroReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {t('heroDescription') || 'Von der ersten Idee bis zum fertigen Produkt — wir vereinen Design, Technologie und Strategie.'}
          </p>

          {/* Floating Lottie decorations */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 opacity-20 hidden lg:block">
            <div
              className="transition-transform duration-[2s]"
              style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }}
            >
              <LottieIcon
                src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159f/IGmMCqhzpt.json"
                size={200}
                playOnHover={false}
                loop
              />
            </div>
          </div>
          <div className="absolute top-1/3 right-0 translate-x-1/2 opacity-20 hidden lg:block">
            <div
              className="transition-transform duration-[2s]"
              style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }}
            >
              <LottieIcon
                src="https://lottie.host/cc309045-3a42-4b43-927e-1f1e3e15370f/JMDDJqfAvP.json"
                size={160}
                playOnHover={false}
                loop
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-foreground-subtle)]">
            Scroll
          </span>
          <div className="w-px h-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-foreground-muted)] to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* === STATS === */}
      <section ref={statsReveal.ref} className="py-24 border-y border-[var(--color-border)]">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 50, suffix: '+', label: t('statsProjects') || 'Projekte' },
              { value: 12, suffix: '+', label: t('statsYears') || 'Jahre Erfahrung' },
              { value: 99, suffix: '%', label: t('statsSatisfaction') || 'Zufriedenheit' },
              { value: 24, suffix: '/7', label: t('statsSupport') || 'Support' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`transition-all duration-700 ${
                  statsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-light mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-[var(--color-foreground-muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SERVICE CARDS === */}
      <section className="py-32">
        <div className="container max-w-6xl">
          {/* Section header */}
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-foreground-muted)] mb-4">
              {t('subtitle')}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              {t('title')}
            </h2>
          </div>

          {/* Cards Grid */}
          <div ref={cardsReveal.ref} className="grid md:grid-cols-2 gap-6">
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

      {/* === PROCESS SECTION === */}
      <ProcessSection />

      {/* === CTA === */}
      <section className="py-32 text-center">
        <div className="container max-w-3xl">
          <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-foreground-muted)] mb-6">
            {t('ctaLabel') || 'Bereit loszulegen?'}
          </p>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">
            {t('ctaTitle') || 'Lassen Sie uns reden'}
          </h2>
          <a
            href="mailto:hello@studiomeyer.io"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--color-border)] rounded-full text-sm tracking-wider uppercase hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] transition-all duration-500 group"
          >
            <span>hello@studiomeyer.io</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-hover:translate-x-1">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}

/* === SERVICE CARD COMPONENT === */
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
            ? `perspective(1000px) rotateX(${mouseLocal.y * -3}deg) rotateY(${mouseLocal.x * 3}deg) scale(1.02)`
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
        className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none -z-0"
        style={{
          background: service.color,
          left: `calc(50% + ${mouseLocal.x * 100}px - 150px)`,
          top: `calc(50% + ${mouseLocal.y * 100}px - 150px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <span
              className="text-5xl md:text-6xl font-light transition-colors duration-500"
              style={{ color: hovered ? service.color : 'var(--color-foreground)', opacity: 0.15 }}
            >
              {service.number}
            </span>
          </div>

          {/* Lottie Icon */}
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border border-[var(--color-border)] transition-all duration-500 group-hover:border-transparent"
            style={{
              backgroundColor: hovered ? `${service.color}15` : 'transparent',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="transition-colors duration-500"
              style={{ color: hovered ? service.color : 'var(--color-foreground-muted)' }}
            >
              {service.id === 'webdesign' && (
                <>
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </>
              )}
              {service.id === 'development' && (
                <>
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </>
              )}
              {service.id === 'ai' && (
                <>
                  <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                  <path d="M6 10v1a6 6 0 0 0 12 0v-1" />
                  <path d="M12 17v5" />
                  <path d="M8 22h8" />
                </>
              )}
              {service.id === 'branding' && (
                <>
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-2xl md:text-3xl font-light tracking-tight mb-3 transition-colors duration-500"
          style={{ color: hovered ? service.color : 'var(--color-foreground)' }}
        >
          {t(titleKey)}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed mb-8">
          {t(descKey)}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-8">
          {service.features.map((feature, fi) => (
            <span
              key={feature}
              className="px-3 py-1 text-[10px] tracking-wider uppercase rounded-full border transition-all duration-500"
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

        {/* Bottom line */}
        <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
          <span className="text-xs tracking-wider uppercase text-[var(--color-foreground-subtle)]">
            {t('learnMore') || 'Mehr erfahren'}
          </span>
          <div
            className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500"
            style={{
              borderColor: hovered ? service.color : 'var(--color-border)',
              backgroundColor: hovered ? service.color : 'transparent',
              color: hovered ? '#fff' : 'var(--color-foreground-muted)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* === PROCESS SECTION === */
function ProcessSection() {
  const reveal = useScrollReveal();

  const steps = [
    { number: '01', title: 'Discovery', description: 'Analyse, Research und Strategie-Entwicklung' },
    { number: '02', title: 'Design', description: 'Wireframes, Prototypen und Visual Design' },
    { number: '03', title: 'Development', description: 'Code, Testing und Performance-Optimierung' },
    { number: '04', title: 'Launch', description: 'Deployment, Monitoring und kontinuierliche Verbesserung' },
  ];

  return (
    <section className="py-32 bg-[var(--color-surface)]">
      <div className="container max-w-6xl">
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-foreground-muted)] mb-4">
            Unser Prozess
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Wie wir arbeiten
          </h2>
        </div>

        <div ref={reveal.ref} className="relative">
          {/* Connecting line */}
          <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-px bg-[var(--color-border)] hidden md:block" />

          <div className="space-y-16 md:space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`relative md:grid md:grid-cols-2 md:gap-16 md:py-12 transition-all duration-700 ${
                  reveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {/* Left / Right alternating */}
                <div className={`${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:col-start-2 md:pl-16'}`}>
                  <span className="text-5xl font-light text-[var(--color-foreground)]/10 mb-2 block">
                    {step.number}
                  </span>
                  <h3 className="text-2xl font-light tracking-tight mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--color-foreground-muted)]">{step.description}</p>
                </div>

                {/* Center dot */}
                <div className="absolute left-[24px] md:left-1/2 top-0 md:top-12 w-[9px] h-[9px] rounded-full bg-[var(--color-accent)] md:-translate-x-1/2 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
