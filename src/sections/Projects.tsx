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
    title: "Digital Experience Platform",
    description: "Enterprise-scale platform built with React and Node.js for managing digital experiences across multiple channels.",
    technologies: ["React", "Node.js", "GraphQL", "AWS"],
    gradient: placeholderColors[0],
    projectUrl: "#",
    githubUrl: "#"
  },
  {
    title: "E-commerce Solution",
    description: "Modern e-commerce platform with real-time inventory management and payment processing.",
    technologies: ["Next.js", "Stripe", "Tailwind CSS", "Prisma"],
    gradient: placeholderColors[1],
    projectUrl: "#",
    githubUrl: "#"
  },
  {
    title: "AI-Powered Analytics",
    description: "Data visualization dashboard with machine learning algorithms for predictive analytics.",
    technologies: ["Python", "React", "TensorFlow", "D3.js"],
    gradient: placeholderColors[2],
    projectUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Mobile Banking App",
    description: "Secure and intuitive mobile banking solution with biometric authentication.",
    technologies: ["React Native", "Redux", "Node.js", "MongoDB"],
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
      className="group h-[400px] relative rounded-xl overflow-hidden"
      variants={variants}
      data-scroll
      data-scroll-offset="30%"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Project Background with Gradient instead of Image */}
      <motion.div 
        className={`absolute inset-0 w-full h-full ${project.gradient}`}
        whileHover={{
          scale: 1.08,
          transition: { duration: 0.5 }
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-4">
          <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
          
          <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span 
                key={tech} 
                className="text-xs font-medium px-2 py-1 bg-blue-500/20 rounded-full text-blue-300"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a 
              href={project.projectUrl} 
              className="flex items-center gap-1 text-sm text-white/90 hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Project</span>
              <ExternalLinkIcon />
            </a>
            
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                className="flex items-center gap-1 text-sm text-white/90 hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Source Code</span>
                <GithubIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects; 