import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Lightbox from 'yet-another-react-lightbox';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'yet-another-react-lightbox/styles.css';

import { Maximize2 } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { PageHero } from '../components/PageHero';

export const GalleryPage: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  const slides = weddingConfig.gallery.map((photo) => ({
    src: photo.src,
    title: photo.caption,
    description: photo.alt,
  }));

  return (
    <div>
      <PageHero
        bgImage={weddingConfig.gallery[0].src}
        eyebrow="Cherished Memories"
        title="Moments of Joy & Grace"
        description="A visual journey of faith, laughter, and prayer leading up to our holy covenant."
      />

      {/* ================= 1. FEATURED SWIPER CAROUSEL ================= */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
            Interactive Showcase
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-plum dark:text-darktext-primary font-medium">
            Pre-Wedding Highlights
          </h2>
          <div className="w-16 h-[1px] bg-rose/40 dark:bg-champagne/40 mx-auto my-3" />
          <p className="font-sans text-sm text-plum-muted dark:text-darktext-secondary max-w-md mx-auto">
            Swipe to browse our favorite portraits or tap to enlarge in fullscreen.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden border border-rose/30 dark:border-midnight-border shadow-wedding-lg bg-white dark:bg-midnight-card p-3 sm:p-4 transition-colors"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-midnight/85 dark:from-midnight/90 via-transparent to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-6 justify-between text-white dark:text-darktext-primary">
                    <p className="font-serif italic text-lg sm:text-xl">{photo.caption}</p>
                    <span className="p-2 rounded-full bg-rose/80 dark:bg-champagne dark:text-midnight backdrop-blur-sm shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      {/* ================= 2. EDITORIAL PHOTO GRID ================= */}
      <section className="pb-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-olive dark:text-darksage font-bold mb-2">
            The Complete Collection
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-plum dark:text-darktext-primary">
            All Moments of Love
          </h2>
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
              <div className="p-4 text-center">
                <p className="font-serif italic text-base text-plum dark:text-darktext-primary group-hover:text-rose dark:group-hover:text-champagne transition-colors">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= 3. FULLSCREEN LIGHTBOX ================= */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={photoIndex}
        slides={slides}
      />
    </div>
  );
};
