import { motion } from 'framer-motion';
import { useWindowSize } from '../utils/useWindowSize';

// Custom SVG icon to replace Lucide ArrowLeft
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"></path>
    <path d="M19 12H5"></path>
  </svg>
);

const NotFound = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <div className="max-w-md text-center">
        <motion.h1 
          className="text-9xl font-bold text-blue-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          404
        </motion.h1>
        
        <motion.div
          className="relative overflow-hidden h-1 bg-zinc-800 my-8 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <motion.div 
            className="absolute h-full w-full bg-gradient-to-r from-blue-400 via-violet-500 to-blue-400 rounded-full"
            animate={{ 
              x: ['0%', '100%', '0%'],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: 'linear'
            }}
          />
        </motion.div>
        
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Page Not Found
        </motion.h2>
        
        <motion.p
          className="text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.a
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeftIcon />
          <span>Back to Homepage</span>
        </motion.a>
      </div>
      
      {/* Animated Background Elements - Optimized for SSR */}
      {Array.from({ length: 20 }).map((_, i) => {
        // Pre-calculated random values to avoid client/server mismatch
        const seed = i / 20;
        const size = 20 + (seed * 100);
        const initialX = seed * width;
        const initialY = (1 - seed) * height;
        const opacity = 0.1 + (seed * 0.3);
        const duration = 10 + (seed * 10);
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
            initial={{ 
              x: initialX, 
              y: initialY,
              scale: 0.5 + (seed * 0.5),
              opacity,
            }}
            animate={{ 
              y: initialY - 100,
            }}
            transition={{ 
              y: {
                duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              },
            }}
          />
        );
      })}
    </div>
  );
};

export default NotFound; 