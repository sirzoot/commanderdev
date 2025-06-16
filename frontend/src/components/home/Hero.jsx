import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              duration: 0.4,
              ease: [0.18, 0.71, 0.11, 1]
            }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-light">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [nextSlide, setNextSlide] = useState(1);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Create spring animation for smoother transitions
  const y = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll progress to y position with a sharper fade
  const yTransform = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  // Update spring value when scroll changes
  useEffect(() => {
    const unsubscribe = yTransform.onChange((latest) => {
      y.set(latest);
    });
    return () => unsubscribe();
  }, [yTransform, y]);

  const slides = [
    {
      image: '/images/truview hero/11-web-or-mls-ARC04382.jpg',
      title: 'Your Home, Showcased to Perfection',
      subtitle: 'Experience the Difference'
    },
    {
      image: '/images/truview hero/26-web-or-mls-ARC04455.jpg',
      title: 'Your Home, Showcased to Perfection',
      subtitle: 'Where Dreams Become Reality'
    },
    {
      image: '/images/truview hero/15-web-or-mls-ARC04414.jpg',
      title: 'Your Home, Showcased to Perfection',
      subtitle: 'Excellence in Real Estate'
    },
    {
      image: '/images/truview hero/23-web-or-mls-ARC04439.jpg',
      title: 'Your Home, Showcased to Perfection',
      subtitle: 'Crafting Your Perfect Space'
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setNextSlide((currentSlide + 1) % slides.length);
        setTimeout(() => {
          setCurrentSlide((currentSlide + 1) % slides.length);
        }, 1000);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide, slides.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBuyClick = () => {
    const listingsSection = document.getElementById('featured-listings');
    if (listingsSection) {
      listingsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSellSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setIsSellModalOpen(false);
  };

  const handleEstimateSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setIsEstimateModalOpen(false);
  };

  const MagneticButton = ({ children, onClick, delay }) => {
    const buttonRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + 
        Math.pow(e.clientY - centerY, 2)
      );
      
      if (distance < 300) {
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const force = (300 - distance) / 300;
        x.set(Math.cos(angle) * force * 30);
        y.set(Math.sin(angle) * force * 30);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.button
        ref={buttonRef}
        style={{ x, y }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="px-12 py-4 bg-white text-charcoal font-light tracking-wider uppercase text-sm hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        {children}
      </motion.button>
    );
  };

  return (
    <motion.div 
      ref={heroRef}
      style={{ 
        y,
        opacity,
        scale
      }}
      className="hero-section relative min-h-[100vh] w-full overflow-hidden"
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {/* Current Slide */}
        <motion.div
          key={`current-${currentSlide}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/10 to-navy/40" />
        </motion.div>

        {/* Next Slide (for transition) */}
        <motion.div
          key={`next-${nextSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: nextSlide !== currentSlide ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={slides[nextSlide].image}
            alt={slides[nextSlide].title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/10 to-navy/40" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        className="relative min-h-[100vh] flex flex-col items-center justify-center text-white px-4 py-16 md:py-0"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -50])
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto w-full"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 md:mb-8"
          >
            <img
              src="/images/Image Files/Image Files/logo horizontal.png"
              alt="TruView Real Estate"
              className="h-24 md:h-32 lg:h-40 mx-auto"
            />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 tracking-wider uppercase">
            {slides[currentSlide].title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-12 font-light tracking-widest uppercase">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <MagneticButton onClick={handleBuyClick} delay={0}>
              Buy
            </MagneticButton>
            <MagneticButton onClick={() => setIsSellModalOpen(true)} delay={0.2}>
              Sell
            </MagneticButton>
            <MagneticButton onClick={() => setIsEstimateModalOpen(true)} delay={0.4}>
              Get Estimate
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0])
        }}
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-0.5 h-2 bg-white/60 rounded-full mt-2"
          />
        </div>
      </motion.div>

      {/* Sell Modal */}
      <Modal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        title="Home Valuation"
      >
        <form onSubmit={handleSellSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Address</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Phone</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full px-4 py-2 bg-navy text-white rounded-md hover:bg-charcoal transition-colors"
          >
            Submit
          </motion.button>
        </form>
      </Modal>

      {/* Estimate Modal */}
      <Modal
        isOpen={isEstimateModalOpen}
        onClose={() => setIsEstimateModalOpen(false)}
        title="Get Your Estimate"
      >
        <form onSubmit={handleEstimateSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Property Address</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Property Type</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              required
            >
              <option value="">Select type</option>
              <option value="single-family">Single Family</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="multi-family">Multi-Family</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Square Footage</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Contact Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full px-4 py-2 bg-navy text-white rounded-md hover:bg-charcoal transition-colors"
          >
            Get Estimate
          </motion.button>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Hero; 