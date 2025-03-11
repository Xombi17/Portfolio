import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Custom SVG icons to replace Lucide icons
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

// Local placeholder images (these will be created in assets/images folder)
// For now, we'll use background gradients as placeholders
const placeholderColors = [
  'bg-gradient-to-br from-blue-600 to-purple-700',
  'bg-gradient-to-br from-green-600 to-teal-700',
  'bg-gradient-to-br from-red-600 to-pink-700',
  'bg-gradient-to-br from-amber-600 to-orange-700',
];

interface Project {
  title: string;
  description: string;
  technologies: string[];
  gradient: string; // Using gradients instead of imageUrl
  projectUrl: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: "Photography Projects",
    description: "A collection of my best photography work, showcasing my skills in composition, lighting, and storytelling through images.",
    technologies: ["Photography", "Composition", "Editing", "Storytelling"],
    gradient: placeholderColors[0],
    projectUrl: "#",
    githubUrl: "#"
  },
  {
    title: "YouTube Channel",
    description: "My YouTube channel with 12K+ subscribers and 2.3M+ views, featuring tech reviews, tutorials, and creative content.",
    technologies: ["Content Creation", "Video Editing", "Storytelling", "Tech Reviews"],
    gradient: placeholderColors[1],
    projectUrl: "https://youtube.com/c/varadjoshi",
  },
  {
    title: "Video Editing & Presentations",
    description: "Professional video editing work including promotional videos, presentations, and creative content for various clients.",
    technologies: ["Video Editing", "Motion Graphics", "Storytelling", "Premiere Pro"],
    gradient: placeholderColors[2],
    projectUrl: "#",
  },
  {
    title: "Event Photography",
    description: "Event coverage and photography for college fests, corporate events, and special occasions.",
    technologies: ["Event Photography", "Lighting", "Composition", "Editing"],
    gradient: placeholderColors[3],
    projectUrl: "#"
  }
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };
  
  return (
    <section 
      id="projects" 
      className="py-32 px-4 bg-black" 
      data-scroll-section
    >
      <div className="max-w-6xl mx-auto" data-scroll data-scroll-speed="0.2">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          Selected Projects
        </motion.h2>
        
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              variants={itemVariants} 
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  variants: any;
  index: number;
}

const ProjectCard = ({ project, variants, index }: ProjectCardProps) => {
  return (
    <motion.div
      variants={variants}
      className="group relative overflow-hidden rounded-xl bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 hover:border-blue-500/30 transition-all duration-300 h-full"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className={`absolute inset-0 ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
      
      <div className="relative p-6 flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
          <p className="text-gray-400 mb-4">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, i) => (
              <span 
                key={i} 
                className="px-3 py-1 bg-zinc-800/50 text-sm rounded-full text-gray-300 border border-zinc-700 group-hover:border-blue-500/30 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-zinc-800 group-hover:border-blue-500/20 transition-colors duration-300">
          <a 
            href={project.projectUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ExternalLinkIcon />
            <span>View Project</span>
          </a>
          
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <GithubIcon />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects; 