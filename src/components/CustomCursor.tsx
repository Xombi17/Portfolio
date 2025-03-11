import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextHover, setIsTextHover] = useState(false);

  useEffect(() => {
    // Create a throttled handler to reduce performance impact
    let lastCallTime = 0;
    const throttleMs = 5; // Reduced for more responsive cursor

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastCallTime < throttleMs) return;
      lastCallTime = now;
      
      // Using requestAnimationFrame for smoother rendering
      requestAnimationFrame(() => {
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
        
        // Check if hovering over text
        const isText = 
          target.tagName === 'P' || 
          target.tagName === 'H1' || 
          target.tagName === 'H2' || 
          target.tagName === 'H3' || 
          target.tagName === 'H4' || 
          target.tagName === 'H5' || 
          target.tagName === 'H6' || 
          target.tagName === 'SPAN' ||
          target.tagName === 'LI';
        
        setIsPointer(isClickable);
        setIsTextHover(isText && !isClickable);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    const handleMouseDown = () => {
      setIsClicking(true);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
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
      
      .hover-effect {
        transition: transform 0.3s ease;
      }
      
      a:hover .hover-effect, button:hover .hover-effect {
        transform: translateY(-2px);
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
        style={{
          x: position.x - 8,
          y: position.y - 8,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ 
          type: 'spring',
          stiffness: 1000,
          damping: 50,
          mass: 0.5,
          duration: 0.05
        }}
      />
      <motion.div
        className="fixed rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: position.x - (isPointer ? 20 : isTextHover ? 30 : 15),
          y: position.y - (isPointer ? 20 : isTextHover ? 30 : 15),
          width: isPointer ? '40px' : isTextHover ? '60px' : '30px',
          height: isPointer ? '40px' : isTextHover ? '60px' : '30px',
          opacity: isVisible ? (isTextHover ? 0.1 : 0.2) : 0,
          borderColor: isPointer ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          scale: isClicking ? 0.9 : 1,
        }}
        transition={{ 
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.8,
          duration: 0.15
        }}
      />
      {isPointer && (
        <motion.div
          className="fixed rounded-full pointer-events-none z-50 flex items-center justify-center text-xs font-medium"
          style={{
            x: position.x,
            y: position.y + 30,
            opacity: isVisible && isPointer ? 1 : 0,
            color: 'white',
          }}
          initial={{ opacity: 0, y: position.y + 20 }}
          animate={{ opacity: isVisible && isPointer ? 1 : 0, y: position.y + 30 }}
          transition={{ duration: 0.2 }}
        >
          Click
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor; 