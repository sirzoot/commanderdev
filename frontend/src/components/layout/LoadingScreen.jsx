import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const counterRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadingScreens = [
    { message: 'Loading Experience', duration: 1000 },
    { message: 'Preparing Showcase', duration: 1000 },
    { message: 'Welcome to Realty', duration: 1000 },
  ];

  const customEase = [0.18, 0.71, 0.11, 1];

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

    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsLoading(false);
        onLoadingComplete();
      }, 800);
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
              <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-50/50 to-transparent" />
              <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-50/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-50/50 to-transparent" />
              <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-blue-50/50 to-transparent" />
            </div>

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
                  alt="TruView Real Estate"
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: customEase }}
                className="mt-12 text-center"
              >
                <motion.h2
                  key={currentScreen}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: customEase }}
                  className="text-3xl font-light tracking-wider text-gray-800"
                >
                  {loadingScreens[currentScreen].message}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-8 text-5xl font-light text-gray-800"
                >
                  {counter}%
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen; 