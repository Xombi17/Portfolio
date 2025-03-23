import { useRef, useState, useEffect } from 'react';
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
    
    const handleScroll = () => {
      const position = element.scrollTop;
      setScrollPosition(position);
    };
    
    element.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      element.removeEventListener('scroll', handleScroll);
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
  
  return (
    <motion.div 
      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-1/2 w-1 bg-zinc-800 rounded-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: scrollPosition > 10 ? 0.7 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
        style={{ height: `${scrollPercentage}%` }}
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
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const sectionRef = useRef<HTMLElement>(null);
  const skillCloudRef = useRef<HTMLDivElement>(null);
  
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  // Animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0,
      transition: {
        when: "afterChildren"
      }
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      y: 40, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6
      }
    }
  };

  const handleSkillClick = (skill: Skill) => {
    setActiveSkill(skill);
  };

  return (
    <section 
      id="about" 
      className="py-32 px-4 bg-zinc-950 relative overflow-hidden" 
      data-scroll-section
      ref={sectionRef}
    >
      <motion.div 
        ref={containerRef} 
        className="max-w-6xl mx-auto"
        data-scroll 
        data-scroll-speed="0.3"
        style={{ opacity, y }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <motion.div
          className="mb-16 text-center"
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 inline-block relative">
            About Me
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Computer Engineering student with a passion for technology, photography, and creative media.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          variants={containerVariants}
        >
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <AnimatedContent
              distance={150}
              direction="horizontal"
              reverse={false}
              config={{ tension: 80, friction: 20 }}
              initialOpacity={0.2}
              animateOpacity
              scale={1.1}
              threshold={0.2}
            >
              <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-lg p-8 hover:border-blue-500/30 transition-colors duration-300 hover-lift h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">My Background</h3>
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  I'm a Computer Engineering student with a deep passion for technology, photography, and creative media. Whether it's capturing high-quality images, producing engaging videos, or managing large-scale events, I always bring my creativity and technical skills to the table.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  I also have a strong background in sports, having competed at state-level events in Table Tennis and Throwball. My ability to lead teams and think critically has helped me excel both in sports and in my professional endeavors.
                </p>
              </div>
            </AnimatedContent>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8">
            <motion.div 
              variants={itemVariants}
            >
              <AnimatedContent
                distance={150}
                direction="horizontal"
                reverse={true}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1.1}
                threshold={0.2}
              >
                <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-lg p-6 hover:border-blue-500/30 transition-colors duration-300 hover-lift">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Education</h3>
                  </div>
                  
                  <div className="ml-13">
                    <h4 className="text-lg font-semibold">Bachelor of Technology in Computer Engineering</h4>
                    <p className="text-gray-400">Fr. Conceicao Rodrigues College of Engineering</p>
                    <p className="text-gray-500 text-sm mt-1">2024 - 2028</p>
                  </div>
                </div>
              </AnimatedContent>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
            >
              <AnimatedContent
                distance={150}
                direction="horizontal"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1.1}
                threshold={0.2}
              >
                <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-lg p-6 hover:border-purple-500/30 transition-colors duration-300 hover-lift">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <path d="M3 10h18"></path>
                        <path d="M8 14h.01"></path>
                        <path d="M12 14h.01"></path>
                        <path d="M16 14h.01"></path>
                        <path d="M8 18h.01"></path>
                        <path d="M12 18h.01"></path>
                        <path d="M16 18h.01"></path>
                        <rect width="18" height="20" x="3" y="2" rx="2"></rect>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Sports Achievements</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">🏆</span>
                      <span>State-Level Table Tennis – Gold Medalist (Team Event)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">🏆</span>
                      <span>State-Level Throwball Player</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">🏏</span>
                      <span>Cricket & Badminton – Active participant in tournaments</span>
                    </li>
                  </ul>
                </div>
              </AnimatedContent>
            </motion.div>
          </div>
          
          {/* 3D Skill Cloud Showcase */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-lg p-8 hover:border-blue-500/30 transition-colors duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Skills & Technologies</h3>
                </div>
                
                <div className="hidden md:flex space-x-2">
                  {categories.map(category => (
                    <div 
                      key={category.name}
                      className="flex items-center text-sm"
                    >
                      <div 
                        className={`w-3 h-3 rounded-full mr-1 bg-gradient-to-r ${category.color}`}
                      />
                      <span className="text-gray-400">{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row">
                <div 
                  ref={skillCloudRef}
                  className="relative w-full md:w-2/3 overflow-y-auto h-[500px] pr-2"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(60, 60, 70, 0.5) transparent'
                  }}
                >
                  <div className="space-y-6">
                    {Object.entries(groupedSkills()).map(([category, skills]) => (
                      <div key={category} className="mb-6">
                        <div className="flex items-center mb-3">
                          <div 
                            className={`w-2 h-2 rounded-full mr-2 bg-gradient-to-r ${categories.find(c => c.name === category)?.color}`}
                          />
                          <h4 className="text-sm font-medium text-gray-400">{category}</h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {skills.map((skill, idx) => (
                            <SkillOrb
                              key={skill.name}
                              skill={skill}
                              index={idx}
                              active={activeSkill?.name === skill.name}
                              onClick={handleSkillClick}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Skill detail panel */}
                <div className="md:w-1/3 mt-6 md:mt-0 md:ml-6">
                  {activeSkill ? (
                    <SkillDetailPanel skill={activeSkill} />
                  ) : (
                    <motion.div
                      className="h-full flex flex-col items-center justify-center text-center p-6 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="bg-zinc-800/80 px-4 py-2 rounded-full mb-4"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="text-blue-300 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Click a skill to view details
                        </span>
                      </motion.div>
                      <p className="text-gray-400">
                        Select any skill card to see more information about my proficiency and experience.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About; 