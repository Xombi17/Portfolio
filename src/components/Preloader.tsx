import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader = ({ onLoadingComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCircle, setShowCircle] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + Math.random() * 8; // Faster progress
        if (nextProgress >= 100) {
          clearInterval(timer);
          // Ensure progress is exactly 100%
          setTimeout(() => {
            // Wait a shorter time after reaching 100%
            setTimeout(() => {
              setShowCircle(true);
              setTimeout(() => {
                setIsComplete(true);
              }, 1800); // Reduced time for circle animation to complete
            }, 600); // Reduced wait time after reaching 100%
          }, 300); // Reduced delay to ensure progress bar animation completes
          return 100;
        }
        return nextProgress;
      });
    }, 80); // Slightly faster interval
    
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    initial: { 
      opacity: 1,
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
        when: "afterChildren"
      }
    }
  };

  const textVariants = {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const progressBarVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${progress}%`,
      transition: { duration: 0.3 } // Faster progress bar animation
    },
    exit: {
      width: "100%",
      transition: { duration: 0.2 }
    }
  };

  const circleVariants = {
    initial: {
      scale: 0,
      opacity: 1
    },
    animate: {
      scale: [0, 1, 80], // Large scale to ensure it fills all screens
      opacity: 1,
      transition: {
        duration: 1.8, // Reduced duration for circle animation
        ease: [0.25, 0.1, 0.25, 1.0], // Smooth easing
        times: [0, 0.15, 1] // Faster initial growth
      }
    }
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={() => {
      // Reset scroll position before completing
      window.scrollTo(0, 0);
      onLoadingComplete();
    }}>
      {!isComplete && (
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden"
        >
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative"
          >
            <h1 
              className="text-6xl md:text-8xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500"
              style={{
                backgroundSize: '200% 100%',
                animation: 'gradient 2s linear infinite'
              }}
            >
              Portfolio
            </h1>
            
            {progress < 100 || !showCircle ? (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-[200px]">
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500"
                    variants={progressBarVariants}
                    style={{
                      backgroundSize: '200% 100%',
                      animation: 'gradient 2s linear infinite'
                    }}
                  />
                </div>
                
                <motion.div 
                  className="mt-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.span 
                    className="text-lg font-medium text-white/80"
                    key={Math.round(progress)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </motion.div>
              </div>
            ) : null}
          </motion.div>
          
          {/* Circle animation for transition */}
          {showCircle && (
            <motion.div
              variants={circleVariants}
              initial="initial"
              animate="animate"
              className="absolute w-12 h-12 rounded-full z-10"
              style={{
                background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #3b82f6)',
                backgroundSize: '200% 100%',
                animation: 'gradient 2s linear infinite',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader; 