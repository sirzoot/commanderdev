import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { ChatBubbleLeftRightIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';

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
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Let's Talk
            </h1>
            <p className="text-xl text-charcoal max-w-2xl mx-auto">
              Real people. Fast response. We're here to help with all your real estate needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              {isSubmitted ? (
                <div className="text-center py-8">
                  <h3 className="text-2xl font-bold text-navy mb-4">Thank You!</h3>
                  <p className="text-charcoal mb-6">We'll get back to you shortly.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-charcoal mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <PhoneIcon className="w-6 h-6 text-navy mt-1" />
                    <div>
                      <h4 className="font-semibold text-charcoal">Phone</h4>
                      <p className="text-charcoal">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <EnvelopeIcon className="w-6 h-6 text-navy mt-1" />
                    <div>
                      <h4 className="font-semibold text-charcoal">Email</h4>
                      <p className="text-charcoal">info@showcase.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPinIcon className="w-6 h-6 text-navy mt-1" />
                    <div>
                      <h4 className="font-semibold text-charcoal">Office</h4>
                      <p className="text-charcoal">
                        123 Real Estate Ave<br />
                        Suite 100<br />
                        City, State 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-charcoal mb-6">Business Hours</h3>
                <div className="space-y-2">
                  <p className="text-charcoal">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-charcoal">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-charcoal">Sunday: Closed</p>
                </div>
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