import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

const PropertyShowcase = ({ listing, index, totalListings }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-[60vh] w-full flex items-start justify-center py-8 md:py-12"
    >
      <div className="w-full max-w-[1200px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5 relative aspect-[16/9] rounded-lg overflow-hidden"
          >
            <motion.div
              style={{ y: imageParallaxY }}
              className="absolute inset-0"
            >
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/5 text-charcoal"
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-light tracking-wider uppercase mb-2">
                  {listing.title}
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl font-light text-charcoal">
                  {listing.location}
                </p>
              </div>

              <div className="flex gap-8 text-base sm:text-lg lg:text-xl">
                <div>
                  <span className="font-light tracking-wider">{listing.beds}</span>
                  <span className="text-charcoal ml-2">Beds</span>
                </div>
                <div>
                  <span className="font-light tracking-wider">{listing.baths}</span>
                  <span className="text-charcoal ml-2">Baths</span>
                </div>
              </div>

              <p className="text-2xl sm:text-3xl lg:text-4xl font-light">
                ${listing.price.toLocaleString()}
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 border border-black text-black font-light tracking-wider uppercase text-sm hover:bg-gray-100 transition-all duration-300"
              >
                View Property
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedListings = () => {
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowFloatingButton(latest > 0.2 && latest < 0.7);
  });

  const listings = [
    {
      image: '/images/9480-virginia-center-blvd-vienna-va-22181/images-for-web-or-mls/1-web-or-mls-MAX_0225.JPG',
      price: 1250000,
      title: '9480 Virginia Center Blvd',
      beds: 4,
      baths: 3.5,
      location: 'Vienna, VA 22181'
    },
    {
      image: '/images/8452-holly-leaf-dr-mclean-va-22102/images-for-web-or-mls/1-web-or-mls-ARC02129.jpg',
      price: 2150000,
      title: '8452 Holly Leaf Dr',
      beds: 6,
      baths: 5.5,
      location: 'McLean, VA 22102'
    },
    {
      image: '/images/2914-willston-pl-apt-301-falls-church-va-22044/images-for-web-or-mls/1-web-or-mls-DSC02892.jpg',
      price: 450000,
      title: '2914 Willston Pl #301',
      beds: 2,
      baths: 2,
      location: 'Falls Church, VA 22044'
    },
    {
      image: '/images/1221-merchant-ln-mclean-va-22101/images-for-web-or-mls/1-web-or-mls-DSC03796.jpg',
      price: 1950000,
      title: '1221 Merchant Ln',
      beds: 5,
      baths: 4.5,
      location: 'McLean, VA 22101'
    }
  ];

  // Responsive CTA width for padding
  const ctaPadding = 'pr-0 sm:pr-[240px] xl:pr-[390px]';

  return (
    <section id="featured-listings" className="relative bg-white">
      {/* Main Content Container */}
      <div className={`relative w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto ${ctaPadding}`}>
        {/* Floating CTA Sections */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ 
            opacity: showFloatingButton ? 1 : 0,
            x: showFloatingButton ? 0 : 100
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="fixed inset-y-0 right-0 flex items-center justify-end z-50 w-[180px] sm:w-[220px] md:w-[240px] xl:w-[350px] p-3 sm:p-4 md:p-6 xl:p-8 bg-white/80 backdrop-blur rounded-l-lg shadow-xl border-l border-t border-b border-charcoal/10 hidden sm:flex"
          style={{ pointerEvents: showFloatingButton ? 'auto' : 'none' }}
        >
          <div className="flex flex-col gap-4 xl:gap-6 w-full max-h-[90vh] justify-center">
            {/* View All Listings Card */}
            <motion.div 
              whileHover={{ 
                scale: 1.02,
                rotateX: 2,
                rotateY: -2,
                transition: { duration: 0.2 }
              }}
              className="bg-transparent shadow-none p-0"
            >
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl xl:text-2xl font-light tracking-wider uppercase text-charcoal mb-2 xl:mb-4"
              >
                Ready for More?
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-charcoal/80 font-light text-xs md:text-sm xl:text-base mb-2 xl:mb-4"
              >
                Explore our complete collection of premium properties
              </motion.p>
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "#1a1a1a",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-3 py-2 md:px-4 md:py-3 xl:px-6 xl:py-4 bg-charcoal text-white font-light tracking-wider uppercase text-xs md:text-sm hover:bg-charcoal/90 transition-all duration-300 rounded"
              >
                View All Listings
              </motion.button>
            </motion.div>

            {/* Contact Card */}
            <motion.div 
              whileHover={{ 
                scale: 1.02,
                rotateX: 2,
                rotateY: -2,
                transition: { duration: 0.2 }
              }}
              className="bg-transparent shadow-none p-0"
            >
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl xl:text-2xl font-light tracking-wider uppercase text-charcoal mb-2 xl:mb-4"
              >
                Let's Connect
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-charcoal/80 font-light text-xs md:text-sm xl:text-base mb-2 xl:mb-4"
              >
                Ready to find your perfect home? Our experts are here to help.
              </motion.p>
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "#f5f5f5",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-3 py-2 md:px-4 md:py-3 xl:px-6 xl:py-4 bg-white text-charcoal font-light tracking-wider uppercase text-xs md:text-sm hover:bg-gray-50 transition-all duration-300 border border-charcoal/20 rounded"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="min-h-[30vh] lg:min-h-[40vh] flex items-center justify-center py-8 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto px-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl 2xl:text-7xl font-light tracking-wider uppercase mb-4 lg:mb-6 text-charcoal">
              Featured Properties
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-light tracking-wider text-charcoal">
              Discover our handpicked selection of exceptional homes
            </p>
          </motion.div>
        </div>

        {/* Property Showcases */}
        <div className="max-w-[1200px] 2xl:max-w-[1400px] mx-auto">
          {listings.map((listing, index) => (
            <PropertyShowcase
              key={index}
              listing={listing}
              index={index}
              totalListings={listings.length}
            />
          ))}
        </div>

        {/* Final CTA */}
        <div className="min-h-[15vh] flex items-center justify-center py-8 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto px-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl 2xl:text-7xl font-light tracking-wider uppercase text-charcoal mb-6">
              Find Your Dream Home
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-12 py-3 sm:py-4 border border-black text-black font-light tracking-wider uppercase text-sm hover:bg-gray-100 transition-all duration-300"
            >
              View All Listings
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings; 