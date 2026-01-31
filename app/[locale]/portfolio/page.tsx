'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';


const portfolioProjects = [
  {
    id: 1,
    title: 'Maison Doré',
    subtitle: {
      de: 'Fine Dining Restaurant',
      en: 'Fine Dining Restaurant',
      es: 'Restaurante de Alta Cocina',
    },
    url: 'https://restaurant.studiomeyer.io',
    slug: 'restaurant',
    challenge: {
      de: 'Ein 2-Sterne Michelin Restaurant in München brauchte eine digitale Präsenz, die dem kulinarischen Erlebnis gerecht wird — elegant, raffiniert und unvergesslich.',
      en: 'A 2-star Michelin restaurant in Munich needed a digital presence that lives up to the culinary experience — elegant, refined and unforgettable.',
      es: 'Un restaurante con 2 estrellas Michelin en Múnich necesitaba una presencia digital a la altura de la experiencia culinaria — elegante, refinada e inolvidable.',
    },
    solution: {
      de: 'Eine immersive Website mit animierten Menükarten, eleganter Gold-Akzentuierung und nahtloser Online-Reservierung. Performance Score: 97/100.',
      en: 'An immersive website with animated menus, elegant gold accents and seamless online reservations. Performance Score: 97/100.',
      es: 'Un sitio web inmersivo con menús animados, elegantes acentos dorados y reservas en línea fluidas. Puntuación de rendimiento: 97/100.',
    },
    tech: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    year: '2024',
    color: '#c8a97e',
  },
  {
    id: 2,
    title: 'Luxe Estates',
    subtitle: {
      de: 'Luxus-Immobilien Spanien',
      en: 'Luxury Real Estate Spain',
      es: 'Inmobiliaria de Lujo España',
    },
    url: 'https://immobilien.studiomeyer.io',
    slug: 'immobilien',
    challenge: {
      de: 'Ein Premium-Immobilienmakler für Luxusobjekte in Spanien benötigte eine Website, die Exklusivität und Vertrauen vermittelt — für anspruchsvolle internationale Käufer.',
      en: 'A premium real estate agent for luxury properties in Spain needed a website that conveys exclusivity and trust — for discerning international buyers.',
      es: 'Una agencia inmobiliaria premium para propiedades de lujo en España necesitaba un sitio web que transmita exclusividad y confianza — para compradores internacionales exigentes.',
    },
    solution: {
      de: 'Eine sophisticated Website mit Navy-Blue und Gold-Farbpalette, 4K-Immobiliengalerien und mehrsprachiger Unterstützung für den globalen Markt.',
      en: 'A sophisticated website with navy-blue and gold color palette, 4K property galleries and multilingual support for the global market.',
      es: 'Un sitio web sofisticado con paleta de colores azul marino y dorado, galerías de propiedades en 4K y soporte multilingüe para el mercado global.',
    },
    tech: ['Next.js', 'Sanity CMS', 'i18n'],
    year: '2024',
    color: '#1a3a5c',
  },
  {
    id: 3,
    title: 'APEX Creative',
    subtitle: {
      de: 'Kreativagentur',
      en: 'Digital Creative Agency',
      es: 'Agencia Creativa Digital',
    },
    url: 'https://business.studiomeyer.io',
    slug: 'business',
    challenge: {
      de: 'Eine aufstrebende Kreativagentur wollte sich von der Konkurrenz abheben — mit einer Website, die selbst ein Kunstwerk ist und ihre Innovationskraft demonstriert.',
      en: 'An emerging creative agency wanted to stand out from the competition — with a website that is itself a work of art and demonstrates their innovative power.',
      es: 'Una agencia creativa emergente quería destacarse de la competencia — con un sitio web que es en sí mismo una obra de arte y demuestra su poder innovador.',
    },
    solution: {
      de: 'Eine preisgekrönte Website mit warmen Tönen, cinematischen Scroll-Animationen und perfekter Accessibility. Performance Score: 99/100, Accessibility: 100/100.',
      en: 'An award-worthy website with warm tones, cinematic scroll animations and perfect accessibility. Performance Score: 99/100, Accessibility: 100/100.',
      es: 'Un sitio web digno de premios con tonos cálidos, animaciones de desplazamiento cinematográficas y accesibilidad perfecta. Rendimiento: 99/100, Accesibilidad: 100/100.',
    },
    tech: ['Next.js', 'GSAP', 'TypeScript'],
    year: '2024',
    color: '#d4a574',
  },
  {
    id: 4,
    title: 'Can Serena',
    subtitle: {
      de: 'Boutique Hotel Mallorca',
      en: 'Boutique Hotel Mallorca',
      es: 'Hotel Boutique Mallorca',
    },
    url: 'https://hotel.studiomeyer.io',
    slug: 'hotel',
    challenge: {
      de: 'Ein exklusives Boutique-Hotel auf Mallorca suchte eine digitale Erweiterung ihres Gästeerlebnisses — mediterrane Eleganz trifft auf moderne Buchungsfunktionalität.',
      en: 'An exclusive boutique hotel in Mallorca was looking for a digital extension of their guest experience — Mediterranean elegance meets modern booking functionality.',
      es: 'Un exclusivo hotel boutique en Mallorca buscaba una extensión digital de su experiencia de huéspedes — elegancia mediterránea con funcionalidad de reserva moderna.',
    },
    solution: {
      de: 'Eine atmosphärische Website mit erdigen Naturtönen, virtuellen Zimmerrundgängen und integriertem Reservierungssystem. Performance Score: 93/100.',
      en: 'An atmospheric website with earthy natural tones, virtual room tours and integrated reservation system. Performance Score: 93/100.',
      es: 'Un sitio web atmosférico con tonos naturales terrosos, tours virtuales de habitaciones y sistema de reservas integrado. Puntuación de rendimiento: 93/100.',
    },
    tech: ['Next.js', 'Tailwind CSS', 'Cal.com'],
    year: '2024',
    color: '#8b7355',
  },
  {
    id: 5,
    title: 'Constructive Microbes',
    subtitle: {
      de: 'Biotech & Innovation',
      en: 'Biotech & Innovation',
      es: 'Biotecnología e Innovación',
    },
    url: 'https://constructive.studiomeyer.io',
    slug: 'constructive',
    challenge: {
      de: 'Ein innovatives Biotech-Startup im Bereich mikrobieller Lösungen brauchte eine Website, die komplexe Wissenschaft verständlich und faszinierend präsentiert.',
      en: 'An innovative biotech startup in microbial solutions needed a website that presents complex science in an understandable and fascinating way.',
      es: 'Una startup de biotecnología innovadora en soluciones microbianas necesitaba un sitio web que presente ciencia compleja de manera comprensible y fascinante.',
    },
    solution: {
      de: 'Eine moderne, grün-akzentuierte Website mit interaktiven Infografiken, Produkt-Showcases und einem Preisvergleich-Tool. Accessibility Score: 96/100.',
      en: 'A modern, green-accented website with interactive infographics, product showcases and a pricing comparison tool. Accessibility Score: 96/100.',
      es: 'Un sitio web moderno con acentos verdes, infografías interactivas, showcases de productos y herramienta de comparación de precios. Puntuación de accesibilidad: 96/100.',
    },
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    year: '2025',
    color: '#2d8a4e',
  },
  {
    id: 6,
    title: 'Meyer Store',
    subtitle: {
      de: 'Premium E-Commerce',
      en: 'Premium E-Commerce',
      es: 'E-Commerce Premium',
    },
    url: 'https://shop.studiomeyer.io',
    slug: 'shop',
    challenge: {
      de: 'Ein moderner Online-Shop für Premium-Produkte brauchte ein Einkaufserlebnis, das Luxus und Benutzerfreundlichkeit nahtlos vereint — schnell, elegant und conversion-optimiert.',
      en: 'A modern online store for premium products needed a shopping experience that seamlessly combines luxury and usability — fast, elegant and conversion-optimized.',
      es: 'Una tienda online moderna para productos premium necesitaba una experiencia de compra que combine lujo y usabilidad — rápida, elegante y optimizada para conversiones.',
    },
    solution: {
      de: 'Ein High-End E-Commerce-Erlebnis mit filterbarem Produktkatalog, Warenkorb-Animationen und nahtlosem Checkout-Flow. Mobile-first Design mit 60fps Scroll-Performance.',
      en: 'A high-end e-commerce experience with filterable product catalog, cart animations and seamless checkout flow. Mobile-first design with 60fps scroll performance.',
      es: 'Una experiencia e-commerce de alta gama con catálogo filtrable, animaciones de carrito y flujo de pago fluido. Diseño mobile-first con rendimiento de scroll a 60fps.',
    },
    tech: ['Next.js', 'Medusa.js', 'Tailwind CSS'],
    year: '2025',
    color: '#6366f1',
  },
];

type LocaleKey = 'de' | 'en' | 'es';

function getLocalizedText(text: string | Record<string, string>, locale: string): string {
  if (typeof text === 'string') return text;
  return text[locale as LocaleKey] || text.de;
}

export default function PortfolioPage() {
  const t = useTranslations('portfolio');
  const [activeIndex, setActiveIndex] = useState(0);
  const [locale, setLocale] = useState<string>('de');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const pathLocale = window.location.pathname.split('/')[1];
    if (['de', 'en', 'es'].includes(pathLocale)) {
      setLocale(pathLocale);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollAreaRef.current) return;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Each project gets 100vh of scroll space, offset by hero (60vh)
      const heroOffset = vh * 0.6;
      const raw = Math.max(0, scrollY - heroOffset);
      const idx = Math.min(Math.floor(raw / vh), portfolioProjects.length - 1);
      setActiveIndex(idx);
      lastScrollTop.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProject = useCallback((index: number) => {
    const vh = window.innerHeight;
    const heroOffset = vh * 0.6;
    window.scrollTo({ top: heroOffset + index * vh + 10, behavior: 'smooth' });
  }, []);

  const project = portfolioProjects[activeIndex];

  return (
    <div className="bg-[var(--color-background)]">
      {/* Hero */}
      <section className="min-h-[60vh] flex items-center justify-center pt-32">
        <div className="container text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-foreground-muted)] mb-6">
            {t('subtitle')}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8">
            {t('title')}
          </h1>
          <p className="text-lg text-[var(--color-foreground-muted)] max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center gap-4 pb-16">
        <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-foreground-subtle)]">
          {t('scrollToFlip')}
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-[var(--color-foreground-muted)] to-transparent animate-pulse" />
      </div>

      {/* Scroll-driven portfolio */}
      <div
        ref={scrollAreaRef}
        style={{ height: `${portfolioProjects.length * 100 + 60}vh` }}
      >
        {/* Sticky showcase */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Accent color bar */}
          <div
            className="absolute top-0 left-0 w-full h-1 transition-colors duration-700"
            style={{ backgroundColor: project.color }}
          />

          <div className="h-full flex items-center">
            <div className="container max-w-7xl px-6 md:px-12">
              <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-center">
                {/* Left - Info */}
                <div className="space-y-6 py-12">
                  {/* Number + Nav */}
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-6xl md:text-8xl font-light tabular-nums transition-colors duration-500"
                      style={{ color: project.color, opacity: 0.4 }}
                    >
                      {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-foreground-subtle)]">
                      / {String(portfolioProjects.length).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h2
                      key={project.id}
                      className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-2 animate-fade-up"
                    >
                      {project.title}
                    </h2>
                    <p className="text-sm md:text-base" style={{ color: project.color }}>
                      {getLocalizedText(project.subtitle, locale)}
                    </p>
                  </div>

                  {/* Challenge */}
                  <div>
                    <h3 className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-foreground-muted)] mb-2">
                      {t('challenge')}
                    </h3>
                    <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
                      {getLocalizedText(project.challenge, locale)}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h3 className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-foreground-muted)] mb-2">
                      {t('solution')}
                    </h3>
                    <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
                      {getLocalizedText(project.solution, locale)}
                    </p>
                  </div>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-[10px] tracking-wider uppercase border border-[var(--color-border)] rounded-full text-[var(--color-foreground-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                    <span className="text-xs text-[var(--color-foreground-subtle)] tabular-nums">
                      {project.year}
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-xs tracking-wider uppercase transition-colors hover:text-[var(--color-accent)]"
                    >
                      {t('visitWebsite')}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-hover:translate-x-1">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Right - Browser Preview */}
                <div className="relative py-8">
                  <div className="relative w-full rounded-xl overflow-hidden border border-[var(--color-border)]/50 bg-[#0a0a0a] shadow-2xl">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111] border-b border-white/5">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-[#1a1a1a] rounded-md px-3 py-1 text-[11px] text-white/30 text-center font-mono truncate">
                          {project.url}
                        </div>
                      </div>
                    </div>

                    {/* Video/Screenshot Showcase */}
                    <div
                      className="portfolio-showcase relative w-full overflow-hidden bg-white group/preview"
                      style={{ aspectRatio: '16/10' }}
                      onMouseEnter={(e) => {
                        const video = e.currentTarget.querySelector('video');
                        if (video) video.play();
                      }}
                      onMouseLeave={(e) => {
                        const video = e.currentTarget.querySelector('video');
                        if (video) { video.pause(); video.currentTime = 0; }
                      }}
                    >
                      {/* Screenshot thumbnail */}
                      <img
                        src={`/portfolio/${project.slug}.png`}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover/preview:opacity-0"
                        loading={activeIndex < 2 ? 'eager' : 'lazy'}
                      />

                      {/* Scroll video */}
                      <video
                        key={project.slug}
                        src={`/portfolio/${project.slug}.webm`}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover/preview:opacity-100"
                      />

                      {/* Hover overlay */}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-transparent hover:bg-black/10 transition-colors flex items-center justify-center group/link z-10"
                      >
                        <span className="opacity-0 group-hover/link:opacity-100 transition-opacity bg-black/80 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm text-white flex items-center gap-2">
                          {t('livePreview')}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Glow */}
                  <div
                    className="absolute -inset-8 rounded-3xl -z-10 blur-3xl opacity-10 transition-colors duration-700"
                    style={{ backgroundColor: project.color }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-[var(--color-border)]">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${((activeIndex + 1) / portfolioProjects.length) * 100}%`,
                backgroundColor: project.color,
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3">
        {portfolioProjects.map((p, index) => (
          <button
            key={p.id}
            onClick={() => scrollToProject(index)}
            className="group relative flex items-center justify-end"
            aria-label={`Go to ${p.title}`}
          >
            {/* Tooltip */}
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] tracking-wider uppercase text-[var(--color-foreground-muted)] bg-[var(--color-background)] border border-[var(--color-border)] px-2 py-1 rounded">
              {p.title}
            </span>
            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-3 h-3' : 'w-2 h-2 bg-[var(--color-border)] hover:bg-[var(--color-foreground-muted)]'
              }`}
              style={index === activeIndex ? { backgroundColor: project.color } : undefined}
            />
          </button>
        ))}
      </div>

      {/* Bottom section */}
      <div className="h-[50vh] flex items-center justify-center">
        <div className="container text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-foreground-muted)] mb-6">
            {t('readyToStart') || 'Ready to start?'}
          </p>
          <a
            href="mailto:hello@studiomeyer.io"
            className="text-3xl md:text-5xl font-light tracking-tight hover:text-[var(--color-accent)] transition-colors"
          >
            hello@studiomeyer.io
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
