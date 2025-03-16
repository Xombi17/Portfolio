import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useAnimationControls } from 'framer-motion';
import { scrollTo } from '../utils/scrollUtils';

// Custom SVG icon to replace Lucide ArrowDown
const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12l7 7 7-7"></path>
  </svg>
);

// Array of tech/programming related terms that will float around
const floatingTerms = [
  "React", "JavaScript", "TypeScript", "NextJS", "NodeJS", 
  "HTML", "CSS", "Tailwind", "Photography", "Framer Motion", 
  "GSAP", "VideoEditing", "UI/UX", "Three.js", "Web Dev",
  "Git", "SCSS", "Express", "Github", "Redux", "MongoDB"
];

// Matrix characters for the random effect
const matrixChars = "abcdefghijklmonpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";

// Component for floating terms/languages - updated for better visibility
const FloatingTerm = ({ term, index }: { term: string; index: number }) => {
  // More scattered distribution across the viewport
  const totalTerms = floatingTerms.length;
  const scale = window.innerWidth / 1200; // Scaling factor based on viewport
  
  // Calculate position with wider distribution
  const angle = (index / totalTerms) * 2 * Math.PI; // Position in a circle
  const radius = Math.random() * 40 + 25; // Random radius (25-65% of viewport)
  
  // Convert to x,y coordinates with center of screen as origin
  const xPos = 50 + Math.cos(angle) * radius + (Math.random() * 20 - 10);
  const yPos = 50 + Math.sin(angle) * radius + (Math.random() * 20 - 10);
  
  const size = Math.floor(Math.random() * 12) + 16; // Random size between 16px and 28px
  const opacity = Math.random() * 0.3 + 0.2; // Reduced opacity range: 0.2-0.5
  
  return (
    <motion.div
      className="fixed text-blue-300 whitespace-nowrap z-10 pointer-events-none"
      style={{ 
        fontSize: `${size}px`,
        fontWeight: 'bold',
        opacity,
        left: `${xPos}%`,
        top: `${yPos}%`,
        textShadow: '0 0 8px rgba(59, 130, 246, 0.5)'
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity,
        y: [0, -30 * scale, 0],
        x: [0, 15 * scale, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 12 + index % 8,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: index * 0.2,
      }}
    >
      {term}
    </motion.div>
  );
};

// Component for Matrix-style whole word animation
const MatrixWord = ({ word, delay }: { word: string, delay: number }) => {
  const controls = useAnimationControls();
  const [currentWord, setCurrentWord] = useState(word);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasRunInitialAnimation = useRef(false);
  
  // Simple function to run the animation (used for both hover and auto-trigger)
  const runAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    console.log(`Starting matrix animation for: ${word}`); // Debug log
    
    // More dramatic bounce animation
    controls.start({
      y: [0, -12, 0],
      scale: [1, 1.05, 1],
      transition: { duration: 0.8 }
    });
    
    // Matrix text scramble effect - run for 2 seconds
    let startTime = Date.now();
    const duration = 2000; // 2 seconds
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < duration) {
        // Generate random word of the same length
        let randomWord = '';
        for (let i = 0; i < word.length; i++) {
          // More dramatic effect with less of the original characters showing through
          if (Math.random() > 0.85 && elapsed > 300) {
            randomWord += word[i];
          } else if (word[i] === word[i].toUpperCase() && word[i] !== word[i].toLowerCase()) {
            randomWord += matrixChars[Math.floor(Math.random() * matrixChars.length)].toUpperCase();
          } else {
            randomWord += matrixChars[Math.floor(Math.random() * matrixChars.length)].toLowerCase();
          }
        }
        setCurrentWord(randomWord);
      } else {
        clearInterval(interval);
        setCurrentWord(word);
        setIsAnimating(false);
        console.log(`Finished matrix animation for: ${word}`); // Debug log
      }
    }, 20); // Faster updates for more dramatic effect
  };
  
  // Auto-trigger the hover animation after component loads
  useEffect(() => {
    // Make sure this only runs once per component instance
    if (hasRunInitialAnimation.current) return;
    
    // Calculate a delay that happens AFTER all blob animations
    // The last blob starts at 4.8s (0.8s base delay + 4s animation delay)
    // Let's wait for it to complete at least one animation cycle (estimated ~2-3s)
    const baseDelay = 8000; // 8 seconds after page load - this is after all blob animations have clearly started

    // Set up the animation to run
    const timer = setTimeout(() => {
      console.log(`Triggering initial animation for ${word} at ${Date.now()}`); // Debug log with timestamp
      hasRunInitialAnimation.current = true;
      runAnimation();
    }, baseDelay + (delay * 300)); // More separation between words
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.span
      className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 mx-2"
      style={{
        textShadow: isAnimating ? '0 0 20px rgba(139, 92, 246, 1.0)' : 'none',
        transition: 'text-shadow 0.3s ease',
        fontFamily: "'OnePlus Sans', sans-serif",
        fontWeight: 700,
      }}
      initial={{ opacity: 1 }}
      animate={controls}
      onHoverStart={runAnimation}
    >
      {currentWord}
    </motion.span>
  );
};

// FloatingBackground component to be used throughout the site
const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      {floatingTerms.map((term, index) => (
        <FloatingTerm 
          key={index} 
          term={term}
          index={index}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNameHovered, setIsNameHovered] = useState(false);
  
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
      
      <div className="relative z-20 max-w-6xl mx-auto px-4 text-center" data-scroll data-scroll-speed="0.5">
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
          <motion.div
            className="mt-2 inline-block perspective-1000"
            onHoverStart={() => setIsNameHovered(true)}
            onHoverEnd={() => setIsNameHovered(false)}
            style={{ cursor: 'pointer' }}
          >
            <div className="matrix-text-container inline-flex">
              <MatrixWord word="Varad" delay={0} />
              <MatrixWord word="Joshi" delay={1} />
            </div>
          </motion.div>
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

// Export the FloatingBackground component to be used in App.tsx
export { FloatingBackground };
export default Hero; 