import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAnimation(ref, options = {}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !ref.current) return;
    
    const element = ref.current;
    
    const ctx = gsap.context(() => {
      // Find elements with specific classes for stagger effects
      const staggerTargets = element.querySelectorAll('.animate-stagger');
      const hasStagger = staggerTargets.length > 0;

      if (hasStagger) {
        gsap.fromTo(staggerTargets,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: options.start || 'top 80%',
              toggleActions: 'play none none reverse',
              ...options.scrollTrigger
            }
          }
        );
      }

      // Main element animation if specified or if no stagger targets
      if (!hasStagger || options.animateContainer) {
        gsap.fromTo(element, 
          { opacity: 0, y: options.yOffset || 50 },
          {
            opacity: 1,
            y: 0,
            duration: options.duration || 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: options.start || 'top 80%',
              toggleActions: 'play none none reverse',
              ...options.scrollTrigger
            }
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [ref, options]);
}
