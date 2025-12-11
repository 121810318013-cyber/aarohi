import { useEffect, useState, memo } from 'react';

interface Feather {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

const FeatherSVG = memo(() => (
  <svg 
    viewBox="0 0 40 100" 
    fill="none" 
    className="w-full h-full"
  >
    {/* Main stem */}
    <path
      d="M20 100 Q20 50 20 0"
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      fill="none"
      opacity="0.8"
    />
    
    {/* Feather vane - left */}
    <path
      d="M20 90 Q8 70 6 50 Q5 35 12 25 Q16 20 20 18"
      fill="hsl(var(--primary))"
      opacity="0.25"
    />
    
    {/* Feather vane - right */}
    <path
      d="M20 90 Q32 70 34 50 Q35 35 28 25 Q24 20 20 18"
      fill="hsl(var(--primary))"
      opacity="0.25"
    />
    
    {/* Eye outer ring */}
    <ellipse cx="20" cy="35" rx="12" ry="18" fill="hsl(188 70% 25%)" opacity="0.6" />
    
    {/* Eye middle ring */}
    <ellipse cx="20" cy="35" rx="9" ry="14" fill="hsl(var(--primary))" opacity="0.7" />
    
    {/* Eye inner ring */}
    <ellipse cx="20" cy="35" rx="6" ry="10" fill="hsl(var(--accent))" opacity="0.8" />
    
    {/* Eye center */}
    <ellipse cx="20" cy="35" rx="3" ry="5" fill="hsl(188 85% 15%)" opacity="0.9" />
    
    {/* Highlight */}
    <ellipse cx="18" cy="32" rx="1.5" ry="2" fill="white" opacity="0.4" />
  </svg>
));

FeatherSVG.displayName = 'FeatherSVG';

export const PeacockAnimation = memo(() => {
  const [feathers, setFeathers] = useState<Feather[]>([]);

  useEffect(() => {
    const createFeather = () => {
      const newFeather: Feather = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        delay: 0,
        duration: 15 + Math.random() * 10,
        size: 25 + Math.random() * 20,
        rotation: -20 + Math.random() * 40,
      };
      setFeathers(prev => [...prev.slice(-4), newFeather]);
    };

    const interval = setInterval(createFeather, 5000);
    createFeather();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Clean up old feathers
    const cleanup = setInterval(() => {
      setFeathers(prev => prev.filter(f => Date.now() - f.id < 25000));
    }, 10000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {feathers.map(feather => (
        <div
          key={feather.id}
          className="absolute animate-feather-fall"
          style={{
            left: `${feather.x}%`,
            width: feather.size,
            height: feather.size * 2.5,
            animationDuration: `${feather.duration}s`,
            transform: `rotate(${feather.rotation}deg)`,
            willChange: 'transform, opacity',
          }}
        >
          <FeatherSVG />
        </div>
      ))}
    </div>
  );
});

PeacockAnimation.displayName = 'PeacockAnimation';
