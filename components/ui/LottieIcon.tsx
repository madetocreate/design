'use client';

import { useRef, useEffect, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';

interface LottieIconProps {
  src: string;
  className?: string;
  playOnHover?: boolean;
  playOnScroll?: boolean;
  loop?: boolean;
  size?: number;
}

export function LottieIcon({
  src,
  className = '',
  playOnHover = true,
  playOnScroll = false,
  loop = false,
  size = 80,
}: LottieIconProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => {});
  }, [src]);

  useEffect(() => {
    if (!playOnScroll || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lottieRef.current?.play();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [playOnScroll, animationData]);

  if (!animationData) {
    return <div className={className} style={{ width: size, height: size }} />;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size }}
      onMouseEnter={() => {
        if (playOnHover) {
          lottieRef.current?.stop();
          lottieRef.current?.play();
        }
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={!playOnHover}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
