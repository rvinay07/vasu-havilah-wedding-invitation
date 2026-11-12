import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownProps {
  targetDate: string;
  label?: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, label = "Countdown" }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - Date.now();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isPast) {
    return (
      <div className="text-center p-4 rounded-xl bg-cream dark:bg-midnight-card border border-rose/30 dark:border-midnight-border text-plum dark:text-darktext-primary font-serif text-lg">
        The sacred celebration has begun ✨
      </div>
    );
  }

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-md mx-auto text-center">
      {label && (
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-olive dark:text-champagne font-bold mb-3">
          {label}
        </p>
      )}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((unit) => {
          const formatted = String(unit.value).padStart(2, '0');
          return (
            <div
              key={unit.label}
              className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-lg bg-cream/70 dark:bg-midnight-card border border-rose/25 dark:border-midnight-border shadow-sm transition-colors"
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={formatted}
                  initial={{ y: -6, opacity: 0.6 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 6, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-serif text-2xl sm:text-3xl font-semibold text-plum dark:text-darktext-primary"
                >
                  {formatted}
                </motion.span>
              </AnimatePresence>
              <span className="text-[0.62rem] sm:text-[0.68rem] uppercase tracking-wider text-plum-muted dark:text-darktext-secondary mt-0.5">
                {unit.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
