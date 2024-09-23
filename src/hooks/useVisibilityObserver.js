import { useState, useEffect } from 'react';

const useVisibilityObserver = (element, rootMargin) => {
  const [isVisible, setState] = useState(false);
  const [observer, setObserver] = useState(null);

  useEffect(() => {
    if (!element.current) return; 
    const currentElement = element.current; 
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );

    setObserver(observer);

    observer.observe(currentElement);
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement); 
      }
    };
  }, [element, rootMargin]); 
  return { isVisible, observer };
};

export default useVisibilityObserver;
