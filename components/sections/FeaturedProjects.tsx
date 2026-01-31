'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: 'AURORA',
    subtitle: 'HEIGHTS',
    tagline: 'Luxury real estate experience in the heart of the city',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80',
    href: '/projects/aurora-heights',
  },
  {
    id: 2,
    title: 'MERIDIAN',
    subtitle: 'STUDIO',
    tagline: 'Creative agency rebranding and digital platform',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&q=80',
    href: '/projects/meridian-studio',
  },
  {
    id: 3,
    title: 'NOVA',
    subtitle: 'COLLECTIVE',
    tagline: 'Fashion brand identity and e-commerce design',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80',
    href: '/projects/nova-collective',
  },
];

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const cards = section.querySelectorAll('.project-card');
      const viewportHeight = window.innerHeight;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(viewportHeight / 2 - cardCenter);
        const maxDistance = viewportHeight / 2;
        const opacity = Math.max(0.3, 1 - distanceFromCenter / maxDistance);
        const scale = Math.max(0.95, 1 - distanceFromCenter / (maxDistance * 10));

        (card as HTMLElement).style.opacity = String(opacity);
        (card as HTMLElement).style.transform = `scale(${scale})`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      {/* Section Header */}
      <div className="container py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="text-label text-[var(--color-foreground-muted)]">
            Featured Work
          </div>
          <Link href="/projects" className="text-sm hover:text-[var(--color-accent)] transition-colors">
            View all projects →
          </Link>
        </div>
        <div className="line-h" />
      </div>

      {/* Fullscreen Project Cards */}
      <div className="relative">
        {projects.map((project, index) => (
          <Link
            key={project.id}
            href={project.href}
            className="project-card block relative h-screen sticky top-0 transition-all duration-500 ease-out"
            style={{ zIndex: index + 1 }}
          >
            {/* Background Image - use div with background for reliable rendering */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-[var(--color-background)]/40" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
              <h2 className="text-heading-1 md:text-display mb-2">
                {project.title}
                <span className="block text-[var(--color-primary)]">{project.subtitle}</span>
              </h2>

              <p className="text-body max-w-lg mt-4">
                {project.tagline}
              </p>
            </div>

            {/* Project Number */}
            <div className="absolute bottom-8 left-8 number-badge text-lg">
              0{project.id}
            </div>

            {/* View Project Hint */}
            <div className="absolute bottom-8 right-8 text-sm opacity-60">
              View project →
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Links */}
      <div className="container py-16">
        <div className="line-h mb-8" />
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/projects" className="btn flex-1 justify-center">
            All projects
          </Link>
          <Link href="/contact" className="btn btn-primary flex-1 justify-center">
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}
