'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--color-border)]">
      {/* Main Footer - Minimal */}
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo */}
          <Link href="/" className="group">
            <Logo size={36} className="transition-transform duration-500 group-hover:scale-105" />
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-6 md:gap-8 text-sm text-[var(--color-foreground-muted)]">
            <Link href="/" className="hover:text-[var(--color-foreground)] transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/portfolio" className="hover:text-[var(--color-foreground)] transition-colors">
              {t('nav.portfolio')}
            </Link>
            <Link href="/services" className="hover:text-[var(--color-foreground)] transition-colors">
              {t('nav.services')}
            </Link>
            <Link href="/pricing" className="hover:text-[var(--color-foreground)] transition-colors">
              {t('nav.pricing')}
            </Link>
            <Link href="/about" className="hover:text-[var(--color-foreground)] transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="/contact" className="hover:text-[var(--color-foreground)] transition-colors">
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-foreground)] transition-all"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-foreground)] transition-all"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-foreground)] transition-all"
              aria-label="Dribbble"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                <path d="M8.56 2.75c4.37 6 6.56 12.25 7.13 19.25" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Subtle */}
      <div className="container">
        <div className="border-t border-[var(--color-border)] py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-foreground-subtle)]">
            © {currentYear} {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-xs text-[var(--color-foreground-subtle)]">
            <Link href="/privacy" className="hover:text-[var(--color-foreground)] transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href="/imprint" className="hover:text-[var(--color-foreground)] transition-colors">
              {t('footer.imprint')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
