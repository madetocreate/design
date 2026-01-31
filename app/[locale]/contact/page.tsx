'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formState, setFormState] = useState({ name: '', email: '', message: '', budget: '' });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open mailto with pre-filled content
    const subject = encodeURIComponent(`Projektanfrage von ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nBudget: ${formState.budget}\n\n${formState.message}`
    );
    window.location.href = `mailto:hello@studiomeyer.io?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const budgetOptions = {
    de: ['Starter (199 €/Monat)', 'Professional (399 €/Monat)', 'Enterprise (699 €/Monat)', 'Individuell'],
    en: ['Starter (€199/month)', 'Professional (€399/month)', 'Enterprise (€699/month)', 'Custom'],
    es: ['Starter (199 €/mes)', 'Professional (399 €/mes)', 'Enterprise (699 €/mes)', 'Personalizado'],
  };

  const [locale, setLocale] = useState<string>('de');
  useEffect(() => {
    const pathLocale = window.location.pathname.split('/')[1];
    if (['de', 'en', 'es'].includes(pathLocale)) setLocale(pathLocale);
  }, []);

  return (
    <div className="bg-[var(--color-background)]">
      {/* Hero */}
      <section className="min-h-[40vh] flex items-center justify-center pt-32 pb-8">
        <div className="container text-center max-w-4xl">
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

      {/* Contact Grid */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
            {/* Left - Info */}
            <div className="space-y-12">
              {/* Email */}
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-foreground-muted)] mb-3">
                  {t('email')}
                </p>
                <a
                  href="mailto:hello@studiomeyer.io"
                  className="text-2xl md:text-3xl font-light tracking-tight hover:text-[var(--color-accent)] transition-colors"
                >
                  hello@studiomeyer.io
                </a>
              </div>

              {/* Location */}
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-foreground-muted)] mb-3">
                  {t('address')}
                </p>
                <p className="text-lg font-light">
                  Germany
                </p>
              </div>

              {/* Social */}
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-foreground-muted)] mb-4">
                  Social
                </p>
                <div className="flex gap-4">
                  {[
                    { label: 'Instagram', href: 'https://instagram.com', icon: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" /></> },
                    { label: 'LinkedIn', href: 'https://linkedin.com', icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></> },
                    { label: 'Dribbble', href: 'https://dribbble.com', icon: <><circle cx="12" cy="12" r="10" /><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" /><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" /><path d="M8.56 2.75c4.37 6 6.56 12.25 7.13 19.25" /></> },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-foreground)] transition-all"
                      aria-label={social.label}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        {social.icon}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              {submitted ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border border-[var(--color-accent)] flex items-center justify-center mx-auto mb-6">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                    <p className="text-lg text-[var(--color-foreground-muted)]">
                      {t('formSuccess')}
                    </p>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--color-foreground-muted)] mb-3">
                      {t('formName')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-transparent border-b border-[var(--color-border)] py-3 text-lg font-light focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--color-foreground-muted)] mb-3">
                      {t('formEmail')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-transparent border-b border-[var(--color-border)] py-3 text-lg font-light focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--color-foreground-muted)] mb-3">
                      {t('formBudget')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(budgetOptions[locale as keyof typeof budgetOptions] || budgetOptions.de).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormState({ ...formState, budget: option })}
                          className={`px-4 py-2 text-xs tracking-wider rounded-full border transition-all duration-300 ${
                            formState.budget === option
                              ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                              : 'border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:border-[var(--color-foreground-muted)]'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--color-foreground-muted)] mb-3">
                      {t('formMessage')}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-transparent border-b border-[var(--color-border)] py-3 text-lg font-light focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-[var(--color-accent)] text-white text-sm tracking-wider uppercase rounded-lg hover:bg-[var(--color-accent)]/90 transition-all duration-300"
                  >
                    {t('formSend')}
                  </button>
                </form>
              )}

              {/* Or email */}
              <div className="mt-8 text-center">
                <p className="text-sm text-[var(--color-foreground-subtle)]">
                  {t('or')}:{' '}
                  <a href="mailto:hello@studiomeyer.io" className="text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors">
                    hello@studiomeyer.io
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
