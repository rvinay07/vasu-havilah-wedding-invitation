import React from 'react';
import { Link } from 'react-router-dom';
import { weddingConfig } from '../config/weddingConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-plum-dark dark:bg-midnight text-cream/90 dark:text-darktext-secondary pt-16 pb-12 px-4 text-center border-t border-rose/25 dark:border-midnight-border transition-colors">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Sacred Cross */}
        <div className="text-rose dark:text-champagne text-3xl font-serif mb-2" aria-hidden="true">
          ✝
        </div>

        {/* Names */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white dark:text-darktext-primary mb-3">
          {weddingConfig.groomName} &amp; {weddingConfig.brideName}
        </h2>

        {/* Faith Note */}
        <p className="font-serif italic text-base sm:text-lg text-cream/80 dark:text-darktext-secondary max-w-lg mb-6">
          “Two hearts, one faith, one beautiful journey — blessed by God.”
        </p>

        {/* Contact Numbers */}
        <div className="w-full max-w-xl py-4 border-y border-rose/25 dark:border-midnight-border flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-wider text-cream/80 dark:text-darktext-primary font-bold mb-6">
          <span className="text-rose dark:text-champagne w-full sm:w-auto mb-1 sm:mb-0">Contact for Information:</span>
          {weddingConfig.contactNumbers.map((c) => (
            <a
              key={c.tel}
              href={`tel:${c.tel}`}
              className="hover:text-rose dark:hover:text-champagne transition-colors py-1 px-2 rounded hover:bg-rose/10 dark:hover:bg-midnight-elevated"
            >
              {c.number}
            </a>
          ))}
        </div>

        {/* Credit */}
        <p className="text-xs tracking-widest text-cream/60 dark:text-darktext-muted">
          {weddingConfig.designerCredit}
        </p>
      </div>
    </footer>
  );
};
