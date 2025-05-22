import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const StatCard = ({ number, label, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={isInView ? { scale: 1 } : { scale: 0.5 }}
        transition={{ duration: 0.5, delay }}
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-2"
      >
        {number}
      </motion.div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            number="500+"
            label="Homes Sold"
            delay={0}
          />
          <StatCard
            number="15"
            label="Years in Business"
            delay={0.2}
          />
          <StatCard
            number="21"
            label="Avg. Days on Market"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default Stats; 