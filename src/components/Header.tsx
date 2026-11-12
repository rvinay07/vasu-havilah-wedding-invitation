import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Calendar, MapPin, X } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem('weddingTheme') as 'light' | 'dark') || 'light';
    } catch {
      return 'light';
    }
  });

  const location = useLocation();

  // Synchronize Theme Attribute & Storage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem('weddingTheme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Passive Scroll Detection (runs cleanly without modifying scroll position)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bulletproof Body Scroll Locking:
  // Uses overflow: hidden on html/body and disables overscrollBehavior (prevents Android pull-to-refresh)
  // NEVER uses position: fixed on body, ensuring window.scrollY is preserved with zero jumping or reloading.
  useEffect(() => {
    if (menuOpen) {
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyOverflow = document.body.style.overflow;
      const originalOverscroll = document.body.style.overscrollBehavior;

      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';

      return () => {
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.overscrollBehavior = originalOverscroll;
      };
    }
  }, [menuOpen]);

  // Handle route change: automatically close menu when navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Keyboard accessibility: Escape key closes menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/our-story', label: 'Our Story' },
    { to: '/wedding-details', label: 'Wedding Details' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/blessings', label: 'Blessings' },
  ];

  // Elevated styling when scrolled or when menu is open
  const isHeaderElevated = isScrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2.5 sm:py-3.5 ${
          isHeaderElevated
            ? 'bg-cream-warm/95 dark:bg-midnight/95 backdrop-blur-md border-b border-rose/20 dark:border-midnight-border shadow-sm text-plum dark:text-darktext-primary'
            : 'bg-gradient-to-b from-plum-dark/70 dark:from-midnight/80 to-transparent text-white'
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-between">
          {/* Logo / Sacred Monogram */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-1 font-serif text-xl sm:text-2xl font-semibold tracking-wider hover:opacity-85 transition-opacity py-1 select-none"
            aria-label="Vasu & Mercy Havilah Wedding Home"
          >
            <span className={isHeaderElevated ? 'text-plum dark:text-darktext-primary' : 'text-white'}>
              V
            </span>
            <span className="text-rose dark:text-champagne text-lg sm:text-xl font-normal mx-0.5">✝</span>
            <span className={isHeaderElevated ? 'text-plum dark:text-darktext-primary' : 'text-white'}>
              M
            </span>
          </NavLink>

          {/* Desktop Navigation (Visible on Large Screens 1024px+) */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 font-sans text-xs tracking-[0.14em] uppercase font-bold"
            aria-label="Main desktop navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative py-1.5 transition-colors hover:text-rose dark:hover:text-champagne ${
                    isActive
                      ? 'text-rose dark:text-champagne font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-rose dark:after:bg-champagne after:rounded-full'
                      : isHeaderElevated
                      ? 'text-plum/80 dark:text-darktext-secondary'
                      : 'text-white/90'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Group: Theme Toggle & Animated Hamburger Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-cream-warm/90 dark:bg-midnight-card/90 backdrop-blur-md border border-rose/30 dark:border-midnight-border text-plum dark:text-darktext-primary shadow-xs hover:border-rose dark:hover:border-champagne hover:scale-105 active:scale-95 transition-all touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-rose dark:focus-visible:ring-champagne"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-champagne" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-plum" />
              )}
            </button>

            {/* Mobile / Tablet Menu Button (Visible below 1024px) */}
            <button
              onClick={toggleMenu}
              type="button"
              className={`lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center backdrop-blur-md border shadow-xs transition-all active:scale-95 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-rose dark:focus-visible:ring-champagne ${
                menuOpen
                  ? 'bg-rose/15 dark:bg-champagne/15 border-rose dark:border-champagne text-rose dark:text-champagne ring-1 ring-rose/30 dark:ring-champagne/30'
                  : 'bg-cream-warm/90 dark:bg-midnight-card/90 border-rose/30 dark:border-midnight-border text-plum dark:text-darktext-primary hover:border-rose dark:hover:border-champagne'
              }`}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {/* Animated 3-Bar Hamburger to Cross */}
              <div className="w-5 h-4 flex flex-col justify-between items-center" aria-hidden="true">
                <span
                  className={`w-5 h-[2px] rounded-full transition-all duration-300 transform origin-center ${
                    menuOpen
                      ? 'translate-y-[7px] rotate-45 bg-rose dark:bg-champagne'
                      : 'bg-plum dark:bg-darktext-primary'
                  }`}
                />
                <span
                  className={`w-5 h-[2px] rounded-full transition-all duration-200 ${
                    menuOpen
                      ? 'opacity-0 scale-x-0'
                      : 'bg-plum dark:bg-darktext-primary'
                  }`}
                />
                <span
                  className={`w-5 h-[2px] rounded-full transition-all duration-300 transform origin-center ${
                    menuOpen
                      ? '-translate-y-[7px] -rotate-45 bg-rose dark:bg-champagne'
                      : 'bg-plum dark:bg-darktext-primary'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with Motion & Independent Scrolling */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-[45] bg-cream-warm/98 dark:bg-midnight/98 backdrop-blur-2xl lg:hidden overflow-y-auto overscroll-contain"
            style={{ WebkitOverflowScrolling: 'touch' }}
            onClick={(e) => {
              // Click on backdrop outside content closes drawer
              if (e.target === e.currentTarget) {
                closeMenu();
              }
            }}
          >
            <div className="min-h-full flex flex-col justify-between pt-20 sm:pt-24 pb-8 px-5 max-w-sm mx-auto">
              {/* Header inside drawer */}
              <div className="flex flex-col gap-5 text-center mt-2">
                <div className="text-rose dark:text-champagne text-2xl font-serif" aria-hidden="true">
                  ✝
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-medium text-plum dark:text-darktext-primary">
                  Vasu &amp; Mercy Havilah
                </div>
                <div className="h-[1.5px] w-16 bg-rose/40 dark:bg-champagne/40 mx-auto" />

                {/* Navigation Links List */}
                <nav className="flex flex-col gap-2 mt-2" aria-label="Mobile navigation">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * idx, duration: 0.2 }}
                    >
                      <NavLink
                        to={link.to}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `block py-3.5 px-5 rounded-2xl font-serif text-xl sm:text-2xl tracking-wide transition-all ${
                            isActive
                              ? 'bg-rose/10 dark:bg-champagne/10 text-rose dark:text-champagne font-bold border border-rose/25 dark:border-champagne/25 shadow-xs'
                              : 'text-plum/85 dark:text-darktext-primary hover:bg-cream dark:hover:bg-midnight-card hover:text-rose dark:hover:text-champagne'
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Quick Venue Badge & Event Shortcut */}
              <div className="mt-8 pt-6 border-t border-rose/20 dark:border-midnight-border text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pear-pill dark:bg-midnight-elevated text-olive dark:text-darksage text-xs font-bold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" /> 3 February 2027
                </div>

                <div className="text-xs text-plum-muted dark:text-darktext-secondary">
                  <p className="flex items-center justify-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose dark:text-champagne" />
                    <span>Mahendra Kalyana Mandapam, Guntakal</span>
                  </p>
                </div>

                <div className="pt-2 font-sans text-[0.68rem] tracking-widest text-plum-soft dark:text-darktext-muted uppercase">
                  Together in Christ · United in Love
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
