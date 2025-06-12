import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [nextSlide, setNextSlide] = useState(1);

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

  const handleSlideChange = (index) => {
    setNextSlide(index);
    setTimeout(() => {
      setCurrentSlide(index);
    }, 1000);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
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
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
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
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <img
              src="/images/Image Files/Image Files/logo horizontal.png"
              alt="TruView Real Estate"
              className="h-32 md:h-40 mx-auto"
            />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wider uppercase">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl mb-12 font-light tracking-widest uppercase">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 bg-white text-black font-light tracking-wider uppercase text-sm hover:bg-opacity-90 transition-all duration-300"
            >
              Buy
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 bg-transparent border border-white text-white font-light tracking-wider uppercase text-sm hover:bg-white hover:bg-opacity-10 transition-all duration-300"
            >
              Sell
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 bg-transparent border border-white text-white font-light tracking-wider uppercase text-sm hover:bg-white hover:bg-opacity-10 transition-all duration-300"
            >
              Get Estimate
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white scale-150' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={() => handleSlideChange((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => handleSlideChange((currentSlide + 1) % slides.length)}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
    </div>
  );
};

export default Hero; 