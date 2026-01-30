'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Services', href: '/services' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    services: [
      { label: 'Web Design', href: '/services/web-design' },
      { label: 'Brand Identity', href: '/services/branding' },
      { label: 'Development', href: '/services/development' },
      { label: 'Consulting', href: '/services/consulting' },
    ],
    social: [
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Dribbble', href: 'https://dribbble.com' },
      { label: 'Behance', href: 'https://behance.net' },
    ],
  };

  return (
    <footer className="relative border-t border-[var(--color-border)]">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-4">
            <Link href="/" className="text-2xl tracking-wider font-light">
              DESIGN<sup className="text-xs ml-0.5 opacity-60">®</sup>
            </Link>
            <p className="text-body mt-4 max-w-xs">
              Premium digital design and development studio. Creating exceptional experiences since 2010.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-label mb-6">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="text-label mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <h4 className="text-label mb-6">Social</h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="text-label mb-6">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@design.studio"
                  className="text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors"
                >
                  hello@design.studio
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors"
                >
                  +1 234 567 890
                </a>
              </li>
              <li className="text-[var(--color-foreground-muted)]">
                New York, NY
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container">
        <div className="border-t border-[var(--color-border)] py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--color-foreground-muted)]">
            © {currentYear} Design Studio. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[var(--color-foreground-muted)]">
            <Link href="/privacy" className="hover:text-[var(--color-foreground)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--color-foreground)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
