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
        {/* Section Header - optimized */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ 
            duration: 0.8,
            type: isLowPerfDevice ? "tween" : "spring",
            stiffness: 100,
            damping: 20
          }}
        >
          {isLowPerfDevice ? (
            // Simple header for low-performance devices
            <motion.h2 
              className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 mb-4"
              style={{
                textShadow: "0 10px 20px rgba(99, 102, 241, 0.6)",
                position: 'relative' /* Add position property */
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Creative Portfolio
              <motion.div
                className="h-1 w-24 bg-gradient-to-r from-blue-400 to-violet-500 mx-auto mt-4"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.h2>
          ) : (
            // 3D header with hardware acceleration
            <motion.h2 
              className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 mb-4"
              style={{
                textShadow: "0 10px 20px rgba(99, 102, 241, 0.6)",
                transformStyle: "preserve-3d",
                perspective: "1000px",
                rotateX: textRotateX,
                z: textZ,
                willChange: 'transform',
                transform: 'translateZ(0)',
                position: 'relative' /* Add position property */
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block" style={{ transform: "translateZ(20px)" }}>C</span>
              <span className="inline-block" style={{ transform: "translateZ(25px)" }}>r</span>
              <span className="inline-block" style={{ transform: "translateZ(30px)" }}>e</span>
              <span className="inline-block" style={{ transform: "translateZ(35px)" }}>a</span>
              <span className="inline-block" style={{ transform: "translateZ(40px)" }}>t</span>
              <span className="inline-block" style={{ transform: "translateZ(35px)" }}>i</span>
              <span className="inline-block" style={{ transform: "translateZ(30px)" }}>v</span>
              <span className="inline-block" style={{ transform: "translateZ(25px)" }}>e</span>
              <span className="inline-block mx-4" style={{ transform: "translateZ(15px)" }}></span>
              <span className="inline-block" style={{ transform: "translateZ(40px)" }}>P</span>
              <span className="inline-block" style={{ transform: "translateZ(35px)" }}>o</span>
              <span className="inline-block" style={{ transform: "translateZ(30px)" }}>r</span>
              <span className="inline-block" style={{ transform: "translateZ(25px)" }}>t</span>
              <span className="inline-block" style={{ transform: "translateZ(20px)" }}>f</span>
              <span className="inline-block" style={{ transform: "translateZ(15px)" }}>o</span>
              <span className="inline-block" style={{ transform: "translateZ(10px)" }}>l</span>
              <span className="inline-block" style={{ transform: "translateZ(5px)" }}>i</span>
              <span className="inline-block" style={{ transform: "translateZ(0px)" }}>o</span>
              <motion.div
                className="h-1 w-24 bg-gradient-to-r from-blue-400 to-violet-500 mx-auto mt-4"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.h2>
          )}
          <motion.p 
            className="text-gray-400 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Explore my diverse projects across photography, filmmaking, and web development.
          </motion.p>
        </motion.div>
        
        {/* Category Filters - optimized */}
        <motion.div 
          className="mb-12 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.4,
            type: isLowPerfDevice ? "tween" : "spring",
            stiffness: 100,
            damping: 20
          }}
        >
          <div className="flex space-x-3 md:justify-center">
            {categories.map((category, index) => (
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
                  boxShadow: selectedCategory === category.id ? `0 4px 20px ${category.color}20` : '',
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                  position: 'relative' /* Add position property */
                }}
                onClick={() => setSelectedCategory(category.id as ProjectCategory | 'all')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * (isLowPerfDevice ? 0.05 : 0.1),
                  type: isLowPerfDevice ? "tween" : "spring",
                  stiffness: 200,
                  damping: 20
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Project Grid - optimized with better viewport detection */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1, margin: "100px 0px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{ position: 'relative' }} /* Add position property */
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants} 
              custom={index}
              className="relative group rounded-xl overflow-hidden cursor-pointer"
              style={{ 
                backgroundColor: `${project.color}10`,
                borderColor: `${project.color}30`,
                willChange: 'transform, opacity, box-shadow',
                transform: 'translateZ(0)',
                position: 'relative', /* Add position property */
                ...(isLowPerfDevice ? {} : {
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                  rotateX: springX,
                  rotateY: springY
                })
              }}
              onClick={() => {
                setActiveProject(project);
                setIsExpanded(true);
              }}
              onMouseMove={handleTileMouseMove}
              onMouseLeave={handleTileMouseLeave}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: `0 20px 40px ${project.color}40`,
                borderWidth: isLowPerfDevice ? "1px" : "2px"
              }}
              transition={{ 
                duration: 0.3,
                type: isLowPerfDevice ? "tween" : "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              {/* Project Image with optimized 3D effect */}
              <motion.div 
                className="h-60 overflow-hidden relative"
                style={{
                  willChange: isLowPerfDevice ? 'auto' : 'transform',
                  transform: 'translateZ(0)',
                  position: 'relative', /* Add position property */
                  ...(isLowPerfDevice ? {} : {
                    transformStyle: "preserve-3d",
                    zIndex: 1,
                    translateZ: "20px"
                  })
                }}
              >
                <img 
                  src={project.images[0]} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    willChange: 'transform',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                
                {/* Category Tag - simplified for performance */}
                <motion.div 
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs uppercase tracking-wider"
                  style={{ 
                    backgroundColor: `${project.color}90`,
                    willChange: isLowPerfDevice ? 'auto' : 'transform',
                    position: 'absolute', /* Add position property */
                    ...(isLowPerfDevice ? {} : {
                      translateZ: "30px",
                      boxShadow: `0 10px 20px ${project.color}40`,
                    })
                  }}
                  animate={isLowPerfDevice ? {} : {
                    y: [0, -5, 0],
                    rotateZ: [0, 2, 0, -2, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {project.category === 'photo' ? 'Photography' : 
                  project.category === 'film' ? 'Film' : 
                  project.category === 'web' ? 'Web Dev' : 'Coming Soon'}
                </motion.div>
              </motion.div>
                
              {/* Project Info - simplified for performance */}
              <motion.div 
                className="p-6"
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                  position: 'relative' /* Add position property */
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold" style={{ color: project.color }}>
                    {project.title}
                  </h3>
                  <motion.span 
                    className="text-2xl"
                    style={{ 
                      willChange: 'transform', 
                      transform: 'translateZ(35px)',
                      position: 'relative' /* Add position property */
                    }}
                    animate={{
                      y: [0, -8, 0],
                      rotateY: [0, 180, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.5, 1]
                    }}
                  >{project.icon}</motion.span>
                </div>
                
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                  {project.description}
                </p>
                
                {/* Tech Tags with 3D floating effect */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.slice(0, 2).map((tech, i) => (
                    <motion.span 
                      key={i}
                      className="inline-block px-2 py-1 rounded-full text-xs" 
                      style={{ 
                        backgroundColor: `${project.color}20`,
                        color: project.color,
                        willChange: 'transform',
                        transform: 'translateZ(20px)',
                        position: 'relative', /* Add position property */
                        boxShadow: `0 ${5 + i * 2}px ${10 + i * 5}px ${project.color}30`
                      }}
                      animate={{
                        y: [0, -5 - i * 2, 0],
                        scale: [1, 1.05, 1],
                        rotateZ: [0, i % 2 === 0 ? 2 : -2, 0]
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 2 && (
                    <motion.span 
                      className="inline-block px-2 py-1 rounded-full text-xs text-gray-400"
                      style={{ 
                        backgroundColor: '#ffffff10',
                        willChange: 'transform',
                        transform: 'translateZ(15px)',
                        position: 'relative' /* Add position property */
                      }}
                      animate={{
                        y: [0, -4, 0],
                        rotateZ: [0, -1, 0, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      +{project.technologies.length - 2} more
                    </motion.span>
                  )}
                </div>
              </motion.div>
              
              {/* Hover Overlay with 3D effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(25px)',
                  position: 'absolute' /* Add position property */
                }}
              >
                {project.category !== 'blank1' && project.category !== 'blank2' && (
                  <motion.div 
                    className="px-6 py-3 rounded-full"
                    style={{ 
                      backgroundColor: project.color,
                      boxShadow: `0 10px 30px ${project.color}80`,
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      position: 'relative' /* Add position property */
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-black font-semibold">View Project</span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Expanded Project Modal - optimized for performance */}
        <AnimatePresence>
          {isExpanded && activeProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'fixed' }}
            >
              {/* Backdrop with 3D particles */}
              <motion.div 
                className="absolute inset-0 bg-black/80 backdrop-blur-md overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsExpanded(false)}
                style={{ position: 'absolute' }}
              >
                {/* 3D floating particles in modal background */}
                {isExpanded && modalParticles.map((particle, i) => (
                  <motion.div
                    key={`modal-particle-${i}`}
                    className="absolute rounded-full"
                    style={{
                      backgroundColor: particle.color === 'active' && activeProject 
                        ? activeProject.color 
                        : particle.color,
                      width: particle.width,
                      height: particle.height,
                      x: particle.initialX,
                      y: particle.initialY,
                      opacity: particle.opacity,
                      filter: `blur(${particle.blur}px)`,
                      willChange: 'transform, opacity',
                      transform: 'translateZ(0)',
                      position: 'absolute'
                    }}
                    animate={{
                      y: [particle.initialY, particle.targetY],
                      x: [particle.initialX, particle.targetX],
                      rotate: [0, particle.rotate],
                      scale: [1, particle.scale],
                    }}
                    transition={{
                      duration: particle.duration,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Modal Content with 3D effect */}
              <motion.div
                className="relative bg-zinc-900 border border-gray-800 rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] shadow-2xl flex flex-col md:flex-row"
                style={{ 
                  borderColor: `${activeProject.color}30`,
                  boxShadow: `0 20px 60px ${activeProject.color}30`,
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                  perspective: "1500px",
                  position: 'relative'
                }}
                initial={{ scale: 0.9, y: 20, opacity: 0, rotateX: 15 }}
                animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.9, y: 20, opacity: 0, rotateX: -15 }}
                transition={{ duration: 0.5, type: "spring", damping: 20 }}
              >
                {/* Navigation arrows with 3D hover effect */}
                <motion.button 
                  className="absolute top-1/2 left-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors transform -translate-y-1/2"
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: activeProject.color,
                    color: "black",
                    z: 50,
                    boxShadow: `0 5px 15px ${activeProject.color}50` 
                  }}
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
                  className="absolute top-1/2 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors transform -translate-y-1/2"
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: activeProject.color,
                    color: "black",
                    z: 50,
                    boxShadow: `0 5px 15px ${activeProject.color}50` 
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateProject(1);
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>

                {/* Close Button with 3D hover effect */}
                <motion.button 
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: "#EF4444",
                    color: "white",
                    z: 50,
                    boxShadow: "0 5px 15px rgba(239, 68, 68, 0.5)" 
                  }}
                  onClick={() => setIsExpanded(false)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
                
                {/* Project Images with 3D parallax effect */}
    <motion.div
                  className="md:w-1/2 h-72 md:h-auto relative overflow-hidden"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    perspective: "1000px",
                  }}
      whileHover={{ 
                    z: 20
                  }}
                >
                  <motion.div
                    className="absolute inset-0 flex"
                    style={{
                      willChange: 'transform',
                      transform: 'translateZ(30px)',
                    }}
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
                      <motion.div 
                        key={index} 
                        className="w-full h-full flex-shrink-0"
                        style={{ 
                          aspectRatio: "16/9",
                          willChange: 'transform',
                          transform: 'translateZ(0)',
                        }}
                        whileHover={{ z: 20 }}
                      >
                        <motion.img 
                          src={image} 
                          alt={`${activeProject.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-50" />
                  
                  {/* Category Badge with 3D floating effect */}
                  <motion.div 
                    className="absolute top-4 left-4 px-4 py-2 rounded-full text-sm uppercase tracking-wider"
                    style={{ 
                      backgroundColor: `${activeProject.color}90`,
                      willChange: 'transform',
                      boxShadow: `0 10px 30px ${activeProject.color}50`,
                      transform: 'translateZ(50px)'
                    }}
                    animate={{
                      y: [0, -5, 0],
                      rotateZ: [0, 2, 0, -2, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {activeProject.category === 'photo' ? 'Photography' : 
                      activeProject.category === 'film' ? 'Film' : 
                      activeProject.category === 'web' ? 'Web Dev' : 'Coming Soon'}
                  </motion.div>
                </motion.div>
                
                {/* Project Details with 3D depth */}
                <motion.div 
                  className="md:w-1/2 p-8 overflow-y-auto custom-scrollbar max-h-[60vh] md:max-h-[90vh]"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    perspective: "1000px"
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      willChange: 'transform',
                      transform: 'translateZ(0)'
                    }}
                  >
                    <motion.div 
                      className="flex items-center gap-3 mb-6"
                      style={{
                        willChange: 'transform',
                        transform: 'translateZ(0)'
                      }}
                    >
                      <motion.span 
                        className="text-3xl"
                        style={{ willChange: 'transform', transform: 'translateZ(40px)' }}
                        animate={{
                          rotateY: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >{activeProject.icon}</motion.span>
                      <motion.h3 
                        className="text-2xl md:text-3xl font-bold"
                        style={{ 
                          color: activeProject.color,
                          textShadow: `0 5px 15px ${activeProject.color}70`,
                          willChange: 'transform',
                          transform: 'translateZ(20px)'
                        }}
                      >
                        {activeProject.title}
                      </motion.h3>
                    </motion.div>
            
                    <motion.p 
                      className="text-gray-300 mb-8"
                      style={{ willChange: 'transform', transform: 'translateZ(10px)' }}
                    >
                      {activeProject.description}
                    </motion.p>
                    
                    <motion.div 
                      className="mb-8"
                      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                    >
                      <motion.h4 
                        className="text-lg font-semibold mb-3 text-white"
                        style={{ willChange: 'transform', transform: 'translateZ(15px)' }}
                      >
                        Technologies & Skills
                      </motion.h4>
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                      >
                        {activeProject.technologies.map((tech, i) => (
                          <motion.span 
                key={i} 
                            className="px-3 py-1.5 text-sm rounded-full border"
                            style={{ 
                              backgroundColor: `${activeProject.color}15`,
                              borderColor: `${activeProject.color}30`,
                              color: activeProject.color,
                              willChange: 'transform',
                              transform: 'translateZ(20px)',
                              boxShadow: `0 ${5 + i * 2}px ${10 + i * 5}px ${activeProject.color}20`
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1,
                              y: [0, -2 - (i % 3), 0]
                            }}
                            transition={{ 
                              delay: 0.1 * i, 
                              duration: 0.3,
                              y: {
                                duration: 2 + (i % 3),
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.1
                              }
                            }}
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: `${activeProject.color}30`,
                              boxShadow: `0 10px 20px ${activeProject.color}30`,
                              y: -5
                            }}
              >
                {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>

                    {/* Only show buttons for non-coming soon projects */}
                    {activeProject.category !== 'blank1' && activeProject.category !== 'blank2' && (
                      <motion.div 
                        className="flex flex-wrap gap-4"
                        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                      >
                        <motion.a 
                          href={activeProject.projectUrl} 
            target="_blank" 
            rel="noopener noreferrer"
                          className="flex items-center gap-2 font-medium rounded-full px-6 py-3 text-base"
                          style={{ 
                            backgroundColor: activeProject.color,
                            color: '#000',
                            willChange: 'transform',
                            transform: 'translateZ(25px)',
                            boxShadow: `0 10px 30px ${activeProject.color}50`
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: `0 15px 30px ${activeProject.color}70`,
                            y: -5
                          }}
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
                            style={{
                              willChange: 'transform',
                              transform: 'translateZ(25px)',
                              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
                            }}
                            whileHover={{ 
                              scale: 1.05, 
                              borderColor: activeProject.color,
                              boxShadow: `0 15px 30px ${activeProject.color}30`,
                              y: -5
                            }}
                            whileTap={{ scale: 0.95 }}
            >
              <GithubIcon />
                            <span>View Code</span>
                          </motion.a>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
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