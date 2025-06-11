import { useEffect } from 'react';

export const useScrollIntoView = () => {
  useEffect(() => {
    if (!window.location.hash) return;

    const id = window.location.hash.substring(1);
    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Check if the DOM is ready
    const observer = new MutationObserver((_, observer) => {
      const element = document.getElementById(id);
      if (element) {
        scrollToElement();
        observer.disconnect(); // If the element is found, stop the observer
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // If the element already exists, execute it immediately
    scrollToElement();
    return () => observer.disconnect();
  }, []);
};
