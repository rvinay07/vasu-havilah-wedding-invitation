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

        {/* Developer Credit & WhatsApp Contact */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs tracking-wider text-cream/70 dark:text-darktext-muted">
          <span>Developed by <strong className="text-white dark:text-darktext-primary font-medium">{weddingConfig.developer.name}</strong></span>
          <span className="hidden sm:inline opacity-40">·</span>
          <a
            href={weddingConfig.developer.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 dark:text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/50 transition-all font-sans font-medium text-[0.75rem] touch-manipulation shadow-xs hover:scale-105 active:scale-95"
            aria-label={`Chat with ${weddingConfig.developer.name} on WhatsApp: ${weddingConfig.developer.displayPhone}`}
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.997.544 1.764.793 2.796.793 3.18 0 5.767-2.586 5.767-5.766.001-3.182-2.585-5.78-5.767-5.78zm3.377 8.21c-.143.404-.716.741-1.002.775-.285.034-.632.14-1.956-.376-1.637-.638-2.671-2.316-2.753-2.427-.082-.111-.661-.88-.661-1.677 0-.797.414-1.189.561-1.348.147-.159.323-.2.431-.2.108 0 .216.001.31.006.099.005.231-.038.361.275.132.318.452 1.107.492 1.189.04.082.067.177.013.285-.054.108-.081.176-.161.27-.081.095-.17.211-.243.284-.081.081-.166.17-.071.333.095.163.422.697.906 1.127.623.553 1.149.724 1.312.805.163.081.258.072.355-.039.097-.111.414-.482.525-.647.111-.165.222-.138.374-.082.152.056.963.454 1.128.536.165.082.275.123.316.192.04.07.04.406-.103.81zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.957-1.301C8.423 21.536 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.638 0-3.161-.502-4.431-1.365l-.317-.215-2.951.774.787-2.875-.236-.339C3.91 14.869 3.4 13.486 3.4 12c0-4.742 3.858-8.6 8.6-8.6s8.6 3.858 8.6 8.6-3.858 8.6-8.6 8.6z"/>
            </svg>
            <span>{weddingConfig.developer.displayPhone}</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
