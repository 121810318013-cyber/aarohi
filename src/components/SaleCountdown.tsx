import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SaleCountdownProps {
  endDate: Date;
  title?: string;
  isActive?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const SaleCountdown = ({ 
  endDate, 
  title = 'Flash Sale Ends In', 
  isActive = true 
}: SaleCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!isActive) return;

    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate, isActive]);

  if (!isActive) return null;

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-accent/10 border border-accent rounded-lg p-4 mb-6"
    >
      <h3 className="text-center text-sm font-semibold text-accent mb-3">{title}</h3>
      <div className="flex justify-center gap-2 md:gap-4">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center">
            <div className="bg-accent text-accent-foreground rounded-lg p-2 md:p-3 min-w-[50px] md:min-w-[60px] text-center">
              <span className="text-lg md:text-2xl font-bold block">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] md:text-xs uppercase">{unit.label}</span>
            </div>
            {index < timeUnits.length - 1 && (
              <span className="text-accent font-bold mx-1 text-lg">:</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
