import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Navigation, Clock } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { PageHero } from '../components/PageHero';
import { Countdown } from '../components/Countdown';
import { WhatsAppShareStation } from '../components/WhatsAppShareStation';

export const WeddingDetailsPage: React.FC = () => {
  const { ceremony } = weddingConfig.events;

  return (
    <div className="overflow-hidden">
      <PageHero
        bgImage={weddingConfig.media.hero}
        eyebrow="Save the Date"
        title="Holy Matrimony Service & Venue"
        description="A sacred covenant in Christ. We warmly invite you to celebrate our Holy Matrimony."
      />

      {/* ================= UPCOMING EVENTS STACK ================= */}
      <section className="py-16 sm:py-20 px-4 max-w-5xl mx-auto space-y-12">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
            {/* Venue & Countdown */}
            <div className="space-y-6">
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

              {/* Solemnization of Marriage & Marriage Officiants */}
              <div className="p-5 sm:p-6 rounded-2xl bg-cream-soft/80 dark:bg-midnight-elevated/40 border border-rose/20 dark:border-midnight-border">
                <h4 className="text-xs uppercase tracking-[0.22em] text-olive dark:text-champagne font-bold mb-4 text-center">
                  ✝ SOLEMNIZATION OF MARRIAGE ✝
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Officiant 1 */}
                  <div className="p-4 sm:p-5 rounded-xl bg-white/80 dark:bg-midnight-card/80 border border-rose/15 dark:border-midnight-border text-center flex flex-col justify-between">
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-rose dark:text-champagne font-bold mb-1.5">
                        MARRIAGE OFFICIANT
                      </p>
                      <h5 className="font-serif text-lg sm:text-xl font-semibold text-plum dark:text-darktext-primary mb-1">
                        {weddingConfig.minister.name}
                      </h5>
                    </div>
                    <div>
                      <div className="w-10 h-[1px] bg-rose/40 dark:bg-champagne/40 mx-auto my-2.5" />
                      <p className="font-serif italic text-xs sm:text-sm text-plum-muted dark:text-darktext-secondary">
                        {weddingConfig.minister.church || weddingConfig.minister.role}
                      </p>
                    </div>
                  </div>

                  {/* Officiant 2 */}
                  <div className="p-4 sm:p-5 rounded-xl bg-white/80 dark:bg-midnight-card/80 border border-rose/15 dark:border-midnight-border text-center flex flex-col justify-between">
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-rose dark:text-champagne font-bold mb-1.5">
                        MARRIAGE OFFICIANT
                      </p>
                      <h5 className="font-serif text-lg sm:text-xl font-semibold text-plum dark:text-darktext-primary mb-1">
                        {weddingConfig.minister.officiantName}
                      </h5>
                    </div>
                    <div>
                      <div className="w-10 h-[1px] bg-rose/40 dark:bg-champagne/40 mx-auto my-2.5" />
                      <p className="font-serif italic text-xs sm:text-sm text-plum-muted dark:text-darktext-secondary">
                        {weddingConfig.minister.officiantChurch}
                      </p>
                    </div>
                  </div>
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
                  className="w-full sm:w-auto sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-rose hover:bg-rose-dark dark:bg-champagne dark:hover:bg-champagne-hover text-white dark:text-midnight font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-rose-glow dark:shadow-champagne-glow"
                >
                  <Calendar className="w-4 h-4" /> Add to Calendar 📅
                </a>
              </div>
            </div>

            {/* Ceremony Schedule */}
            <div className="p-6 rounded-2xl bg-cream-soft dark:bg-midnight-elevated/40 border border-rose/20 dark:border-midnight-border">
              <h4 className="font-serif text-xl text-plum dark:text-darktext-primary font-medium mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose dark:text-champagne" /> Order of Holy Matrimony
              </h4>
              <div className="space-y-3.5 border-l-2 border-rose/30 dark:border-midnight-border pl-4 ml-1">
                {ceremony.schedule.map((item, idx) => (
                  <div key={idx} className="relative">
                    <span className="text-xs font-bold text-rose dark:text-champagne block">
                      {item.time}
                    </span>
                    <span className="text-sm text-plum-muted dark:text-darktext-secondary">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      </section>

      {/* ================= 3. PRE-WEDDING FILM SECTION ================= */}
      <section className="py-20 px-4 bg-cream/40 dark:bg-midnight-subtle border-t border-rose/20 dark:border-midnight-border text-center transition-colors">
        <div className="max-w-4xl mx-auto">
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
            A Cinematic Glimpse
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-plum dark:text-darktext-primary font-medium mb-3">
            Our Pre-Wedding Film
          </h2>
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
      </section>

      {/* WhatsApp Sharing Station Above Footer */}
      <WhatsAppShareStation className="border-t border-rose/20 dark:border-midnight-border bg-cream-soft/40 dark:bg-midnight-subtle" />
    </div>
  );
};
