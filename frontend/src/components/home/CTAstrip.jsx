import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const CTAstrip = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <motion.section
      ref={sectionRef}
      className="relative bg-navy py-32 overflow-hidden"
    >
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.h2 
              className="text-hero font-serif tracking-wider uppercase text-white mb-8 leading-none"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-white/90 mb-2 font-serif">Ready to Find</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 drop-shadow-lg font-serif">
                Your Dream Home?
              </span>
            </motion.h2>
            
            <motion.div
              className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-10 mx-auto lg:mx-0"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            />
            
            <motion.p 
              className="text-luxury font-light text-white/85 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Experience the difference with personalized service and unmatched expertise in the DMV area.
            </motion.p>
            <motion.p 
              className="text-lg font-light text-gold-300/80 leading-relaxed max-w-xl mx-auto lg:mx-0 italic"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              "Where luxury meets expertise, and dreams become addresses."
            </motion.p>
          </motion.div>

          {/* Action Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 15px 40px rgba(255,215,0,0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-16 py-6 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 font-semibold tracking-wider uppercase text-sm overflow-hidden rounded-lg shadow-gold transition-all duration-400"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span>Schedule a Consultation</span>
                <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 15px 40px rgba(255,255,255,0.15)"
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-16 py-6 border-2 border-gold-400/80 text-gold-300 font-medium tracking-wider uppercase text-sm overflow-hidden rounded-lg backdrop-blur-sm transition-all duration-400"
            >
              <span className="relative z-10 group-hover:text-navy-900 transition-colors duration-400 flex items-center gap-3">
                <span>View Our Listings</span>
                <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </motion.button>
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-12 pt-8 border-t border-gold-400/30"
            >
              <p className="text-gold-200/90 font-light mb-6 text-lg">Ready to talk? Contact us directly:</p>
              <div className="flex flex-col sm:flex-row gap-6 text-base">
                <motion.a 
                  href="tel:+1234567890"
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group flex items-center gap-3 text-white hover:text-gold-300 transition-all duration-300 font-light tracking-wider"
                >
                  <span className="text-gold-400 group-hover:text-gold-300 transition-colors duration-300">📞</span>
                  (123) 456-7890
                </motion.a>
                <motion.a 
                  href="mailto:info@truviewrealestate.com"
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group flex items-center gap-3 text-white hover:text-gold-300 transition-all duration-300 font-light tracking-wider"
                >
                  <span className="text-gold-400 group-hover:text-gold-300 transition-colors duration-300">✉️</span>
                  info@truviewrealestate.com
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTAstrip; 