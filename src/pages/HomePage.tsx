import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  Calendar,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle2,
  Navigation,
  Maximize2,
  Share2
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation as SwiperNav, Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules';
import Lightbox from 'yet-another-react-lightbox';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'yet-another-react-lightbox/styles.css';

import { weddingConfig, getWeddingShareMessage } from '../config/weddingConfig';
import { AmbientCanvas } from '../components/AmbientCanvas';
import { Countdown } from '../components/Countdown';
import { WhatsAppShareStation } from '../components/WhatsAppShareStation';

export const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const { ceremony } = weddingConfig.events;

  const handleWhatsAppShare = () => {
    const shareMessage = getWeddingShareMessage();
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = sectionId === 'home' ? 0 : -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  const gallerySlides = weddingConfig.gallery.map((photo) => ({
    src: photo.src,
    description: photo.alt,
  }));

  return (
    <div className="overflow-hidden">
      {/* =========================================================================
          SECTION 1: HOME (Hero, Joyful Invitation & Countdown)
          ========================================================================= */}
      <section id="home" className="relative scroll-mt-20">
        {/* Cinematic Hero */}
        <div className="relative min-h-[100svh] sm:min-h-screen flex items-center justify-center text-center overflow-hidden px-4 pt-24 pb-16">
          <div className="absolute inset-0 z-0">
            <img
              src={weddingConfig.media.hero}
              alt="Vasu and Mercy Havilah"
              className="w-full h-full object-cover object-[center_20%] animate-kenburns scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-plum-midnight/75 via-plum-dark/45 to-plum-midnight/90 dark:from-midnight/80 dark:via-midnight-subtle/55 dark:to-midnight/95 transition-colors" />
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
                <button
                  type="button"
                  onClick={() => scrollToSection('wedding-details')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-md bg-rose dark:bg-champagne text-plum dark:text-midnight font-sans text-xs uppercase tracking-widest font-bold shadow-rose-glow dark:shadow-champagne-glow hover:bg-rose-dark dark:hover:bg-champagne-hover active:scale-95 transition-all flex items-center justify-center gap-2 touch-manipulation cursor-pointer"
                >
                  Wedding Details &amp; Maps <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('our-story')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-md border border-white/80 dark:border-champagne/80 hover:bg-white hover:text-plum dark:hover:bg-champagne dark:hover:text-midnight text-white dark:text-darktext-primary font-sans text-xs uppercase tracking-widest font-bold active:scale-95 transition-all flex items-center justify-center gap-2 touch-manipulation cursor-pointer"
                >
                  Our Story in Christ <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* A Joyful Invitation Card */}
        <div className="py-20 px-4 bg-cream-warm dark:bg-midnight transition-colors">
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
                    {weddingConfig.groomFather} &amp; {weddingConfig.groomMother}
                  </strong>
                </div>
                <div>
                  <small className="block text-xs uppercase tracking-wider text-rose dark:text-champagne font-bold mb-1">
                    Bride’s Parents
                  </small>
                  <strong className="font-serif text-lg sm:text-xl text-plum dark:text-darktext-primary">
                    {weddingConfig.brideFather} &amp; {weddingConfig.brideMother}
                  </strong>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-rose/20 dark:border-midnight-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-plum-muted dark:text-darktext-secondary space-y-1 text-center sm:text-left">
                  <p className="font-bold text-plum dark:text-darktext-primary font-serif text-lg sm:text-xl">
                    Wednesday, 3 February 2027 | 9:00 AM
                  </p>
                  <p className="font-sans text-sm text-plum-muted dark:text-darktext-secondary">
                    {ceremony.venue}, {ceremony.address}
                  </p>
                </div>
                <button
                  onClick={handleWhatsAppShare}
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                >
                  <Share2 className="w-4 h-4" /> Share Invitation
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OUR STORY (Couple, Parents, Milestones & Engagement)
          ========================================================================= */}
      <section id="our-story" className="scroll-mt-20 border-t border-rose/20 dark:border-midnight-border">
        {/* Section Header */}
        <div className="pt-20 pb-12 px-4 max-w-4xl mx-auto text-center">
          <div className="text-rose dark:text-champagne text-3xl font-serif mb-2" aria-hidden="true">
            ✝
          </div>
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
            Milestones of God’s Grace
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-plum dark:text-darktext-primary font-medium mb-4">
            Our Journey in Faith
          </h2>
          <div className="w-16 h-[1.5px] bg-rose/40 dark:bg-champagne/40 mx-auto mb-4" />
          <p className="font-serif italic text-lg text-plum-muted dark:text-darktext-secondary max-w-xl mx-auto leading-relaxed">
            United in faith, surrounded by family love, and walking together in God’s path.
          </p>
        </div>

        {/* The Couple Portraits */}
        <div className="pb-16 px-4 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {/* Groom Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-midnight-card border border-rose/25 dark:border-midnight-border shadow-wedding text-center transition-colors"
            >
              <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden border-2 border-rose/40 dark:border-champagne/40 shadow-md mb-5">
                <img
                  src={weddingConfig.media.groom}
                  alt="Portrait of the groom"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs uppercase tracking-widest text-rose dark:text-champagne font-bold mb-1">
                The Groom
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-plum dark:text-darktext-primary mb-2">
                {weddingConfig.groomName}
              </h3>
              <div className="text-xs text-plum-muted dark:text-darktext-secondary font-medium">
                <span className="block text-plum-soft dark:text-darktext-muted text-[0.68rem] uppercase tracking-wider mb-0.5">
                  Beloved son of
                </span>
                <p className="text-sm font-serif text-plum dark:text-darktext-primary">
                  {weddingConfig.groomFather} &amp; {weddingConfig.groomMother}
                </p>
              </div>
            </motion.div>

            {/* Bride Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-midnight-card border border-rose/25 dark:border-midnight-border shadow-wedding text-center transition-colors"
            >
              <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden border-2 border-rose/40 dark:border-champagne/40 shadow-md mb-5">
                <img
                  src={weddingConfig.media.bride}
                  alt="Portrait of the bride"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs uppercase tracking-widest text-rose dark:text-champagne font-bold mb-1">
                The Bride
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-plum dark:text-darktext-primary mb-2">
                {weddingConfig.brideName}
              </h3>
              <div className="text-xs text-plum-muted dark:text-darktext-secondary font-medium">
                <span className="block text-plum-soft dark:text-darktext-muted text-[0.68rem] uppercase tracking-wider mb-0.5">
                  Beloved daughter of
                </span>
                <p className="text-sm font-serif text-plum dark:text-darktext-primary">
                  {weddingConfig.brideFather} &amp; {weddingConfig.brideMother}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Their Families Portraits */}
        <div className="py-16 px-4 bg-cream/40 dark:bg-midnight-subtle border-y border-rose/20 dark:border-midnight-border transition-colors">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
                With Love &amp; Blessings
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl text-plum dark:text-darktext-primary font-medium">
                Their Beloved Families
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-white dark:bg-midnight-card border border-rose/25 dark:border-midnight-border shadow-wedding text-center"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-rose/20 dark:border-midnight-border">
                  <img
                    src={weddingConfig.media.groomParents}
                    alt="Groom's family"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs uppercase tracking-widest text-rose dark:text-champagne font-bold mb-1">
                  Groom's Family
                </p>
                <h4 className="font-serif text-xl text-plum dark:text-darktext-primary font-medium">
                  {weddingConfig.groomFather} &amp; {weddingConfig.groomMother}
                </h4>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-midnight-card border border-rose/25 dark:border-midnight-border shadow-wedding text-center"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-rose/20 dark:border-midnight-border">
                  <img
                    src={weddingConfig.media.brideParents}
                    alt="Bride's family"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs uppercase tracking-widest text-rose dark:text-champagne font-bold mb-1">
                  Bride's Family
                </p>
                <h4 className="font-serif text-xl text-plum dark:text-darktext-primary font-medium">
                  {weddingConfig.brideFather} &amp; {weddingConfig.brideMother}
                </h4>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Faith Journey - Minimal Milestones */}
        <div className="py-12 sm:py-16 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-1.5">
              Timeline of Faith
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-plum dark:text-darktext-primary font-medium">
              Milestones Along the Way
            </h3>
            <div className="w-12 h-[1px] bg-rose/40 dark:bg-champagne/40 mx-auto mt-2.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weddingConfig.milestones.map((milestone, idx) => {
              const isCompleted = milestone.status === 'completed';
              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-5 rounded-2xl bg-white dark:bg-midnight-card border border-rose/20 dark:border-midnight-border shadow-xs hover:border-rose/40 dark:hover:border-champagne/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`text-[0.62rem] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-pear-pill dark:bg-midnight-elevated text-olive dark:text-darksage'
                            : 'bg-rose-light dark:bg-midnight-elevated text-rose-deep dark:text-champagne'
                        }`}
                      >
                        {milestone.badge}
                      </span>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-olive dark:text-darksage shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-rose dark:text-champagne shrink-0" />
                      )}
                    </div>

                    <h4 className="font-serif text-lg sm:text-xl text-plum dark:text-darktext-primary font-medium mb-1.5">
                      {milestone.title}
                    </h4>

                    <p className="font-sans text-xs sm:text-sm text-plum-muted dark:text-darktext-secondary leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WEDDING DETAILS (Holy Matrimony Service, Video & Contacts)
          ========================================================================= */}
      <section id="wedding-details" className="scroll-mt-20 border-t border-rose/20 dark:border-midnight-border">
        {/* Section Header */}
        <div className="pt-20 pb-12 px-4 max-w-4xl mx-auto text-center">
          <div className="text-rose dark:text-champagne text-3xl font-serif mb-2" aria-hidden="true">
            ✝
          </div>
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
            Save the Date
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-plum dark:text-darktext-primary font-medium mb-4">
            Holy Matrimony Service &amp; Venue
          </h2>
          <div className="w-16 h-[1.5px] bg-rose/40 dark:bg-champagne/40 mx-auto mb-4" />
          <p className="font-sans text-base text-plum-muted dark:text-darktext-secondary max-w-xl mx-auto leading-relaxed">
            A sacred covenant in Christ. We warmly invite you to celebrate our Holy Matrimony.
          </p>
        </div>

        {/* Upcoming Events Stack */}
        <div className="pb-20 px-4 max-w-5xl mx-auto space-y-12">
          {/* MINISTER OF THE CEREMONY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-7 sm:p-9 rounded-3xl bg-cream-soft/60 dark:bg-midnight-card border border-rose/30 dark:border-midnight-border shadow-wedding text-center max-w-2xl mx-auto transition-colors"
          >
            <div className="text-rose dark:text-champagne text-2xl font-serif mb-2" aria-hidden="true">
              ✝
            </div>
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
              {weddingConfig.minister.heading}
            </p>
            <h4 className="font-serif text-2xl sm:text-3xl font-medium text-plum dark:text-darktext-primary mb-2">
              {weddingConfig.minister.name}
            </h4>
            <div className="w-12 h-[1px] bg-rose/40 dark:bg-champagne/40 mx-auto my-3" />
            <p className="font-serif italic text-sm sm:text-base text-plum-muted dark:text-darktext-secondary">
              {weddingConfig.minister.role}
            </p>
          </motion.div>

          {/* EVENT 1: WEDDING CEREMONY */}
          <motion.article
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-midnight-card border border-rose/30 dark:border-midnight-border shadow-wedding relative overflow-hidden transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose/20 dark:border-midnight-border pb-6 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-olive dark:text-darksage font-bold">
                  {ceremony.eyebrow}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-plum dark:text-darktext-primary font-medium mt-1">
                  {ceremony.title}
                </h3>
              </div>
              <div className="text-left md:text-right">
                <p className="font-serif text-2xl text-rose dark:text-champagne font-semibold">{ceremony.displayDate}</p>
                <p className="text-sm text-plum-muted dark:text-darktext-secondary font-medium">{ceremony.displayTime}</p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-rose dark:text-champagne mt-1 shrink-0" />
                <div>
                  <h4 className="font-serif text-xl text-plum dark:text-darktext-primary font-semibold">
                    {ceremony.venue}
                  </h4>
                  <p className="text-sm text-plum-muted dark:text-darktext-secondary">
                    {ceremony.address}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-cream/50 dark:bg-midnight-elevated/60 border border-rose/20 dark:border-midnight-border">
                <Countdown targetDate={ceremony.date} label="Countdown to Holy Matrimony" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
                <a
                  href={ceremony.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-olive hover:bg-olive-dark dark:bg-midnight-elevated dark:border dark:border-midnight-border dark:hover:border-champagne dark:hover:text-champagne text-white dark:text-darktext-primary font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-sm"
                >
                  <Navigation className="w-4 h-4" /> Google Maps ↗
                </a>
                <a
                  href={ceremony.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-rose hover:bg-rose-dark dark:bg-champagne dark:hover:bg-champagne-hover text-plum dark:text-midnight font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-rose-glow dark:shadow-champagne-glow"
                >
                  <Calendar className="w-4 h-4" /> Add to Calendar 📅
                </a>
              </div>
            </div>
          </motion.article>
        </div>

        {/* Minimal WhatsApp Sharing Button Above Pre-Wedding Film */}
        <WhatsAppShareStation className="pt-2 pb-14" />

        {/* Pre-Wedding Film Player */}
        <div className="py-20 px-4 bg-cream/40 dark:bg-midnight-subtle border-t border-rose/20 dark:border-midnight-border text-center transition-colors">
          <div className="max-w-4xl mx-auto">
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
              A Cinematic Glimpse
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl text-plum dark:text-darktext-primary font-medium mb-3">
              Our Pre-Wedding Film
            </h3>
            <div className="w-16 h-[1px] bg-rose/40 dark:bg-champagne/40 mx-auto mb-4" />
            <p className="font-sans text-sm text-plum-muted dark:text-darktext-secondary max-w-md mx-auto mb-8">
              Capturing our smiles, prayers, and excitement as we prepare for this sacred union.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden border border-rose/30 dark:border-midnight-border shadow-wedding-lg bg-black"
            >
              <video
                controls
                playsInline
                preload="metadata"
                poster={weddingConfig.media.hero}
                className="w-full h-auto aspect-video"
              >
                <source src={weddingConfig.media.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: GALLERY (Carousel, Editorial Grid & Fullscreen Lightbox)
          ========================================================================= */}
      <section id="gallery" className="scroll-mt-20 border-t border-rose/20 dark:border-midnight-border">
        {/* Section Header */}
        <div className="pt-20 pb-12 px-4 max-w-4xl mx-auto text-center">
          <div className="text-rose dark:text-champagne text-3xl font-serif mb-2" aria-hidden="true">
            ✝
          </div>
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
            Cherished Memories
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-plum dark:text-darktext-primary font-medium mb-4">
            Moments of Joy &amp; Grace
          </h2>
          <div className="w-16 h-[1.5px] bg-rose/40 dark:bg-champagne/40 mx-auto mb-4" />
          <p className="font-sans text-base text-plum-muted dark:text-darktext-secondary max-w-md mx-auto">
            Swipe to browse our favorite portraits or tap to enlarge in fullscreen.
          </p>
        </div>

        {/* Featured Swiper Carousel */}
        <div className="pb-16 px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden border border-rose/30 dark:border-midnight-border shadow-wedding-lg bg-white dark:bg-midnight-card p-3 sm:p-4 transition-colors"
          >
            <Swiper
              modules={[SwiperNav, SwiperPagination, SwiperAutoplay]}
              spaceBetween={16}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              className="rounded-2xl overflow-hidden"
            >
              {weddingConfig.gallery.map((photo, index) => (
                <SwiperSlide key={index}>
                  <div
                    onClick={() => openLightbox(index)}
                    className="relative aspect-[16/10] w-full cursor-pointer group overflow-hidden"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum-midnight/85 dark:from-midnight/90 via-transparent to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-6 justify-end text-white dark:text-darktext-primary">
                      <span className="p-2 rounded-full bg-rose/80 dark:bg-champagne dark:text-midnight backdrop-blur-sm shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>

        {/* Editorial Photo Grid */}
        <div className="pb-24 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
              The Complete Collection
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-plum dark:text-darktext-primary font-medium">
              All Moments of Love
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {weddingConfig.gallery.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                onClick={() => openLightbox(index)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-midnight-card border border-rose/25 dark:border-midnight-border shadow-wedding hover:shadow-wedding-lg hover:border-rose dark:hover:border-champagne transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-plum-midnight/30 dark:bg-midnight/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <span className="p-3 rounded-full bg-rose/90 dark:bg-champagne dark:text-midnight backdrop-blur-sm shadow-md">
                      <Maximize2 className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fullscreen Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={photoIndex}
          slides={gallerySlides}
        />
      </section>
    </div>
  );
};
