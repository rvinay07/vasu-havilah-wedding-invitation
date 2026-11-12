import React from 'react';
import { motion } from 'framer-motion';
import { AmbientCanvas } from './AmbientCanvas';

interface PageHeroProps {
  bgImage?: string;
  eyebrow?: string;
  title: string;
  description: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  bgImage = '/assets/images/hero.jpg',
  eyebrow = 'Together in Christ',
  title,
  description,
}) => {
  return (
    <section className="relative min-h-[58vh] sm:min-h-[64vh] md:min-h-[68vh] flex items-center justify-center text-center overflow-hidden pt-28 pb-20 px-4 sm:px-6">
      {/* Background Image with Ken Burns motion & top-biased positioning */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover object-[center_20%] animate-kenburns scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-plum-midnight/80 via-plum-dark/60 to-plum-midnight/95 dark:from-midnight/85 dark:via-midnight-subtle/70 dark:to-midnight/98 transition-colors" />
        {/* Soft bottom blend to eliminate harsh cutoff line */}
        <div className="absolute -bottom-px left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-cream-warm dark:from-midnight to-transparent pointer-events-none z-[2]" />
      </div>

      <AmbientCanvas />

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-white px-2">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="p-5 sm:p-7 rounded-2xl backdrop-blur-xs bg-black/25 dark:bg-black/35 border border-white/10 dark:border-white/5"
        >
          <div className="text-rose dark:text-champagne text-2xl font-serif mb-2" aria-hidden="true">
            ✝
          </div>
          <p className="font-sans text-[0.68rem] sm:text-xs uppercase tracking-[0.25em] text-rose dark:text-champagne font-bold mb-2">
            {eyebrow}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white dark:text-darktext-primary mb-3">
            {title}
          </h1>
          <div className="w-16 h-[1.5px] bg-rose/60 dark:bg-champagne/60 mx-auto my-3" />
          <p className="font-sans text-xs sm:text-sm md:text-base text-cream/90 dark:text-darktext-secondary max-w-lg mx-auto font-light leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
