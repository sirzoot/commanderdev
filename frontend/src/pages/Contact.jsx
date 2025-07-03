import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { ChatBubbleLeftRightIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Enhanced Hero Section */}
      <section className="relative py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wider uppercase mb-8 text-gray-900">
              Let's Talk
            </h1>
            <motion.div
              className="w-24 h-px bg-navy mx-auto mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed">
              Real people. Fast response.<br />
              We're here to help with all your real estate needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chat Banner */}
      <section className="py-4 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4 text-white"
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            <span className="font-light">Prefer instant help?</span>
            <button
              onClick={() => setIsChatOpen(true)}
              className="font-medium underline hover:no-underline transition-all duration-200"
            >
              Chat now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-light tracking-wide text-gray-900 mb-4">Thank You!</h3>
                    <p className="text-lg font-light text-gray-600 mb-8">We'll get back to you within 24 hours.</p>
                    <div className="space-y-4">
                      <p className="text-sm font-light text-gray-500">While you wait, explore our latest listings or follow us on social media.</p>
                      <div className="flex justify-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsSubmitted(false)}
                          className="px-6 py-3 border border-gray-300 text-gray-700 font-light tracking-wider uppercase text-sm hover:bg-gray-50 transition-all duration-300"
                        >
                          Send Another Message
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 bg-navy text-white font-light tracking-wider uppercase text-sm hover:bg-gray-800 transition-all duration-300"
                        >
                          View Listings
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-light tracking-wider text-gray-700 mb-3 uppercase">
                          Name *
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          className="w-full px-6 py-4 rounded-none border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-navy transition-all duration-300 text-lg font-light placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-light tracking-wider text-gray-700 mb-3 uppercase">
                          Email *
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="w-full px-6 py-4 rounded-none border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-navy transition-all duration-300 text-lg font-light placeholder-gray-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-light tracking-wider text-gray-700 mb-3 uppercase">
                        Phone (Optional)
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className="w-full px-6 py-4 rounded-none border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-navy transition-all duration-300 text-lg font-light placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-light tracking-wider text-gray-700 mb-3 uppercase">
                        Message *
                      </label>
                      <motion.textarea
                        whileFocus={{ scale: 1.01 }}
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your real estate needs..."
                        className="w-full px-6 py-4 rounded-none border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-navy transition-all duration-300 text-lg font-light placeholder-gray-400 resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 10px 30px rgba(10,17,40,0.2)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-8 py-4 bg-navy text-white font-light tracking-wider uppercase text-sm hover:bg-gray-800 transition-all duration-300 shadow-lg"
                    >
                      Send Message
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info - Takes 1 column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-light tracking-wide text-gray-900 mb-8 uppercase">
                  Contact Information
                </h3>
                <div className="space-y-8">
                  <motion.a
                    href="tel:+15551234567"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-navy/10 rounded-full flex items-center justify-center group-hover:bg-navy/20 transition-colors duration-300">
                      <PhoneIcon className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <h4 className="font-light tracking-wider text-gray-700 text-sm uppercase mb-2">Phone</h4>
                      <p className="text-lg font-light text-gray-900 group-hover:text-navy transition-colors">(555) 123-4567</p>
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="mailto:info@showcaserealty.com"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-navy/10 rounded-full flex items-center justify-center group-hover:bg-navy/20 transition-colors duration-300">
                      <EnvelopeIcon className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <h4 className="font-light tracking-wider text-gray-700 text-sm uppercase mb-2">Email</h4>
                      <p className="text-lg font-light text-gray-900 group-hover:text-navy transition-colors">info@showcaserealty.com</p>
                    </div>
                  </motion.a>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-navy/10 rounded-full flex items-center justify-center">
                      <MapPinIcon className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <h4 className="font-light tracking-wider text-gray-700 text-sm uppercase mb-2">Office</h4>
                      <p className="text-lg font-light text-gray-900 leading-relaxed">
                        8484 Westpark Drive<br />
                        Suite 630<br />
                        McLean, VA 22102
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-light tracking-wide text-gray-900 mb-8 uppercase">
                  Business Hours
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <ClockIcon className="w-5 h-5 text-navy" />
                    <div className="flex-1">
                      <p className="font-light text-gray-900">Monday - Friday</p>
                      <p className="text-sm font-light text-gray-600">9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <ClockIcon className="w-5 h-5 text-navy" />
                    <div className="flex-1">
                      <p className="font-light text-gray-900">Saturday</p>
                      <p className="text-sm font-light text-gray-600">10:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <ClockIcon className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="font-light text-gray-500">Sunday</p>
                      <p className="text-sm font-light text-gray-400">By Appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-navy rounded-lg p-8 text-white">
                <h3 className="text-xl font-light tracking-wide mb-4 uppercase">
                  Emergency Contact
                </h3>
                <p className="font-light text-white/90 mb-4 text-sm">
                  For urgent real estate matters outside business hours
                </p>
                <motion.a
                  href="tel:+15559876543"
                  whileHover={{ scale: 1.02 }}
                  className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-light tracking-wider uppercase text-sm transition-all duration-300 backdrop-blur-sm"
                >
                  Call Emergency Line
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-navy text-white p-4 rounded-full shadow-lg hover:bg-charcoal transition-colors"
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
      </button>

      <Dialog
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-charcoal/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full rounded-lg bg-white p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-bold">
                Chat with Us
              </Dialog.Title>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-charcoal hover:text-gray-800"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="h-96 bg-gray-100 rounded-lg p-4 mb-4">
              {/* Chat messages would go here */}
              <p className="text-charcoal text-center mt-4">
                Start a conversation with our team
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button className="btn btn-primary">
                Send
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Contact; 