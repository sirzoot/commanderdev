import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              duration: 0.4,
              ease: [0.18, 0.71, 0.11, 1]
            }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-light">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const VideoBackground = ({ src, poster, onLoadedData, className = "" }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log("Initializing video with source:", src);
    video.preload = "auto";

    const handleLoadedData = () => {
      console.log("Video loaded successfully");
      setIsLoaded(true);
      onLoadedData?.();
      
      // Auto-play with error handling
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video playback started");
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Auto-play prevented:", error);
            setHasError(true);
          });
      }
    };

    const handleError = (e) => {
      console.error("Video error:", e);
      console.error("Video error code:", video.error?.code);
      console.error("Video error message:", video.error?.message);
      setHasError(true);
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const progress = (video.buffered.end(video.buffered.length - 1) / video.duration) * 100;
        setLoadingProgress(progress);
        console.log(`Video loading progress: ${progress.toFixed(2)}%`);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Start loading the video
    console.log("Starting video load...");
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [src, onLoadedData]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(error => {
        console.error("Failed to play video:", error);
        setHasError(true);
      });
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    video.volume = video.muted ? 0 : 1;
    setIsMuted(video.muted);
  };

  if (hasError) {
    console.log("Falling back to poster image due to video error");
    return (
      <div className={`bg-gray-900 ${className}`}>
        <img 
          src={poster} 
          alt="Hero background" 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        muted={true}
        loop
        playsInline
        preload="auto"
        style={{ 
          filter: 'brightness(0.8) contrast(1.1)',
          transform: 'scale(1.02)' // Slight scale to avoid edge artifacts
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm opacity-80">Loading video... {loadingProgress.toFixed(0)}%</p>
          </div>
        </div>
      )}

      {/* Video Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlayPause}
          className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </motion.button>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50 pointer-events-none" />
    </div>
  );
};

const LoadingAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-white z-[100] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.1, opacity: 0 }}
        transition={{ 
          duration: 1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="text-center"
      >
        <motion.img
          src="/images/Image Files/Image Files/logo horizontal.png"
          alt="Showcase Real Estate"
          className="h-24 md:h-32 mx-auto mb-6"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />
        <motion.div
          className="w-12 h-0.5 bg-gray-900 mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
};

const VideoHero = ({ lenis }) => {
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Smooth scroll transforms
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleBuyClick = () => {
    if (lenis) {
      lenis.scrollTo('#featured-listings', {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      const listingsSection = document.getElementById('featured-listings');
      if (listingsSection) {
        listingsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const handleSellSubmit = (e) => {
    e.preventDefault();
    setIsSellModalOpen(false);
  };

  const handleEstimateSubmit = (e) => {
    e.preventDefault();
    setIsEstimateModalOpen(false);
  };

  const MagneticButton = ({ children, onClick, delay }) => {
    const buttonRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + 
        Math.pow(e.clientY - centerY, 2)
      );
      
      if (distance < 100) {
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const force = (100 - distance) / 100;
        x.set(Math.cos(angle) * force * 15);
        y.set(Math.sin(angle) * force * 15);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.button
        ref={buttonRef}
        style={{ x, y }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 10px 30px rgba(255,255,255,0.2)"
        }}
        whileTap={{ scale: 0.98 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="px-10 py-3 bg-white text-gray-900 font-medium tracking-wide uppercase text-sm hover:bg-gray-50 transition-all duration-300 shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 1.2, duration: 0.6 }}
      >
        {children}
      </motion.button>
    );
  };

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
    setShowLoading(false);
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <>
      <AnimatePresence>
        {showLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <motion.div 
        ref={heroRef}
        style={{
          opacity,
          height: '100vh'
        }}
        className="hero-section relative w-full overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <VideoBackground
            src="/images/McLean_Mansion_Video_Ready - Trim.mp4"
            poster="/images/truview hero/11-web-or-mls-ARC04382.jpg"
            onLoadedData={handleVideoLoaded}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Content Overlay */}
        <motion.div 
          className="relative h-full flex flex-col items-center justify-center text-white px-4 z-20"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -50])
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={loadingComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center max-w-4xl mx-auto relative z-20"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={loadingComplete ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8 relative z-20"
            >
              <img
                src="/images/Image Files/Image Files/logo horizontal.png"
                alt="Showcase Real Estate"
                className="h-20 md:h-28 mx-auto filter drop-shadow-lg"
              />
            </motion.div>

            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-4 tracking-wide uppercase relative z-20 text-white"
              style={{
                textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.6), 0 16px 32px rgba(0,0,0,0.4)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={loadingComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Your Home, Showcased to Perfection
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-10 font-light tracking-wider uppercase relative z-20 text-white/95"
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)'
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={loadingComplete ? { opacity: 0.9, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Experience The Future of Real Estate
            </motion.p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center relative z-20">
              <MagneticButton onClick={handleBuyClick} delay={0}>
                Buy
              </MagneticButton>
              <MagneticButton onClick={() => setIsSellModalOpen(true)} delay={0.1}>
                Sell
              </MagneticButton>
              <MagneticButton onClick={() => setIsEstimateModalOpen(true)} delay={0.2}>
                Get Estimate
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>

        {/* Minimal Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loadingComplete ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0])
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-5 h-8 border border-white/50 rounded-full flex justify-center backdrop-blur-sm">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              className="w-0.5 h-2 bg-white/70 rounded-full mt-1.5"
            />
          </div>
        </motion.div>

        {/* Modals */}
        <Modal
          isOpen={isSellModalOpen}
          onClose={() => setIsSellModalOpen(false)}
          title="Home Valuation"
        >
          <form onSubmit={handleSellSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Submit
            </motion.button>
          </form>
        </Modal>

        <Modal
          isOpen={isEstimateModalOpen}
          onClose={() => setIsEstimateModalOpen(false)}
          title="Get Your Estimate"
        >
          <form onSubmit={handleEstimateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                required
              >
                <option value="">Select type</option>
                <option value="single-family">Single Family</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="multi-family">Multi-Family</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Square Footage</label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Get Estimate
            </motion.button>
          </form>
        </Modal>
      </motion.div>
    </>
  );
};

export default VideoHero;

