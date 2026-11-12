import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { FloatingControls } from './components/FloatingControls';

import { HomePage } from './pages/HomePage';
import { OurStoryPage } from './pages/OurStoryPage';
import { WeddingDetailsPage } from './pages/WeddingDetailsPage';
import { GalleryPage } from './pages/GalleryPage';
import { BlessingsPage } from './pages/BlessingsPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/index.html" element={<HomePage />} />
          <Route path="/invite" element={<HomePage />} />
          <Route path="/invitation" element={<HomePage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/our-story.html" element={<OurStoryPage />} />
          <Route path="/wedding-details" element={<WeddingDetailsPage />} />
          <Route path="/wedding-details.html" element={<WeddingDetailsPage />} />
          <Route path="/events" element={<WeddingDetailsPage />} />
          <Route path="/events.html" element={<WeddingDetailsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/gallery.html" element={<GalleryPage />} />
          <Route path="/blessings" element={<BlessingsPage />} />
          <Route path="/blessings.html" element={<BlessingsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const MainLayout: React.FC = () => {
  return (
    <>
      <Preloader />
      <Header />
      <main className="min-h-screen">
        <AnimatedRoutes />
      </main>
      <Footer />
      <FloatingControls />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <MainLayout />
    </HashRouter>
  );
};

export default App;

