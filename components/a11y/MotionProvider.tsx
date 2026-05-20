"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface MotionContextValue {
  reduced: boolean;
}

const MotionContext = createContext<MotionContextValue>({ reduced: false });

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.reducedMotion = reduced ? "true" : "false";
  }, [reduced]);

  return <MotionContext.Provider value={{ reduced }}>{children}</MotionContext.Provider>;
}

export function useReducedMotion(): boolean {
  return useContext(MotionContext).reduced;
}
