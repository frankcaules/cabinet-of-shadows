"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/components/a11y/MotionProvider";

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Reduced motion: skip Lenis entirely so scroll is fully native.
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      duration: 1.6,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  return <>{children}</>;
}
