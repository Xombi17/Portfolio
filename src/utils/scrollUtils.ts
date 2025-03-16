import { useEffect, useState, useRef } from 'react';
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
      getDirection: true,
      getSpeed: true,
      tablet: {
        smooth: true,
        breakpoint: 1024,
        multiplier: 0.85,
      },
      smartphone: {
        smooth: true,
        multiplier: 0.9,
      },
      reloadOnContextChange: true,
      class: "is-inview",
      scrollFromAnywhere: true,
      touchMultiplier: 2,
      smoothMobile: true,
    });
    
    scroll.on('scroll', (instance: any) => {
      document.documentElement.setAttribute('data-scroll-direction', instance.direction || '');
      document.documentElement.setAttribute('data-scroll-speed', Math.min(Math.abs(instance.speed || 0) * 10, 100).toString());
      
      const scrollTop = instance.scroll.y;
      const scrollHeight = instance.limit.y;
      const scrollProgress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      document.documentElement.setAttribute('data-scroll-progress', (scrollProgress * 100).toString());
      
      window.dispatchEvent(new CustomEvent('smooth-scroll', { 
        detail: { 
          progress: scrollProgress, 
          direction: instance.direction,
          speed: instance.speed
        } 
      }));
    });
    
    scrollInstance.scroll = scroll;
    
    let resizeTimer: NodeJS.Timeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        scroll.update();
      }, 300);
    });
    
    window.addEventListener('load', () => {
      scroll.update();
    });
    
    document.fonts.ready.then(() => {
      scroll.update();
    });
    
    return scroll;
  } catch (error) {
    console.error('Failed to initialize Locomotive Scroll:', error);
    document.documentElement.style.scrollBehavior = 'smooth';
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
    
    const handleSmoothScroll = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail.progress === 'number') {
        setScrollProgress(customEvent.detail.progress);
      }
    };
    
    window.addEventListener('smooth-scroll', handleSmoothScroll as EventListener);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('smooth-scroll', handleSmoothScroll as EventListener);
    };
  }, []);

  return scrollProgress;
};

export const scrollTo = (target: string | HTMLElement, options = {}) => {
  if (scrollInstance.scroll) {
    const scrollOptions = {
      offset: -100,
      duration: 1500,
      easing: [0.25, 0.1, 0.25, 1.0],
      disableLerp: false,
      ...options
    };
    
    scrollInstance.scroll.scrollTo(target, scrollOptions);
  } else {
    try {
      const targetElement = typeof target === 'string'
        ? document.querySelector(target)
        : target;
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.pageYOffset - 100,
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
  document.documentElement.style.overflow = 'hidden';
  
  window.onscroll = () => {
    window.scrollTo(scrollLeft, scrollTop);
  };
};

export const enableScroll = () => {
  document.body.classList.remove('scroll-disabled');
  document.documentElement.style.overflow = '';
  window.onscroll = null;
};

export const useScrollReveal = (threshold = 0.1) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [threshold]);
  
  return [ref, isRevealed];
}; 