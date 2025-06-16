import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ListingCard = ({ listing, onClick, size = 'normal' }) => {
  const cardClasses = {
    normal: 'col-span-4 row-span-1',
    wide: 'col-span-8 row-span-1',
    tall: 'col-span-4 row-span-2',
    full: 'col-span-8 row-span-2',
    featured: 'col-span-12 row-span-2'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`relative group cursor-pointer ${cardClasses[size]} h-full`}
      onClick={() => onClick(listing)}
    >
      <div className="relative overflow-hidden rounded-lg h-full">
        <motion.img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0"
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl font-light tracking-wider uppercase mb-2">{listing.title}</h3>
        <p className="text-3xl font-light mb-3">${listing.price.toLocaleString()}</p>
        <div className="flex gap-6 text-sm font-light tracking-wider mb-4">
          <span>{listing.beds} beds</span>
          <span>{listing.baths} baths</span>
          <span className="capitalize">{listing.type}</span>
        </div>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 bg-white text-charcoal text-sm font-light tracking-wider uppercase hover:bg-opacity-90 transition-all duration-300"
        >
          View Details
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const Listings = () => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    beds: 'all',
    baths: 'all',
    type: 'all',
    location: 'all'
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  const locations = [
    'Vienna',
    'McLean',
    'Falls Church',
    'Springfield',
    'Alexandria',
    'Woodbridge',
    'Rixeyville'
  ];

  const FilterButton = ({ label, value, options, onChange }) => (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setActiveFilter(activeFilter === label ? null : label)}
        className={`px-6 py-3 rounded-full text-sm font-light tracking-wider uppercase transition-all duration-300 ${
          activeFilter === label 
            ? 'bg-navy text-white' 
            : 'bg-white/10 text-navy hover:bg-white/20'
        }`}
      >
        {label}
      </motion.button>
      
      <AnimatePresence>
        {activeFilter === label && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-4 z-50"
          >
            {options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ x: 5 }}
                onClick={() => {
                  onChange(option.value);
                  setActiveFilter(null);
                }}
                className={`w-full text-left px-4 py-2 text-sm font-light tracking-wider ${
                  value === option.value ? 'text-navy' : 'text-gray-600'
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

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
    if (filters.location !== 'all' && listing.location !== filters.location) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm rounded-full shadow-lg p-4 mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <FilterButton
              label="Price"
              value={filters.priceRange}
              options={[
                { value: 'all', label: 'Any Price' },
                { value: '0-500000', label: 'Under $500k' },
                { value: '500000-1000000', label: '$500k - $1M' },
                { value: '1000000-2000000', label: '$1M - $2M' },
                { value: '2000000-999999999', label: '$2M+' }
              ]}
              onChange={(value) => setFilters({ ...filters, priceRange: value })}
            />
            <FilterButton
              label="Beds"
              value={filters.beds}
              options={[
                { value: 'all', label: 'Any Beds' },
                { value: '1', label: '1+ Beds' },
                { value: '2', label: '2+ Beds' },
                { value: '3', label: '3+ Beds' },
                { value: '4', label: '4+ Beds' }
              ]}
              onChange={(value) => setFilters({ ...filters, beds: value })}
            />
            <FilterButton
              label="Baths"
              value={filters.baths}
              options={[
                { value: 'all', label: 'Any Baths' },
                { value: '1', label: '1+ Baths' },
                { value: '2', label: '2+ Baths' },
                { value: '3', label: '3+ Baths' }
              ]}
              onChange={(value) => setFilters({ ...filters, baths: value })}
            />
            <FilterButton
              label="Type"
              value={filters.type}
              options={[
                { value: 'all', label: 'Any Type' },
                { value: 'house', label: 'House' },
                { value: 'apartment', label: 'Apartment' },
                { value: 'townhouse', label: 'Townhouse' }
              ]}
              onChange={(value) => setFilters({ ...filters, type: value })}
            />
            <FilterButton
              label="Location"
              value={filters.location}
              options={[
                { value: 'all', label: 'Any Location' },
                ...locations.map(loc => ({ value: loc, label: loc }))
              ]}
              onChange={(value) => setFilters({ ...filters, location: value })}
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilters({
              priceRange: 'all',
              beds: 'all',
              baths: 'all',
              type: 'all',
              location: 'all'
            })}
            className="px-6 py-3 text-sm font-light tracking-wider uppercase text-gray-600 hover:text-navy transition-colors duration-300"
          >
            Reset
          </motion.button>
        </motion.div>

        <div className="flex gap-8">
          <div className="flex-1">
            <motion.div
              layout
              className="grid grid-cols-12 gap-4 h-full"
              style={{
                gridAutoRows: 'minmax(300px, 1fr)',
                gridAutoFlow: 'dense'
              }}
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

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block w-80 flex-shrink-0"
          >
            <div className="sticky top-24 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-light tracking-wider uppercase mb-6">Filters</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-light tracking-wider text-gray-600 mb-2">Price Range</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold font-light tracking-wider"
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  >
                    <option value="all">Any Price</option>
                    <option value="0-500000">Under $500k</option>
                    <option value="500000-1000000">$500k - $1M</option>
                    <option value="1000000-2000000">$1M - $2M</option>
                    <option value="2000000-999999999">$2M+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-light tracking-wider text-gray-600 mb-2">Bedrooms</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold font-light tracking-wider"
                    value={filters.beds}
                    onChange={(e) => setFilters({ ...filters, beds: e.target.value })}
                  >
                    <option value="all">Any Beds</option>
                    <option value="1">1+ Beds</option>
                    <option value="2">2+ Beds</option>
                    <option value="3">3+ Beds</option>
                    <option value="4">4+ Beds</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-light tracking-wider text-gray-600 mb-2">Bathrooms</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold font-light tracking-wider"
                    value={filters.baths}
                    onChange={(e) => setFilters({ ...filters, baths: e.target.value })}
                  >
                    <option value="all">Any Baths</option>
                    <option value="1">1+ Baths</option>
                    <option value="2">2+ Baths</option>
                    <option value="3">3+ Baths</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-light tracking-wider text-gray-600 mb-2">Property Type</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold font-light tracking-wider"
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  >
                    <option value="all">Any Type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="townhouse">Townhouse</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFilters({
                    priceRange: 'all',
                    beds: 'all',
                    baths: 'all',
                    type: 'all'
                  })}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-600 font-light tracking-wider hover:bg-gray-50 transition-all duration-300"
                >
                  Reset Filters
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileFiltersOpen(true)}
          className="px-6 py-3 bg-navy text-white font-light tracking-wider uppercase text-sm rounded-full shadow-lg hover:bg-charcoal transition-all duration-300"
        >
          Filters
        </motion.button>
      </div>

      <Dialog
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        className="relative z-50 lg:hidden"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-end justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-t-2xl bg-white p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light tracking-wider uppercase">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-light tracking-wider text-gray-600 mb-2">Price Range</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold font-light tracking-wider"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                >
                  <option value="all">Any Price</option>
                  <option value="0-500000">Under $500k</option>
                  <option value="500000-1000000">$500k - $1M</option>
                  <option value="1000000-2000000">$1M - $2M</option>
                  <option value="2000000-999999999">$2M+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-light tracking-wider text-gray-600 mb-2">Bedrooms</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold font-light tracking-wider"
                  value={filters.beds}
                  onChange={(e) => setFilters({ ...filters, beds: e.target.value })}
                >
                  <option value="all">Any Beds</option>
                  <option value="1">1+ Beds</option>
                  <option value="2">2+ Beds</option>
                  <option value="3">3+ Beds</option>
                  <option value="4">4+ Beds</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-light tracking-wider text-gray-600 mb-2">Bathrooms</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold font-light tracking-wider"
                  value={filters.baths}
                  onChange={(e) => setFilters({ ...filters, baths: e.target.value })}
                >
                  <option value="all">Any Baths</option>
                  <option value="1">1+ Baths</option>
                  <option value="2">2+ Baths</option>
                  <option value="3">3+ Baths</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-light tracking-wider text-gray-600 mb-2">Property Type</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold font-light tracking-wider"
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                  <option value="all">Any Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="townhouse">Townhouse</option>
                </select>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setFilters({
                      priceRange: 'all',
                      beds: 'all',
                      baths: 'all',
                      type: 'all'
                    });
                    setMobileFiltersOpen(false);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-600 font-light tracking-wider hover:bg-gray-50 transition-all duration-300"
                >
                  Reset
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 px-4 py-3 bg-navy text-white font-light tracking-wider uppercase hover:bg-charcoal transition-all duration-300"
                >
                  Apply
                </motion.button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

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
                  <p className="text-3xl font-light text-gold mb-4">
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
                    className="w-full px-8 py-3 bg-navy text-white font-light tracking-wider uppercase text-sm hover:bg-charcoal transition-all duration-300"
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