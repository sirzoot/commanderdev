import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext(null);

export const useLenis = () => {
  const lenis = useContext(LenisContext);
  if (!lenis) {
    throw new Error('useLenis must be used within a LenisProvider');
  }
  return lenis;
};

export default function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initLenis = () => {
      try {
        const lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        });

        setLenis(lenisInstance);
        setIsInitialized(true);

        function raf(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      } catch (error) {
        console.error('Failed to initialize Lenis:', error);
      }
    };

    initLenis();

    return () => {
      if (lenis) {
        lenis.destroy();
        setLenis(null);
        setIsInitialized(false);
      }
    };
  }, []);

  if (!isInitialized) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

