import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream-warm dark:bg-midnight text-plum dark:text-darktext-primary select-none transition-colors pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-center"
          >
            <div className="font-serif text-4xl sm:text-5xl font-medium tracking-wide">
              V <span className="text-rose dark:text-champagne inline-block mx-1">✝</span> M
            </div>
            <motion.div
              initial={{ width: 16 }}
              animate={{ width: 72 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="h-[1.5px] bg-rose dark:bg-champagne mx-auto my-3"
            />
            <div className="font-champagne text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-plum dark:text-darktext-primary font-normal tracking-wide leading-normal">
              <span className="block md:inline whitespace-nowrap">Vasu</span>{' '}
              <span className="block md:inline text-rose dark:text-champagne font-champagne my-0.5 md:my-0 md:mx-2" aria-hidden="true">&amp;</span>{' '}
              <span className="block md:inline whitespace-nowrap">Mercy Havilah</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
