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
      multiplier: 0.7,
      lerp: 0.08,
      getDirection: true,
      getSpeed: true,
      tablet: {
        smooth: true,
        breakpoint: 1024,
        multiplier: 0.8,
      },
      smartphone: {
        smooth: true,
        multiplier: 0.9,
      },
      reloadOnContextChange: true,
      class: "is-inview",
    });
    
    scroll.on('scroll', (instance: any) => {
      document.documentElement.setAttribute('data-scroll-direction', instance.direction || '');
      document.documentElement.setAttribute('data-scroll-speed', Math.min(Math.abs(instance.speed || 0) * 10, 100).toString());
    });
    
    scrollInstance.scroll = scroll;
    
    window.addEventListener('resize', () => {
      setTimeout(() => {
        scroll.update();
      }, 300);
    });
    
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

export const scrollTo = (target: string | HTMLElement) => {
  if (scrollInstance.scroll) {
    scrollInstance.scroll.scrollTo(target, {
      offset: -50,
      duration: 1200,
      easing: [0.25, 0.0, 0.35, 1.0],
      disableLerp: false,
    });
  } else {
    try {
      const targetElement = typeof target === 'string'
        ? document.querySelector(target)
        : target;
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.pageYOffset - 50,
          behavior: 'smooth'
        });
        
        if (typeof target === 'string' && target.startsWith('#')) {
          window.history.pushState(null, '', target);
        }
      }
    } catch (error) {
      console.error('Error scrolling to element:', error);
    }
  }
};

export const scrollToSection = (id: string, offset: number = 0) => {
  const element = document.querySelector(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }
};

export const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href) {
        scrollTo(href);
      }
    });
  });
};

export const updateScroll = () => {
  if (scrollInstance.scroll) {
    setTimeout(() => {
      scrollInstance.scroll?.update();
    }, 200);
  }
};

export const disableScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  document.body.classList.add('scroll-disabled');
  
  window.onscroll = () => {
    window.scrollTo(scrollLeft, scrollTop);
  };
};

export const enableScroll = () => {
  document.body.classList.remove('scroll-disabled');
  window.onscroll = null;
}; 