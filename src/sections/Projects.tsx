import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Project Category Types
type ProjectCategory = 'photo' | 'film' | 'web' | 'blank1' | 'blank2';

// Custom SVG icons
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

// Project interface
interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  technologies: string[];
  images: string[];
  projectUrl: string;
  githubUrl?: string;
  color: string;
  icon: string;
  featured: boolean;
}

// Project data
const projects: Project[] = [
  {
    id: 'photo-1',
    title: "College Photography Contest Winner",
    category: 'photo',
    description: "First place winner in college photography competition, showcasing creative composition and visual storytelling techniques.",
    technologies: ["Composition", "Lighting", "Post-processing", "Visual Storytelling"],
    images: [
      "https://source.unsplash.com/random/800x600?photography,award",
      "https://source.unsplash.com/random/800x600?photography,competition", 
      "https://source.unsplash.com/random/800x600?photography,professional"
    ],
    projectUrl: "#",
    color: "#3B82F6", // blue
    icon: "📸",
    featured: true
  },
  {
    id: 'film-1',
    title: "Short Film: 'Echoes'",
    category: 'film',
    description: "A 10-minute short film exploring themes of memory and identity, showcasing my skills in directing, cinematography, and storytelling.",
    technologies: ["Direction", "Cinematography", "Editing", "Sound Design"],
    images: [
      "https://source.unsplash.com/random/800x600?film,short",
      "https://source.unsplash.com/random/800x600?film,cinema",
      "https://source.unsplash.com/random/800x600?film,director"
    ],
    projectUrl: "#",
    color: "#EF4444", // red
    icon: "🎬",
    featured: true
  },
  {
    id: 'web-1',
    title: "Interactive Portfolio Website",
    category: 'web',
    description: "A responsive portfolio website built with React, TypeScript, and Framer Motion, featuring interactive animations and 3D elements.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    images: [
      "https://source.unsplash.com/random/800x600?website,portfolio",
      "https://source.unsplash.com/random/800x600?coding,website",
      "https://source.unsplash.com/random/800x600?webdevelopment,ui"
    ],
    projectUrl: "#",
    githubUrl: "https://github.com/varadjoshi",
    color: "#10B981", // green
    icon: "💻",
    featured: true
  },
  {
    id: 'photo-2',
    title: "Urban Photography Series",
    category: 'photo',
    description: "A series of urban landscape photographs capturing the essence of city life, architecture, and the interplay of light and shadow.",
    technologies: ["Urban Photography", "Architecture", "Street", "Black & White"],
    images: [
      "https://source.unsplash.com/random/800x600?urban,photography",
      "https://source.unsplash.com/random/800x600?city,street",
      "https://source.unsplash.com/random/800x600?architecture,building"
    ],
    projectUrl: "#",
    color: "#6366F1", // indigo
    icon: "🏙️",
    featured: false
  },
  {
    id: 'film-2',
    title: "Documentary: 'Local Heroes'",
    category: 'film',
    description: "A mini-documentary highlighting local community leaders and their impact on society, featuring interviews and cinematic b-roll.",
    technologies: ["Documentary", "Interviews", "Storytelling", "Production"],
    images: [
      "https://source.unsplash.com/random/800x600?documentary,film",
      "https://source.unsplash.com/random/800x600?interview,filming",
      "https://source.unsplash.com/random/800x600?documentary,camera"
    ],
    projectUrl: "#",
    color: "#8B5CF6", // purple
    icon: "🎥",
    featured: false
  },
  {
    id: 'web-2',
    title: "E-Commerce Platform",
    category: 'web',
    description: "A full-stack e-commerce platform with secure payment processing, user authentication, and inventory management.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    images: [
      "https://source.unsplash.com/random/800x600?ecommerce,website",
      "https://source.unsplash.com/random/800x600?shopping,online",
      "https://source.unsplash.com/random/800x600?store,digital"
    ],
    projectUrl: "#",
    githubUrl: "https://github.com/varadjoshi",
    color: "#F59E0B", // amber
    icon: "🛒",
    featured: false
  },
  {
    id: 'blank-1',
    title: "Coming Soon",
    category: 'blank1',
    description: "A new project currently in development. Stay tuned for updates!",
    technologies: ["TBA"],
    images: [
      "https://source.unsplash.com/random/800x600?coming,soon",
      "https://source.unsplash.com/random/800x600?future,project",
      "https://source.unsplash.com/random/800x600?development,progress"
    ],
    projectUrl: "#",
    color: "#EC4899", // pink
    icon: "✨",
    featured: false
  },
  {
    id: 'blank-2',
    title: "Future Project",
    category: 'blank2',
    description: "Another exciting project in the pipeline. Details will be revealed soon!",
    technologies: ["TBA"],
    images: [
      "https://source.unsplash.com/random/800x600?future,concept",
      "https://source.unsplash.com/random/800x600?idea,creative",
      "https://source.unsplash.com/random/800x600?innovation,new"
    ],
    projectUrl: "#",
    color: "#0EA5E9", // sky blue
    icon: "🚀",
    featured: false
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Initialize with a featured project
  useEffect(() => {
    const featured = projects.find(p => p.featured);
    if (featured) setActiveProject(featured);
  }, []);

  // Filter projects by selected category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Category data for filter buttons
  const categories = [
    { id: 'all', label: 'All Projects', icon: '🔍', color: '#6366F1' },
    { id: 'photo', label: 'Photography', icon: '📸', color: '#3B82F6' },
    { id: 'film', label: 'Short Films', icon: '🎬', color: '#EF4444' },
    { id: 'web', label: 'Web Development', icon: '💻', color: '#10B981' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-24 px-4 bg-black relative min-h-screen overflow-hidden"
    >
      {/* Dynamic background with gradient and particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80" />
        
        {/* Background gradient inspired by selected project */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isInView ? 0.2 : 0,
            backgroundColor: activeProject?.color || '#6366F1'
          }}
          transition={{ duration: 1.5 }}
          style={{
            filter: 'blur(120px)',
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: i % 3 === 0 ? '#3B82F6' : i % 3 === 1 ? '#8B5CF6' : '#10B981',
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.3 + 0.1,
              }}
              animate={{
                y: [null, Math.random() * -300 - 50],
                opacity: [null, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 mb-4">
            Creative Portfolio
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Explore my diverse projects across photography, filmmaking, and web development.
          </p>
        </motion.div>
        
        {/* Category Filters - Horizontal Scrollable Menu */}
        <motion.div 
          className="mb-12 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex space-x-3 md:justify-center">
            {categories.map(category => (
              <motion.button
                key={category.id}
                className={`px-5 py-3 rounded-full text-sm md:text-base flex items-center gap-2 whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'bg-opacity-20 border border-opacity-50 shadow-lg' 
                    : 'bg-black/30 border-gray-800 hover:border-gray-700'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id ? `${category.color}20` : '',
                  borderColor: selectedCategory === category.id ? category.color : '',
                  color: selectedCategory === category.id ? category.color : 'white',
                  boxShadow: selectedCategory === category.id ? `0 4px 20px ${category.color}20` : ''
                }}
                onClick={() => setSelectedCategory(category.id as ProjectCategory | 'all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="relative group rounded-xl overflow-hidden cursor-pointer"
              style={{ 
                backgroundColor: `${project.color}10`,
                borderColor: `${project.color}30`, 
              }}
              onClick={() => {
                setActiveProject(project);
                setIsExpanded(true);
              }}
              whileHover={{ 
                y: -10, 
                boxShadow: `0 10px 30px ${project.color}30` 
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Project Image */}
              <div className="h-60 overflow-hidden relative">
                <img 
                  src={project.images[0]} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                
                {/* Category Tag */}
                <div 
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs uppercase tracking-wider"
                  style={{ backgroundColor: `${project.color}90` }}
                >
                  {project.category === 'photo' ? 'Photography' : 
                   project.category === 'film' ? 'Film' : 
                   project.category === 'web' ? 'Web Dev' : 'Coming Soon'}
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold" style={{ color: project.color }}>
                    {project.title}
                  </h3>
                  <span className="text-2xl">{project.icon}</span>
                </div>
                
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                  {project.description}
                </p>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.slice(0, 2).map((tech, i) => (
                    <span 
                      key={i}
                      className="inline-block px-2 py-1 rounded-full text-xs" 
                      style={{ 
                        backgroundColor: `${project.color}20`,
                        color: project.color
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 2 && (
                    <span 
                      className="inline-block px-2 py-1 rounded-full text-xs text-gray-400"
                      style={{ backgroundColor: '#ffffff10' }}  
                    >
                      +{project.technologies.length - 2} more
                    </span>
                  )}
                </div>
              </div>
              
              {/* Hover Overlay with View Project Button */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.div 
                  className="px-6 py-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-black font-semibold">View Project</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Expanded Project Modal */}
        <AnimatePresence>
          {isExpanded && activeProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Backdrop */}
              <motion.div 
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsExpanded(false)}
              />
              
              {/* Modal Content */}
              <motion.div
                className="relative bg-zinc-900 border border-gray-800 rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] shadow-2xl flex flex-col md:flex-row"
                style={{ 
                  borderColor: `${activeProject.color}30`,
                  boxShadow: `0 20px 60px ${activeProject.color}20` 
                }}
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                {/* Close Button */}
                <button 
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsExpanded(false)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* Project Images - Image Carousel */}
                <div className="md:w-1/2 h-72 md:h-auto relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 flex"
                    initial={{ x: 0 }}
                    animate={{ 
                      x: [-activeProject.images.length * 100, 0],
                      transition: { 
                        repeat: Infinity, 
                        duration: 20,
                        ease: "linear" 
                      }
                    }}
                  >
                    {[...activeProject.images, ...activeProject.images].map((image, index) => (
                      <div 
                        key={index} 
                        className="w-full h-full flex-shrink-0"
                        style={{ aspectRatio: "16/9" }}
                      >
                        <img 
                          src={image} 
                          alt={`${activeProject.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-50" />
                  
                  {/* Category Badge */}
                  <div 
                    className="absolute top-4 left-4 px-4 py-2 rounded-full text-sm uppercase tracking-wider"
                    style={{ backgroundColor: `${activeProject.color}90` }}
                  >
                    {activeProject.category === 'photo' ? 'Photography' : 
                     activeProject.category === 'film' ? 'Film' : 
                     activeProject.category === 'web' ? 'Web Dev' : 'Coming Soon'}
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="md:w-1/2 p-8 overflow-y-auto custom-scrollbar max-h-[60vh] md:max-h-[90vh]">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-3xl">{activeProject.icon}</span>
                      <h3 
                        className="text-2xl md:text-3xl font-bold"
                        style={{ color: activeProject.color }}
                      >
                        {activeProject.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-300 mb-8">
                      {activeProject.description}
                    </p>
                    
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-3 text-white">Technologies & Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.technologies.map((tech, i) => (
                          <motion.span 
                            key={i} 
                            className="px-3 py-1.5 text-sm rounded-full border"
                            style={{ 
                              backgroundColor: `${activeProject.color}15`,
                              borderColor: `${activeProject.color}30`,
                              color: activeProject.color
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * i, duration: 0.3 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <motion.a 
                        href={activeProject.projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-medium rounded-full px-6 py-3 text-base"
                        style={{ 
                          backgroundColor: activeProject.color,
                          color: '#000' 
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLinkIcon />
                        <span>View Project</span>
                      </motion.a>
                      
                      {activeProject.githubUrl && (
                        <motion.a 
                          href={activeProject.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 border border-gray-700 rounded-full px-6 py-3 text-base text-gray-300 hover:text-white"
                          whileHover={{ scale: 1.05, borderColor: activeProject.color }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <GithubIcon />
                          <span>View Code</span>
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects; 