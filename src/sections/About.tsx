import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';

// Define types for skill data
interface Skill {
  name: string;
  category: string;
  level: number;
  color: string;
}

interface Category {
  name: string;
  color: string;
}
// Custom hook for handling scroll inside a container
const useContainerScroll = (ref: React.RefObject<HTMLElement>) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    let rafId: number;
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother scroll handling
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const position = element.scrollTop;
        setScrollPosition(position);
      });
    };
    
    element.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      element.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [ref]);
  
  return scrollPosition;
};

// Scroll indicator component
interface ScrollIndicatorProps {
  scrollPosition: number;
  maxScroll: number;
}

const ScrollIndicator = ({ scrollPosition, maxScroll }: ScrollIndicatorProps) => {
  const scrollPercentage = Math.min(scrollPosition / maxScroll * 100, 100);
  
  // Memoize the style to prevent unnecessary rerenders
  const barStyle = useMemo(() => ({ 
    height: `${scrollPercentage}%` 
  }), [scrollPercentage]);
  
  return (
    <motion.div 
      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-1/2 w-1 bg-zinc-800 rounded-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: scrollPosition > 10 ? 0.7 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
        style={barStyle}
      />
    </motion.div>
  );
};


// Enhanced skills with categories and proficiency levels
const skillsData: Skill[] = [
  // Frontend
  { name: "React.js", category: "Frontend", level: 0.9, color: "#61DAFB" },
  { name: "TypeScript", category: "Frontend", level: 0.85, color: "#3178C6" },
  { name: "Next.js", category: "Frontend", level: 0.8, color: "#7B68EE" },
  { name: "Tailwind CSS", category: "Frontend", level: 0.9, color: "#38B2AC" },
  { name: "Framer Motion", category: "Frontend", level: 0.75, color: "#0055FF" },
  { name: "Three.js", category: "Frontend", level: 0.7, color: "#049EF4" },
  
  // Backend
  { name: "Node.js", category: "Backend", level: 0.8, color: "#539E43" },
  { name: "MongoDB", category: "Backend", level: 0.75, color: "#47A248" },
  { name: "C/C++", category: "Backend", level: 0.7, color: "#00599C" },
  
  // Creative
  { name: "Cinematography", category: "Creative", level: 0.85, color: "#FF5C5C" },
  { name: "VideoEditing", category: "Creative", level: 0.8, color: "#9146FF" },
  { name: "UI/UX Design", category: "Creative", level: 0.75, color: "#FF7262" },
  { name: "Photography", category: "Creative", level: 0.9, color: "#5D3FD3" },
  
  // Languages
  { name: "JavaScript", category: "Languages", level: 0.9, color: "#F7DF1E" },
  { name: "HTML", category: "Languages", level: 0.85, color: "#E34F26" }
];

// Categories with distinct colors
const categories: Category[] = [
  { name: "Frontend", color: "from-blue-500 to-cyan-400" },
  { name: "Backend", color: "from-green-500 to-emerald-400" },
  { name: "Creative", color: "from-purple-500 to-pink-400" },
  { name: "Languages", color: "from-yellow-500 to-amber-400" }
];

// 3D Skill Orb Component
interface SkillOrbProps {
  skill: Skill;
  index: number;
  active: boolean;
  onClick: (skill: Skill) => void;
}

const SkillOrb = ({ skill, index, active, onClick }: SkillOrbProps) => {
  // Scale based on skill level
  const scale = 0.85 + (skill.level * 0.15);
  
  // Animation variants
  const orbVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.05,
        duration: 0.4
      }
    },
    hover: {
      scale: scale * 1.05,
      y: -5,
      boxShadow: `0 0 15px ${skill.color}90`,
      zIndex: 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };
  
  return (
    <motion.div
      className="cursor-pointer select-none"
      variants={orbVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={() => onClick(skill)}
    >
      <div 
        className={`flex items-center justify-center shadow-lg backdrop-blur-sm ${active ? 'ring-2 ring-offset-2 ring-offset-zinc-900' : ''}`}
        style={{
          background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`,
          border: `2px solid ${skill.color}60`,
          color: skill.color,
          width: '100%',
          height: '90px',
          borderRadius: "8px",
          transform: active ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: active ? `0 0 20px ${skill.color}60` : `0 4px 12px rgba(0,0,0,0.2)`,
          fontSize: "16px",
          fontWeight: "600",
          letterSpacing: "0.01em",
          textShadow: `0 2px 3px rgba(0,0,0,0.5), 0 0 5px ${skill.color}50`,
          position: "relative",
          overflow: "hidden",
          padding: "0 12px"
        }}
      >
        {/* Skill level indicator on bottom of card */}
        <div className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-transparent"
          style={{
            width: `${skill.level * 100}%`,
            backgroundColor: skill.color,
            opacity: 0.7
          }}
        />
        
        {/* Category indicator dot */}
        <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: skill.color }}
        />
        
        <span className="text-center">{skill.name}</span>
      </div>
    </motion.div>
  );
};

// Group skills by category for easier rendering
const groupedSkills = (): Record<string, Skill[]> => {
  const grouped: Record<string, Skill[]> = {};
  
  categories.forEach(category => {
    grouped[category.name] = skillsData.filter(skill => skill.category === category.name);
  });
  
  return grouped;
};

// Skill Detail Panel Component
interface SkillDetailPanelProps {
  skill: Skill | null;
}

const SkillDetailPanel = ({ skill }: SkillDetailPanelProps) => {
  if (!skill) return null;

  // Get the matching category color
  const categoryData = categories.find(c => c.name === skill.category);
  const gradientClass = categoryData ? categoryData.color : "from-blue-500 to-purple-500";
  
  return (
    <motion.div
      className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-lg p-6 mt-10 md:mt-0 md:ml-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className={`text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${gradientClass}`}>
        {skill.name}
      </h3>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Proficiency</span>
          <span className="text-gray-300">{Math.round(skill.level * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full bg-gradient-to-r ${gradientClass}`}
            initial={{ width: 0 }}
            animate={{ width: `${skill.level * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
      
      <div className="flex items-center mt-4">
        <span className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${gradientClass} text-white`}>
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  
  // Calculate max scroll based on content height
  const [maxScroll, setMaxScroll] = useState(0);
  
  useEffect(() => {
    // Update max scroll value on resize
    const updateMaxScroll = () => {
      if (contentRef.current && containerRef.current) {
        setMaxScroll(contentRef.current.scrollHeight - containerRef.current.clientHeight);
      }
    };
    
    updateMaxScroll();
    
    // Add resize listener
    window.addEventListener('resize', updateMaxScroll);
    
    return () => {
      window.removeEventListener('resize', updateMaxScroll);
    };
  }, []);
  
  // Track scroll position with optimized hook
  const scrollPosition = useContainerScroll(containerRef);
  
  // Get all skills by category (memoized)
  const skillsByCategory = useMemo(() => groupedSkills(), []);
  
  // Handle skill click
  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(prev => prev?.name === skill.name ? null : skill);
  };
  
  return (
    <section 
      id="about" 
      ref={containerRef}
      className="min-h-screen bg-black py-24 px-4 md:px-0 relative will-change-transform"
      data-scroll-section
    >
      <motion.div
        ref={contentRef}
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 animate-text will-change-transform"
          >
            About Me
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-blue-500 mx-auto animate-image will-change-transform"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <AnimatedContent
            distance={50}
            direction="horizontal"
            reverse={false}
            config={{
              tension: 80,
              friction: 20
            }}
            initialOpacity={0.2}
            animateOpacity={true}
            scale={1.1}
            threshold={0.1}
          >
            <div className="lg:col-span-1 animate-paragraph-container">
              <h3 className="text-2xl font-bold mb-4 text-white animate-text">My Background</h3>
              <p className="text-gray-400 mb-4">
                I'm a creative developer and designer based in India with a passion for building beautiful, functional digital experiences. With a strong foundation in both design and development, I bring a unique perspective to every project.
              </p>
              <p className="text-gray-400 mb-4">
                My journey began with exploring the intersection of design and technology, which led me to specialize in front-end development and interactive design. I believe in the power of elegant code and thoughtful design to solve complex problems.
              </p>
              <p className="text-gray-400">
                When I'm not coding or designing, you'll find me behind a camera, creating short films, or exploring new photography techniques to tell compelling visual stories.
              </p>
            </div>
          </AnimatedContent>
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedContent
                distance={50}
                direction="horizontal"
                reverse={true}
                config={{
                  tension: 80,
                  friction: 20
                }}
                initialOpacity={0.2}
                animateOpacity={true}
                scale={1.1}
                threshold={0.1}
              >
                <div className="animate-paragraph-container">
                  <h3 className="text-2xl font-bold mb-4 text-white animate-text">Education</h3>
                  <div className="relative border-l border-blue-500 pl-6 py-2 mt-8">
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6px] top-0"></div>
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-blue-400 stagger-item">Computer  Engineering</h4>
                      <p className="text-gray-500 stagger-item">Fr Conceicao Rodrigues College of Engineering | 2024-2028</p>
                      <p className="mt-2 text-gray-400 stagger-item">Learning Web Development and Computer Technology</p>
                    </div>
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6px] top-1/2"></div>
                    <div>
                      <h4 className="text-xl font-semibold text-blue-400 stagger-item">High School & Junior College</h4>
                      <p className="text-gray-500 stagger-item">Vasant Vihar High School & Jr College | 2009 - 2024</p>
                      <p className="mt-2 text-gray-400 stagger-item">Sports and Computer Science</p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
              
              <AnimatedContent
                distance={50}
                direction="horizontal"
                reverse={false}
                config={{
                  tension: 80,
                  friction: 20
                }}
                initialOpacity={0.2}
                animateOpacity={true}
                scale={1.1}
                threshold={0.1}
              >
                <div className="animate-paragraph-container">
                  <h3 className="text-2xl font-bold mb-4 text-white animate-text">Sports Achievements</h3>
                  <div className="relative border-l border-purple-500 pl-6 py-2 mt-8">
                    <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[6px] top-0"></div>
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-purple-400 stagger-item">State Level Table Tennis</h4>
                      <p className="text-gray-500 stagger-item">Under Pinnacle Table Tennis Club | 2023</p>
                      <p className="mt-2 text-gray-400 stagger-item">Represented College and secured 1st position in state level tournament.</p>
                    </div>
                    <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[6px] top-1/2"></div>
                    <div>
                      <h4 className="text-xl font-semibold text-purple-400 stagger-item">State-Level Throwball</h4>
                      <p className="text-gray-500 stagger-item">Under Vasant Vihar High School & Jr College | 2017</p>
                      <p className="mt-2 text-gray-400 stagger-item">Captain of college team that reached finals in state championship.</p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </div>
        
        {/* Skills section */}
        <div className="mt-20 relative" ref={skillsRef}>
          <h3 className="text-3xl font-bold mb-10 text-center animate-text">My Skills</h3>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Skills grid with categories */}
            <div className="w-full lg:w-2/3 animate-image">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Object.entries(skillsByCategory).map(([category, skills]) => (
                  <div key={category} className="col-span-full">
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">{category}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {skills.map((skill, index) => (
                        <SkillOrb 
                          key={skill.name}
                          skill={skill}
                          index={index}
                          active={selectedSkill?.name === skill.name}
                          onClick={handleSkillClick}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Skill details panel */}
            <div className="w-full lg:w-1/3 min-h-[300px] animate-image">
              <SkillDetailPanel skill={selectedSkill} />
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <ScrollIndicator scrollPosition={scrollPosition} maxScroll={maxScroll} />
    </section>
  );
};

export default About; 