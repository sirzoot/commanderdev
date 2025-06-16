import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import FeaturedListings from '../components/home/FeaturedListings';
import Testimonials from '../components/home/Testimonials';
import CTAstrip from '../components/home/CTAstrip';

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Enhanced section transitions
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const heroRotateX = useTransform(scrollYProgress, [0, 0.5], [0, 5]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.8, 0]);
  const nextSectionY = useTransform(scrollYProgress, [0.3, 1], [100, 0]);

  return (
    <motion.main
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <motion.div
        style={{
          scale: heroScale,
          rotateX: heroRotateX,
          opacity: heroOpacity,
          transformPerspective: 1000,
        }}
      >
        <Hero />
      </motion.div>

      <motion.div
        style={{
          y: nextSectionY,
        }}
      >
        <FeaturedListings />
        <Stats />
        <Testimonials />
        <CTAstrip />
      </motion.div>
    </motion.main>
  );
};

export default Home; 