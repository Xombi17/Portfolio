import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize smooth scrolling using CSS scroll behavior
 * This is a fallback method since we're not using ScrollSmoother
 */
export const initSmoothScrolling = () => {
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Add event listeners to anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor: Element) => {
    anchor.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const href = (anchor as HTMLAnchorElement).getAttribute('href') || '#';
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  return () => {
    document.documentElement.style.scrollBehavior = '';
  };
};

/**
 * Scroll to a specific element
 * @param selector The target element selector
 * @param offset Optional offset from the top
 */
export const scrollToElement = (
  selector: string,
  offset: number = 0
) => {
  const element = document.querySelector(selector);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition + offset,
      behavior: 'smooth'
    });
  }
};

/**
 * Create scroll-triggered animations for projects section
 * @param selector The selector for projects container
 */
export const setupProjectsSectionAnimations = (selector: string) => {
  const projects = document.querySelectorAll(`${selector} .project-item`);
  
  gsap.set(projects, { opacity: 0, y: 50 });
  
  projects.forEach((project, index) => {
    ScrollTrigger.create({
      trigger: project,
      start: "top bottom-=100",
      end: "bottom top+=100",
      toggleActions: "play none none reverse",
      onEnter: () => {
        gsap.to(project, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1 // Stagger effect
        });
      },
      onLeave: () => {
        gsap.to(project, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: "power2.in"
        });
      },
      onEnterBack: () => {
        gsap.to(project, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(project, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          ease: "power2.in"
        });
      }
    });
  });
};

/**
 * Setup parallax effect for elements with data-speed attribute
 */
export const setupParallaxEffects = () => {
  const parallaxElements = document.querySelectorAll('[data-speed]');
  
  parallaxElements.forEach(element => {
    const speed = element.getAttribute('data-speed') || '0.5';
    const speedFloat = parseFloat(speed);
    
    gsap.to(element, {
      y: () => (scrollY * speedFloat),
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
};

/**
 * Custom hook to use GSAP ScrollTrigger
 * @param callback Function to run with ScrollTrigger
 * @param deps Dependencies array
 */
export const useScrollTrigger = (
  callback: (scrollTrigger: typeof ScrollTrigger) => void | (() => void),
  deps: any[] = []
) => {
  useEffect(() => {
    const cleanup = callback(ScrollTrigger);
    
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, deps);
};

/**
 * Refresh ScrollTrigger instances
 */
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
}; 