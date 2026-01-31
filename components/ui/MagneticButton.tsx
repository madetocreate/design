'use client';

import { useRef, useState, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  maxDistance?: number;
  scaleOnHover?: boolean;
  scaleAmount?: number;
  innerParallax?: boolean;
  innerParallaxStrength?: number;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.5,
  maxDistance = 40,
  scaleOnHover = true,
  scaleAmount = 1.08,
  innerParallax = true,
  innerParallaxStrength = 0.4,
  className = '',
  onClick,
  href
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [textTransform, setTextTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    let moveX = deltaX * strength;
    let moveY = deltaY * strength;

    // Clamp to max distance
    const currentDist = Math.sqrt(moveX * moveX + moveY * moveY);
    if (currentDist > maxDistance) {
      moveX = (moveX / currentDist) * maxDistance;
      moveY = (moveY / currentDist) * maxDistance;
    }

    setTransform({
      x: moveX,
      y: moveY,
      scale: scaleOnHover ? scaleAmount : 1
    });

    if (innerParallax) {
      setTextTransform({
        x: -moveX * innerParallaxStrength,
        y: -moveY * innerParallaxStrength
      });
    }
  }, [strength, maxDistance, scaleOnHover, scaleAmount, innerParallax, innerParallaxStrength]);

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0, scale: 1 });
    setTextTransform({ x: 0, y: 0 });
  }, []);

  const buttonStyles = {
    transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  };

  const textStyles = {
    display: 'inline-block' as const,
    transform: `translate(${textTransform.x}px, ${textTransform.y}px)`,
    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  };

  const content = (
    <span style={textStyles}>
      {children}
    </span>
  );

  return (
    <div
      className="inline-block p-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {href ? (
        <a
          ref={buttonRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={className}
          style={buttonStyles}
        >
          {content}
        </a>
      ) : (
        <button
          ref={buttonRef as React.RefObject<HTMLButtonElement>}
          onClick={onClick}
          className={className}
          style={buttonStyles}
        >
          {content}
        </button>
      )}
    </div>
  );
};
