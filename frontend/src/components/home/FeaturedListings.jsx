import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const PropertyCard = ({ listing, index, isActive, onCardClick }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

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
        scale: 1.02,
        rotateY: 2,
        z: 20,
        transition: { duration: 0.3 }
      }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut", 
        delay: index * 0.15
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onCardClick(index)}
      style={{ 
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      className={`relative w-[350px] md:w-[400px] lg:w-[450px] h-[500px] md:h-[550px] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group ${
        isActive 
          ? 'z-20 scale-110 shadow-2xl' 
          : 'z-10 scale-90 opacity-70'
      } transition-all duration-500 ease-out transform-gpu`}
    >
      {/* Enhanced Image with Multiple Layers */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          scale: isHovered ? 1.05 : 1,
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
        transition={{ delay: index * 0.15 + 0.3 }}
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
        transition={{ delay: index * 0.15 + 0.5 }}
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
  const [isDragging, setIsDragging] = useState(false);
  
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
    },
    {
      image: '/images/1823-westmoreland-st-mclean-va-22101/images-for-web-or-mls/1-web-or-mls-DSC04653.jpg',
      price: 3250000,
      title: '1823 Westmoreland St',
      beds: 7,
      baths: 6.5,
      location: 'McLean, VA 22101'
    },
    {
      image: '/images/181-e-reed-ave-alexandria-va-22305/images-for-web-or-mls/1-web-or-mls-DSC09195.jpg',
      price: 895000,
      title: '181 E Reed Ave',
      beds: 3,
      baths: 2.5,
      location: 'Alexandria, VA 22305'
    },
    {
      image: '/images/15092-rixeyville-lakes-ct-rixeyville-22737/images-for-web-or-mls/1-web-or-mls-10-print-DSC08172.jpg',
      price: 1750000,
      title: '15092 Rixeyville Lakes Ct',
      beds: 5,
      baths: 4,
      location: 'Rixeyville, VA 22737'
    },
    {
      image: '/images/truview hero/11-web-or-mls-ARC04382.jpg',
      price: 2850000,
      title: 'Luxury Estate Home',
      beds: 6,
      baths: 5.5,
      location: 'Great Falls, VA 22066'
    },
    {
      image: '/images/9480-virginia-center-blvd-vienna-va-22181/images-for-web-or-mls/1-web-or-mls-MAX_0225.JPG',
      price: 725000,
      title: 'Modern Townhome',
      beds: 3,
      baths: 2.5,
      location: 'Reston, VA 20191'
    },
    {
      image: '/images/8452-holly-leaf-dr-mclean-va-22102/images-for-web-or-mls/1-web-or-mls-ARC02129.jpg',
      price: 1180000,
      title: 'Contemporary Colonial',
      beds: 4,
      baths: 3.5,
      location: 'Arlington, VA 22207'
    }
  ];

  // Simplified infinite carousel with perfect centering
  const CARD_WIDTH = 450; // Fixed card width
  const GAP = 20; // Gap between cards  
  const TOTAL_CARD_WIDTH = CARD_WIDTH + GAP; // Total space per card
  
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  // Update viewport width on resize
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Perfect centering: viewport center - active card center
  const viewportCenter = viewportWidth / 2;
  const activeCardCenter = currentIndex * TOTAL_CARD_WIDTH + (CARD_WIDTH / 2);
  const targetX = viewportCenter - activeCardCenter;
  const x = useSpring(targetX, { 
    stiffness: 200, 
    damping: 40,
    restDelta: 0.001
  });

  // Update position when currentIndex changes
  useEffect(() => {
    if (!isDragging) {
      x.set(targetX);
    }
  }, [currentIndex, targetX, x, isDragging]);

  // Remove auto-advance - let users control navigation

  const handleCardClick = (index) => {
    setCurrentIndex(index);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    
    // Calculate which card should be active based on drag distance
    const dragThreshold = TOTAL_CARD_WIDTH / 3; // One third of card width
    if (Math.abs(info.offset.x) > dragThreshold) {
      if (info.offset.x > 0) {
        // Dragged right - go to previous (with infinite wrap)
        setCurrentIndex((prev) => prev > 0 ? prev - 1 : listings.length - 1);
      } else {
        // Dragged left - go to next (with infinite wrap)
        setCurrentIndex((prev) => prev < listings.length - 1 ? prev + 1 : 0);
      }
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => prev > 0 ? prev - 1 : listings.length - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev < listings.length - 1 ? prev + 1 : 0);
  };

  return (
    <section 
      ref={sectionRef}
      id="featured-listings" 
      className="relative bg-gradient-to-b from-white via-gray-50 to-white py-12 md:py-16 overflow-hidden"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-7xl mx-auto px-4 text-center mb-12 md:mb-16"
      >
        <motion.h2 
          className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wider uppercase mb-6 text-gray-900"
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
          Discover our handpicked selection of exceptional homes
        </motion.p>
      </motion.div>

      {/* Fixed Carousel Container */}
      <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        {/* Visual indicator for draggable area */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/10 backdrop-blur-sm rounded-full text-xs text-gray-600 font-medium opacity-75 hover:opacity-100 transition-opacity">
            Drag cards • Click arrows • Use dots below
          </div>
        </div>
        <motion.div
          ref={containerRef}
          className="flex cursor-grab active:cursor-grabbing select-none"
          style={{ x, gap: `${GAP}px` }}
          drag="x"
          dragConstraints={{ 
            left: -(listings.length - 1) * TOTAL_CARD_WIDTH, 
            right: 0 
          }}
          dragElastic={0.05}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          whileDrag={{ cursor: "grabbing" }}
        >
          {listings.map((listing, index) => (
            <PropertyCard
              key={index}
              listing={listing}
              index={index}
              isActive={index === currentIndex}
              onCardClick={handleCardClick}
            />
          ))}
        </motion.div>

        {/* Navigation Arrows */}
        <motion.button
          onClick={handlePrevious}
          className="absolute left-4 z-30 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <motion.button
          onClick={handleNext}
          className="absolute right-4 z-30 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Enhanced Navigation Dots */}
      <div className="flex justify-center mt-8 gap-3">
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
    </section>
  );
};

export default FeaturedListings;

