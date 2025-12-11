import { ReactNode, useRef, useEffect, useState, memo } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down';
}

export const ParallaxSection = memo(({ 
  children, 
  speed = 0.3, 
  className = '',
  direction = 'up'
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
            const multiplier = direction === 'up' ? -1 : 1;
            setOffset(progress * 50 * speed * multiplier);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div
      ref={ref}
      style={{ transform: `translateY(${offset}px)` }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
});

ParallaxSection.displayName = 'ParallaxSection';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export const ParallaxImage = memo(({ src, alt, className = '', speed = 0.2 }: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
            setOffset((progress - 0.5) * 30 * speed);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        style={{ transform: `translateY(${offset}px) scale(1.05)` }}
        className="w-full h-full object-cover will-change-transform"
        loading="lazy"
      />
    </div>
  );
});

ParallaxImage.displayName = 'ParallaxImage';

interface ParallaxTextProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxText = memo(({ children, className = '', speed = 0.1 }: ParallaxTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
            setOffset((progress - 0.5) * 20 * speed);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      style={{ transform: `translateY(${offset}px)` }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
});

ParallaxText.displayName = 'ParallaxText';
