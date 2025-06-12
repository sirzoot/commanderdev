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
        scale: [1, 1.05, 1],
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

  return (
    <section id="stats" className="relative bg-white py-20">
      {/* Section Header */}
      {/* Removed Section Header */}

      {/* Consolidated Stat Showcase */}
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              delay={index * 0.2} // Staggered delay for each stat
              animationType={stat.animationType}
            />
          ))}
        </div>
      </div>

      {/* New Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white py-20 px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={controls}
            className="relative px-20 py-10 rounded-full border border-black text-black font-light tracking-wider uppercase text-2xl md:text-3xl hover:bg-gray-100 transition-all duration-300 overflow-hidden"
          >
            Contact Us
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileHover={{ width: "100%", opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 bg-white/10 rounded-full"
              style={{ zIndex: -1 }}
            />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Stats; 