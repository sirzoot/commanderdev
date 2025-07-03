import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LenisProvider, { useLenis } from './components/ui/lenis_provider';
import CursorFollower from './components/ui/cursor_follower';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Listings from './pages/Listings';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

const AppContent = () => {
  const lenis = useLenis();
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();

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

  // Scroll to top on route change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, lenis]);

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
      
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <div className="min-h-screen bg-white">
          <Navbar />
          <AppContent />
        </div>
      </LenisProvider>
    </BrowserRouter>
  );
}

export default App;

