import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!isVisible) {
        setIsVisible(true);
      }
      
      // Check if cursor is hovering over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);
  
  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    // Adding cursor styles to clickable elements
    const style = document.createElement('style');
    style.innerHTML = `
      a, button, [role="button"], input[type="submit"], input[type="button"], [role="link"] { 
        cursor: none !important; 
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.body.style.cursor = '';
      document.head.removeChild(style);
    };
  }, []);

  // Don't render on mobile devices where we have no mouse
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed w-4 h-4 rounded-full bg-white pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      />
      <motion.div
        className="fixed rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - (isPointer ? 20 : 15),
          y: position.y - (isPointer ? 20 : 15),
          width: isPointer ? '40px' : '30px',
          height: isPointer ? '40px' : '30px',
          opacity: isVisible ? 0.2 : 0,
          borderColor: isPointer ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 150 }}
        style={{ border: '1px solid rgba(255, 255, 255, 0.5)' }}
      />
    </>
  );
};

export default CustomCursor; 