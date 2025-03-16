import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence, Variants } from 'framer-motion';
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

// Motion paths for project cards
const generateCardPath = (index: number) => {
  // Create different paths based on index to make each card's animation unique
  const pathVariations = [
    [[0, -100], [50, -80], [20, -40], [0, 0]],  // Path 1: Falling from top with slight S curve
    [[100, -80], [50, -60], [20, -30], [0, 0]],  // Path 2: Falling from top-right
    [[-100, -80], [-50, -60], [-20, -30], [0, 0]],  // Path 3: Falling from top-left
    [[0, -120], [-30, -90], [-15, -45], [0, 0]],  // Path 4: Falling from top with different curve
    [[150, -50], [100, -30], [50, -15], [0, 0]],  // Path 5: Coming from far right
  ];
  
  // Select a path based on index
  return pathVariations[index % pathVariations.length];
};

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [activeTab, setActiveTab] = useState<string>("all");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  
  // Scroll animation - adjusted to start much earlier
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"] // Changed from "end start" to "start center" to complete earlier
  });
  
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 150, // Increased from 100 for faster response
    damping: 25,    // Decreased from 30 for quicker animation
    restDelta: 0.001 
  });
  
  // Update window height on mount
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Update scroll progress for animation calculations
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      // Accelerate the progress to complete animations earlier
      // This maps the 0-1 range to 0-2, making animations complete twice as fast
      setScrollProgress(Math.min(value * 1.75, 1)); 
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  // Header animations based on scroll - start and complete earlier
  const headerY = useTransform(smoothProgress, [0, 0.15], [50, 0]); // Changed from [0, 0.2]
  const headerOpacity = useTransform(smoothProgress, [0, 0.15], [0, 1]); // Changed from [0, 0.2]
  
  // Filter tabs animation based on scroll - start and complete earlier
  const tabsX = useTransform(smoothProgress, [0.05, 0.2], [50, 0]); // Changed from [0.1, 0.3]
  const tabsOpacity = useTransform(smoothProgress, [0.05, 0.2], [0, 1]); // Changed from [0.1, 0.3]
  
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

  // 3D card perspective values  
  const perspective = 1000;
  const initialRotation = 45;
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-32 px-4 bg-black relative min-h-screen" 
      data-scroll-section
    >
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10 backdrop-blur-3xl"
          style={{ 
            opacity: smoothProgress,
            scale: useTransform(smoothProgress, [0, 1], [0.9, 1.05]), // Less extreme scale change
          }}
        />
        
        {/* Animated particles/dots in background */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-blue-400/40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
              x: useTransform(
                smoothProgress, 
                [0, 1], 
                [0, (Math.random() * 200) - 100]
              ),
              y: useTransform(
                smoothProgress, 
                [0, 1], 
                [0, (Math.random() * 200) - 100]
              ),
              scale: useTransform(
                smoothProgress, 
                [0, 0.5, 1], 
                [0, Math.random() * 3 + 1, 0]
              ),
              opacity: useTransform(
                smoothProgress, 
                [0, 0.2, 0.8, 1], 
                [0, 1, 1, 0]
              ),
            }}
          />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10" data-scroll data-scroll-speed="0.2">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16"
          style={{ 
            y: headerY,
            opacity: headerOpacity,
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
            My Projects
          </h2>
          
          <motion.div 
            className="flex flex-wrap gap-2 mt-6 md:mt-0"
            style={{ 
              x: tabsX,
              opacity: tabsOpacity,
            }}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === category.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-zinc-800/50 text-gray-300 hover:bg-zinc-700/50'
                }`}
                onClick={() => setActiveTab(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
        
        <div 
          ref={containerRef}
          className="perspective-1000"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {filteredProjects.map((project, index) => {
                // Calculate when this card should start animating based on scroll progress
                // Start points are much earlier now to ensure animations complete when section is visible
                const startPoint = 0.15 + (index * 0.03); // Reduced from 0.3 + (index * 0.05)
                const endPoint = Math.min(startPoint + 0.15, 0.8); // Reduced from startPoint + 0.2, 0.95
                
                // Interpolate values for animation - calculation remains the same
                const progress = Math.max(0, Math.min(1, (scrollProgress - startPoint) / (endPoint - startPoint)));
                
                // Movement path for this card
                const path = generateCardPath(index);
                
                return (
                  <CardWithScrollAnimation 
                    key={`${activeTab}-${project.title}`} 
                    project={project}
                    index={index}
                    progress={progress}
                    path={path}
                    initialRotation={initialRotation}
                    perspective={perspective}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

interface CardAnimationProps {
  project: Project;
  index: number;
  progress: number;
  path: number[][];
  initialRotation: number;
  perspective: number;
}

const CardWithScrollAnimation = ({ 
  project, 
  index, 
  progress,
  path,
  initialRotation,
  perspective
}: CardAnimationProps) => {
  // Calculate position along the path based on progress
  const calculatePosition = (progress: number, path: number[][]) => {
    if (progress <= 0) return path[0];
    if (progress >= 1) return path[path.length - 1];
    
    const segmentLength = 1 / (path.length - 1);
    const segmentIndex = Math.min(path.length - 2, Math.floor(progress / segmentLength));
    const segmentProgress = (progress - segmentIndex * segmentLength) / segmentLength;
    
    const start = path[segmentIndex];
    const end = path[segmentIndex + 1];
    
    return [
      start[0] + (end[0] - start[0]) * segmentProgress,
      start[1] + (end[1] - start[1]) * segmentProgress
    ];
  };
  
  const position = calculatePosition(progress, path);
  
  // Calculate rotation based on progress - slightly reduced rotation for smoother animations
  const rotateX = initialRotation * 0.8 * (1 - progress); // Reduced by multiplying by 0.8
  const rotateY = (index % 2 === 0 ? -1 : 1) * initialRotation * 0.8 * (1 - progress);
  const rotateZ = (index % 2 === 0 ? -4 : 4) * (1 - progress); // Reduced from -5/5 to -4/4
  
  // Calculate opacity and scale - reach full opacity faster
  const opacity = Math.min(1, progress * 3); // Changed from progress * 2
  const scale = 0.8 + (progress * 0.2); // Changed from 0.7 + (progress * 0.3) for less extreme scaling
  
  return (
    <motion.div
      className="card-container"
      style={{
        x: position[0],
        y: position[1],
        rotateX: rotateX,
        rotateY: rotateY,
        rotateZ: rotateZ,
        opacity: opacity,
        scale: scale,
        transformPerspective: perspective,
        position: 'relative',
        zIndex: Math.round(progress * 10),
      }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 30 
      }}
    >
      <motion.div
        className="group relative overflow-hidden rounded-xl bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 hover:border-blue-500/30 transition-all duration-300 h-full hover-lift"
        whileHover={{ 
          y: -5,
          scale: 1.02,
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
                <motion.span 
                  key={i} 
                  className="px-3 py-1 bg-zinc-800/50 text-sm rounded-full text-gray-300 border border-zinc-700 group-hover:border-blue-500/30 transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.2 }}
                >
                  {tech}
                </motion.span>
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
                <span>View Code</span>
              </a>
            )}
          </div>
        </div>
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-blue-500/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-purple-500/20 via-transparent to-transparent" />
      </motion.div>
    </motion.div>
  );
};

export default Projects; 