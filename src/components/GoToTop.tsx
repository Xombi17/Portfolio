import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollTo } from '../utils/scrollUtils';

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button when page is scrolled down
    const handleScroll = () => {
      // Show when scrolled down 30% of viewport height
      const scrollThreshold = window.innerHeight * 0.3;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    // Listen to custom locomotive scroll events
    const handleSmoothScroll = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail.progress === 'number' && customEvent.detail.progress > 0.1) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('smooth-scroll', handleSmoothScroll as EventListener);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('smooth-scroll', handleSmoothScroll as EventListener);
    };
  }, []);

  const scrollToTop = () => {
    scrollTo('#hero', { 
      duration: 1500,
      easing: [0.25, 0.1, 0.25, 1.0]
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="go-to-top fixed bottom-8 right-8 w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg z-50 flex items-center justify-center"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          aria-label="Go to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default GoToTop; 