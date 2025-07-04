import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const TimelineItem = ({ year, title, description, image, delay, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -100 : 100, y: 50 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative mb-24 last:mb-0"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
        {/* Content */}
        <motion.div 
          className={`${isEven ? '' : 'lg:col-start-2'} space-y-6`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
        >
          <div className="inline-block">
            <span className="text-4xl md:text-5xl font-light text-navy tracking-wider">{year}</span>
            <motion.div 
              className="w-16 h-px bg-navy mt-2"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: delay + 0.4 }}
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-serif tracking-wide text-gray-900">{title}</h3>
          <p className="text-lg font-light text-gray-600 leading-relaxed">{description}</p>
        </motion.div>
        
        {/* Image */}
        <motion.div 
          className={`${isEven ? '' : 'lg:col-start-1 lg:row-start-1'} relative aspect-[4/3] rounded-lg overflow-hidden group`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      </div>
      
      {/* Timeline connector line */}
      {index !== 3 && (
        <motion.div 
          className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full w-px h-16 bg-gradient-to-b from-gray-300 to-transparent hidden lg:block"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.6 }}
        />
      )}
    </motion.div>
  );
};

const TeamMember = ({ member, isActive, onClick }) => {
  return (
    <motion.div
      className={`relative w-80 flex-shrink-0 cursor-pointer group transition-all duration-600 ease-out ${
        isActive 
          ? 'scale-105 z-20 ring-2 ring-gold-400/60 shadow-luxury-lg' 
          : 'scale-95 opacity-80 z-10'
      }`}
      onClick={onClick}
      whileHover={{ scale: isActive ? 1.05 : 1.02, y: -8 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-8 shadow-luxury group-hover:shadow-luxury-lg transition-all duration-600">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-800 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        
        {/* Quote overlay */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400"
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-gold-400/20">
            <p className="text-sm font-light italic text-gold-200">"{member.quote}"</p>
          </div>
        </motion.div>
        
        {/* Active indicator */}
        {isActive && (
          <motion.div 
            className="absolute top-4 right-4 w-3 h-3 bg-gold-400 rounded-full shadow-gold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
        )}
      </div>
      
      <div className="text-center px-4">
        <h3 className="text-xl font-serif tracking-wide text-gray-900 mb-2 group-hover:text-navy-700 transition-colors duration-300">{member.name}</h3>
        <p className="text-gold-600 font-medium tracking-wider uppercase text-sm mb-4 group-hover:text-gold-700 transition-colors duration-300">{member.title}</p>
        <p className="text-gray-600 font-light leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300">{member.description}</p>
      </div>
    </motion.div>
  );
};

const About = () => {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const timeline = [
    {
      year: '2008',
      title: 'Our Beginning',
      description: 'Founded with a vision to revolutionize the real estate experience through personalized service and cutting-edge technology. We started with one simple belief: every client deserves exceptional representation.',
      image: '/images/1221-merchant-ln-mclean-va-22101/images-for-web-or-mls/1-web-or-mls-DSC03796.jpg'
    },
    {
      year: '2015',
      title: 'Expanding Excellence',
      description: 'Opened our luxury property division and expanded into the Northern Virginia market. Our team grew to include specialized agents for high-end residential and commercial properties.',
      image: '/images/8452-holly-leaf-dr-mclean-va-22102/images-for-web-or-mls/1-web-or-mls-ARC02129.jpg'
    },
    {
      year: '2019',
      title: 'Digital Innovation',
      description: 'Launched our comprehensive digital platform featuring virtual tours, drone photography, and AI-powered market analysis. We became pioneers in digital-first real estate marketing.',
      image: '/images/9480-virginia-center-blvd-vienna-va-22181/images-for-web-or-mls/1-web-or-mls-MAX_0225.JPG'
    },
    {
      year: '2024',
      title: 'Today & Beyond',
      description: 'Leading the market with over 500 successful transactions, maintaining our position as the premier real estate group in the DMV area while continuously innovating for our clients.',
      image: '/images/1823-westmoreland-st-mclean-va-22101/images-for-web-or-mls/1-web-or-mls-DSC04653.jpg'
    }
  ];

  const team = [
    {
      name: 'Sarah Mitchell',
      title: 'Founder & Principal Broker',
      image: '/images/1221-merchant-ln-mclean-va-22101/images-for-web-or-mls/1-web-or-mls-DSC03796.jpg',
      description: 'With over 18 years of experience in luxury real estate, Sarah has facilitated over $500M in transactions across the DMV area.',
      quote: 'Excellence is not a skill, it\'s an attitude that drives everything we do.'
    },
    {
      name: 'David Chen',
      title: 'Luxury Properties Specialist',
      image: '/images/8452-holly-leaf-dr-mclean-va-22102/images-for-web-or-mls/1-web-or-mls-ARC02129.jpg',
      description: 'Specializing in high-end residential properties and investment opportunities. David brings technical expertise and market insight to every transaction.',
      quote: 'Every property tells a story. My job is to help you write the next chapter.'
    },
    {
      name: 'Maria Rodriguez',
      title: 'Client Relations Director',
      image: '/images/2914-willston-pl-apt-301-falls-church-va-22044/images-for-web-or-mls/1-web-or-mls-DSC02892.jpg',
      description: 'Leading our client experience initiatives and ensuring every interaction exceeds expectations. Maria\'s background in hospitality brings a unique touch to real estate.',
      quote: 'Relationships are the foundation of everything we build together.'
    },
    {
      name: 'James Wilson',
      title: 'Market Analysis Lead',
      image: '/images/181-e-reed-ave-alexandria-va-22305/images-for-web-or-mls/1-web-or-mls-DSC09195.jpg',
      description: 'Our data-driven approach to market analysis and pricing strategy. James ensures every decision is backed by comprehensive market intelligence.',
      quote: 'Data tells the story, but experience interprets the meaning.'
    }
  ];

  const handlePrevTeam = () => {
    setCurrentTeamIndex((prev) => (prev > 0 ? prev - 1 : team.length - 1));
  };

  const handleNextTeam = () => {
    setCurrentTeamIndex((prev) => (prev < team.length - 1 ? prev + 1 : 0));
  };

  return (
    <div ref={sectionRef} className="min-h-screen pt-16">
      {/* Enhanced Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/truview hero/11-web-or-mls-ARC04382.jpg"
            alt="Showcase Real Estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/50 via-navy-900/20 to-navy-900/50" />
        </div>
        
        <motion.div 
          className="relative text-center text-white max-w-5xl mx-auto px-4 z-10"
          style={{
            y: useTransform(scrollYProgress, [0, 0.3], [0, -50]),
            opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0])
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-hero font-serif tracking-wider uppercase mb-12 text-white drop-shadow-2xl"
            style={{
              textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.6), 0 16px 32px rgba(0,0,0,0.4)'
            }}
          >
            <span className="block text-white/95 mb-2 font-serif">Our</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 font-serif">
              Story
            </span>
          </motion.h1>
          
          <motion.div
            className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-luxury font-light leading-relaxed text-white/95 mb-6"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)'
            }}
          >
            Transforming dreams into addresses.<br />
            Building futures, one home at a time.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg font-light leading-relaxed text-gold-200/90 italic"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.7)'
            }}
          >
            "Where expertise meets excellence, and every transaction tells a story of success."
          </motion.p>
        </motion.div>
      </section>

      {/* Timeline Section - Full Width Experience */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-wider uppercase mb-6">
              Our Journey
            </h2>
            <motion.div
              className="w-24 h-px bg-navy mx-auto mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <p className="text-xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From a bold vision to market leadership, every milestone has shaped our commitment to excellence
            </p>
          </motion.div>

          <div className="space-y-0">
            {timeline.map((item, index) => (
              <TimelineItem
                key={item.year}
                {...item}
                index={index}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Carousel Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-wider uppercase mb-6">
              Meet Our Team
            </h2>
            <motion.div
              className="w-24 h-px bg-navy mx-auto mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <p className="text-xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Exceptional professionals united by a passion for real estate excellence
            </p>
          </motion.div>

          {/* Team Carousel */}
          <div className="relative">
            {/* Visual indicator */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-navy-900/20 backdrop-blur-luxury rounded-full text-xs text-navy-600 font-medium z-20 border border-gold-400/20">
              <span className="text-gold-600">✦</span> Click arrows or team members to navigate
            </div>
            <div className="flex items-center justify-center">
              <motion.button
                onClick={handlePrevTeam}
                className="absolute left-6 z-10 w-14 h-14 rounded-full bg-white/80 backdrop-blur-luxury flex items-center justify-center border border-gold-400/30 hover:bg-gold-50 hover:shadow-gold hover:border-gold-400/60 transition-all duration-400 group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeftIcon className="w-6 h-6 text-navy-700 group-hover:text-gold-600 transition-colors duration-300" />
              </motion.button>

              <div className="overflow-hidden w-full max-w-6xl relative py-8">
                <motion.div
                  className="flex gap-12 will-change-transform"
                  animate={{
                    x: `calc(50% - 160px - ${currentTeamIndex * 368}px)`
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 35
                  }}
                  style={{ width: `${team.length * 368}px` }}
                >
                  {team.map((member, index) => (
                    <TeamMember
                      key={index}
                      member={member}
                      isActive={index === currentTeamIndex}
                      onClick={() => setCurrentTeamIndex(index)}
                    />
                  ))}
                </motion.div>
              </div>

              <motion.button
                onClick={handleNextTeam}
                className="absolute right-6 z-10 w-14 h-14 rounded-full bg-white/80 backdrop-blur-luxury flex items-center justify-center border border-gold-400/30 hover:bg-gold-50 hover:shadow-gold hover:border-gold-400/60 transition-all duration-400 group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRightIcon className="w-6 h-6 text-navy-700 group-hover:text-gold-600 transition-colors duration-300" />
              </motion.button>
            </div>

            {/* Team navigation dots */}
            <div className="flex justify-center mt-16 gap-4">
              {team.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTeamIndex(index)}
                  className={`relative w-4 h-4 rounded-full transition-all duration-400 ${
                    currentTeamIndex === index 
                      ? 'bg-gold-500 scale-125 shadow-gold' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {currentTeamIndex === index && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gold-400 animate-pulse-luxury"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local Focus Block */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-light tracking-wider uppercase mb-8">
                DMV Area Experts
              </h2>
              <div className="w-16 h-px bg-navy mb-8" />
              <p className="text-lg font-light text-gray-600 leading-relaxed mb-8">
                With deep roots in the Washington DC metropolitan area, we serve Virginia, Maryland, and DC with unparalleled local expertise. Our intimate knowledge of neighborhoods, market trends, and community dynamics gives our clients a distinct advantage.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-navy rounded-full"></div>
                  <span className="font-light text-gray-700">Northern Virginia</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-navy rounded-full"></div>
                  <span className="font-light text-gray-700">Washington DC</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-navy rounded-full"></div>
                  <span className="font-light text-gray-700">Montgomery County, MD</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
            >
              <img
                src="/images/15092-rixeyville-lakes-ct-rixeyville-22737/images-for-web-or-mls/1-web-or-mls-10-print-DSC08172.jpg"
                alt="DMV Area"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 text-white relative overflow-hidden">
        {/* Background Enhancement */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-800/90 to-charcoal-900/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,215,0,0.12)_0%,transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,215,0,0.08)_0%,transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,215,0,0.02)_30%,transparent_70%,rgba(255,215,0,0.01)_100%)]" />
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-display font-light tracking-wider uppercase mb-10 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-white/95 mb-2 font-serif">Work with a Team</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 font-serif">
                You Can Trust
              </span>
            </motion.h2>
            
            <motion.div
              className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            
            <motion.p 
              className="text-luxury font-light mb-8 leading-relaxed text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Ready to experience the difference? Let's discuss your real estate goals and create a strategy that exceeds your expectations.
            </motion.p>
            
            <motion.p 
              className="text-lg font-light mb-16 leading-relaxed text-gold-200/80 italic max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              "Excellence isn't just our standard—it's our promise to you."
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 15px 40px rgba(255,215,0,0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-16 py-6 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 font-semibold tracking-wider uppercase text-sm overflow-hidden rounded-lg shadow-gold transition-all duration-400"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>Contact Our Team</span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 15px 40px rgba(255,255,255,0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-16 py-6 border-2 border-gold-400/80 text-gold-300 font-medium tracking-wider uppercase text-sm overflow-hidden rounded-lg backdrop-blur-sm transition-all duration-400"
              >
                <span className="relative z-10 group-hover:text-navy-900 transition-colors duration-400 flex items-center gap-3">
                  <span>Schedule a Call</span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
              </motion.button>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              className="mt-20 pt-8 border-t border-gold-400/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <p className="text-gold-200/90 font-light mb-8 text-lg">Connect with us directly:</p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-base">
                <motion.a 
                  href="tel:+1234567890"
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="group flex items-center gap-4 text-white hover:text-gold-300 transition-all duration-300 font-light tracking-wider"
                >
                  <span className="text-gold-400 group-hover:text-gold-300 transition-colors duration-300 text-xl">📞</span>
                  <span>(123) 456-7890</span>
                </motion.a>
                <motion.a 
                  href="mailto:info@truviewrealestate.com"
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="group flex items-center gap-4 text-white hover:text-gold-300 transition-all duration-300 font-light tracking-wider"
                >
                  <span className="text-gold-400 group-hover:text-gold-300 transition-colors duration-300 text-xl">✉️</span>
                  <span>info@truviewrealestate.com</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 