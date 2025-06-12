import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const TimelineItem = ({ year, title, description, image, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5, delay }}
      className="relative pl-8 pb-12 border-l-2 border-gray-200"
    >
      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gold" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <span className="text-gold font-semibold">{year}</span>
          <h3 className="text-xl font-bold mt-2 mb-4">{title}</h3>
          <p className="text-charcoal">{description}</p>
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

const TeamMember = ({ name, title, image, description, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-navy mb-4">{title}</p>
      <p className="text-charcoal max-w-xs mx-auto">{description}</p>
    </motion.div>
  );
};

const About = () => {
  const timeline = [
    {
      year: '2008',
      title: 'Our Beginning',
      description: 'Started with a vision to transform the real estate experience.',
      image: '/images/about1.jpg'
    },
    {
      year: '2012',
      title: 'Expanding Horizons',
      description: 'Opened our second office and expanded our team.',
      image: '/images/about2.jpg'
    },
    {
      year: '2018',
      title: 'Digital Innovation',
      description: 'Launched our digital platform for seamless property viewing.',
      image: '/images/about3.jpg'
    },
    {
      year: '2023',
      title: 'Today',
      description: 'Continuing to set new standards in real estate excellence.',
      image: '/images/about4.jpg'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      title: 'Founder & CEO',
      image: '/images/team1.jpg',
      description: 'With over 15 years of experience in luxury real estate.'
    },
    {
      name: 'Michael Chen',
      title: 'Lead Agent',
      image: '/images/team2.jpg',
      description: 'Specializing in high-end residential properties.'
    },
    {
      name: 'Emma Rodriguez',
      title: 'Marketing Director',
      image: '/images/team3.jpg',
      description: 'Creating innovative marketing strategies for our listings.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/images/about-hero.jpg"
            alt="About Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/50" />
        </div>
        <div className="relative text-center text-white max-w-3xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl"
          >
            Building dreams into reality, one home at a time.
          </motion.p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Our Journey
            </h2>
            <p className="text-charcoal max-w-2xl mx-auto">
              From humble beginnings to becoming a trusted name in real estate
            </p>
          </motion.div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <TimelineItem
                key={item.year}
                {...item}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Meet Our Team
            </h2>
            <p className="text-charcoal max-w-2xl mx-auto">
              Dedicated professionals committed to your real estate success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <TeamMember
                key={member.name}
                {...member}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Work with a Team You Can Trust
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us help you find your perfect home or sell your property
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline hover:text-navy"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 