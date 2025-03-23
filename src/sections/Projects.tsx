import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import '../font-loader.css'; // Corrected import path

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
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80"
      ],
    projectUrl: "#",
    color: "#3B82F6", // blue
    icon: "📸",
    featured: true
  },
  {
    id: 'film-1',
    title: "Short Film: 'Wakeup'",
    category: 'film',
    description: "A short film exploring the cyclical nature of daily routines, depicting a person caught in an endless time loop of mundane moments that gradually become surreal and meaningful.",
    technologies: ["Direction", "Cinematography", "Editing", "Sound Design"],
    images: [
      "https://images.unsplash.com/photo-1493804714600-6edb1cd93080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1533101585792-27f81a845550?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1505775561242-727b7fba20f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80"
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
    description: "My personal portfolio website showcasing my work in web development, photography, and filmmaking. Built with React, TypeScript, and Framer Motion, featuring interactive animations, floating elements, and matrix-style text effects.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion","Next.js", "GSAP", "Lucide Icons", "Vercel"],
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80"
    ],
    projectUrl: "https://portfolio-bay-seven-10.vercel.app/#hero",
    githubUrl: "https://github.com/Xombi17/Portfolio",
    color: "#10B981", // green
    icon: "💻",
    featured: true
  },
  /*
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
  */
  {
    id: 'film-2',
    title: "Short Film: 'Until Silence Breaks'",
    category: 'film',
    description: "A poignant short film exploring the bond between a student and their mentor. When the teacher suddenly departs, the student struggles with the void left behind until discovering a mysterious USB drive containing an unexpected message that changes everything.",
    technologies: ["Narrative Filmmaking", "Cinematography", "Directing", "Editing", "Sound Design"],
    images: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1540655037529-dec987208707?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80"
    ],
    projectUrl: "https://youtu.be/xrlxXv1WIwc",
    color: "#8B5CF6", // purple
    icon: "🎥",
    featured: false
  },
  {
    id: 'web-2',
    title: "Health Vault ",
    category: 'web',
    description: "A comprehensive healthcare platform for securely storing and managing personal health records. Currently in development and not yet available to the public.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80"
    ],
    projectUrl: "https://he6dqskmv7ghd4np.vercel.app/",
    githubUrl: "https://github.com/Xombi17/Health-Vault",
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
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1590479773265-7464e5d48118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80"
    ],
    projectUrl: "#",
    color: "#EC4899", // pink
    icon: "✨",
    featured: false
  },
  /*
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
  */
];

// Add a throttle utility function for performance
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Detect low-performance devices
const useDevicePerformance = () => {
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false);
  
  useEffect(() => {
    // Simple heuristic for device performance detection
    const isLowEnd = 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    setIsLowPerfDevice(isLowEnd);
  }, []);
  
  return isLowPerfDevice;
};

const Projects = () => {
  // Check device performance to adjust effects
  const isLowPerfDevice = useDevicePerformance();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 3D text animation values - defined unconditionally
  const textY = useMotionValue(0);
  const textZ = useTransform(textY, [-100, 100], [50, -50]);
  const textRotateX = useTransform(textY, [-100, 100], [30, -30]);
  
  // Mouse position state for section background parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Create motion values for project items outside the map function
  // These will be used for all project tiles
  const tileX = useMotionValue(0);
  const tileY = useMotionValue(0);
  const rotateX = useTransform(tileY, [-100, 100], [10, -10]);
  const rotateY = useTransform(tileX, [-100, 100], [-10, 10]);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });
  
  // Modal animation values - to prevent hooks in conditionals
  const modalBackgroundX = useMotionValue(0);
  const modalBackgroundY = useMotionValue(0);
  
  // Effect for parallax background movement - throttled for performance
  useEffect(() => {
    // Handle mouse movement for all effects
    const handleMouseMove = throttle((event: MouseEvent) => {
      const { clientX, clientY } = event;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      setMousePosition({
        x: (clientX / windowWidth - 0.5) * 20,
        y: (clientY / windowHeight - 0.5) * 20
      });
      
      // Update the 3D text motion value based on mouse position
      textY.set((clientY / windowHeight - 0.5) * 100);
      
      // Update tile motion values
      if (!isLowPerfDevice) {
        const tileCenterX = windowWidth / 2;
        const tileCenterY = windowHeight / 2;
        tileX.set((clientX - tileCenterX) / 10);
        tileY.set((clientY - tileCenterY) / 10);
      }
      
      // Update modal background if modal is open
      if (isExpanded) {
        modalBackgroundX.set((clientX / windowWidth - 0.5) * 20);
        modalBackgroundY.set((clientY / windowHeight - 0.5) * 20);
      }
    }, 16); // Throttle to ~60fps
    
    if (!isLowPerfDevice) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [textY, isLowPerfDevice, tileX, tileY, isExpanded, modalBackgroundX, modalBackgroundY]);

  // Initialize with a featured project
  useEffect(() => {
    const featured = projects.find(p => p.featured);
    if (featured) setActiveProject(featured);
  }, []);

  // Add keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      } else if (e.key === 'ArrowRight' && isExpanded) {
        navigateProject(1);
      } else if (e.key === 'ArrowLeft' && isExpanded) {
        navigateProject(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, activeProject]);

  // Function to navigate between projects
  const navigateProject = (direction: number) => {
    if (!activeProject) return;

    const currentProjects = selectedCategory === 'all' 
      ? projects 
      : projects.filter(project => project.category === selectedCategory);
    
    const currentIndex = currentProjects.findIndex(p => p.id === activeProject.id);
    if (currentIndex === -1) return;
    
    const nextIndex = (currentIndex + direction + currentProjects.length) % currentProjects.length;
    setActiveProject(currentProjects[nextIndex]);
  };

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

  // Text reveal animation variants - inspired by Bennet
  const revealVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i = 0) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: i * 0.1,
        duration: 0.8
      }
    })
  };

  // Image container variants - inspired by Bennet
  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.165, 0.84, 0.44, 1]
      }
    },
    hover: {
      scale: 1.05,
      transition: { 
        duration: 0.5,
        ease: [0.165, 0.84, 0.44, 1]
      }
    }
  };

  // Reduce particle count based on device performance
  const particleCount = isLowPerfDevice ? 10 : 25;
  
  // Optimize animation variants based on device capability
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
        staggerChildren: isLowPerfDevice ? 0.08 : 0.2,
        delayChildren: isLowPerfDevice ? 0 : 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      y: 40, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: isLowPerfDevice ? "tween" : "spring",
        stiffness: isLowPerfDevice ? 50 : 100,
        damping: 12,
        duration: isLowPerfDevice ? 0.3 : 0.6
      }
    }
  };

  // Handler functions for tile effects - use the shared motion values
  const handleTileMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isLowPerfDevice) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    tileX.set(e.clientX - centerX);
    tileY.set(e.clientY - centerY);
  }, [isLowPerfDevice, tileX, tileY]);
  
  const handleTileMouseLeave = useCallback(() => {
    if (isLowPerfDevice) return;
    tileX.set(0);
    tileY.set(0);
  }, [isLowPerfDevice, tileX, tileY]);
  
  // Pre-compute random values for modal particles
  const modalParticles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      color: i % 3 === 0 ? 'active' : i % 3 === 1 ? '#ffffff' : '#8B5CF6',
      width: Math.random() * 6 + 2,
      height: Math.random() * 6 + 2,
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
      targetX: (Math.random() - 0.5) * window.innerWidth,
      targetY: (Math.random() - 0.5) * window.innerHeight,
      opacity: Math.random() * 0.2 + 0.05,
      blur: Math.random() * 2,
      duration: Math.random() * 20 + 20,
      rotate: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.8
    }));
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-24 px-4 bg-black relative min-h-screen overflow-hidden"
    >
      {/* Dynamic background with gradient and particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80" />
        
        {/* Background gradient with parallax effect - optimized */}
        <motion.div 
          className="absolute inset-0"
          style={{
            filter: 'blur(120px)',
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            position: 'relative' /* Add position property */
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isInView ? 0.2 : 0,
            backgroundColor: activeProject?.color || '#6366F1',
            x: isLowPerfDevice ? 0 : mousePosition.x,
            y: isLowPerfDevice ? 0 : mousePosition.y
          }}
          transition={{ 
            duration: 1.5,
            x: { duration: 0.5, ease: "easeOut" },
            y: { duration: 0.5, ease: "easeOut" }
          }}
        />
        
        {/* Enhanced floating particles - reduced count and complexity */}
        <div className="absolute inset-0">
          {Array.from({ length: particleCount }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: i % 3 === 0 ? '#3B82F6' : i % 3 === 1 ? '#8B5CF6' : '#10B981',
                width: Math.random() * 8 + 2,
                height: Math.random() * 8 + 2,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.5 + 0.1,
                filter: `blur(${Math.random() * 2}px)`,
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
                position: 'relative' /* Add position property */
              }}
              animate={isLowPerfDevice ? {
                y: [null, Math.random() * -200 - 50],
                opacity: [null, 0],
              } : {
                y: [null, Math.random() * -400 - 50],
                x: [null, Math.random() * 100 - 50],
                opacity: [null, 0],
                scale: [1, Math.random() * 0.5 + 0.5, 0],
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
        {/* Section Header - with Bennet style */}
        <motion.div
          className="mb-32 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="overflow-hidden mb-2"
          >
            <motion.h2 
              className="text-8xl md:text-9xl font-bold text-white/10 uppercase tracking-tighter"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
            >
              Projects
            </motion.h2>
          </motion.div>
          
          <div className="overflow-hidden relative">
            <motion.div 
              className="h-px w-24 bg-white/20 mx-auto my-8"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            />
          </div>
          
          <div className="overflow-hidden">
            <motion.p 
              className="text-gray-400 max-w-xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Explore my diverse projects across photography, filmmaking, and web development.
            </motion.p>
          </div>
        </motion.div>
        
        {/* Category Filters - Bennet inspired minimal style */}
        <motion.div 
          className="mb-20 overflow-x-auto scrollbar-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex space-x-8 md:justify-center text-sm uppercase tracking-widest">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                className={`py-2 relative transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'text-white' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(0)'
                }}
                onClick={() => setSelectedCategory(category.id as ProjectCategory | 'all')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <span>{category.label}</span>
                {selectedCategory === category.id && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-px w-full bg-white"
                    layoutId="categoryIndicator"
                    transition={{ duration: 0.6, type: "spring", damping: 20 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Project Grid - Bennet styled with numbers and improved hover */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16"
          style={{ position: 'relative' }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              custom={index}
              className="relative group overflow-hidden cursor-pointer"
              onClick={() => {
                setActiveProject(project);
                setIsExpanded(true);
              }}
              whileHover="hover"
            >
              {/* Project Number - Bennet style */}
              <motion.div
                className="absolute top-0 left-0 text-xs font-light z-10 p-8"
                variants={revealVariants}
                custom={index * 0.2}
              >
                <div className="flex items-center">
                  <span className="text-white/50">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px w-12 bg-white/20 ml-2"></div>
                  <span className="ml-2 text-white/80">
                    {project.technologies[0]}
                  </span>
                </div>
              </motion.div>
              
              {/* Project Image with Bennet hover effect */}
              <motion.div 
                className="aspect-[4/3] overflow-hidden relative mb-8"
                variants={imageContainerVariants}
              >
                <motion.div
                  className="absolute inset-0 bg-black/20 z-10 opacity-0 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                <motion.img 
                  src={project.images[0]} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  style={{
                    willChange: 'transform'
                  }}
                  animate={{ scale: 1 }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 1.2, ease: [0.215, 0.610, 0.355, 1.000] }
                  }}
                  transition={{ duration: 0.8 }}
                />
                
                {/* Category Tag */}
                <motion.div 
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs uppercase tracking-wider"
                  style={{ 
                    backgroundColor: `${project.color}90`,
                    position: 'absolute'
                  }}
                  variants={revealVariants}
                  custom={index * 0.3}
                >
                  {project.category === 'photo' ? 'Photography' : 
                   project.category === 'film' ? 'Film' : 
                   project.category === 'web' ? 'Web Dev' : 'Coming Soon'}
                </motion.div>
              </motion.div>
                
              {/* Project Title - Bennet style text reveal */}
              <div className="overflow-hidden mb-1">
                <motion.h3 
                  className="text-2xl font-light tracking-tight text-white"
                  variants={revealVariants}
                  custom={index * 0.25}
                >
                  {project.title}
                </motion.h3>
              </div>
              
              {/* Project Description - Bennet style text reveal */}
              <div className="overflow-hidden h-12">
                <motion.p 
                  className="text-gray-400 text-sm line-clamp-2"
                  variants={revealVariants}
                  custom={index * 0.3}
                >
                  {project.description}
                </motion.p>
              </div>
              
              {/* View Project - Bennet style hover reveal */}
              <motion.div 
                className="mt-6 inline-flex items-center gap-2 text-sm text-white/60 group-hover:text-white overflow-hidden"
                variants={revealVariants}
                custom={index * 0.35}
              >
                <span className="transition-transform group-hover:translate-x-2 duration-300">
                  View Project
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-2 duration-300">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Expanded Project Modal - Bennet-inspired */}
        <AnimatePresence>
          {isExpanded && activeProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ position: 'fixed' }}
            >
              {/* Backdrop with minimal look */}
              <motion.div 
                className="absolute inset-0 bg-black/95"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsExpanded(false)}
                style={{ position: 'absolute' }}
              />
              
              {/* Modal Content - Bennet inspired */}
              <motion.div
                className="relative w-full h-full md:max-w-5xl md:max-h-[90vh] md:h-auto flex flex-col md:flex-row"
                style={{ 
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                  position: 'relative'
                }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
              >
                {/* Close Button - Bennet style */}
                <motion.button 
                  className="absolute top-8 right-8 z-10 w-10 h-10 mix-blend-difference text-white flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsExpanded(false)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
                
                {/* Project Images - Bennet style horizontal scroll */}
                <motion.div 
                  className="md:w-2/3 h-[40vh] md:h-[90vh] relative overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 flex h-full"
                    initial={{ x: '100%' }}
                    animate={{ 
                      x: 0,
                      transition: { 
                        duration: 1.2,
                        ease: [0.165, 0.84, 0.44, 1]
                      }
                    }}
                  >
                    {activeProject.images.map((image, index) => (
                      <motion.div 
                        key={index} 
                        className="w-full h-full flex-shrink-0"
                        style={{ 
                          width: '100%',
                          height: '100%',
                          willChange: 'transform'
                        }}
                      >
                        <motion.img 
                          src={image} 
                          alt={`${activeProject.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1.4, ease: [0.165, 0.84, 0.44, 1] }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* Navigation arrows - Bennet style */}
                  <div className="absolute bottom-8 right-8 flex space-x-4">
                    <motion.button 
                      className="w-12 h-12 border border-white/20 text-white/80 flex items-center justify-center"
                      whileHover={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateProject(-1);
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.button>
                    
                    <motion.button 
                      className="w-12 h-12 border border-white/20 text-white/80 flex items-center justify-center"
                      whileHover={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateProject(1);
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
                
                {/* Project Details - Bennet style text reveal */}
                <motion.div 
                  className="md:w-1/3 p-12 md:p-16 overflow-y-auto custom-scrollbar h-[60vh] md:h-[90vh]"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="space-y-8">
                    {/* Project Number and Category */}
                    <div className="overflow-hidden">
                      <motion.div 
                        className="text-sm text-white/50 uppercase tracking-wider flex items-center"
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <span>{String(filteredProjects.findIndex(p => p.id === activeProject.id) + 1).padStart(2, '0')}</span>
                        <div className="h-px w-8 bg-white/20 mx-3"></div>
                        <span className="text-white">
                          {activeProject.category === 'photo' ? 'Photography' : 
                          activeProject.category === 'film' ? 'Film' : 
                          activeProject.category === 'web' ? 'Web Development' : 'Coming Soon'}
                        </span>
                      </motion.div>
                    </div>
                    
                    {/* Project Title */}
                    <div className="overflow-hidden">
                      <motion.h2 
                        className="text-4xl font-light text-white"
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                      >
                        {activeProject.title}
                      </motion.h2>
                    </div>
                    
                    {/* Project Description */}
                    <div className="overflow-hidden">
                      <motion.p 
                        className="text-white/70"
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                      >
                        {activeProject.description}
                      </motion.p>
                    </div>
                    
                    {/* Technologies */}
                    <div className="overflow-hidden">
                      <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                      >
                        <h4 className="text-white uppercase text-sm tracking-wider mb-4">Technologies</h4>
                        <div className="flex flex-wrap gap-3">
                          {activeProject.technologies.map((tech, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1.5 text-xs rounded-full border border-white/10 text-white/70"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Buttons - Only for non-blank projects */}
                    {activeProject.category !== 'blank1' && activeProject.category !== 'blank2' && (
                      <div className="overflow-hidden pt-4">
                        <motion.div
                          className="flex flex-col space-y-4"
                          initial={{ y: 100 }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.8, delay: 1 }}
                        >
                          <a 
                            href={activeProject.projectUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-6 py-4 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
                          >
                            <span className="uppercase text-sm tracking-wider">View Project</span>
                            <ExternalLinkIcon />
                          </a>
                          
                          {activeProject.githubUrl && (
                            <a 
                              href={activeProject.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-between px-6 py-4 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
                            >
                              <span className="uppercase text-sm tracking-wider">Source Code</span>
                              <GithubIcon />
                            </a>
                          )}
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects; 