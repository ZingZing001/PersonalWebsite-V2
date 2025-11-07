import { useEffect, useRef } from 'react';

export const useSnapScroll = () => {
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const heroSection = document.querySelector('#hero');
    const aboutSection = document.querySelector('#about');
    
    if (!heroSection || !aboutSection) return;

    const scrollToAbout = () => {
      isScrolling.current = true;
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });

      // Reset scrolling flag after animation completes
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    };

    const handleWheel = (e) => {
      const scrollPosition = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      
      // Check if we're in the hero section and scrolling down
      if (scrollPosition < heroHeight - 100) {
        if (e.deltaY > 0 && !isScrolling.current) {
          e.preventDefault();
          
          // Clear any existing timeout
          clearTimeout(scrollTimeout.current);

          // Set a small delay to debounce scroll events
          scrollTimeout.current = setTimeout(() => {
            scrollToAbout();
          }, 50);
        }
      }
    };

    // Handle touch events for mobile
    let touchStart = 0;
    let touchEnd = 0;

    const handleTouchStart = (e) => {
      touchStart = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const scrollPosition = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      
      touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart - touchEnd;

      // Minimum swipe distance - only snap from hero to about
      if (diff > 50 && !isScrolling.current) {
        // If in hero section and swiping up (to go down)
        if (scrollPosition < heroHeight - 100) {
          scrollToAbout();
        }
      }
    };

    // Add event listeners with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(scrollTimeout.current);
    };
  }, []);
};
