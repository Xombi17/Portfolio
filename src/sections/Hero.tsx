import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { scrollTo } from '../utils/scrollUtils';

// Custom SVG icon to replace Lucide ArrowDown
const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14"></path>
    <path d="m19 12-7 7-7-7"></path>
  </svg>
);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ensure we're at the top when this component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, 350]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const handleScrollDown = () => {
    scrollTo('#about');
  };

  const welcomeVariants = {
    initial: { 
      opacity: 0,
      y: -40,
      scale: 0.9
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.8
      }
    }
  };

  const titleVariants = {
    initial: { 
      opacity: 0,
      y: 40
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: 1.2
      }
    }
  };

  const subtitleVariants = {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 1.6,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      data-scroll-section
    >
      <div className="absolute top-0 left-0 w-full h-full" />
      
      <motion.div 
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-black to-zinc-900"
        style={{ scale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      <motion.div
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ 
          y,
          backgroundImage: 'url("https://source.unsplash.com/random/1920x1080?dark,abstract")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center" data-scroll data-scroll-speed="0.5">
        <motion.div
          className="text-xl md:text-2xl text-blue-400 mb-6"
          variants={welcomeVariants}
          initial="initial"
          animate="animate"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500"
            style={{
              backgroundSize: '200% 100%',
              animation: 'gradient 2s linear infinite'
            }}>
            Welcome to my Portfolio
          </span>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <span className="block">Hello, I'm</span>
          <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
            Varad Joshi
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12"
          variants={subtitleVariants}
          initial="initial"
          animate="animate"
        >
          Creative Developer & Designer crafting immersive digital experiences
        </motion.p>
        
        <motion.button
          onClick={handleScrollDown}
          className="animate-float bg-white/5 backdrop-blur-sm border border-white/10 text-white p-3 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <ArrowDownIcon />
          <span className="sr-only">Scroll Down</span>
        </motion.button>
      </div>
    </motion.section>
  );
};

export default Hero; 