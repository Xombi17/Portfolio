import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader = ({ onLoadingComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + Math.random() * 10;
        if (nextProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
          }, 500);
          return 100;
        }
        return nextProgress;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    initial: { 
      opacity: 1,
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
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
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
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
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
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
            
            {progress < 100 && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-[200px]">
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
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
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader; 