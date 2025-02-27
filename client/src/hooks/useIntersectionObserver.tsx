import { useState, useEffect, RefObject } from 'react';

interface UseIntersectionObserverProps {
  root?: Element | null;
  target: RefObject<Element>;
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = ({
  root = null,
  target,
  threshold = 0.1,
  rootMargin = '0px',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = target.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when observer callback fires
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        
        // Unobserve once element is visible if freezeOnceVisible is true
        if (isVisible && freezeOnceVisible && element) {
          observer.unobserve(element);
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [target, root, rootMargin, threshold, freezeOnceVisible]);

  return isIntersecting;
};
