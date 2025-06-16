import { motion, useInView, useTransform, useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const AnimatedCounter = ({ value, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef();
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    const startValue = 0;
    const endValue = parseInt(value);
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Smooth easing
      const easeOutQuart = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={nodeRef}>
      {count}{suffix}
    </span>
  );
};

const StatItem = ({ stat, index }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.6 });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="text-center group"
    >
      {/* Number */}
      <motion.div 
        className="mb-4"
        initial={{ scale: 0.8 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
      >
        <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-2">
          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
        </h3>
      </motion.div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
      >
        <h4 className="text-lg md:text-xl font-medium text-gray-900 mb-2 tracking-wide uppercase">
          {stat.label}
        </h4>
        <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed max-w-xs mx-auto">
          {stat.description}
        </p>
      </motion.div>

      {/* Subtle underline */}
      <motion.div
        className="w-12 h-px bg-gray-300 mx-auto mt-4"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.7, duration: 0.8 }}
      />
    </motion.div>
  );
};

const Stats = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Subtle parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const stats = [
    {
      value: "500",
      suffix: "+",
      label: "Homes Sold",
      description: "Successfully closed transactions with satisfied clients"
    },
    {
      value: "15",
      suffix: "+",
      label: "Years Experience",
      description: "Dedicated expertise in luxury real estate markets"
    },
    {
      value: "98",
      suffix: "%",
      label: "Client Satisfaction",
      description: "Exceptional service rated by our valued customers"
    },
    {
      value: "21",
      label: "Avg. Days on Market",
      description: "Faster sales through strategic marketing approach"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-white overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <motion.div 
        style={{ y }}
        className="relative max-w-7xl mx-auto px-4"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide uppercase mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Proven Excellence
          </motion.h2>
          
          <motion.div
            className="w-24 h-px bg-gray-900 mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          
          <motion.p 
            className="text-lg md:text-xl font-light text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Our track record speaks for itself. These numbers represent years of dedication 
            to exceptional service and unparalleled results.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-20">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20 md:mt-32"
        >
          <motion.div
            className="w-24 h-px bg-gray-300 mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
          
          <motion.p 
            className="text-base md:text-lg text-gray-600 font-light mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Ready to experience the difference? Let's discuss your real estate goals.
          </motion.p>
          
          <motion.button
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-gray-900 text-white font-medium tracking-wide uppercase text-sm hover:bg-gray-800 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Stats;

