import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Feather {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  swayDirection: number;
}

export const PeacockAnimation = () => {
  const [feathers, setFeathers] = useState<Feather[]>([]);

  useEffect(() => {
    const createFeather = () => {
      const newFeather: Feather = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        delay: 0,
        duration: 12 + Math.random() * 8,
        size: 30 + Math.random() * 25,
        rotation: -30 + Math.random() * 60,
        swayDirection: Math.random() > 0.5 ? 1 : -1,
      };
      setFeathers(prev => [...prev.slice(-6), newFeather]);
    };

    const interval = setInterval(createFeather, 4000);
    createFeather();

    return () => clearInterval(interval);
  }, []);

  const removeFeather = (id: number) => {
    setFeathers(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {feathers.map(feather => (
          <motion.div
            key={feather.id}
            initial={{ 
              y: -100, 
              x: `${feather.x}vw`, 
              rotate: feather.rotation,
              opacity: 0 
            }}
            animate={{ 
              y: '110vh', 
              x: [
                `${feather.x}vw`,
                `${feather.x + feather.swayDirection * 8}vw`,
                `${feather.x - feather.swayDirection * 5}vw`,
                `${feather.x + feather.swayDirection * 6}vw`,
                `${feather.x}vw`,
              ],
              rotate: [feather.rotation, feather.rotation + 25, feather.rotation - 15, feather.rotation + 20, feather.rotation + 90],
              opacity: [0, 0.7, 0.7, 0.5, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: feather.duration, 
              ease: 'easeInOut',
              delay: feather.delay,
              x: {
                duration: feather.duration,
                ease: 'easeInOut',
              }
            }}
            onAnimationComplete={() => removeFeather(feather.id)}
            className="absolute"
            style={{ width: feather.size, height: feather.size * 2.5 }}
          >
            {/* Detailed Peacock Feather SVG */}
            <svg 
              viewBox="0 0 40 100" 
              fill="none" 
              className="w-full h-full drop-shadow-lg"
            >
              {/* Main stem/rachis */}
              <path
                d="M20 100 Q20 50 20 0"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                fill="none"
                opacity="0.8"
              />
              
              {/* Outer feather barbs - left */}
              <path
                d="M20 95 Q5 80 3 60 Q2 45 8 35 Q12 28 18 25"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
                fill="none"
                opacity="0.4"
              />
              
              {/* Outer feather barbs - right */}
              <path
                d="M20 95 Q35 80 37 60 Q38 45 32 35 Q28 28 22 25"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
                fill="none"
                opacity="0.4"
              />
              
              {/* Feather vane - left side */}
              <path
                d="M20 90 Q8 70 6 50 Q5 35 12 25 Q16 20 20 18"
                fill="hsl(var(--primary))"
                opacity="0.25"
              />
              
              {/* Feather vane - right side */}
              <path
                d="M20 90 Q32 70 34 50 Q35 35 28 25 Q24 20 20 18"
                fill="hsl(var(--primary))"
                opacity="0.25"
              />
              
              {/* Eye outer ring - dark blue/green */}
              <ellipse 
                cx="20" 
                cy="35" 
                rx="12" 
                ry="18" 
                fill="hsl(188 70% 25%)"
                opacity="0.6"
              />
              
              {/* Eye middle ring - teal */}
              <ellipse 
                cx="20" 
                cy="35" 
                rx="9" 
                ry="14" 
                fill="hsl(var(--primary))"
                opacity="0.7"
              />
              
              {/* Eye inner ring - golden */}
              <ellipse 
                cx="20" 
                cy="35" 
                rx="6" 
                ry="10" 
                fill="hsl(var(--accent))"
                opacity="0.8"
              />
              
              {/* Eye center - dark */}
              <ellipse 
                cx="20" 
                cy="35" 
                rx="3" 
                ry="5" 
                fill="hsl(188 85% 15%)"
                opacity="0.9"
              />
              
              {/* Highlight on eye */}
              <ellipse 
                cx="18" 
                cy="32" 
                rx="1.5" 
                ry="2" 
                fill="white"
                opacity="0.4"
              />
              
              {/* Fine barbs radiating from eye */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45 - 90) * (Math.PI / 180);
                const x1 = 20 + Math.cos(angle) * 12;
                const y1 = 35 + Math.sin(angle) * 18;
                const x2 = 20 + Math.cos(angle) * 16;
                const y2 = 35 + Math.sin(angle) * 24;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.3"
                    opacity="0.3"
                  />
                );
              })}
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
