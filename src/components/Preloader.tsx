import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader = ({ onLoadingComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + Math.random() * 10;
        
        if (nextProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        
        return nextProgress;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 800);
      }, 500);
    }
  }, [progress, onLoadingComplete]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }
  };

  const progressTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isComplete ? "visible" : "hidden"}
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Portfolio
          </motion.h1>
          
          <div className="w-full max-w-md px-8">
            <div className="w-full h-1 bg-gray-800 mb-4 relative overflow-hidden">
              <motion.div 
                className="h-full bg-white absolute top-0 left-0"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
              />
            </div>
            
            <motion.div 
              className="flex justify-between"
              variants={progressTextVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="text-sm text-gray-400">Loading experience</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader; 