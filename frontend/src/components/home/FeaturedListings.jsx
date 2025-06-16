import { motion, useScroll, useTransform, useInView, useMotionValueEvent, useAnimationControls, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const PropertyCard = ({ listing, index, totalListings, isActive, xOffset }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const imageParallax = useTransform(xOffset, [-500, 500], [-50, 50]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: isHovered ? 1.05 : 1,
        rotateY: isHovered ? 5 : 0,
        z: isHovered ? 50 : 0
      } : {}}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative w-[90vw] md:w-[70vw] lg:w-[600px] xl:w-[700px] 2xl:w-[800px] h-[400px] md:h-[450px] lg:h-[500px] flex-shrink-0 rounded-2xl overflow-hidden shadow-xl ${
        isActive ? 'z-20 scale-105' : 'z-10 scale-95'
      } transition-all duration-300 transform-gpu`}
    >
      <motion.div
        className="absolute inset-0"
        style={{ x: imageParallax }}
      >
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white"
      >
        <h3 className="text-2xl md:text-3xl font-light mb-2">{listing.title}</h3>
        <p className="text-lg md:text-xl font-light mb-3">{listing.location}</p>
        <div className="flex gap-6 mb-3">
          <div>
            <span className="text-xl md:text-2xl font-light">{listing.beds}</span>
            <span className="ml-2 text-sm md:text-base">Beds</span>
          </div>
          <div>
            <span className="text-xl md:text-2xl font-light">{listing.baths}</span>
            <span className="ml-2 text-sm md:text-base">Baths</span>
          </div>
        </div>
        <p className="text-2xl md:text-3xl font-light mb-4">${listing.price.toLocaleString()}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-white text-black font-light tracking-wider uppercase text-sm hover:bg-gray-100 transition-all duration-300"
        >
          View Property
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const FeaturedListings = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const x = useMotionValue(0);
  const controls = useAnimationControls();
  const isInView = useInView(sectionRef, { amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

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

  // Scroll-driven carousel
  const carouselProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const carouselX = useTransform(
    carouselProgress,
    [0, 1],
    [0, -(listings.length - 1) * (800 + 32)] // cardWidth + gap
  );

  // Smooth scroll to center when section comes into view
  useEffect(() => {
    if (isInView) {
      const scrollToCenter = () => {
        const section = sectionRef.current;
        if (section) {
          const rect = section.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetScroll = scrollTop + rect.top - (window.innerHeight - rect.height) / 2;
          
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }
      };

      const timeoutId = setTimeout(scrollToCenter, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isInView]);

  // Calculate the x position for the current index
  const updateCarouselPosition = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.querySelector('.flex-shrink-0')?.offsetWidth || 0;
      const gap = 32;
      const centerOffset = (window.innerWidth - cardWidth) / 2;
      const targetX = -currentIndex * (cardWidth + gap) + centerOffset;
      controls.start({ x: targetX, transition: { type: "spring", stiffness: 100, damping: 20 } });
    }
  };

  useEffect(() => {
    updateCarouselPosition();
    window.addEventListener('resize', updateCarouselPosition);
    return () => window.removeEventListener('resize', updateCarouselPosition);
  }, [currentIndex]);

  const handleDragEnd = (event, info) => {
    const slider = containerRef.current.querySelector('.flex');
    if (!slider) return;

    const cardWidth = slider.querySelector('.flex-shrink-0')?.offsetWidth || 0;
    const gap = 32;
    const totalCardWidth = cardWidth + gap;

    const currentOffset = x.get();
    const snappedIndex = Math.round((currentOffset - (window.innerWidth - cardWidth) / 2) / -totalCardWidth);
    
    let newIndex = Math.max(0, Math.min(listings.length - 1, snappedIndex));
    setCurrentIndex(newIndex);
  };

  return (
    <section 
      ref={sectionRef}
      id="featured-listings" 
      className="relative bg-gradient-to-b from-white via-gray-50 to-white py-12 md:py-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-multiply" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-7xl mx-auto px-4 text-center mb-8 md:mb-12"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wider uppercase mb-3 text-black">
          Featured Properties
        </h2>
        <p className="text-xl font-light text-gray-600">
          Discover our handpicked selection of exceptional homes
        </p>
      </motion.div>

      <div className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center">
        <motion.div
          ref={containerRef}
          className="flex cursor-grab active:cursor-grabbing"
          style={{ x: carouselX }}
          animate={controls}
          drag="x"
          dragConstraints={{ left: -(listings.length - 1) * 832, right: 0 }}
          onDragEnd={handleDragEnd}
          onUpdate={(latest) => x.set(latest.x)}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {listings.map((listing, index) => (
            <PropertyCard
              key={index}
              listing={listing}
              isActive={index === currentIndex}
              index={index}
              totalListings={listings.length}
              xOffset={x}
            />
          ))}
        </motion.div>

        <motion.button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          className="absolute left-4 z-30 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/5 backdrop-blur-sm flex items-center justify-center border border-white/20"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.1)" }}
          whileTap={{ scale: 0.95 }}
          disabled={currentIndex === 0}
        >
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <motion.button
          onClick={() => setCurrentIndex(Math.min(listings.length - 1, currentIndex + 1))}
          className="absolute right-4 z-30 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/5 backdrop-blur-sm flex items-center justify-center border border-white/20"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.1)" }}
          whileTap={{ scale: 0.95 }}
          disabled={currentIndex === listings.length - 1}
        >
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      <div className="flex justify-center mt-12 gap-4">
        {listings.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === index ? 'bg-black' : 'bg-black/40'
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