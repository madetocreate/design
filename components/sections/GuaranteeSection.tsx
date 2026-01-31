'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const guaranteeCards = [
  {
    id: 1,
    number: '01',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
    titleKey: 'guarantee.card1.title',
    descKey: 'guarantee.card1.desc',
  },
  {
    id: 2,
    number: '02',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&q=80',
    titleKey: 'guarantee.card2.title',
    descKey: 'guarantee.card2.desc',
  },
  {
    id: 3,
    number: '03',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80',
    titleKey: 'guarantee.card3.title',
    descKey: 'guarantee.card3.desc',
  },
];

export function GuaranteeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div
          className={`max-w-3xl mb-16 md:mb-24 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
            Guarantee of <br />
            <span className="text-[var(--color-accent)]">reliability</span>
          </h2>
          <p className="text-lg text-[var(--color-foreground-muted)] max-w-xl">
            Full transparency and quality assurance at every stage of your project
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {guaranteeCards.map((card, index) => (
            <div
              key={card.id}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-sm">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Number overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-5xl md:text-6xl font-light opacity-80">
                    {card.number}
                  </span>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Text */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium">
                  {card.id === 1 && 'Pixel-perfect implementation'}
                  {card.id === 2 && 'Premium technologies'}
                  {card.id === 3 && 'Continuous support'}
                </h3>
                <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
                  {card.id === 1 && 'We implement the most technically complex design and architectural solutions with precision'}
                  {card.id === 2 && 'We use the best technologies and frameworks available for modern web development'}
                  {card.id === 3 && 'Professional support and maintenance, ensuring your project runs smoothly'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
