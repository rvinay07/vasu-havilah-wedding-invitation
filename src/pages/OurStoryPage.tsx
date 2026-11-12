import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, CheckCircle2, Clock } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { PageHero } from '../components/PageHero';

export const OurStoryPage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <PageHero
        bgImage={weddingConfig.media.hero}
        eyebrow="Guided by Faith"
        title="Our Love Story & Journey"
        description="A testimony of prayer, devotion, and unconditional love brought together through God's holy grace."
      />

      {/* ================= 1. THE COUPLE ================= */}
      <section className="py-14 sm:py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
            Two Hearts, One Covenant
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-plum dark:text-darktext-primary font-medium">
            The Couple
          </h2>
          <div className="w-16 h-[1px] bg-rose/40 dark:bg-champagne/40 mx-auto my-3" />
          <p className="font-sans text-sm text-plum-muted dark:text-darktext-secondary max-w-md mx-auto">
            United in faith, surrounded by family love, and walking together in God's path.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-6 sm:gap-8 md:gap-6">
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-midnight-card border border-rose/25 dark:border-midnight-border shadow-wedding text-center transition-colors"
          >
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-2 border-rose/40 dark:border-champagne/40 shadow-md mb-4 sm:mb-5">
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

          {/* Heart Flourish */}
          <div className="hidden md:flex flex-col items-center justify-center text-rose dark:text-champagne text-3xl font-serif">
            <Heart className="w-8 h-8 fill-rose dark:fill-champagne text-rose dark:text-champagne" />
          </div>

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-midnight-card border border-rose/25 dark:border-midnight-border shadow-wedding text-center transition-colors"
          >
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-2 border-rose/40 dark:border-champagne/40 shadow-md mb-4 sm:mb-5">
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
      </section>

      {/* ================= 2. THEIR FAMILIES ================= */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
              With Love &amp; Blessings
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-plum dark:text-darktext-primary font-medium">
              Their Families
            </h2>
            <div className="w-16 h-[1px] bg-rose/40 dark:bg-champagne/40 mx-auto my-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Groom's Family */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl bg-white dark:bg-midnight-card border border-rose/25 dark:border-midnight-border shadow-wedding text-center transition-colors"
            >
              <div className="aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border border-rose/20 dark:border-midnight-border">
                <img
                  src={weddingConfig.media.groomParents}
                  alt="Groom's family"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs uppercase tracking-widest text-rose dark:text-champagne font-bold mb-1">
                Groom's Family
              </p>
              <h3 className="font-serif text-xl text-plum dark:text-darktext-primary font-medium">
                {weddingConfig.groomFather} &amp; {weddingConfig.groomMother}
              </h3>
            </motion.div>

            {/* Bride's Family */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl bg-white dark:bg-midnight-card border border-rose/25 dark:border-midnight-border shadow-wedding text-center transition-colors"
            >
              <div className="aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border border-rose/20 dark:border-midnight-border">
                <img
                  src={weddingConfig.media.brideParents}
                  alt="Bride's family"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs uppercase tracking-widest text-rose dark:text-champagne font-bold mb-1">
                Bride's Family
              </p>
              <h3 className="font-serif text-xl text-plum dark:text-darktext-primary font-medium">
                {weddingConfig.brideFather} &amp; {weddingConfig.brideMother}
              </h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 3. FAITH JOURNEY TIMELINE ================= */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
            Milestones of God’s Grace
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-plum dark:text-darktext-primary font-medium">
            Our Journey Together
          </h2>
          <div className="w-16 h-[1px] bg-rose/40 dark:bg-champagne/40 mx-auto my-3" />
          <p className="font-sans text-sm text-plum-muted dark:text-darktext-secondary max-w-md mx-auto">
            Reflecting on God's faithful guidance from our very first steps to our holy covenant.
          </p>
        </div>

        <div className="relative border-l-2 border-rose/30 dark:border-midnight-border ml-7 sm:ml-10 pl-6 sm:pl-10 space-y-10">
          {weddingConfig.milestones.map((milestone, idx) => {
            const isCompleted = milestone.status === 'completed';
            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline Node Icon */}
                <div
                  className={`absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    isCompleted
                      ? 'bg-olive dark:bg-darksage text-white dark:text-midnight border-olive dark:border-darksage'
                      : 'bg-rose dark:bg-champagne text-white dark:text-midnight border-rose dark:border-champagne'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Clock className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Milestone Card */}
                <div
                  className={`p-6 sm:p-7 rounded-2xl bg-white dark:bg-midnight-card border shadow-wedding transition-colors ${
                    isCompleted
                      ? 'border-pear/60 dark:border-midnight-border'
                      : 'border-rose/30 dark:border-midnight-border'
                  }`}
                >
                  <span
                    className={`inline-block text-[0.62rem] uppercase tracking-widest font-bold px-3 py-1 rounded-full mb-3 ${
                      isCompleted
                        ? 'bg-pear-pill dark:bg-midnight-elevated text-olive dark:text-darksage'
                        : 'bg-rose-light dark:bg-midnight-elevated text-rose-deep dark:text-champagne'
                    }`}
                  >
                    {milestone.badge}
                  </span>

                  <h3 className="font-serif text-2xl text-plum dark:text-darktext-primary font-medium mb-1">
                    {milestone.title}
                  </h3>

                  <p className="font-serif italic text-sm text-rose dark:text-champagne mb-3">
                    {milestone.scripture}
                  </p>

                  <p className="font-sans text-sm text-plum-muted dark:text-darktext-secondary leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA to Wedding Details */}
        <div className="text-center mt-16">
          <Link
            to="/wedding-details"
            className="inline-flex items-center justify-center gap-2 max-w-full px-5 sm:px-8 py-3.5 rounded-md bg-rose dark:bg-champagne hover:bg-rose-dark dark:hover:bg-champagne-hover text-white dark:text-midnight font-sans text-xs uppercase tracking-wider sm:tracking-widest font-bold shadow-rose-glow dark:shadow-champagne-glow transition-all text-center"
          >
            <span>View Wedding Ceremony &amp; Venues</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>
      </section>
    </div>
  );
};
