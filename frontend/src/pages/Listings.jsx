import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';

const ListingCard = ({ listing, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative group cursor-pointer"
      onClick={() => onClick(listing)}
    >
      <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-xl font-semibold mb-1">{listing.title}</h3>
        <p className="text-2xl font-bold mb-2">${listing.price.toLocaleString()}</p>
        <div className="flex gap-4 text-sm">
          <span>{listing.beds} beds</span>
          <span>{listing.baths} baths</span>
        </div>
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
      image: '/images/listing1.jpg',
      price: 1250000,
      title: 'Modern Waterfront Estate',
      beds: 4,
      baths: 3.5,
      type: 'house',
      location: 'Downtown'
    },
    {
      id: 2,
      image: '/images/listing2.jpg',
      price: 850000,
      title: 'Downtown Penthouse',
      beds: 3,
      baths: 2,
      type: 'apartment',
      location: 'City Center'
    },
    {
      id: 3,
      image: '/images/listing3.jpg',
      price: 1950000,
      title: 'Luxury Hillside Villa',
      beds: 5,
      baths: 4.5,
      type: 'house',
      location: 'Hills'
    },
    {
      id: 4,
      image: '/images/listing4.jpg',
      price: 750000,
      title: 'Contemporary Townhouse',
      beds: 3,
      baths: 2.5,
      type: 'townhouse',
      location: 'Suburbs'
    },
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
      <div className="sticky top-16 z-40 bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.baths}
              onChange={(e) => setFilters({ ...filters, baths: e.target.value })}
            >
              <option value="all">Any Baths</option>
              <option value="1">1+ Baths</option>
              <option value="2">2+ Baths</option>
              <option value="3">3+ Baths</option>
            </select>

            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onClick={setSelectedListing}
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
                  <Dialog.Title className="text-2xl font-bold mb-2">
                    {selectedListing.title}
                  </Dialog.Title>
                  <p className="text-3xl font-bold text-blue-600 mb-4">
                    ${selectedListing.price.toLocaleString()}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-gray-600">Bedrooms</p>
                      <p className="font-semibold">{selectedListing.beds}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Bathrooms</p>
                      <p className="font-semibold">{selectedListing.baths}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Type</p>
                      <p className="font-semibold capitalize">{selectedListing.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-semibold">{selectedListing.location}</p>
                    </div>
                  </div>
                  <button className="btn btn-primary w-full">
                    Schedule a Viewing
                  </button>
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