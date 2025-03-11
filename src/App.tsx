import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Utilities
import { initScroll } from './utils/scrollUtils';

// Components
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ThemeToggle from './components/ThemeToggle';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollInstance, setScrollInstance] = useState<any>(null);

  // Initialize smooth scrolling
  useEffect(() => {
    if (!isLoading && containerRef.current) {
      const instance = initScroll(containerRef.current);
      setScrollInstance(instance);

      return () => {
        if (instance) {
          instance.destroy();
        }
      };
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const projects = [
    {
      title: "Digital Experience Platform",
      description: "Enterprise-scale platform built with React and Node.js",
      image: "https://source.unsplash.com/random/800x600?technology",
      link: "#"
    },
    {
      title: "E-commerce Solution",
      description: "Modern e-commerce platform with real-time inventory",
      image: "https://source.unsplash.com/random/800x600?business",
      link: "#"
    },
    {
      title: "AI-Powered Analytics",
      description: "Data visualization dashboard with machine learning",
      image: "https://source.unsplash.com/random/800x600?data",
      link: "#"
    },
    {
      title: "Mobile Banking App",
      description: "Secure and intuitive mobile banking solution",
      image: "https://source.unsplash.com/random/800x600?finance",
      link: "#"
    }
  ];

  const services = [
    {
      icon: <div className="w-8 h-8 flex items-center justify-center">{'</>'}</div>,
      title: "Web Development",
      description: "Creating robust and scalable web applications using modern technologies"
    },
    {
      icon: <div className="w-8 h-8 flex items-center justify-center">🎨</div>,
      title: "UI/UX Design",
      description: "Designing intuitive and beautiful user interfaces"
    },
    {
      icon: <div className="w-8 h-8 flex items-center justify-center">📱</div>,
      title: "Frontend Architecture",
      description: "Building maintainable and performant frontend systems"
    },
    {
      icon: <div className="w-8 h-8 flex items-center justify-center">💻</div>,
      title: "Technical Leadership",
      description: "Leading teams and making architectural decisions"
    }
  ];

  return (
    <div className="bg-black text-white">
      {/* Preloader */}
      <AnimatePresence>
        {isLoading && <Preloader onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Custom cursor for desktop */}
      <CustomCursor />

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <div 
        ref={containerRef} 
        className="main-container"
        data-scroll-container
      >
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />

        {/* Footer */}
        <footer className="py-10 px-4 text-center text-gray-400 text-sm" data-scroll-section>
          <div className="max-w-6xl mx-auto">
            <div className="mb-4">
              <div className="text-2xl font-bold text-white mb-2">
                Varad<span className="text-blue-500">.</span>
              </div>
              <p>Creative Developer & Designer</p>
            </div>
            <div className="py-4 border-t border-zinc-800">
              © {new Date().getFullYear()} Varad Joshi. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;