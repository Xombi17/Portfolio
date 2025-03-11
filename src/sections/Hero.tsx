import { useRef } from 'react';
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

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.3,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
      data-scroll-section
    >
      {/* Background layers for parallax effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-black to-zinc-900"
        style={{ scale }}
      />
      
      <motion.div
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ 
          y,
          backgroundImage: 'url("https://source.unsplash.com/random/1920x1080?dark,abstract")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center" data-scroll data-scroll-speed="0.5">
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="block">Hello, I'm</span>
          <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
            Varad Joshi
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
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
          transition={{ delay: 0.6 }}
        >
          <ArrowDownIcon />
          <span className="sr-only">Scroll Down</span>
        </motion.button>
      </div>
    </motion.section>
  );
};

export default Hero; 