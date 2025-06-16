import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionTransition = ({ 
  children, 
  className = "", 
  backgroundColor = "bg-white",
  index = 0 
}) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Perspective transition effects
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [15, 0, 0, -15]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [100, 0, 0, -100]
  );

  return (
    <motion.section
      ref={sectionRef}
      style={{
        scale,
        rotateX,
        opacity,
        y,
        transformPerspective: 1000,
        transformStyle: "preserve-3d"
      }}
      className={`relative ${backgroundColor} ${className}`}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Subtle shadow for depth */}
      <motion.div
        className="absolute inset-0 bg-black/5 -z-10"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0, 0.1])
        }}
      />
    </motion.section>
  );
};

export default SectionTransition;

