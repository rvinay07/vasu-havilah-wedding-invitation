import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Share2 } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { PageHero } from '../components/PageHero';

export const BlessingsPage: React.FC = () => {
  const handleWhatsAppShare = () => {
    const shareMessage = [
      `✝ Wedding Invitation: ${weddingConfig.groomName} & ${weddingConfig.brideName}`,
      ``,
      `"Therefore what God has joined together, let no one separate." — Matthew 19:6`,
      ``,
      `With praise to God, we joyfully invite you to celebrate our Holy Matrimony on 3 February 2027 at ${weddingConfig.events.ceremony.venue}, ${weddingConfig.events.ceremony.address}.`,
      ``,
      `Reception: 4 February 2027 at ${weddingConfig.events.reception.venue}, ${weddingConfig.events.reception.address}.`,
      ``,
      `View digital invitation, timings & maps:`,
      weddingConfig.hostingUrl
    ].join('\n');

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener');
  };

  return (
    <div className="overflow-hidden">
      <PageHero
        bgImage={weddingConfig.media.hero}
        eyebrow="In God's Holy Word"
        title="Scriptures & Blessings"
        description="Anchoring our marriage upon God's enduring promises, everlasting love, and sovereign grace."
      />

      {/* ================= 1. CORE SCRIPTURE VERSE ================= */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 sm:p-14 rounded-3xl bg-white dark:bg-midnight-card border border-rose/30 dark:border-midnight-border shadow-wedding relative overflow-hidden transition-colors"
        >
          <div className="text-rose dark:text-champagne text-3xl font-serif mb-3" aria-hidden="true">
            ✝
          </div>
          <div className="w-16 h-[1.5px] bg-rose/50 dark:bg-champagne/50 mx-auto mb-6" />

          <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-plum dark:text-darktext-primary leading-relaxed mb-4">
            “{weddingConfig.coreVerse.quote}”
          </blockquote>

          <cite className="font-sans text-sm tracking-widest text-rose dark:text-champagne uppercase font-bold not-italic">
            — {weddingConfig.coreVerse.reference}
          </cite>
        </motion.div>
      </section>

      {/* ================= 2. SCRIPTURES ON CHRISTIAN LOVE ================= */}
      <section className="py-16 px-4 bg-cream/40 dark:bg-midnight-subtle border-y border-rose/20 dark:border-midnight-border transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
              Biblical Foundations
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-plum dark:text-darktext-primary font-medium">
              Verses on Christian Marriage
            </h2>
            <div className="w-16 h-[1px] bg-rose/40 dark:bg-champagne/40 mx-auto my-3" />
            <p className="font-sans text-sm text-plum-muted dark:text-darktext-secondary max-w-md mx-auto">
              Sacred scripture illuminating selflessness, patient devotion, and holy covenant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weddingConfig.scriptures.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="p-7 rounded-2xl bg-white dark:bg-midnight-card border border-rose/25 dark:border-midnight-border shadow-wedding flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="w-9 h-9 rounded-full bg-rose-light dark:bg-midnight-elevated text-rose dark:text-champagne flex items-center justify-center mb-4">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <blockquote className="font-serif italic text-base sm:text-lg text-plum dark:text-darktext-primary leading-relaxed mb-6">
                    “{item.quote}”
                  </blockquote>
                </div>
                <cite className="block text-xs uppercase tracking-widest text-rose dark:text-champagne font-bold not-italic pt-4 border-t border-rose/15 dark:border-midnight-border">
                  {item.reference}
                </cite>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. DEVOTIONAL PRAYER FOR THE COUPLE ================= */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-midnight-card border border-rose/30 dark:border-midnight-border shadow-wedding relative transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-rose-light dark:bg-midnight-elevated text-rose dark:text-champagne flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 fill-rose dark:fill-champagne text-rose dark:text-champagne" />
          </div>
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
            A Prayer for Vasu &amp; Mercy Havilah
          </p>
          <h2 className="font-serif text-3xl text-plum dark:text-darktext-primary font-medium mb-4">
            Walking in His Sovereign Grace
          </h2>
          <div className="w-16 h-[1px] bg-rose/40 dark:bg-champagne/40 mx-auto mb-6" />

          <p className="font-serif italic text-lg sm:text-xl text-plum-muted dark:text-darktext-secondary leading-relaxed max-w-2xl mx-auto">
            “Heavenly Father, we thank You for joining Vasu and Mercy Havilah in holy matrimony.
            May their home be filled with Your peace, their hearts with Your unconditional love,
            and their days with joyful praise. Grant them patience, wisdom, and steadfast faithfulness,
            that through their marriage Your light may shine brightly to all. In the precious name of Jesus Christ, Amen.”
          </p>
        </motion.div>
      </section>

      {/* ================= 4. WHATSAPP SHARING ================= */}
      <section className="py-16 px-4 bg-cream-soft dark:bg-midnight-subtle border-t border-rose/20 dark:border-midnight-border text-center transition-colors">
        <div className="max-w-2xl mx-auto">
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
            Share the Blessing
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-plum dark:text-darktext-primary mb-3">
            Share This Invitation with Family &amp; Friends
          </h2>
          <p className="font-sans text-sm text-plum-muted dark:text-darktext-secondary max-w-lg mx-auto mb-6">
            Forward our wedding invitation card and celebration details on WhatsApp.
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
