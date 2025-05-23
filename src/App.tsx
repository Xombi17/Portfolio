import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Utilities
import { initScroll, disableScroll, enableScroll, initSmoothScroll } from './utils/scrollUtils';
import { 
  initSmoothScrolling, 
  setupParallaxEffects, 
  refreshScrollTrigger,
  initAllScrollAnimations
} from './utils/gsapScrollUtils';

// Components
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

// Sections
import Hero, { FloatingBackground } from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Certificates from './sections/Certificates';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [_scrollInstance, setScrollInstance] = useState<any>(null);
  const [useGsapScroll, _setUseGsapScroll] = useState(true); // Use GSAP by default

  // Disable scrolling when the app loads
  useEffect(() => {
    if (isLoading) {
      disableScroll();
    } else {
      enableScroll();
    }
    
    return () => {
      enableScroll();
    };
  }, [isLoading]);

  // Initialize scroll behavior based on preference
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    
    if (!isLoading) {
      if (useGsapScroll) {
        // Initialize GSAP-based smooth scrolling
        cleanup = initSmoothScrolling();
        
        // Setup all scroll animations at once
        const animationCleanup = initAllScrollAnimations();
        
        // Refresh ScrollTrigger when all content is loaded
        window.addEventListener('load', refreshScrollTrigger);
        
        return () => {
          if (cleanup) cleanup();
          if (animationCleanup) animationCleanup();
          window.removeEventListener('load', refreshScrollTrigger);
        };
      } else {
        // Use original Locomotive Scroll implementation as fallback
        if (containerRef.current) {
          const instance = initScroll(containerRef.current);
          setScrollInstance(instance);
          
          return () => {
            if (instance) {
              instance.destroy();
            }
          };
        }
      }
    }
  }, [isLoading, useGsapScroll]);

  // Initialize anchor link smooth scrolling
  useEffect(() => {
    if (!isLoading) {
      initSmoothScroll();
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setContentVisible(true);
    // Reset scroll position to top
    window.scrollTo(0, 0);
    setTimeout(() => {
      setIsLoading(false);
    }, 300); // Shorter delay for faster transition
  };

  // Animation variants for main content
  const mainContentVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const _navVariants = {
    hidden: { 
      y: -20, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };


  return (
    <div className="bg-black text-white" id="smooth-wrapper">
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Custom cursor for desktop */}
      <CustomCursor />

      {/* Floating background that appears throughout the site */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <FloatingBackground />
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Navbar />
      </motion.div>

      {/* Main content */}
      <motion.div 
        ref={containerRef} 
        className="main-container"
        data-scroll-container
        id="smooth-content"
        initial="hidden"
        animate={contentVisible ? "visible" : "hidden"}
        variants={mainContentVariants}
      >
        <motion.div variants={sectionVariants} data-scroll-section>
          <Hero />
        </motion.div>

        <motion.div variants={sectionVariants} data-scroll-section>
          <About />
        </motion.div>

        <motion.div variants={sectionVariants} data-scroll-section>
          <Projects />
        </motion.div>

        <motion.div variants={sectionVariants} data-scroll-section>
          <Experience />
        </motion.div>

        <motion.div variants={sectionVariants} data-scroll-section>
          <Certificates />
        </motion.div>
        
        <motion.div variants={sectionVariants} data-scroll-section>
          <Contact />
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="py-10 px-4 text-center text-gray-400 text-sm" 
          data-scroll-section
          variants={sectionVariants}
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-4">
              <div className="text-2xl font-bold text-white mb-2">
                Varad<span className="text-blue-500">.</span>
              </div>
              <p>Creative Developer & Designer</p>
            </div>
            <div className="py-4 border-t border-zinc-800">
              © {new Date().getFullYear()} Varad Joshi. All rights reserved.
            </div>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
}

export default App;