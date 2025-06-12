import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Listings', href: '/listings' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      if (isHomePage) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHomePage]);

  useEffect(() => {
    // Show navbar after a short delay to sync with loading screen
    const timer = setTimeout(() => {
      setShowNavbar(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const customEase = [0.18, 0.71, 0.11, 1];

  return (
    <>
      <AnimatePresence>
        {showNavbar && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              height: isHomePage && !isVisible ? '0px' : '80px'
            }}
            transition={{ duration: 0.8, ease: customEase }}
            className={`fixed w-full z-50 transition-all duration-300 overflow-hidden ${
              isHomePage 
                ? (isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent')
                : 'bg-white/90 backdrop-blur-sm shadow-sm'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center items-center h-20">
                <div className="flex items-center space-x-12">
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: isHomePage && !isVisible ? 0 : 1 
                    }}
                    transition={{ duration: 0.5, ease: customEase }}
                    className="flex-shrink-0"
                  >
                    <Link to="/" className="block">
                      <img
                        src="/images/Image Files/Image Files/logo.png"
                        alt="TruView Real Estate"
                        className={`h-12 transition-all duration-300 ${
                          isHomePage && !isScrolled ? 'brightness-0 invert' : ''
                        }`}
                      />
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ 
                      opacity: isHomePage && !isVisible ? 0 : 1, 
                      y: 0 
                    }}
                    transition={{ duration: 0.5, delay: 0.2, ease: customEase }}
                    className="hidden md:flex items-center space-x-8"
                  >
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`${
                          isHomePage && !isScrolled 
                            ? 'text-white hover:text-white/80' 
                            : 'text-gray-800 hover:text-gray-600'
                        } px-3 py-2 text-sm font-light tracking-wider uppercase transition-colors duration-200`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-8 py-3 text-sm font-light tracking-wider uppercase transition-all duration-300 ${
                        isHomePage && !isScrolled
                          ? 'bg-white text-black hover:bg-opacity-90'
                          : 'bg-black text-white hover:bg-gray-800'
                      }`}
                    >
                      Get Estimate
                    </motion.button>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ 
                    opacity: isHomePage && !isVisible ? 0 : 1, 
                    y: 0 
                  }}
                  transition={{ duration: 0.5, delay: 0.2, ease: customEase }}
                  className="md:hidden absolute right-4"
                >
                  <button
                    type="button"
                    className={`inline-flex items-center justify-center p-2 rounded-md ${
                      isHomePage && !isScrolled ? 'text-white' : 'text-gray-700'
                    } hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <Dialog
        as="div"
        className="md:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <img
                src="/images/Image Files/Image Files/logo.png"
                alt="TruView Real Estate"
                className="h-12"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-light tracking-wider uppercase leading-7 text-gray-800 hover:bg-gray-50 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-3 text-sm font-light tracking-wider uppercase bg-black text-white hover:bg-gray-800 transition-all duration-300"
                >
                  Get Estimate
                </motion.button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default Navbar; 