'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Logo } from '@/components/ui/Logo';

const locales = ['de', 'en', 'es'] as const;

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Get path without locale prefix
  const getPathWithoutLocale = () => {
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as typeof locales[number])) {
      return '/' + segments.slice(2).join('/') || '/';
    }
    return pathname;
  };

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = getPathWithoutLocale();
    const newPath = newLocale === 'de' ? pathWithoutLocale : `/${newLocale}${pathWithoutLocale}`;
    // Use window.location for reliable locale switching with as-needed prefix
    window.location.href = newPath;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down - hide
      } else {
        setIsVisible(true); // Scrolling up - show
      }

      // Background glass effect when scrolled
      setIsScrolled(currentScrollY > 50);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = [
    { href: '/', label: t('home'), num: '01' },
    { href: '/portfolio', label: t('portfolio'), num: '02' },
    { href: '/services', label: t('services'), num: '03' },
    { href: '/pricing', label: t('pricing'), num: '04' },
    { href: '/about', label: t('about'), num: '05' },
    { href: '/contact', label: t('contact'), num: '06' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[var(--z-fixed)] transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled ? 'py-4' : 'py-6 md:py-8'
        }`}
      >
        {/* Glass background */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-[var(--color-background)]/90 backdrop-blur-xl" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
        </div>

        <div className="container relative flex items-center justify-between">
          {/* Premium Menu Button - Left */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={menuOpen}
            className="group relative w-12 h-12 flex items-center justify-center rounded-full border border-[var(--color-border)] hover:border-[var(--color-foreground)] transition-all duration-300"
          >
            {/* Animated dots/lines */}
            <div className="relative w-5 h-5 flex flex-col justify-center items-center gap-1.5">
              <span
                className={`block w-5 h-[1.5px] bg-current transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-[4px]' : ''
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-current transition-all duration-300 ${
                  menuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-current transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-[4px]' : ''
                }`}
              />
            </div>
          </button>

          {/* Logo - Center */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 group"
          >
            <Logo size={44} className="transition-transform duration-500 group-hover:scale-105" />
          </Link>

          {/* Language Switcher - Right */}
          <div className="flex items-center gap-2 text-sm tracking-wider">
            {locales.map((loc, index) => (
              <span key={loc} className="flex items-center">
                <button
                  onClick={() => switchLocale(loc)}
                  className={`px-2 py-1 transition-all ${
                    locale === loc
                      ? 'opacity-100'
                      : 'opacity-50 hover:opacity-100 hover:text-[var(--color-accent)]'
                  }`}
                >
                  {loc.toUpperCase()}
                </button>
                {index < locales.length - 1 && <span className="opacity-30">|</span>}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 z-[var(--z-modal)] transition-all duration-700 ease-out ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background */}
        <div
          className={`absolute inset-0 bg-[var(--color-background)] transition-transform duration-700 ease-out origin-top ${
            menuOpen ? 'scale-y-100' : 'scale-y-0'
          }`}
        />

        {/* Close button - top right */}
        <button
          onClick={() => setMenuOpen(false)}
          aria-label={t('closeMenu')}
          className={`absolute top-6 md:top-8 right-4 md:right-8 z-10 w-12 h-12 flex items-center justify-center rounded-full border border-[var(--color-border)] hover:border-[var(--color-foreground)] hover:rotate-90 transition-all duration-300 ${
            menuOpen ? 'opacity-100 delay-300' : 'opacity-0'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className={`relative h-full container flex flex-col justify-center transition-all duration-500 delay-200 ${
          menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <nav className="space-y-3 md:space-y-4">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`group flex items-baseline gap-4 md:gap-6 transition-all duration-500 ${
                  menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <span className="text-xs tracking-wider opacity-30 group-hover:opacity-100 group-hover:text-[var(--color-accent)] transition-all">
                  {item.num}
                </span>
                <span className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight hover:text-[var(--color-accent)] transition-colors duration-300">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom - Social Icons Only */}
          <div className={`absolute bottom-8 left-0 right-0 transition-all duration-500 ${
            menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '600ms' }}>
            <div className="container">
              <div className="flex justify-between items-center pt-8 border-t border-[var(--color-border)]">
                {/* Logo */}
                <Logo size={28} className="opacity-50" />

                {/* Social Icons */}
                <div className="flex gap-3">
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
          </div>
        </div>
      </div>
    </>
  );
}
