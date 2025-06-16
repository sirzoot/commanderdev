import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const TestimonialCard = ({ testimonial, index, isActive }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`w-[90vw] md:w-[70vw] lg:w-[600px] flex-shrink-0 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 ${
        isActive ? 'scale-105' : 'scale-95'
      } transition-all duration-300`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-6 ring-2 ring-white/20">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-lg md:text-xl font-light text-gray-600 mb-6 italic">
          "{testimonial.quote}"
        </p>
        <h4 className="text-xl font-light text-gray-900">{testimonial.name}</h4>
        <p className="text-sm text-gray-500">{testimonial.location}</p>
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
  const isInView = useInView(sectionRef, { amount: 0.5 });

  const testimonials = [
    {
      quote: "Working with TruView Real Estate was an absolute pleasure. Their attention to detail and dedication to finding the perfect home for us was exceptional.",
      name: "Sarah Johnson",
      location: "McLean, VA",
      image: "/images/testimonials/sarah.jpg"
    },
    {
      quote: "The team's professionalism and market knowledge helped us sell our home above asking price. I couldn't be happier with the results!",
      name: "Michael Chen",
      location: "Vienna, VA",
      image: "/images/testimonials/michael.jpg"
    },
    {
      quote: "From start to finish, the entire process was smooth and transparent. TruView made buying our dream home a reality.",
      name: "Emily Rodriguez",
      location: "Falls Church, VA",
      image: "/images/testimonials/emily.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

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

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-multiply" />
      
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
          y: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])
        }}
        className="relative max-w-7xl mx-auto px-4 text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wider uppercase mb-4 text-black">
          Client Testimonials
        </h2>
        <p className="text-xl font-light text-gray-600">
          Hear what our clients have to say about their experience
        </p>
      </motion.div>

      <div className="relative w-full h-[400px] flex items-center justify-center">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          animate={{
            x: `-${currentIndex * 100}%`
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
          whileHover={{ scale: 1.01 }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
              isActive={index === currentIndex}
            />
          ))}
        </motion.div>

        {/* Navigation Dots with enhanced styling */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-navy w-4' : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 