import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useLenis } from '../ui/lenis_provider';

const PropertyCard = ({ listing, index, isActive, scrollProgress }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  // Advanced parallax and 3D effects
  const rotateY = useTransform(scrollProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  // Staggered animation delays
  const animationDelay = index * 0.15;

  return (
    <motion.div
      ref={cardRef}
      initial={{ 
        opacity: 0, 
        y: 100, 
        rotateX: -15,
        scale: 0.9
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        scale: 1
      } : {}}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        z: 50,
        transition: { duration: 0.3 }
      }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut", 
        delay: animationDelay 
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ 
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      className={`relative w-[350px] md:w-[400px] lg:w-[450px] h-[500px] md:h-[550px] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group ${
        isActive ? 'z-20' : 'z-10'
      } transition-all duration-300 transform-gpu`}
    >
      {/* Enhanced Image with Multiple Layers */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        
        {/* Dynamic Gradient Overlay */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: isHovered 
              ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)"
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Hover Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%', skewX: -25 }}
          animate={isHovered ? { x: '100%' } : { x: '-100%' }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: animationDelay + 0.3 }}
      >
        <motion.h3 
          className="text-2xl md:text-3xl font-light mb-3"
          animate={{
            y: isHovered ? -5 : 0
          }}
        >
          {listing.title}
        </motion.h3>
        
        <motion.p 
          className="text-lg md:text-xl font-light mb-4 opacity-90"
          animate={{
            y: isHovered ? -5 : 0
          }}
          transition={{ delay: 0.1 }}
        >
          {listing.location}
        </motion.p>
        
        <motion.div 
          className="flex gap-6 mb-4"
          animate={{
            y: isHovered ? -5 : 0
          }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <span className="text-2xl md:text-3xl font-light block">{listing.beds}</span>
            <span className="text-sm md:text-base opacity-80">Beds</span>
          </div>
          <div className="text-center">
            <span className="text-2xl md:text-3xl font-light block">{listing.baths}</span>
            <span className="text-sm md:text-base opacity-80">Baths</span>
          </div>
        </motion.div>
        
        <motion.p 
          className="text-3xl md:text-4xl font-light mb-6"
          animate={{
            y: isHovered ? -5 : 0,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ delay: 0.3 }}
        >
          ${listing.price.toLocaleString()}
        </motion.p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: isHovered ? -5 : 0,
            opacity: isHovered ? 1 : 0.8
          }}
          className="px-8 py-3 bg-white text-gray-900 font-medium tracking-wider uppercase text-sm hover:bg-gray-100 transition-all duration-300 rounded-lg shadow-lg"
        >
          View Details
        </motion.button>
      </motion.div>

      {/* Premium Badge */}
      <motion.div
        className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium uppercase tracking-wider"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: animationDelay + 0.5 }}
      >
        Featured
      </motion.div>
    </motion.div>
  );
};

const FeaturedListings = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const lenis = useLenis();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(sectionRef, { amount: 0.3 });

  const listings = [
    {
      image: '/images/9480-virginia-center-blvd-vienna-va-22181/images-for-web-or-mls/1-web-or-mls-MAX_0225.JPG',
      price: 1250000,
      title: '9480 Virginia Center Blvd',
      beds: 4,
      baths: 3.5,
      location: 'Vienna, VA 22181'
    },
    {
      image: '/images/8452-holly-leaf-dr-mclean-va-22102/images-for-web-or-mls/1-web-or-mls-ARC02129.jpg',
      price: 2150000,
      title: '8452 Holly Leaf Dr',
      beds: 6,
      baths: 5.5,
      location: 'McLean, VA 22102'
    },
    {
      image: '/images/2914-willston-pl-apt-301-falls-church-va-22044/images-for-web-or-mls/1-web-or-mls-DSC02892.jpg',
      price: 450000,
      title: '2914 Willston Pl #301',
      beds: 2,
      baths: 2,
      location: 'Falls Church, VA 22044'
    },
    {
      image: '/images/1221-merchant-ln-mclean-va-22101/images-for-web-or-mls/1-web-or-mls-DSC03796.jpg',
      price: 1950000,
      title: '1221 Merchant Ln',
      beds: 5,
      baths: 4.5,
      location: 'McLean, VA 22101'
    }
  ];

  // Scroll-driven carousel with enhanced easing
  const carouselProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const carouselX = useTransform(
    carouselProgress,
    [0, 1],
    [0, -(listings.length - 1) * 500] // Adjusted spacing
  );

  // Background parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Auto-advance carousel
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % listings.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView, listings.length]);

  const handleCardClick = (index) => {
    setCurrentIndex(index);
    if (lenis) {
      // Smooth scroll to center the clicked card
      const cardElement = containerRef.current?.children[index];
      if (cardElement) {
        lenis.scrollTo(cardElement, {
          duration: 1,
          offset: -window.innerHeight / 2
        });
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="featured-listings" 
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 md:py-32 overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat" />
      </motion.div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-7xl mx-auto px-4 text-center mb-16 md:mb-24"
      >
        <motion.h2 
          className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-wider uppercase mb-6 text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Featured Properties
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl font-light text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover our handpicked selection of exceptional homes, each showcased to perfection
        </motion.p>
      </motion.div>

      {/* Enhanced Carousel */}
      <div className="relative w-full">
        <motion.div
          ref={containerRef}
          className="flex gap-8 px-8"
          style={{ x: carouselX }}
          drag="x"
          dragConstraints={{ left: -(listings.length - 1) * 500, right: 0 }}
          dragElastic={0.1}
          whileDrag={{ cursor: "grabbing" }}
        >
          {listings.map((listing, index) => (
            <div key={index} onClick={() => handleCardClick(index)}>
              <PropertyCard
                listing={listing}
                index={index}
                isActive={index === currentIndex}
                scrollProgress={scrollYProgress}
              />
            </div>
          ))}
        </motion.div>

        {/* Enhanced Navigation */}
        <div className="flex justify-center mt-12 gap-3">
          {listings.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-gray-900 scale-125' : 'bg-gray-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 bg-gray-900 text-white rounded-full shadow-2xl z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>
    </section>
  );
};

export default FeaturedListings;

