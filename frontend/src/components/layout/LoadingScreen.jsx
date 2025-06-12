import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [showCounter, setShowCounter] = useState(true);

  const loadingScreens = [
    { message: 'Loading Experience', duration: 400 },
    { message: 'Preparing Showcase', duration: 400 },
    { message: 'Welcome to Realty', duration: 400 },
  ];

  // Custom easing functions for premium feel
  const customEase = [0.18, 0.71, 0.11, 1];
  const slideEase = [0.2, 0.8, 0.2, 1]; // Modified for quick-then-slow effect

  useEffect(() => {
    let startTime;
    let animationFrame;
    let currentCount = 0;
    const totalDuration = loadingScreens.reduce((acc, screen) => acc + screen.duration, 0);
    const targetCount = 100;

    const animateCounter = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      currentCount = Math.floor(progress * targetCount);
      setCounter(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCounter);
      }
    };

    animationFrame = requestAnimationFrame(animateCounter);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  useEffect(() => {
    const totalDuration = loadingScreens.reduce((acc, screen) => acc + screen.duration, 0);
    let currentDuration = 0;

    loadingScreens.forEach((screen, index) => {
      setTimeout(() => {
        setCurrentScreen(index);
      }, currentDuration);
      currentDuration += screen.duration;
    });

    // Sequence the animations
    setTimeout(() => {
      setShowCounter(false); // Hide counter before welcome animation
      setTimeout(() => {
        setShowWelcome(true);
        setTimeout(() => {
          setShowBrand(true);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              setIsLoading(false);
              onLoadingComplete();
            }, 800);
          }, 1000);
        }, 300); // Small delay before welcome animation starts
      }, 300); // Small delay before welcome animation starts
    }, totalDuration);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-white"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          }}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Corner Gradients */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-gray-100/50 to-transparent" />
              <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-gray-100/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-gray-100/50 to-transparent" />
              <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-gray-100/50 to-transparent" />
            </div>

            {/* Initial Loading Screen */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0, y: -window.innerHeight * 0.3 }}
              transition={{ duration: 0.8, ease: customEase }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="relative">
                <img
                  src="/images/Image Files/Image Files/logo.png"
                  alt="Showcase Realty"
                  className="h-64 w-auto"
                  style={{
                    maskImage: 'url(/images/icon-ellipse.svg)',
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: 'url(/images/icon-ellipse.svg)',
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                  }}
                />
              </div>
              <AnimatePresence>
                {showCounter && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 text-5xl font-light text-gray-800"
                  >
                    {counter}%
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Welcome Panel */}
            <AnimatePresence>
              {showWelcome && (
                <motion.div
                  initial={{ x: '-120%' }}
                  animate={{ x: '-10%' }}
                  exit={{ x: '-100%' }}
                  transition={{ 
                    duration: 1.2,
                    ease: slideEase,
                    times: [0, 0.3, 1] // Quick initial movement, then slow
                  }}
                  className="absolute top-0 left-0 w-full h-1/2 bg-white flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4, ease: customEase }}
                    className="w-full h-full relative"
                  >
                    <img
                      src="/images/11-web-or-mls-ARC04382 (1).jpg"
                      alt="Welcome to"
                      className="w-full h-full"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        maxHeight: '100%',
                        maxWidth: '100%',
                        padding: '0.5rem',
                        aspectRatio: '16/9'
                      }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Brand Panel */}
            <AnimatePresence>
              {showBrand && (
                <motion.div
                  initial={{ x: '120%' }}
                  animate={{ x: '10%' }}
                  exit={{ x: '100%' }}
                  transition={{ 
                    duration: 1.2,
                    ease: slideEase,
                    times: [0, 0.3, 1] // Quick initial movement, then slow
                  }}
                  className="absolute bottom-0 left-0 w-full h-1/2 bg-white flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(0deg, #ffffff 0%, #f8f9fa 100%)',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4, ease: customEase }}
                    className="w-full h-full relative"
                  >
                    <img
                      src="/images/18-web-or-mls-ARC04424.jpg"
                      alt="Showcase Realty"
                      className="w-full h-full"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        maxHeight: '100%',
                        maxWidth: '100%',
                        padding: '0.5rem',
                        aspectRatio: '16/9'
                      }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen; 