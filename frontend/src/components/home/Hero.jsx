import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Luxury Home"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="mb-4 text-4xl font-bold md:text-6xl lg:text-7xl">
            Your Home, Showcased to Perfection
          </h1>
          <p className="mb-8 text-lg md:text-xl">
            Discover luxury living at its finest
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button className="btn btn-primary">Buy</button>
          <button className="btn btn-secondary">Sell</button>
          <button className="btn btn-outline">Get Estimate</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 