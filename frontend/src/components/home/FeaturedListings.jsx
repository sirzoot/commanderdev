import { motion } from 'framer-motion';
import { useRef } from 'react';

const FeaturedListings = () => {
  const constraintsRef = useRef(null);

  const listings = [
    {
      id: 1,
      title: 'Luxury Villa',
      price: '$2,500,000',
      location: 'Beverly Hills, CA',
      image: '/images/listing1.jpg',
    },
    {
      id: 2,
      title: 'Modern Penthouse',
      price: '$1,800,000',
      location: 'Manhattan, NY',
      image: '/images/listing2.jpg',
    },
    {
      id: 3,
      title: 'Beachfront Estate',
      price: '$3,200,000',
      location: 'Miami, FL',
      image: '/images/listing3.jpg',
    },
    {
      id: 4,
      title: 'Mountain View Home',
      price: '$1,500,000',
      location: 'Denver, CO',
      image: '/images/listing4.jpg',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Featured Listings</h2>
        <motion.div
          ref={constraintsRef}
          className="overflow-hidden"
        >
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            className="flex gap-6"
            whileTap={{ cursor: 'grabbing' }}
          >
            {listings.map((listing) => (
              <motion.div
                key={listing.id}
                className="min-w-[300px] flex-shrink-0 cursor-grab"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                  <div className="relative aspect-[4/3]">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-xl font-semibold">{listing.title}</h3>
                    <p className="mb-2 text-2xl font-bold text-blue-600">
                      {listing.price}
                    </p>
                    <p className="text-gray-600">{listing.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedListings; 