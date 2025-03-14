import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { scrollTo } from '../utils/scrollUtils';

// Custom SVG icon to replace Lucide ArrowDown
const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12l7 7 7-7"></path>
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
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
  const handleScrollDown = () => {
    scrollTo('#about');
  };

  const welcomeVariants = {
    initial: { 
      opacity: 0,
      scale: 0.8
    },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8,
        delay: 0.7,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
  
  const titleVariants = {
    initial: { 
      opacity: 0,
      y: 30
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1,
        delay: 1.0,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
  
  const subtitleVariants = {
    initial: { 
      opacity: 0,
      y: 30
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 1.3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const buttonVariants = {
    initial: { 
      opacity: 0,
      y: 30
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 1.6,
        ease: [0.43, 0.13, 0.23, 0.96]
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
      transition={{ 
        duration: 1.2, 
        delay: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      data-scroll-section
    >
      <div className="absolute top-0 left-0 w-full h-full" />
      
      <motion.div 
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-black to-zinc-900"
        style={{ scale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 1.5, 
          delay: 0.5,
          ease: [0.25, 0.1, 0.25, 1.0]
        }}
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
        transition={{ duration: 1.2, delay: 0.5 }}
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
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-cyan-300">Hello I am,</span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 mt-2 block">
            Varad Joshi
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-6"
          variants={subtitleVariants}
          initial="initial"
          animate="animate"
        >
          Tech Enthusiast | Photographer | Web Developer
        </motion.p>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          variants={subtitleVariants}
          initial="initial"
          animate="animate"
          transition={{ 
            duration: 0.8,
            delay: 1.5,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
        </motion.p>
        <motion.div
          variants={buttonVariants}
          initial="initial"
          animate="animate"
        >
          <button 
            onClick={handleScrollDown}
            className="flex items-center justify-center mx-auto w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 animate-float"
            aria-label="Scroll down"
          >
            <ArrowDownIcon />
          </button>
        </motion.div>

        <motion.div
          className="absolute -z-10 w-full max-w-lg h-64 mx-auto opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero; 