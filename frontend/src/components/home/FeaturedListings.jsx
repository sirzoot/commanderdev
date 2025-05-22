import { motion } from 'framer-motion';
import { useRef } from 'react';

const ListingCard = ({ image, price, title, beds, baths, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-2xl font-bold mb-2">${price.toLocaleString()}</p>
        <div className="flex gap-4 text-sm">
          <span>{beds} beds</span>
          <span>{baths} baths</span>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedListings = () => {
  const containerRef = useRef(null);

  const listings = [
    {
      image: '/images/listing1.jpg',
      price: 1250000,
      title: 'Modern Waterfront Estate',
      beds: 4,
      baths: 3.5,
    },
    {
      image: '/images/listing2.jpg',
      price: 850000,
      title: 'Downtown Penthouse',
      beds: 3,
      baths: 2,
    },
    {
      image: '/images/listing3.jpg',
      price: 1950000,
      title: 'Luxury Hillside Villa',
      beds: 5,
      baths: 4.5,
    },
    {
      image: '/images/listing4.jpg',
      price: 750000,
      title: 'Contemporary Townhouse',
      beds: 3,
      baths: 2.5,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional homes
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {listings.map((listing, index) => (
            <ListingCard
              key={index}
              {...listing}
              delay={index * 0.1}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            View All Listings
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings; 