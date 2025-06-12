import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

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
      className="relative min-h-[60vh] w-full flex items-start justify-center py-2"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-3/4 relative aspect-[16/9] rounded-lg overflow-hidden"
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
            className="w-full md:w-1/4 text-charcoal"
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-2">
                  {listing.title}
                </h2>
                <p className="text-xl font-light text-charcoal">
                  {listing.location}
                </p>
              </div>

              <div className="flex gap-8 text-lg">
                <div>
                  <span className="font-light tracking-wider">{listing.beds}</span>
                  <span className="text-charcoal ml-2">Beds</span>
                </div>
                <div>
                  <span className="font-light tracking-wider">{listing.baths}</span>
                  <span className="text-charcoal ml-2">Baths</span>
                </div>
              </div>

              <p className="text-3xl font-light">
                ${listing.price.toLocaleString()}
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 border border-black text-black font-light tracking-wider uppercase text-sm hover:bg-gray-100 transition-all duration-300"
              >
                View Property
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Property Counter */}
      <div className="absolute top-8 right-8 text-gray-400 font-light tracking-wider">
        {index + 1} / {totalListings}
      </div>
    </motion.div>
  );
};

const FeaturedListings = () => {
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

  return (
    <section id="featured-listings" className="relative bg-white">
      {/* Section Header */}
      <div className="min-h-[40vh] flex items-center justify-center py-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto px-4"
        >
          <h2 className="text-4xl md:text-6xl font-light tracking-wider uppercase mb-6 text-charcoal">
            Featured Properties
          </h2>
          <p className="text-xl md:text-2xl font-light tracking-wider text-charcoal">
            Discover our handpicked selection of exceptional homes
          </p>
        </motion.div>
      </div>

      {/* Property Showcases */}
      {listings.map((listing, index) => (
        <PropertyShowcase
          key={index}
          listing={listing}
          index={index}
          totalListings={listings.length}
        />
      ))}

      {/* Final CTA */}
      <div className="min-h-[15vh] flex items-center justify-center py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto px-4"
        >
          <h2 className="text-4xl md:text-6xl font-light tracking-wider uppercase text-charcoal">
            Find Your Dream Home
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 border border-black text-black font-light tracking-wider uppercase text-sm hover:bg-gray-100 transition-all duration-300"
          >
            View All Listings
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedListings; 