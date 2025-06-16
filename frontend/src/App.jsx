import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import LenisProvider, { useLenis } from './components/ui/lenis_provider';
import CursorFollower from './components/ui/cursor_follower';
import SectionTransition from './components/ui/smoothsectiontransition';
import Hero from './components/home/Hero';
import FeaturedListings from './components/home/FeaturedListings';
import Stats from './components/home/Stats';
import Testimonials from './components/home/Testimonials';
import CTAstrip from './components/home/CTAstrip';
import Navbar from './components/layout/Navbar';
import './App.css';

const AppContent = () => {
  const lenis = useLenis();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (lenis) {
      // Set up cursor behavior
      if (typeof window !== 'undefined' && window.innerWidth > 768) {
        document.body.style.cursor = 'none';
      }
      
      // Mark as ready immediately since Lenis is initialized
      setIsReady(true);
      
      // Cleanup
      return () => {
        if (typeof window !== 'undefined' && window.innerWidth > 768) {
          document.body.style.cursor = 'auto';
        }
      };
    }
  }, [lenis]);

  if (!isReady || !lenis) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Custom Cursor (Desktop Only) */}
      {typeof window !== 'undefined' && window.innerWidth > 768 && <CursorFollower />}
      
      {/* Hero Section - Full height, no transition wrapper */}
      <Hero lenis={lenis} />
      
      {/* Featured Listings - Tight spacing from hero */}
      <SectionTransition 
        backgroundColor="bg-white"
        nextBackgroundColor="bg-white"
        spacing="tight"
        className="pt-0"
      >
        <FeaturedListings />
      </SectionTransition>
      
      {/* Stats Section - Clean white background */}
      <SectionTransition 
        backgroundColor="bg-white"
        nextBackgroundColor="bg-gray-50"
        spacing="normal"
      >
        <Stats />
      </SectionTransition>
      
      {/* Testimonials Section - Subtle background change */}
      <SectionTransition 
        backgroundColor="bg-gray-50"
        nextBackgroundColor="bg-gray-900"
        spacing="normal"
      >
        <Testimonials />
      </SectionTransition>
      
      {/* CTA Section - Dark background */}
      <SectionTransition 
        backgroundColor="bg-gray-900"
        spacing="normal"
      >
        <CTAstrip />
      </SectionTransition>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-white"
          >
            <Navbar />
            <AppContent />
          </motion.div>
        </AnimatePresence>
      </LenisProvider>
    </BrowserRouter>
  );
}

export default App;

