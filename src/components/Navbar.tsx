import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollTo, updateScroll } from '../utils/scrollUtils';

// Custom SVG icons
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="12" x2="20" y2="12"></line>
    <line x1="4" y1="6" x2="20" y2="6"></line>
    <line x1="4" y1="18" x2="20" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleNavClick = (href: string) => {
    scrollTo(href);
    setIsOpen(false);
    
    // Update scroll after navigation
    setTimeout(() => {
      updateScroll();
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
        // Hide navbar when scrolling down and not at the top
        if (currentScrollY > 150) {
          setIsVisible(false);
        }
      } else {
        setScrollDirection('up');
        // Always show navbar when scrolling up
        setIsVisible(true);
      }
      
      // Update last scroll position
      setLastScrollY(currentScrollY);
      
      // Set scrolled state for styling
      setIsScrolled(currentScrollY > 50);
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'hero';
      setActiveSection(hash);
    };

    // Setup intersection observer to track active section
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) {
            setActiveSection(id);
            // Update URL without triggering navigation
            window.history.replaceState(null, '', `#${id}`);
          }
        }
      });
    };

    const observerOptions = {
      threshold: 0.3, // Increased threshold for better accuracy
      rootMargin: '-10% 0% -40% 0%',
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
    };
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 navbar ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`}>
      <motion.nav
        className={`py-4 px-6 md:px-10 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg shadow-black/10' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.a 
            href="#hero"
            className="text-xl font-bold relative group"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Varad<span className="text-blue-500">.</span>
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full"
              transition={{ duration: 0.3 }}
              whileHover={{ width: '100%' }}
            />
          </motion.a>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <motion.a
                  href={item.href}
                  className={`relative py-2 text-sm font-medium transition-colors hover:text-blue-400 ${
                    activeSection === item.href.replace('#', '') 
                      ? 'text-blue-400' 
                      : 'text-white/80'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <span className="hover-effect">{item.name}</span>
                  {activeSection === item.href.replace('#', '') && (
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-blue-400 w-full"
                      layoutId="navIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
              </li>
            ))}
          </ul>
          
          {/* Contact Button (Desktop) */}
          <motion.a
            href="#contact"
            className="hidden md:block py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors relative overflow-hidden group"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Get in Touch</span>
            <motion.span 
              className="absolute inset-0 bg-blue-700 w-0"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-white/90 hover:text-white focus:outline-none"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </motion.button>
        </div>
      </motion.nav>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-sm z-40 pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="px-6 py-8">
              <ul className="flex flex-col space-y-6">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <motion.a
                      href={item.href}
                      className={`text-lg font-medium hover:text-blue-400 transition-colors block ${
                        activeSection === item.href.replace('#', '') 
                          ? 'text-blue-400' 
                          : 'text-white/80'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                      {activeSection === item.href.replace('#', '') && (
                        <motion.div
                          className="h-0.5 bg-blue-400 w-10 mt-1"
                          layoutId="mobileNavIndicator"
                        />
                      )}
                    </motion.a>
                  </motion.li>
                ))}
                
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
                  className="pt-6"
                >
                  <motion.a
                    href="#contact"
                    className="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('#contact');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get in Touch
                  </motion.a>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 