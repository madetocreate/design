'use client';

import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    number: '01',
    title: 'Web',
    subtitle: 'Design',
    tagline: 'Digital experiences that inspire',
    description: 'We craft premium websites with pixel-perfect attention to detail and seamless user experiences',
    image: 'https://picsum.photos/seed/webdesign/800/1000',
    href: '/services/web-design',
  },
  {
    number: '02',
    title: 'Brand',
    subtitle: 'Identity',
    tagline: 'A visual voice for your brand',
    description: 'We build cohesive brand identities that communicate your unique story and values',
    image: 'https://picsum.photos/seed/branding/800/1000',
    href: '/services/branding',
  },
];

export function ServiceCards() {
  return (
    <section className="relative py-24">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <div className="line-h mb-8" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-heading-2">
              Our <span className="text-[var(--color-primary)]">services</span>
            </h2>
            <p className="text-body max-w-md">
              We provide comprehensive solutions for brands seeking excellence in digital presence.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {services.map((service) => (
            <Link
              key={service.number}
              href={service.href}
              className="group relative block aspect-[4/5] overflow-hidden bg-[var(--color-neutral-900)]"
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent opacity-90" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6 md:p-10">
                {/* Top */}
                <div className="flex justify-between items-start">
                  <span className="number-badge text-2xl">{service.number}</span>
                </div>

                {/* Bottom */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-heading-3 mb-1">{service.title}</h3>
                    <h4 className="text-heading-3 text-[var(--color-primary)]">{service.subtitle}</h4>
                    <p className="text-label mt-4 text-[var(--color-foreground-muted)]">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-body text-sm max-w-xs">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-8">
                    <span className="btn inline-flex">
                      View service
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Line */}
        <div className="line-h mt-16" />
      </div>
    </section>
  );
}
