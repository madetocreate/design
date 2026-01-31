'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { CtaSection } from '@/components/sections/CtaSection';

const plans = [
  {
    id: 'starter',
    name: { de: 'Starter', en: 'Starter', es: 'Starter' },
    price: 199,
    description: {
      de: 'Professionelle Website mit allem, was Sie brauchen.',
      en: 'Professional website with everything you need.',
      es: 'Sitio web profesional con todo lo que necesitas.',
    },
    features: {
      de: [
        'Premium Design & Code',
        'Hosting, SSL & CDN inklusive',
        'Perfektes SEO',
        'CMS zur Inhaltspflege',
        'Kontaktformular',
        'Monatliche Updates',
      ],
      en: [
        'Premium design & code',
        'Hosting, SSL & CDN included',
        'Perfect SEO',
        'CMS for content management',
        'Contact form',
        'Monthly updates',
      ],
      es: [
        'Diseño y código premium',
        'Hosting, SSL y CDN incluidos',
        'SEO perfecto',
        'CMS para contenido',
        'Formulario de contacto',
        'Actualizaciones mensuales',
      ],
    },
    popular: false,
    color: '#708573',
  },
  {
    id: 'professional',
    name: { de: 'Professional', en: 'Professional', es: 'Profesional' },
    price: 399,
    description: {
      de: 'Alles aus Starter — plus E-Commerce und KI.',
      en: 'Everything from Starter — plus e-commerce and AI.',
      es: 'Todo del Starter — más e-commerce e IA.',
    },
    features: {
      de: [
        'Alles aus Starter',
        'Online-Shop möglich',
        'KI-Chatbot Integration',
        'Blog / News-System',
        'Mehrsprachig',
        'Analytics & Tracking',
        'Mehr Korrekturschleifen',
      ],
      en: [
        'Everything from Starter',
        'Online shop possible',
        'AI chatbot integration',
        'Blog / news system',
        'Multilingual',
        'Analytics & tracking',
        'More revision rounds',
      ],
      es: [
        'Todo del Starter',
        'Tienda online posible',
        'Chatbot IA integrado',
        'Sistema de blog / noticias',
        'Multilingüe',
        'Analytics y tracking',
        'Más rondas de revisión',
      ],
    },
    popular: true,
    color: '#e94560',
  },
  {
    id: 'enterprise',
    name: { de: 'Enterprise', en: 'Enterprise', es: 'Enterprise' },
    price: 699,
    description: {
      de: 'Das volle Paket — mit automatisierten Abläufen und Workflows.',
      en: 'The full package — with automated processes and workflows.',
      es: 'El paquete completo — con procesos y workflows automatizados.',
    },
    features: {
      de: [
        'Alles aus Professional',
        'Automatisierte Abläufe',
        'Custom Workflows & APIs',
        'E-Commerce + KI-Features',
        'Unbegrenzte Korrekturen',
        'Premium Monitoring',
        'Prioritäts-Support',
      ],
      en: [
        'Everything from Professional',
        'Automated processes',
        'Custom workflows & APIs',
        'E-commerce + AI features',
        'Unlimited revisions',
        'Premium monitoring',
        'Priority support',
      ],
      es: [
        'Todo del Professional',
        'Procesos automatizados',
        'Workflows y APIs custom',
        'E-commerce + funciones IA',
        'Revisiones ilimitadas',
        'Monitoreo premium',
        'Soporte prioritario',
      ],
    },
    popular: false,
    color: '#6366f1',
  },
];

const faqs = {
  de: [
    { q: 'Was passiert nach 12 Monaten?', a: 'Die Website geht komplett in Ihr Eigentum über — inklusive Quellcode, Design-Assets und CMS-Zugang. Keine weiteren Kosten. Optional bieten wir Wartungspakete an.' },
    { q: 'Kann ich jederzeit kündigen?', a: 'Die Mindestlaufzeit beträgt 12 Monate. Danach können Sie monatlich kündigen oder das optionale Wartungspaket nutzen.' },
    { q: 'Was ist im Hosting enthalten?', a: 'Schnelles Cloud-Hosting mit SSL-Zertifikat, CDN, automatische Backups und 99.9% Uptime-Garantie.' },
    { q: 'Wie schnell ist meine Website fertig?', a: 'Starter: 2–3 Wochen. Professional: 4–6 Wochen. Enterprise: 6–10 Wochen. Abhängig von Umfang und Zulieferung.' },
    { q: 'Kann ich den Plan wechseln?', a: 'Ja, ein Upgrade ist jederzeit möglich. Die Differenz wird anteilig berechnet.' },
  ],
  en: [
    { q: 'What happens after 12 months?', a: 'The website becomes your complete property — including source code, design assets and CMS access. No further costs. We optionally offer maintenance packages.' },
    { q: 'Can I cancel anytime?', a: 'The minimum term is 12 months. After that, you can cancel monthly or use the optional maintenance package.' },
    { q: 'What\'s included in the hosting?', a: 'Fast cloud hosting with SSL certificate, CDN, automatic backups and 99.9% uptime guarantee.' },
    { q: 'How quickly will my website be ready?', a: 'Starter: 2–3 weeks. Professional: 4–6 weeks. Enterprise: 6–10 weeks. Depending on scope and delivery.' },
    { q: 'Can I switch plans?', a: 'Yes, an upgrade is possible at any time. The difference is calculated proportionally.' },
  ],
  es: [
    { q: '¿Qué pasa después de 12 meses?', a: 'El sitio web pasa a ser completamente de tu propiedad — incluyendo código fuente, assets de diseño y acceso al CMS. Sin costos adicionales. Opcionalmente ofrecemos paquetes de mantenimiento.' },
    { q: '¿Puedo cancelar en cualquier momento?', a: 'El plazo mínimo es de 12 meses. Después, puedes cancelar mensualmente o usar el paquete de mantenimiento opcional.' },
    { q: '¿Qué incluye el hosting?', a: 'Hosting cloud rápido con certificado SSL, CDN, backups automáticos y garantía de uptime del 99.9%.' },
    { q: '¿Qué tan rápido estará mi sitio web?', a: 'Starter: 2–3 semanas. Professional: 4–6 semanas. Enterprise: 6–10 semanas. Dependiendo del alcance y entrega.' },
    { q: '¿Puedo cambiar de plan?', a: 'Sí, un upgrade es posible en cualquier momento. La diferencia se calcula proporcionalmente.' },
  ],
};

type LocaleKey = 'de' | 'en' | 'es';

function getLocalized(text: Record<string, string> | Record<string, string[]>, locale: string) {
  return (text as Record<string, any>)[locale as LocaleKey] || (text as Record<string, any>).de;
}

export default function PricingPage() {
  const t = useTranslations('pricing');
  const [locale, setLocale] = useState<string>('de');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const pathLocale = window.location.pathname.split('/')[1];
    if (['de', 'en', 'es'].includes(pathLocale)) {
      setLocale(pathLocale);
    }
  }, []);

  return (
    <div className="bg-[var(--color-background)]">
      {/* Hero */}
      <section className="min-h-[50vh] flex items-center justify-center pt-32 pb-16">
        <div className="container text-center max-w-4xl">
          <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-foreground-muted)] mb-6">
            {t('subtitle')}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-foreground-muted)] max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative group text-center transition-all duration-500 rounded-2xl hover:-translate-y-1 ${
                  plan.popular
                    ? 'bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] md:-my-4 py-14 md:py-16 px-8 lg:px-10 z-10 shadow-[0_8px_32px_rgba(233,69,96,0.15)]'
                    : 'bg-white/[0.03] backdrop-blur-md border border-white/[0.08] py-12 md:py-14 px-8 lg:px-10 hover:bg-white/[0.06] hover:shadow-xl'
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 text-[10px] tracking-[0.3em] uppercase rounded-full" style={{ backgroundColor: plan.color, color: 'white' }}>
                    {t('popular')}
                  </div>
                )}

                {/* Plan name */}
                <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: plan.popular ? plan.color : plan.color }}>
                  {getLocalized(plan.name, locale)}
                </p>

                {/* Price */}
                <div className="mb-2">
                  <span className="text-6xl lg:text-7xl font-extralight tabular-nums">{plan.price}</span>
                  <span className="text-lg opacity-50 ml-1">€</span>
                </div>
                <p className="text-sm opacity-50 mb-10">/{t('monthly')}</p>

                {/* Features */}
                <ul className="space-y-3 mb-10 text-left max-w-[240px] mx-auto">
                  {(getLocalized(plan.features, locale) as string[]).map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-[13px]">
                      <span className="mt-1 flex-shrink-0" style={{ color: plan.color }}>
                        &#10003;
                      </span>
                      <span className={plan.popular ? 'opacity-80' : 'text-[var(--color-foreground-muted)]'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className={`block py-4 rounded-lg text-sm tracking-wider uppercase transition-all duration-300 ${
                    plan.popular
                      ? 'text-white hover:opacity-90'
                      : 'border border-[var(--color-border)] hover:border-[var(--color-foreground)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)]'
                  }`}
                  style={plan.popular ? { backgroundColor: plan.color } : undefined}
                >
                  {t('startProject')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ownership Section */}
      <section className="py-24 border-y border-[var(--color-border)]">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full border border-[var(--color-accent)] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
                <path d="M9 12l2 2 4-4" />
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">
            {t('ownershipTitle')}
          </h2>
          <p className="text-lg text-[var(--color-foreground-muted)] leading-relaxed max-w-2xl mx-auto">
            {t('ownershipDescription')}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-center mb-16">
            {t('faq')}
          </h2>
          <div className="space-y-0">
            {(faqs[locale as LocaleKey] || faqs.de).map((faq, index) => (
              <div key={index} className="border-b border-[var(--color-border)]">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="text-base md:text-lg font-light pr-8">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 text-[var(--color-foreground-muted)] transition-transform duration-300 ${
                      openFaq === index ? 'rotate-45' : ''
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-48 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection variant="contact" />
    </div>
  );
}
