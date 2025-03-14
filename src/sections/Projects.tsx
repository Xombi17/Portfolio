import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Carousel from '../components/Carousel';

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

// Project images
const projectImages = {
  photography: [
    "https://source.unsplash.com/random/800x600?photography,camera",
    "https://source.unsplash.com/random/800x600?photography,portrait",
    "https://source.unsplash.com/random/800x600?photography,landscape"
  ],
  youtube: [
    "https://source.unsplash.com/random/800x600?youtube,video",
    "https://source.unsplash.com/random/800x600?youtube,content",
    "https://source.unsplash.com/random/800x600?youtube,creator"
  ],
  videoEditing: [
    "https://source.unsplash.com/random/800x600?video,editing",
    "https://source.unsplash.com/random/800x600?video,production",
    "https://source.unsplash.com/random/800x600?video,film"
  ],
  eventPhotography: [
    "https://source.unsplash.com/random/800x600?event,photography",
    "https://source.unsplash.com/random/800x600?event,concert",
    "https://source.unsplash.com/random/800x600?event,corporate"
  ],
  webDevelopment: [
    "https://source.unsplash.com/random/800x600?web,development",
    "https://source.unsplash.com/random/800x600?coding,programming",
    "https://source.unsplash.com/random/800x600?website,design"
  ]
};

interface Project {
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  projectUrl: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: "Photography Projects",
    description: "A collection of my best photography work, showcasing my skills in composition, lighting, and storytelling through images.",
    technologies: ["Photography", "Composition", "Editing", "Storytelling"],
    images: projectImages.photography,
    projectUrl: "#",
    githubUrl: "#"
  },
  {
    title: "YouTube Channel",
    description: "My YouTube channel with 12K+ subscribers and 2.3M+ views, featuring tech reviews, tutorials, and creative content.",
    technologies: ["Content Creation", "Video Editing", "Storytelling", "Tech Reviews"],
    images: projectImages.youtube,
    projectUrl: "https://youtube.com/c/varadjoshi",
  },
  {
    title: "Web Development Portfolio",
    description: "A showcase of my web development projects built with modern technologies like React, Next.js, and Tailwind CSS.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Responsive Design"],
    images: projectImages.webDevelopment,
    projectUrl: "#",
    githubUrl: "https://github.com/varadjoshi"
  },
  {
    title: "Video Editing & Presentations",
    description: "Professional video editing work including promotional videos, presentations, and creative content for various clients.",
    technologies: ["Video Editing", "Motion Graphics", "Storytelling", "Premiere Pro"],
    images: projectImages.videoEditing,
    projectUrl: "#",
  },
  {
    title: "Event Photography",
    description: "Event coverage and photography for college fests, corporate events, and special occasions.",
    technologies: ["Event Photography", "Lighting", "Composition", "Editing"],
    images: projectImages.eventPhotography,
    projectUrl: "#"
  }
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [activeTab, setActiveTab] = useState<string>("all");
  
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

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Development" },
    { id: "photo", name: "Photography" },
    { id: "video", name: "Video" }
  ];

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(project => {
        if (activeTab === "web") return project.technologies.some(tech => ["React", "TypeScript", "Next.js", "Web"].some(webTech => tech.includes(webTech)));
        if (activeTab === "photo") return project.technologies.some(tech => tech.includes("Photography") || tech.includes("Composition"));
        if (activeTab === "video") return project.technologies.some(tech => tech.includes("Video") || tech.includes("Editing"));
        return true;
      });
  
  return (
    <section 
      id="projects" 
      className="py-32 px-4 bg-black" 
      data-scroll-section
    >
      <div className="max-w-6xl mx-auto" data-scroll data-scroll-speed="0.2">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">My Projects</h2>
          
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-zinc-800/50 text-gray-300 hover:bg-zinc-700/50'
                }`}
                onClick={() => setActiveTab(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredProjects.map((project, index) => (
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
      className="group relative overflow-hidden rounded-xl bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 hover:border-blue-500/30 transition-all duration-300 h-full hover-lift"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="h-56 overflow-hidden">
        <Carousel 
          images={project.images} 
          className="w-full h-full"
          autoPlay={true}
          interval={5000}
        />
      </div>
      
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