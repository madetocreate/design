'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

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
          <div className="absolute inset-0 bg-[var(--color-background)]/80 backdrop-blur-xl" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
        </div>

        <div className="container relative flex items-center justify-between">
          {/* Menu Button - Left */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="group flex items-center gap-3 text-sm tracking-[0.15em] uppercase hover:text-[var(--color-accent)] transition-colors"
          >
            <span className="relative w-6 h-4 flex flex-col justify-between">
              <span
                className={`w-full h-px bg-current transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`w-full h-px bg-current transition-all duration-300 ${
                  menuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`w-full h-px bg-current transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </span>
            <span className="hidden md:inline">{menuOpen ? 'Close' : 'Menu'}</span>
          </button>

          {/* Logo - Center */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl tracking-[0.2em] font-light uppercase group"
          >
            <span className="inline-block transition-transform duration-500 group-hover:scale-105">
              Design
            </span>
            <sup className="text-[10px] ml-1 opacity-40 group-hover:opacity-100 transition-opacity">®</sup>
          </Link>

          {/* Time/Location - Right (more premium than button) */}
          <div className="text-right text-xs tracking-wider opacity-60 hidden md:block">
            <div className="uppercase">New York</div>
            <div className="tabular-nums">
              <CurrentTime />
            </div>
          </div>

          {/* Mobile - Just show language */}
          <div className="md:hidden text-sm opacity-60">
            EN
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

        {/* Content */}
        <div className={`relative h-full container flex flex-col justify-center transition-all duration-500 delay-200 ${
          menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <nav className="space-y-4 md:space-y-6">
            {[
              { href: '/', label: 'Home', num: '01' },
              { href: '/projects', label: 'Projects', num: '02' },
              { href: '/services', label: 'Services', num: '03' },
              { href: '/about', label: 'About', num: '04' },
              { href: '/contact', label: 'Contact', num: '05' },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-4 md:gap-8"
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                <span className="text-xs tracking-wider opacity-40 group-hover:opacity-100 transition-opacity">
                  {item.num}
                </span>
                <span className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tight hover:text-[var(--color-accent)] transition-colors duration-300">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom Info */}
          <div className="absolute bottom-8 left-0 right-0">
            <div className="container">
              <div className="flex flex-col md:flex-row md:justify-between gap-6 pt-8 border-t border-[var(--color-border)]">
                <div className="flex flex-col gap-2">
                  <span className="text-xs tracking-wider uppercase opacity-40">Contact</span>
                  <a href="mailto:hello@design.studio" className="text-sm hover:text-[var(--color-accent)] transition-colors">
                    hello@design.studio
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs tracking-wider uppercase opacity-40">Location</span>
                  <span className="text-sm">New York, NY</span>
                </div>
                <div className="flex gap-6">
                  {['Instagram', 'LinkedIn', 'Dribbble'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-sm opacity-60 hover:opacity-100 hover:text-[var(--color-accent)] transition-all"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Real-time clock component
function CurrentTime() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'America/New_York',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time || '00:00'}</span>;
}
