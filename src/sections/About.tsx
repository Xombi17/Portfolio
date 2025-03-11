import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  'React.js', 'TypeScript', 'Next.js', 'Node.js',
  'Tailwind CSS', 'JavaScript', 'GraphQL', 'CSS/SCSS',
  'Framer Motion', 'UI/UX Design', 'Three.js', 'WebGL'
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
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">About Me</h2>
            
            <div className="space-y-4 text-lg text-gray-300">
              <motion.p variants={itemVariants}>
                I'm a creative developer and designer with a passion for 
                building beautiful, functional, and user-friendly digital experiences.
              </motion.p>
              
              <motion.p variants={itemVariants}>
                With over 8 years of experience in web development, I specialize in
                creating immersive interfaces and interactive experiences that push the
                boundaries of web technology.
              </motion.p>
              
              <motion.p variants={itemVariants}>
                I believe that great design is not just about aesthetics, but also about
                functionality, performance, and accessibility. Every project I work on
                is an opportunity to create something that's both visually stunning and
                technically excellent.
              </motion.p>
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
            
            <motion.div 
              className="mt-12"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold mb-6">Education</h3>
              <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-lg p-6">
                <h4 className="text-xl font-semibold">Bachelor of Technology in Computer Engineering</h4>
                <p className="text-gray-400">Fr. Conceicao Rodrigues College of Engineering</p>
                <p className="text-gray-500 text-sm mt-2">2024 - 2028</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 