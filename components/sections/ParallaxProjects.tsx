'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const projects = [
  {
    id: 1,
    title: 'FLAVOR FACTORY',
    subtitle: 'Restaurant & Catering',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80',
    href: '/portfolio',
  },
  {
    id: 2,
    title: 'TECHSTART',
    subtitle: 'SaaS Platform',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
    href: '/portfolio',
  },
  {
    id: 3,
    title: 'WELLNESS RETREAT',
    subtitle: 'Spa & Hotel',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80',
    href: '/portfolio',
  },
];

export function ParallaxProjects() {
  const t = useTranslations('portfolio');
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height - window.innerHeight);
      const index = Math.floor(scrollProgress * projects.length);
      setActiveIndex(Math.min(Math.max(0, index), projects.length - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${projects.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          const isPrevious = index < activeIndex;

          return (
            <a
              key={project.id}
              href={project.href}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                isActive
                  ? 'opacity-100 z-20'
                  : isPrevious
                  ? 'opacity-0 -translate-y-full z-10'
                  : 'opacity-0 translate-y-full z-10'
              }`}
            >
              {/* Background Image with Parallax */}
              <div
                className="absolute inset-0 transition-transform duration-700"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: isActive ? 'scale(1.05)' : 'scale(1.1)',
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <div
                  className={`transition-all duration-700 delay-100 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-4">
                    {project.title}
                  </h2>
                  <p className="text-lg md:text-xl text-white/70 tracking-wide">
                    {project.subtitle}
                  </p>
                </div>

                {/* View Project indicator */}
                <div
                  className={`absolute bottom-20 left-1/2 -translate-x-1/2 transition-all duration-700 delay-200 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <span className="text-xs tracking-[0.3em] uppercase text-white/50 flex items-center gap-2 group-hover:text-white transition-colors">
                    {t('visitWebsite')}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          );
        })}

        {/* Progress indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-white scale-150'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
