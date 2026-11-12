import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Calendar, ArrowRight, Heart, MapPin, Image as ImageIcon, BookOpen, Share2 } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { AmbientCanvas } from '../components/AmbientCanvas';
import { Countdown } from '../components/Countdown';

export const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-hero-title',
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo(
        '.gsap-hero-sub',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power2.out', delay: 0.6 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsAppShare = () => {
    const shareMessage = [
      `✝ Wedding Invitation: ${weddingConfig.groomName} & ${weddingConfig.brideName}`,
      ``,
      `"Therefore what God has joined together, let no one separate." — Matthew 19:6`,
      ``,
      `With praise to God, we joyfully invite you to celebrate our Holy Matrimony on 3 February 2027 at ${weddingConfig.events.ceremony.venue}, ${weddingConfig.events.ceremony.address}.`,
      ``,
      `Reception: 28 February 2027 at ${weddingConfig.events.reception.venue}, ${weddingConfig.events.reception.address}.`,
      ``,
      `View digital invitation, timings & maps:`,
      window.location.origin ? window.location.href : "https://rvinay07.github.io/vasu-havilah-wedding-invitation/"
    ].join('\n');

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener');
  };

  const gateways = [
    {
      to: '/our-story',
      title: 'Our Story & Journey',
      description: 'Two paths guided by God\'s providence, our completed engagement celebration, and our personal timeline of faith.',
      icon: Heart,
      badge: 'Love & Testimony'
    },
    {
      to: '/wedding-details',
      title: 'Wedding Details & Venues',
      description: 'Holy Matrimony in Guntakal and Reception in Proddatur, complete with timings, maps, and schedules.',
      icon: MapPin,
      badge: 'Celebrations'
    },
    {
      to: '/gallery',
      title: 'Photo Gallery',
      description: 'Pre-wedding portraits and cherished moments of laughter, family love, and joy in an interactive fullscreen gallery.',
      icon: ImageIcon,
      badge: 'Moments'
    },
    {
      to: '/blessings',
      title: 'Scriptures & Blessings',
      description: 'Selected Bible verses on Christian marriage, the foundational covenant in Christ, and prayers for our journey.',
      icon: BookOpen,
      badge: 'Holy Word'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* ================= 1. CINEMATIC HERO ================= */}
      <section className="relative min-h-[100svh] sm:min-h-screen flex items-center justify-center text-center overflow-hidden px-4 pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src={weddingConfig.media.hero}
            alt="Vasu and Mercy Havilah"
            className="w-full h-full object-cover object-[center_20%] animate-kenburns scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-plum-midnight/75 via-plum-dark/45 to-plum-midnight/90 dark:from-midnight/80 dark:via-midnight-subtle/55 dark:to-midnight/95 transition-colors" />
          {/* Feathered bottom transition into invitation card */}
          <div className="absolute -bottom-px left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-cream-warm dark:from-midnight to-transparent pointer-events-none z-[1]" />
        </div>

        <AmbientCanvas />

        <div ref={heroRef} className="relative z-10 max-w-3xl mx-auto text-white py-8 sm:py-12">
          <div className="p-5 sm:p-8 rounded-3xl backdrop-blur-xs bg-black/20 dark:bg-black/30 border border-white/10 dark:border-white/5">
            <div className="text-rose dark:text-champagne text-3xl font-serif mb-2 gsap-hero-sub" aria-hidden="true">
              ✝
            </div>
            <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-rose dark:text-champagne font-bold mb-2 gsap-hero-sub">
              Together in Christ, United in Love
            </p>
            <p className="font-serif italic text-base sm:text-lg text-cream/90 dark:text-darktext-secondary mb-4 gsap-hero-sub">
              The wedding celebration of
            </p>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white dark:text-darktext-primary mb-4 gsap-hero-title">
              <span>{weddingConfig.groomName}</span>
              <span className="text-rose dark:text-champagne inline-block mx-3 font-normal">&amp;</span>
              <span>{weddingConfig.brideName}</span>
            </h1>

            <div className="w-24 h-[1.5px] bg-rose dark:bg-champagne mx-auto my-4 gsap-hero-sub" />

            <p className="font-sans text-sm sm:text-base tracking-widest text-cream dark:text-darktext-primary uppercase font-semibold mb-8 gsap-hero-sub">
              3 February 2027 · Guntakal
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 gsap-hero-sub">
              <Link
                to="/wedding-details"
                className="w-full sm:w-auto px-7 py-3.5 rounded-md bg-rose dark:bg-champagne text-white dark:text-midnight font-sans text-xs uppercase tracking-widest font-bold shadow-rose-glow dark:shadow-champagne-glow hover:bg-rose-dark dark:hover:bg-champagne-hover active:scale-95 transition-all flex items-center justify-center gap-2 touch-manipulation"
              >
                Wedding Details &amp; Maps <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/our-story"
                className="w-full sm:w-auto px-7 py-3.5 rounded-md border border-white/80 dark:border-champagne/80 hover:bg-white hover:text-plum dark:hover:bg-champagne dark:hover:text-midnight text-white dark:text-darktext-primary font-sans text-xs uppercase tracking-widest font-bold active:scale-95 transition-all flex items-center justify-center gap-2 touch-manipulation"
              >
                Our Story in Christ <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. A JOYFUL INVITATION ================= */}
      <section className="py-20 px-4 bg-cream-warm dark:bg-midnight transition-colors">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-midnight-card border border-rose/30 dark:border-midnight-border shadow-wedding text-center relative overflow-hidden transition-colors"
          >
            <div className="text-rose dark:text-champagne text-3xl font-serif mb-2" aria-hidden="true">
              ✝
            </div>
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
              By the Grace of God
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-plum dark:text-darktext-primary font-medium mb-5">
              A Joyful Invitation
            </h2>

            <div className="w-16 h-[1.5px] bg-rose/40 dark:bg-champagne/40 mx-auto mb-6" />

            <p className="font-serif text-lg sm:text-xl text-plum-muted dark:text-darktext-secondary leading-relaxed mb-8 max-w-xl mx-auto">
              With grateful hearts, we invite you to celebrate with us as{' '}
              <strong className="text-plum dark:text-darktext-primary font-semibold">
                {weddingConfig.groomName} &amp; {weddingConfig.brideName}
              </strong>{' '}
              are united in holy matrimony. Your presence and prayers will mean the world to us as we begin this new chapter in Christ.
            </p>

            {/* Parents Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-rose/20 dark:border-midnight-border text-center">
              <div>
                <small className="block text-xs uppercase tracking-wider text-rose dark:text-champagne font-bold mb-1">
                  Groom’s Parents
                </small>
                <strong className="font-serif text-lg sm:text-xl text-plum dark:text-darktext-primary">
                  N. Jephaniah &amp; N. Uma Devi
                </strong>
              </div>
              <div>
                <small className="block text-xs uppercase tracking-wider text-rose dark:text-champagne font-bold mb-1">
                  Bride’s Parents
                </small>
                <strong className="font-serif text-lg sm:text-xl text-plum dark:text-darktext-primary">
                  S. Deena Shekhar &amp; S. Esther
                </strong>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-rose/20 dark:border-midnight-border text-sm text-plum-muted dark:text-darktext-secondary space-y-1">
              <p className="font-bold text-plum dark:text-darktext-primary font-serif text-lg sm:text-xl">
                Wednesday, 3 February 2027 | 9:00 AM
              </p>
              <p className="font-sans text-sm text-plum-muted dark:text-darktext-secondary">
                Mahendra Kalyana Mandapam, Tilak Nagar, Guntakal
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 3. COUNTDOWN PREVIEW ================= */}
      <section className="py-16 px-4 bg-cream/50 dark:bg-midnight-subtle border-y border-rose/20 dark:border-midnight-border transition-colors">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
            In God’s Perfect Timing
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-plum dark:text-darktext-primary mb-6">
            Counting Down to Sacred Vows
          </h2>

          <Countdown
            targetDate={weddingConfig.events.ceremony.date}
            label="Days Until Holy Matrimony"
          />

          <div className="mt-6">
            <a
              href={weddingConfig.events.ceremony.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-olive hover:bg-olive-dark dark:bg-champagne dark:hover:bg-champagne-hover dark:text-midnight text-white font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-sm"
            >
              <Calendar className="w-4 h-4" /> Add Wedding to Calendar
            </a>
          </div>
        </div>
      </section>

      {/* ================= 4. CELEBRATION HIGHLIGHTS ================= */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
            Celebration Highlights
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-plum dark:text-darktext-primary">
            Wedding Itinerary &amp; Story
          </h2>
          <p className="font-sans text-sm text-plum-muted dark:text-darktext-secondary max-w-md mx-auto mt-2">
            Discover our testimony of faith, upcoming ceremony details, gallery, and scriptures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {gateways.map((g, idx) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Link
                  to={g.to}
                  className="group block p-7 sm:p-9 rounded-2xl bg-white dark:bg-midnight-card border border-rose/25 dark:border-midnight-border shadow-wedding hover:shadow-wedding-lg hover:border-rose dark:hover:border-champagne transition-all relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-rose-light dark:bg-midnight-elevated text-rose dark:text-champagne flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[0.65rem] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-pear-pill dark:bg-midnight-elevated text-olive dark:text-darksage">
                      {g.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-plum dark:text-darktext-primary font-medium group-hover:text-rose dark:group-hover:text-champagne transition-colors mb-2">
                    {g.title}
                  </h3>
                  <p className="font-sans text-sm text-plum-muted dark:text-darktext-secondary leading-relaxed mb-4">
                    {g.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-rose dark:text-champagne group-hover:translate-x-1 transition-transform">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= 5. WHATSAPP INVITATION SHARING ================= */}
      <section className="py-16 px-4 bg-cream-soft dark:bg-midnight-subtle border-t border-rose/20 dark:border-midnight-border text-center transition-colors">
        <div className="max-w-2xl mx-auto">
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
            Share the Blessing
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-plum dark:text-darktext-primary mb-3">
            Invite Family &amp; Friends on WhatsApp
          </h2>
          <p className="font-sans text-sm text-plum-muted dark:text-darktext-secondary max-w-lg mx-auto mb-6">
            Easily forward our digital wedding invitation and Google Maps directions directly to your loved ones.
          </p>
          <button
            onClick={handleWhatsAppShare}
            type="button"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-md bg-[#25D366] hover:bg-[#1EBE5B] text-white font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-md hover:scale-105 active:scale-95"
          >
            <Share2 className="w-4 h-4" /> Share on WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
};
