import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Consolidate all skills into a single flat array
const skills = [
  // Frontend
  "React.js", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js",
  // Backend
  "Node.js", "MongoDB", "C/C++",
  // Creative
  "Cinematography", "VideoEditing", "UI/UX Design", "Photography",
  // Languages
  "JavaScript", "HTML"
];

// Skill categories for better organization (commented out as we're not using categories anymore)
/*
const skillCategories = [
  {
    name: "Frontend",
    skills: ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"]
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "RESTful APIs"]
  },
  {
    name: "Creative",
    skills: ["Cinematography", "VideoEditing", "UI/UX Design", "Photography"]
  },
  {
    name: "Languages",
    skills: ["JavaScript", "TypeScript", "HTML", "CSS/SCSS"]
  }
];
*/

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: i * 0.04,
        duration: 0.5
      }
    })
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
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8">
            <motion.div 
              variants={itemVariants}
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
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
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
            </motion.div>
          </div>
          
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
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg flex items-center justify-center hover:border-blue-500/50 transition-colors duration-300 h-full"
                    variants={skillVariants}
                    custom={index}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      transition: { duration: 0.2 } 
                    }}
                    data-scroll
                    data-scroll-offset="30%"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-center">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About; 