'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 80, suffix: '+', label: 'Projects Delivered' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 12, suffix: '', label: 'Awards Won' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container">
        {/* Large Feature Stat */}
        <div className="text-center mb-24">
          <div className="text-[clamp(8rem,25vw,20rem)] font-light leading-none tracking-tighter text-[var(--color-primary)]">
            <Counter value={80} suffix="" />
          </div>
          <p className="text-heading-3 mt-4">
            delivered <span className="block md:inline">projects</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors"
            >
              <div className="text-4xl md:text-5xl font-light mb-2 text-[var(--color-foreground)]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-[var(--color-foreground-muted)] uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
