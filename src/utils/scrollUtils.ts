import { useEffect, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

interface ScrollInstance {
  scroll: LocomotiveScroll | null;
}

// Global scroll instance that can be accessed throughout the app
export const scrollInstance: ScrollInstance = {
  scroll: null,
};

export const initScroll = (containerRef: HTMLElement | null) => {
  if (!containerRef) return null;
  
  try {
    const scroll = new LocomotiveScroll({
      el: containerRef,
      smooth: true,
      multiplier: 0.8,
      lerp: 0.1,
      tablet: {
        smooth: true,
        breakpoint: 1024,
      },
      smartphone: {
        smooth: false,
      },
    });
    
    scrollInstance.scroll = scroll;
    return scroll;
  } catch (error) {
    console.error('Failed to initialize Locomotive Scroll:', error);
    return null;
  }
};

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progress = Math.min(scrollPosition / documentHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollProgress;
};

// Scroll to a specific section
export const scrollTo = (target: string | HTMLElement) => {
  if (scrollInstance.scroll) {
    scrollInstance.scroll.scrollTo(target, {
      offset: -50,
      duration: 1500,
      easing: [0.25, 0.1, 0.25, 1],
    });
  } else {
    // Fallback for when Locomotive Scroll is not initialized
    try {
      const targetElement = typeof target === 'string'
        ? document.querySelector(target)
        : target;
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.pageYOffset - 50,
          behavior: 'smooth'
        });
        
        // Update URL hash
        if (typeof target === 'string' && target.startsWith('#')) {
          window.history.pushState(null, '', target);
        }
      }
    } catch (error) {
      console.error('Error scrolling to element:', error);
    }
  }
};

// Function to disable scrolling
export const disableScroll = () => {
  // Get the current scroll position
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  // Store the current scroll position
  window.onscroll = () => {
    window.scrollTo(scrollLeft, scrollTop);
  };
};

// Function to enable scrolling
export const enableScroll = () => {
  window.onscroll = null;
}; 