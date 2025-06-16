import { motion, useInView, useSpring, useTransform, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const StatCard = ({ number, label, delay, animationType }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      const target = parseInt(number);
      const duration = 2000; // 2 seconds
      const steps = 60; // 60fps
      const increment = target / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    }
  }, [isInView, number]);

  const initialY = animationType === 'top' ? -50 : 50;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: initialY }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: delay, 
      }}
      className="flex-1 text-center bg-gray-50 p-8 rounded-lg shadow-lg"
    >
      <div className="max-w-4xl text-center mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: delay + 0.2, 
            ease: [0.18, 0.71, 0.11, 1]
          }}
          className="text-6xl md:text-8xl font-bold text-gray-900 mb-4"
        >
          {count}{number.includes('+') && '+'}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + 0.4,
            ease: [0.18, 0.71, 0.11, 1]
          }}
          className="text-xl md:text-2xl font-light tracking-wider uppercase text-gray-600"
        >
          {label}
        </motion.div>
      </div>
    </motion.div>
  );
};

const Stats = () => {
  const statsData = [
    {
      number: "500+",
      label: "Homes Sold",
      animationType: 'top'
    },
    {
      number: "15",
      label: "Years in Business",
      animationType: 'bottom'
    },
    {
      number: "21",
      label: "Avg. Days on Market",
      animationType: 'top'
    },
  ];

  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.5 });
  
  const controls = useAnimation();

  useEffect(() => {
    if (isSectionInView) {
      controls.start({
        scale: [1, 1.02, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      });
    } else {
      controls.stop();
    }
  }, [isSectionInView, controls]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section 
      id="stats" 
      className="relative py-20"
      style={{
        backgroundImage: "url('/images/pattern.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px", // Use the pattern's defined size
        backgroundColor: "#f8f8f8", // Light background for contrast with pattern
      }}
    >
      {/* Pattern Background Overlay (if needed for more subtle effect) */}
      
      {/* Stats Section */}
      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              delay={index * 0.2}
              animationType={stat.animationType}
            />
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            animate={controls}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light tracking-wider uppercase text-charcoal mb-4">
                Get in Touch
              </h2>
              <p className="text-charcoal/80 font-light text-lg">
                Let's discuss your real estate needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-light text-charcoal/80 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-transparent border border-charcoal/20 rounded-lg focus:outline-none focus:border-charcoal/40 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-light text-charcoal/80 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-transparent border border-charcoal/20 rounded-lg focus:outline-none focus:border-charcoal/40 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-charcoal/80 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-transparent border border-charcoal/20 rounded-lg focus:outline-none focus:border-charcoal/40 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-light text-charcoal/80 mb-2">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 bg-transparent border border-charcoal/20 rounded-lg focus:outline-none focus:border-charcoal/40 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-light text-charcoal/80 mb-2">
                Message
              </label>
              <textarea
                className="w-full px-4 py-3 bg-transparent border border-charcoal/20 rounded-lg focus:outline-none focus:border-charcoal/40 transition-colors h-32 resize-none"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-8 py-4 bg-charcoal text-white font-light tracking-wider uppercase text-sm hover:bg-charcoal/90 transition-all duration-300 rounded-lg"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Stats; 