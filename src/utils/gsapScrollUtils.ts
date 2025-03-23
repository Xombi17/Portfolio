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
  
  // Optimize by batching similar elements
  const elements = Array.from(parallaxElements);
  if (elements.length === 0) return;
  
  // Check device capability
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;
  
  // Skip intensive animations on mobile or if reduced motion is preferred
  if (prefersReducedMotion || isMobile) {
    // Apply simpler animations for these devices
    elements.forEach(element => {
      gsap.to(element, {
        y: 0, // No parallax effect
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: "play none none reverse"
        }
      });
    });
    return;
  }
  
  // Full parallax effect for capable devices
  elements.forEach(element => {
    const speed = element.getAttribute('data-speed') || '0.5';
    const speedFloat = parseFloat(speed);
    
    gsap.to(element, {
      y: () => (scrollY * speedFloat),
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5 // Smoother scrubbing
      }
    });
  });
};

/**
 * Setup reveal animations for text elements on scroll
 */
export const setupTextRevealAnimations = () => {
  // Text reveal for headings
  const headings = gsap.utils.toArray<HTMLElement>('h1, h2, h3, .animate-text');
  
  // Skip if no elements found
  if (headings.length === 0) return;
  
  gsap.set(headings, { 
    opacity: 0,
    y: 30
  });
  
  // Create one ScrollTrigger for all headings for better performance
  headings.forEach((text) => {
    const parentSection = text.closest('[data-scroll-section]');
    if (!parentSection) return;
    
    ScrollTrigger.create({
      trigger: text,
      start: 'top bottom-=100',
      end: 'bottom top',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        gsap.to(text, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: true
        });
      },
      onLeaveBack: () => {
        gsap.to(text, {
          opacity: 0,
          y: 30,
          duration: 0.4,
          ease: 'power2.in',
          overwrite: true
        });
      }
    });
  });
  
  // Staggered paragraph reveal
  const containers = gsap.utils.toArray<HTMLElement>('.animate-paragraph-container');
  
  // Skip if no elements found
  if (containers.length === 0) return;
  
  containers.forEach((container) => {
    const paragraphs = container.querySelectorAll('p, li, .stagger-item');
    if (paragraphs.length === 0) return;
    
    gsap.set(paragraphs, { 
      opacity: 0,
      y: 20
    });
    
    ScrollTrigger.create({
      trigger: container,
      start: 'top bottom-=50',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        gsap.to(paragraphs, {
          opacity: 1,
          y: 0,
          stagger: 0.08, // Slightly faster stagger
          duration: 0.5, // Shorter duration for snappier animation
          ease: 'power2.out',
          overwrite: true
        });
      },
      onLeaveBack: () => {
        gsap.to(paragraphs, {
          opacity: 0,
          y: 20,
          stagger: 0.03, // Faster exit animation
          duration: 0.3, // Shorter exit
          ease: 'power2.in',
          overwrite: true
        });
      }
    });
  });
};

/**
 * Setup section transition animations
 */
export const setupSectionTransitions = () => {
  const sections = document.querySelectorAll('[data-scroll-section]');
  
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      toggleClass: 'section-active',
      onEnter: () => {
        gsap.to(section, {
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all' // Ensure no leftover styles
        });
      }
    });
  });
};

/**
 * Create a fade-in animation for images and cards
 */
export const setupImageRevealAnimations = () => {
  const images = document.querySelectorAll('.animate-image, img:not(.no-animation), .card');
  
  // Skip if no elements found
  if (images.length === 0) return;
  
  // Check device capability
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;
  
  // Batch set initial properties
  gsap.set(images, { 
    opacity: 0,
    scale: prefersReducedMotion || isMobile ? 1 : 0.95,
    y: prefersReducedMotion || isMobile ? 0 : 20,
    willChange: 'transform, opacity'
  });
  
  // Create more efficient batched animations
  images.forEach((image) => {
    ScrollTrigger.create({
      trigger: image,
      start: 'top bottom-=80', // Trigger slightly earlier
      toggleActions: 'play none none reverse',
      onEnter: () => {
        gsap.to(image, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6, // Slightly faster animation
          ease: 'power2.out',
          overwrite: true,
          clearProps: 'willChange' // Clean up after animation completes
        });
      },
      onLeaveBack: () => {
        gsap.to(image, {
          opacity: 0,
          scale: prefersReducedMotion || isMobile ? 1 : 0.95,
          y: prefersReducedMotion || isMobile ? 0 : 20,
          duration: 0.4, // Faster exit animation
          ease: 'power2.in',
          overwrite: true
        });
      },
      onLeave: () => {
        // Clear will-change when element leaves viewport to free up resources
        gsap.set(image, { clearProps: 'willChange' });
      }
    });
  });
};

/**
 * Initialize all scroll animations
 */
export const initAllScrollAnimations = () => {
  setupTextRevealAnimations();
  setupImageRevealAnimations();
  setupSectionTransitions();
  setupParallaxEffects();
  
  return () => {
    // Kill all ScrollTrigger instances when cleaning up
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
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