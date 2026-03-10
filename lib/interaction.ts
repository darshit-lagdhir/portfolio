"use client";

import { useState, useEffect } from "react";

/**
 * Hook to track scroll position with high performance
 */
export function useScrollPosition() {
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;

    const updatePosition = () => {
      setScrollPos({ x: window.scrollX, y: window.scrollY });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updatePosition();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollPos;
}

/**
 * Detect if an element is in view with a specific offset
 */
export function useInView(ref: React.RefObject<HTMLElement | null>, offset = "0px") {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: offset }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, offset]);

  return isInView;
}

/**
 * Interaction State Management for transient UI states
 */
export function useInteractionState<T>(initialValue: T, resetDelay = 1000) {
  const [state, setState] = useState<T>(initialValue);

  const setWithReset = (newValue: T) => {
    setState(newValue);
    setTimeout(() => setState(initialValue), resetDelay);
  };

  return [state, setWithReset] as const;
}
