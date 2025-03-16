import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useAnimationControls } from 'framer-motion';
import { scrollTo } from '../utils/scrollUtils';

// Custom SVG icon to replace Lucide ArrowDown
const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

// Gradient elements that add depth to the background
const GradientElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#050816] to-[#090b2b] opacity-90"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div 
          className="absolute top-1/4 -left-64 w-[500px] h-[500px] rounded-full bg-blue-900/10 mix-blend-soft-light filter blur-[120px]"
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-900/10 mix-blend-soft-light filter blur-[120px]"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-800/10 mix-blend-soft-light filter blur-[100px]"
          animate={{
            x: [0, 40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>
    </div>
  );
};

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
  const opacity = Math.random() * 0.2 + 0.1; // Reduced opacity for subtlety
  
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
    
    // More subtle bounce animation
    controls.start({
      y: [0, -8, 0],
      scale: [1, 1.03, 1],
      transition: { duration: 0.6 }
    });
    
    // Matrix text scramble effect - shorter duration
    let startTime = Date.now();
    const duration = 1500; // 1.5 seconds (reduced from 2s)
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < duration) {
        // Generate random word of the same length
        let randomWord = '';
        for (let i = 0; i < word.length; i++) {
          // Less scrambling, more of the original letter showing through
          if (Math.random() > 0.7 && elapsed > 200) {
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
      }
    }, 30); // Slightly slower updates
  };
  
  // Auto-trigger the hover animation after component loads
  useEffect(() => {
    // Make sure this only runs once per component instance
    if (hasRunInitialAnimation.current) return;
    
    // Calculate a delay that happens AFTER all blob animations
    // But not too late that it gets missed
    const baseDelay = 6000; // 6 seconds (reduced from 8s)

    // Set up the animation to run
    const timer = setTimeout(() => {
      hasRunInitialAnimation.current = true;
      runAnimation();
    }, baseDelay + (delay * 200)); // Reduced delay between words
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.span
      className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 mx-2"
      style={{
        textShadow: isAnimating ? '0 0 15px rgba(139, 92, 246, 0.7)' : 'none', // Reduced glow intensity
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

// Social media links
const SocialLinks = () => {
  return (
    <div className="flex items-center gap-4 mt-8">
      <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>
      <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </a>
      <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
      </a>
      <a href="mailto:your.email@example.com" className="text-gray-400 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      </a>
    </div>
  );
};

// FloatingBackground component to be used throughout the site
const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-40">
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
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const handleScrollDown = () => {
    scrollTo('#about');
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 1, 
        ease: "easeInOut"
      }}
      data-scroll-section
    >
      {/* Enhanced background */}
      <GradientElements />
      
      {/* Main Content with better layout */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-12 md:py-0">
        {/* Large centered welcome text - ADJUSTED: smaller and shifted up */}
        <motion.div 
          className="w-full text-center mb-8 md:mb-12 mt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500"
              style={{
                backgroundSize: '200% 100%',
                animation: 'gradient 3s linear infinite'
              }}>
            Welcome to my Portfolio
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 items-center gap-8 md:gap-16">
          {/* Left Content Column */}
          <motion.div 
            className="md:col-span-7 lg:col-span-6 order-2 md:order-1 text-center md:text-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Primary heading */}
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
              variants={contentVariants}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-300 to-cyan-200">
                Hello I am,
              </span>
              <br />
              <motion.div
                className="mt-2 inline-block"
                onHoverStart={() => setIsNameHovered(true)}
                onHoverEnd={() => setIsNameHovered(false)}
                style={{ cursor: 'pointer' }}
              >
                <div className="inline-flex">
                  <MatrixWord word="Varad" delay={0} />
                  <MatrixWord word="Joshi" delay={1} />
                </div>
              </motion.div>
            </motion.h1>
            
            {/* Bio description */}
            <motion.p 
              className="hidden"
              variants={contentVariants}
            >
              <span className="text-blue-400">Tech Enthusiast</span> | <span className="text-purple-400">Photographer</span> | <span className="text-teal-400">Web Developer</span> 
              
            </motion.p>
            
            {/* Role tags */}
            <motion.div variants={contentVariants} className="flex flex-wrap gap-2 mb-6 md:justify-start justify-center">
              <motion.span 
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-900/30 text-blue-300 border border-blue-500/20 cursor-pointer"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(59, 130, 246, 0.2)", 
                  borderColor: "rgba(59, 130, 246, 0.4)",
                  boxShadow: "0 0 8px rgba(59, 130, 246, 0.3)"
                }}
                transition={{ duration: 0.2 }}
              >
                Tech Enthusiast
              </motion.span>
              <motion.span 
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-purple-900/30 text-purple-300 border border-purple-500/20 cursor-pointer"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(168, 85, 247, 0.2)", 
                  borderColor: "rgba(168, 85, 247, 0.4)",
                  boxShadow: "0 0 8px rgba(168, 85, 247, 0.3)"
                }}
                transition={{ duration: 0.2 }}
              >
                Photographer
              </motion.span>
              <motion.span 
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-teal-900/30 text-teal-300 border border-teal-500/20 cursor-pointer"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(20, 184, 166, 0.2)", 
                  borderColor: "rgba(20, 184, 166, 0.4)",
                  boxShadow: "0 0 8px rgba(20, 184, 166, 0.3)"
                }}
                transition={{ duration: 0.2 }}
              >
                Web Developer
              </motion.span>
            </motion.div>
            
            {/* CTA buttons */}
            <motion.div 
              variants={contentVariants}
              className="flex gap-4 mt-8 md:justify-start justify-center items-center"
            >
              <button 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-700/30 transition-all duration-300"
              >
                <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>
                  View Projects
                </a>
              </button>
              
              <button 
                onClick={handleScrollDown}
                className="flex items-center gap-2 px-6 py-3 bg-transparent border border-gray-600 hover:border-gray-400 rounded-lg text-gray-300 transition-colors duration-300"
              >
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
                </svg>
              </button>
            </motion.div>
            
            {/* Social media links */}
            <motion.div variants={contentVariants}>
              <SocialLinks />
            </motion.div>
          </motion.div>
          
          {/* Right Profile Image Column */}
          <motion.div 
            className="md:col-span-5 lg:col-span-6 order-1 md:order-2 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Subtle glow effect */}
              <div className="absolute -inset-3 rounded-full opacity-70 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-blue-500/20 blur-2xl"></div>
              
              {/* Frame with overlay */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-[3px] border-gray-700/50">
                {/* Animated overlay */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500/20 to-transparent z-10"
                  animate={{ 
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                ></motion.div>
                
                {/* Profile image with aspect ratio maintained */}
                <img 
                  src="/profile-photo.jpg" 
                  alt="Varad Joshi" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://place-hold.it/400x400/050816/ffffff?text=VJ";
                  }}
                />
                
                {/* Background accent */}
                <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-blue-500/20 blur-md"></div>
                <div className="absolute -bottom-6 -left-4 w-16 h-16 rounded-full bg-purple-500/20 blur-md"></div>
              </div>
              
              {/* Tech floating elements */}
              <motion.div 
                className="absolute top-10 -right-10 px-3 py-2 bg-blue-900/30 backdrop-blur-sm rounded text-xs text-blue-300 border border-blue-700/30 shadow-lg"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                React.js
              </motion.div>
              
              <motion.div 
                className="absolute bottom-10 -left-12 px-3 py-2 bg-purple-900/30 backdrop-blur-sm rounded text-xs text-purple-300 border border-purple-700/30 shadow-lg"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              >
                TypeScript
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 -left-10 px-3 py-2 bg-teal-900/30 backdrop-blur-sm rounded text-xs text-teal-300 border border-teal-700/30 shadow-lg"
                animate={{ 
                  x: [0, -5, 0],
                  y: [0, 5, 0],
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 2
                }}
              >
                Tailwind
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced background blobs */}
      <motion.div
        className="absolute -z-10 w-full max-w-3xl h-full mx-auto opacity-50 left-0 right-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      >
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-900 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-900 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-2/3 left-1/3 w-[500px] h-[500px] bg-teal-900 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-4000"></div>
      </motion.div>
    </motion.section>
  );
};

// Export the FloatingBackground component to be used in App.tsx
export { FloatingBackground };
export default Hero; 