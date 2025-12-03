import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Feather {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export const PeacockAnimation = () => {
  const [feathers, setFeathers] = useState<Feather[]>([]);

  useEffect(() => {
    const createFeather = () => {
      const newFeather: Feather = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        delay: 0,
        duration: 8 + Math.random() * 6,
        size: 20 + Math.random() * 20,
        rotation: Math.random() * 360,
      };
      setFeathers(prev => [...prev.slice(-8), newFeather]);
    };

    const interval = setInterval(createFeather, 3000);
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
              y: -50, 
              x: `${feather.x}vw`, 
              rotate: feather.rotation,
              opacity: 0 
            }}
            animate={{ 
              y: '110vh', 
              x: `${feather.x + (Math.random() - 0.5) * 20}vw`,
              rotate: feather.rotation + 180,
              opacity: [0, 0.6, 0.6, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: feather.duration, 
              ease: 'linear',
              delay: feather.delay
            }}
            onAnimationComplete={() => removeFeather(feather.id)}
            className="absolute"
            style={{ fontSize: feather.size }}
          >
            <svg 
              width="1em" 
              height="2em" 
              viewBox="0 0 24 48" 
              fill="none" 
              className="text-primary/40 dark:text-primary/30"
            >
              <path
                d="M12 0C12 0 8 8 8 16C8 24 12 32 12 48C12 32 16 24 16 16C16 8 12 0 12 0Z"
                fill="currentColor"
              />
              <ellipse cx="12" cy="20" rx="4" ry="6" fill="hsl(var(--accent))" fillOpacity="0.5" />
              <ellipse cx="12" cy="20" rx="2" ry="3" fill="hsl(var(--primary))" fillOpacity="0.7" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
