"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/components/a11y/MotionProvider";
import type { TransitionProps } from "./transitionRegistry";

/**
 * Lightning-Suture transition (Frankenstein's Creature)
 *
 * Phase 2 placeholder: three rapid gaslamp stutters, a single vertical bolt
 * down the screen centre, then the page splits along the bolt and the two
 * halves slide apart like a wound being opened. ~1.8s total.
 */
export function CreatureTransition({ onComplete }: TransitionProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) {
      onComplete();
      return;
    }
    const ctx = gsap.context(() => {
      if (reduced) {
        const tl = gsap.timeline({ onComplete });
        tl.set(svg, { opacity: 1 });
        tl.to("#cr-veil-l, #cr-veil-r", { opacity: 0, duration: 0.22 }, 0);
        tl.to(svg, { opacity: 0, duration: 0.18 }, ">");
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, onComplete });
      tl.set(svg, { opacity: 1 });
      tl.set("#cr-veil-l", { xPercent: 0 });
      tl.set("#cr-veil-r", { xPercent: 0 });
      tl.set("#cr-bolt", { opacity: 0, scaleY: 0, transformOrigin: "50% 0%" });
      tl.set("#cr-flash", { opacity: 0 });

      // Three rapid gaslamp stutters
      tl.to("#cr-flash", { opacity: 0.5, duration: 0.06 }, 0.0);
      tl.to("#cr-flash", { opacity: 0,   duration: 0.06 }, 0.06);
      tl.to("#cr-flash", { opacity: 0.7, duration: 0.05 }, 0.18);
      tl.to("#cr-flash", { opacity: 0,   duration: 0.05 }, 0.23);
      tl.to("#cr-flash", { opacity: 0.9, duration: 0.05 }, 0.35);

      // Bolt strikes
      tl.to("#cr-bolt", { opacity: 1, scaleY: 1, duration: 0.18, ease: "power3.in" }, 0.35);
      tl.to("#cr-flash", { opacity: 0, duration: 0.18 }, 0.53);

      // Veils slide apart along the bolt
      tl.to("#cr-veil-l", { xPercent: -110, duration: 0.55, ease: "expo.in" }, 0.55);
      tl.to("#cr-veil-r", { xPercent:  110, duration: 0.55, ease: "expo.in" }, 0.55);

      // Bolt fades
      tl.to("#cr-bolt", { opacity: 0, duration: 0.35 }, 0.95);

      // Clean up the layer
      tl.to(svg, { opacity: 0, duration: 0.18 }, 1.2);
    }, svg);

    return () => ctx.revert();
  }, [reduced, onComplete]);

  return (
    <svg
      ref={svgRef}
      className="creature-transition"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100dvw",
        height: "100dvh",
        zIndex: 100,
        pointerEvents: "none",
        opacity: 0,
      }}
    >
      <rect id="cr-veil-l" x="0"  y="0" width="50" height="100" fill="#0F1411" />
      <rect id="cr-veil-r" x="50" y="0" width="50" height="100" fill="#0F1411" />
      <rect id="cr-flash"  x="0"  y="0" width="100" height="100" fill="#B8D4D8" opacity="0" />
      <path
        id="cr-bolt"
        d="M49 0 L46 38 L51 38 L47 70 L54 70 L48 100 L53 60 L48 60 L52 32 L49 32 Z"
        fill="#E5DDC8"
        stroke="#0F1411"
        strokeWidth="0.3"
      />
    </svg>
  );
}
