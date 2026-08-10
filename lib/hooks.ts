"use client";

import { useEffect, useState } from "react";

/** Starts false on the server and on first paint, so hydration never mismatches. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useFinePointer = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)");

export const useDesktop = () => useMediaQuery("(min-width: 768px)");

/** Everything expensive is gated on this: real pointer, real motion budget. */
export function useMotionOK() {
  const reduced = useReducedMotion();
  const desktop = useDesktop();
  return { reduced, desktop, rich: !reduced && desktop };
}
