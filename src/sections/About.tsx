import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  'React.js', 'TypeScript', 'Next.js', 'Node.js',
  'Tailwind CSS', 'JavaScript', 'Cinematography', 'CSS/SCSS',
  'Framer Motion', 'UI/UX Design', 'Three.js', 'VideoEditing'
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section 
      id="about" 
      className="py-32 px-4 bg-zinc-950" 
      data-scroll-section
    >
      <div 
        ref={containerRef} 
        className="max-w-6xl mx-auto"
        data-scroll 
        data-scroll-speed="0.3"
      >
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-lg p-6 hover:border-blue-500/30 transition-colors duration-300">
              <p className="text-gray-300 mb-4">
                I'm a Computer Engineering student with a deep passion for technology, photography, and creative media. Whether it's capturing high-quality images, producing engaging videos, or managing large-scale events, I always bring my creativity and technical skills to the table.
              </p>
              <p className="text-gray-300">
                I also have a strong background in sports, having competed at state-level events in Table Tennis and Throwball. My ability to lead teams and think critically has helped me excel both in sports and in my professional endeavors.
              </p>
            </div>
          </motion.div>
          
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-6"
              variants={itemVariants}
            >
              Skills & Technologies
            </motion.h3>
            
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              variants={containerVariants}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="p-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg flex items-center justify-center text-center hover:border-blue-500/50 transition-colors duration-300"
                  variants={skillVariants}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    transition: { duration: 0.2 } 
                  }}
                  data-scroll
                  data-scroll-offset="30%"
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6">Education</h3>
            <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-lg p-6">
              <h4 className="text-xl font-semibold">Bachelor of Technology in Computer Engineering</h4>
              <p className="text-gray-400">Fr. Conceicao Rodrigues College of Engineering</p>
              <p className="text-gray-500 text-sm mt-2">2024 - 2028</p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6">Sports Achievements</h3>
            <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-lg p-6">
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
        </motion.div>
      </div>
    </section>
  );
};

export default About; 