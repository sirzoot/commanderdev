import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLenis } from '../components/ui/lenis_provider';
import SectionTransition from '../components/ui/smoothsectiontransition';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import FeaturedListings from '../components/home/FeaturedListings';
import Testimonials from '../components/home/Testimonials';
import CTAstrip from '../components/home/CTAstrip';

const Home = () => {
  const containerRef = useRef(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll();

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
        <Hero lenis={lenis} />
      </motion.div>

      <motion.div
        style={{
          y: nextSectionY,
        }}
      >
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
      </motion.div>
    </motion.main>
  );
};

export default Home; 