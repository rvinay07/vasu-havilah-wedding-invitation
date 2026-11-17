import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const FloatingControls: React.FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef(false);

  // 1. Scroll listener for "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Connect to preloaded background audio and ensure seamless playback
  useEffect(() => {
    let audio = document.getElementById('wedding-bg-audio') as HTMLAudioElement | null;
    if (!audio) {
      audio = new Audio(weddingConfig.media.music);
      audio.id = 'wedding-bg-audio';
      audio.loop = true;
      audio.preload = 'auto';
      document.body.appendChild(audio);
    }
    audioRef.current = audio;
    audio.volume = 0.75;

    // Synchronize state with actual audio element
    setIsPlaying(!audio.paused);

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    // If audio is paused and user hasn't explicitly muted, attempt playback
    if (audio.paused && !userPausedRef.current) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }

    // Attach interaction listeners as extra safeguard across browsers
    const gestureEvents: Array<keyof WindowEventMap> = [
      'click',
      'touchstart',
      'touchend',
      'mousedown',
      'pointerdown',
      'keydown',
    ];

    const removeInteractionListeners = () => {
      gestureEvents.forEach(evt => {
        window.removeEventListener(evt, onUserInteraction, true);
        document.removeEventListener(evt, onUserInteraction, true);
      });
    };

    const onUserInteraction = async () => {
      if (userPausedRef.current) {
        removeInteractionListeners();
        return;
      }
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) {
        try {
          await audio.play();
          setIsPlaying(true);
          removeInteractionListeners();
        } catch {
          // Playback not yet permitted, keep listeners active for next gesture
        }
      } else {
        setIsPlaying(true);
        removeInteractionListeners();
      }
    };

    gestureEvents.forEach(evt => {
      window.addEventListener(evt, onUserInteraction, { capture: true, passive: true });
      document.addEventListener(evt, onUserInteraction, { capture: true, passive: true });
    });

    return () => {
      audio?.removeEventListener('play', onPlay);
      audio?.removeEventListener('pause', onPause);
      removeInteractionListeners();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      userPausedRef.current = false;
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Audio playback prevented', err);
      }
    } else {
      userPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      {/* Floating Buttons Group */}
      <div
        className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5"
        style={{
          bottom: 'max(0.75rem, env(safe-area-inset-bottom, 0.75rem))',
          right: 'max(0.75rem, env(safe-area-inset-right, 0.75rem))',
        }}
      >
        {/* Back to Top Button */}
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

        {/* Highlighted Music Toggle Button with Minimal Text */}
        <button
          onClick={toggleMusic}
          type="button"
          data-testid="music-toggle"
          className={`group flex items-center gap-2 sm:gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-rose dark:focus-visible:ring-champagne active:scale-95 border-2 ${
            isPlaying
              ? 'bg-rose text-plum dark:bg-champagne dark:text-midnight border-white/60 dark:border-midnight-border shadow-rose-glow dark:shadow-champagne-glow animate-music-pulse'
              : 'bg-white/95 dark:bg-midnight-card/95 text-rose dark:text-champagne border-rose dark:border-champagne hover:bg-rose-light/20 dark:hover:bg-champagne/10 shadow-md'
          }`}
          aria-label={isPlaying ? 'Turn music off' : 'Turn music on'}
          title={isPlaying ? 'Music is playing · Click to turn OFF' : 'Music is paused · Click to turn ON'}
        >
          {/* Animated Equalizer or Mute Icon */}
          <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden="true">
            {isPlaying ? (
              <div className="flex items-center gap-[2.5px] h-3.5">
                <span className="w-0.5 sm:w-1 bg-current rounded-full eq-bar-1" />
                <span className="w-0.5 sm:w-1 bg-current rounded-full eq-bar-2" />
                <span className="w-0.5 sm:w-1 bg-current rounded-full eq-bar-3" />
              </div>
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </div>

          {/* Minimal Text Label */}
          <span className="font-sans text-[0.68rem] sm:text-xs font-bold tracking-wider uppercase select-none whitespace-nowrap">
            {isPlaying ? 'Music ON' : 'Music OFF'}
          </span>

          {/* Status Indicator Pill */}
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              isPlaying
                ? 'bg-emerald-300 dark:bg-emerald-600 animate-pulse'
                : 'bg-plum-muted/40 dark:bg-champagne/40'
            }`}
            aria-hidden="true"
          />
        </button>
      </div>
    </>
  );
};
