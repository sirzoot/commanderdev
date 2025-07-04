import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const TestimonialCard = ({ testimonial, index, isActive, onCardClick }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={() => onCardClick(index)}
      className={`relative w-[450px] h-[320px] flex-shrink-0 p-8 bg-white rounded-2xl cursor-pointer group ${
        isActive 
          ? 'z-20 scale-105 shadow-2xl ring-2 ring-navy/20' 
          : 'z-10 scale-95 opacity-75 shadow-lg'
      } transition-all duration-400 ease-out transform-gpu`}
    >
      <div className="flex flex-col items-center text-center h-full justify-center">
        <div className="w-16 h-16 rounded-full overflow-hidden mb-6 ring-2 ring-navy/10">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-lg font-light text-gray-700 mb-6 italic leading-relaxed">
          "{testimonial.quote}"
        </p>
        <div className="mt-auto">
          <h4 className="text-xl font-light text-gray-900 tracking-wide">{testimonial.name}</h4>
          <p className="text-sm font-light text-navy tracking-wider uppercase">{testimonial.location}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const isInView = useInView(sectionRef, { amount: 0.3 });

  const testimonials = [
    {
      quote: "Working with TruView Real Estate was an absolute pleasure. Their attention to detail and dedication to finding the perfect home for us was exceptional.",
      name: "Sarah Johnson",
      location: "McLean, VA",
      image: "/images/1221-merchant-ln-mclean-va-22101/images-for-web-or-mls/1-web-or-mls-DSC03796.jpg"
    },
    {
      quote: "The team's professionalism and market knowledge helped us sell our home above asking price. I couldn't be happier with the results!",
      name: "Michael Chen",
      location: "Vienna, VA",
      image: "/images/8452-holly-leaf-dr-mclean-va-22102/images-for-web-or-mls/1-web-or-mls-ARC02129.jpg"
    },
    {
      quote: "From start to finish, the entire process was smooth and transparent. TruView made buying our dream home a reality.",
      name: "Emily Rodriguez",
      location: "Falls Church, VA",
      image: "/images/2914-willston-pl-apt-301-falls-church-va-22044/images-for-web-or-mls/1-web-or-mls-DSC02892.jpg"
    },
    {
      quote: "Outstanding service from start to finish. The entire team went above and beyond to ensure our home buying experience was seamless.",
      name: "David Thompson",
      location: "Arlington, VA",
      image: "/images/181-e-reed-ave-alexandria-va-22305/images-for-web-or-mls/1-web-or-mls-DSC09195.jpg"
    },
    {
      quote: "Their market expertise and negotiation skills were invaluable. We couldn't have asked for a better real estate partner.",
      name: "Lisa Anderson",
      location: "Alexandria, VA",
      image: "/images/15092-rixeyville-lakes-ct-rixeyville-22737/images-for-web-or-mls/1-web-or-mls-10-print-DSC08172.jpg"
    }
  ];

  // Perfect centering logic - match FeaturedListings implementation
  const CARD_WIDTH = 450;
  const GAP = 20;
  const TOTAL_CARD_WIDTH = CARD_WIDTH + GAP;
  
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

  const handleCardClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => prev > 0 ? prev - 1 : testimonials.length - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev < testimonials.length - 1 ? prev + 1 : 0);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-white py-24 overflow-hidden"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-7xl mx-auto px-4 text-center mb-16"
      >
        <motion.h2 
          className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-wider uppercase mb-6 text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Client Stories
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl font-light text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Real experiences from our valued clients
        </motion.p>
      </motion.div>

      {/* Testimonials Carousel */}
      <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
        {/* Visual indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/10 backdrop-blur-sm rounded-full text-xs text-gray-600 font-medium opacity-75 z-30">
          Click testimonials • Use arrows • Drag to browse
        </div>

        <motion.div
          ref={containerRef}
          className="flex cursor-grab active:cursor-grabbing select-none"
          style={{ x: targetX, gap: `${GAP}px` }}
          drag="x"
          dragConstraints={{ 
            left: -(testimonials.length - 1) * TOTAL_CARD_WIDTH, 
            right: 0 
          }}
          dragElastic={0.05}
          dragMomentum={false}
          whileDrag={{ cursor: "grabbing" }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
              isActive={index === currentIndex}
              onCardClick={handleCardClick}
            />
          ))}
        </motion.div>

        {/* Navigation Arrows */}
        <motion.button
          onClick={handlePrevious}
          className="absolute left-4 z-30 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <motion.button
          onClick={handleNext}
          className="absolute right-4 z-30 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Enhanced Navigation Dots */}
      <div className="flex justify-center mt-8 gap-3">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-navy scale-125' : 'bg-gray-400'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials; 