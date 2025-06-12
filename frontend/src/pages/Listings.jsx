import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';

const ListingCard = ({ listing, onClick, size = 'normal' }) => {
  const cardClasses = {
    normal: 'col-span-1 row-span-1',
    wide: 'col-span-2 row-span-1',
    tall: 'col-span-1 row-span-2',
    full: 'col-span-2 row-span-2'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`relative group cursor-pointer ${cardClasses[size]}`}
      onClick={() => onClick(listing)}
    >
      <div className="relative overflow-hidden rounded-lg h-full">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-xl font-light tracking-wider uppercase mb-1">{listing.title}</h3>
        <p className="text-2xl font-light mb-2">${listing.price.toLocaleString()}</p>
        <div className="flex gap-4 text-sm font-light tracking-wider">
          <span>{listing.beds} beds</span>
          <span>{listing.baths} baths</span>
        </div>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="mt-4 px-6 py-2 bg-white text-black text-sm font-light tracking-wider uppercase hover:bg-opacity-90 transition-all duration-300"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

const Listings = () => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    beds: 'all',
    baths: 'all',
    type: 'all'
  });

  const listings = [
    {
      id: 1,
      image: '/images/9480-virginia-center-blvd-vienna-va-22181/images-for-web-or-mls/1-web-or-mls-MAX_0225.JPG',
      price: 1250000,
      title: '9480 Virginia Center Blvd',
      beds: 4,
      baths: 3.5,
      type: 'house',
      location: 'Vienna, VA 22181',
      size: 'full'
    },
    {
      id: 2,
      image: '/images/1823-westmoreland-st-mclean-va-22101/images-for-web-or-mls/1-web-or-mls-DSC04653.jpg',
      price: 1850000,
      title: '1823 Westmoreland St',
      beds: 5,
      baths: 4.5,
      type: 'house',
      location: 'McLean, VA 22101',
      size: 'wide'
    },
    {
      id: 3,
      image: '/images/2914-willston-pl-apt-301-falls-church-va-22044/images-for-web-or-mls/1-web-or-mls-DSC02892.jpg',
      price: 450000,
      title: '2914 Willston Pl #301',
      beds: 2,
      baths: 2,
      type: 'apartment',
      location: 'Falls Church, VA 22044',
      size: 'normal'
    },
    {
      id: 4,
      image: '/images/6213-kentland-st-springfield-va/images-for-web-or-mls/4-web-or-mls-4-print-DSC02490.jpg',
      price: 750000,
      title: '6213 Kentland St',
      beds: 3,
      baths: 2.5,
      type: 'house',
      location: 'Springfield, VA',
      size: 'tall'
    },
    {
      id: 5,
      image: '/images/15092-rixeyville-lakes-ct-rixeyville-22737/images-for-web-or-mls/1-web-or-mls-10-print-DSC08172.jpg',
      price: 950000,
      title: '15092 Rixeyville Lakes Ct',
      beds: 4,
      baths: 3,
      type: 'house',
      location: 'Rixeyville, VA 22737',
      size: 'normal'
    },
    {
      id: 6,
      image: '/images/181-e-reed-ave-alexandria-va-22305/images-for-web-or-mls/1-web-or-mls-DSC09195.jpg',
      price: 825000,
      title: '181 E Reed Ave',
      beds: 3,
      baths: 2,
      type: 'house',
      location: 'Alexandria, VA 22305',
      size: 'wide'
    },
    {
      id: 7,
      image: '/images/3835-wagon-wheel-ln-woodbridge-va-22192/images-for-web-or-mls/1-web-or-mls-DSC09526.jpg',
      price: 675000,
      title: '3835 Wagon Wheel Ln',
      beds: 3,
      baths: 2.5,
      type: 'house',
      location: 'Woodbridge, VA 22192',
      size: 'normal'
    },
    {
      id: 8,
      image: '/images/513-e-custis-ave-alexandria-va-22301/images-for-web-or-mls/1-web-or-mls-DSC09115.jpg',
      price: 925000,
      title: '513 E Custis Ave',
      beds: 4,
      baths: 3,
      type: 'house',
      location: 'Alexandria, VA 22301',
      size: 'tall'
    },
    {
      id: 9,
      image: '/images/8452-holly-leaf-dr-mclean-va-22102/images-for-web-or-mls/1-web-or-mls-ARC02129.jpg',
      price: 2150000,
      title: '8452 Holly Leaf Dr',
      beds: 6,
      baths: 5.5,
      type: 'house',
      location: 'McLean, VA 22102',
      size: 'full'
    },
    {
      id: 10,
      image: '/images/1221-merchant-ln-mclean-va-22101/images-for-web-or-mls/1-web-or-mls-DSC03796.jpg',
      price: 1950000,
      title: '1221 Merchant Ln',
      beds: 5,
      baths: 4.5,
      type: 'house',
      location: 'McLean, VA 22101',
      size: 'wide'
    }
  ];

  const filteredListings = listings.filter(listing => {
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (listing.price < min || listing.price > max) return false;
    }
    if (filters.beds !== 'all' && listing.beds < Number(filters.beds)) return false;
    if (filters.baths !== 'all' && listing.baths < Number(filters.baths)) return false;
    if (filters.type !== 'all' && listing.type !== filters.type) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-16">
      {/* Filters */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-sm shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-light tracking-wider"
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
            >
              <option value="all">Any Price</option>
              <option value="0-500000">Under $500k</option>
              <option value="500000-1000000">$500k - $1M</option>
              <option value="1000000-2000000">$1M - $2M</option>
              <option value="2000000-999999999">$2M+</option>
            </select>

            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-light tracking-wider"
              value={filters.beds}
              onChange={(e) => setFilters({ ...filters, beds: e.target.value })}
            >
              <option value="all">Any Beds</option>
              <option value="1">1+ Beds</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
            </select>

            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-light tracking-wider"
              value={filters.baths}
              onChange={(e) => setFilters({ ...filters, baths: e.target.value })}
            >
              <option value="all">Any Baths</option>
              <option value="1">1+ Baths</option>
              <option value="2">2+ Baths</option>
              <option value="3">3+ Baths</option>
            </select>

            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-light tracking-wider"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="all">Any Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]"
        >
          <AnimatePresence>
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onClick={setSelectedListing}
                size={listing.size}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Listing Detail Modal */}
      <Dialog
        open={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl rounded-lg bg-white p-6">
            {selectedListing && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src={selectedListing.image}
                    alt={selectedListing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Dialog.Title className="text-2xl font-light tracking-wider uppercase mb-2">
                    {selectedListing.title}
                  </Dialog.Title>
                  <p className="text-3xl font-light text-blue-600 mb-4">
                    ${selectedListing.price.toLocaleString()}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-gray-600 font-light tracking-wider">Bedrooms</p>
                      <p className="font-light">{selectedListing.beds}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-light tracking-wider">Bathrooms</p>
                      <p className="font-light">{selectedListing.baths}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-light tracking-wider">Type</p>
                      <p className="font-light capitalize">{selectedListing.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-light tracking-wider">Location</p>
                      <p className="font-light">{selectedListing.location}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-3 bg-black text-white font-light tracking-wider uppercase text-sm hover:bg-gray-800 transition-all duration-300"
                  >
                    Schedule a Viewing
                  </motion.button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Listings; 