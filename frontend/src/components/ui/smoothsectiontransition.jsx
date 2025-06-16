import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionTransition = ({ 
  children, 
  className = "", 
  backgroundColor = "bg-white",
  nextBackgroundColor = "bg-white",
  spacing = "normal" // "tight", "normal", "loose"
}) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Subtle scale and opacity effects for premium feel
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.98, 1, 1, 0.98]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.8, 1, 1, 0.8]
  );

  // Minimal y transform for smooth flow
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [20, 0, 0, -20]
  );

  // Spacing configurations
  const spacingClasses = {
    tight: "py-12 md:py-16",
    normal: "py-16 md:py-24", 
    loose: "py-24 md:py-32",
    flush: "py-0"
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{
        scale,
        opacity,
        y
      }}
      className={`relative ${backgroundColor} ${spacingClasses[spacing]} ${className}`}
    >
      {/* Smooth gradient transition to next section */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent ${nextBackgroundColor === 'bg-gray-50' ? 'to-gray-50' : nextBackgroundColor === 'bg-gray-900' ? 'to-gray-900' : 'to-white'} opacity-50 pointer-events-none`}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
};

export default SectionTransition;

