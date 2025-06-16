import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const CTAstrip = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <motion.section
      ref={containerRef}
      style={{
        opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
        y: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])
      }}
      className="relative bg-navy py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wider uppercase text-white mb-4">
              Ready to Move?
            </h2>
            <p className="text-lg text-white/80 font-light">
              Let's start your real estate journey today
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-navy font-light tracking-wider uppercase text-sm hover:bg-opacity-90 transition-all duration-300"
            >
              Schedule a Call
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white text-white font-light tracking-wider uppercase text-sm hover:bg-white hover:text-navy transition-all duration-300"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTAstrip; 