import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const FloatingControls: React.FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Audio play prevented', err);
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      {/* Background Audio */}
      <audio ref={audioRef} src={weddingConfig.media.music} loop preload="none" />

      {/* Floating Buttons Group */}
      <div
        className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-30 flex flex-col items-center gap-2 sm:gap-3"
        style={{
          bottom: 'max(0.75rem, env(safe-area-inset-bottom, 0.75rem))',
          right: 'max(0.75rem, env(safe-area-inset-right, 0.75rem))',
        }}
      >
        {/* Back to Top */}
        {showTopBtn && (
          <button
            onClick={scrollToTop}
            type="button"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-cream-warm/95 dark:bg-midnight-card/95 backdrop-blur-md text-plum dark:text-darktext-primary border border-rose/30 dark:border-midnight-border shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all touch-manipulation"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-rose dark:text-champagne" />
          </button>
        )}

        {/* Music Player */}
        <button
          onClick={toggleMusic}
          type="button"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-rose/95 dark:bg-champagne/95 backdrop-blur-md text-white dark:text-midnight shadow-md shadow-rose-glow dark:shadow-champagne-glow flex items-center justify-center hover:scale-105 active:scale-95 transition-all touch-manipulation"
          aria-label={isPlaying ? 'Pause wedding hymn' : 'Play wedding hymn'}
          title={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
        >
          {isPlaying ? (
            <div className="flex items-center gap-[3px] h-3.5">
              <span className="w-0.5 sm:w-1 bg-white dark:bg-midnight rounded-full eq-bar-1" />
              <span className="w-0.5 sm:w-1 bg-white dark:bg-midnight rounded-full eq-bar-2" />
              <span className="w-0.5 sm:w-1 bg-white dark:bg-midnight rounded-full eq-bar-3" />
            </div>
          ) : (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-midnight" />
          )}
        </button>
      </div>
    </>
  );
};
