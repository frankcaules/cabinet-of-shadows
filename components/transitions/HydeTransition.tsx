"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/components/a11y/MotionProvider";
import type { TransitionProps } from "./transitionRegistry";

/**
 * Chemical-Morph transition (Mr. Hyde)
 *
 * Green chemical vapor rises from the bottom, the viewport briefly inverts
 * (a moment of unbearable affect), then the vapor disperses to reveal the
 * new page. ~1.7s total. Reduced motion → a quick crossfade.
 */
export function HydeTransition({ onComplete }: TransitionProps) {
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
        tl.to("#hy-veil", { opacity: 0, duration: 0.22 }, 0);
        tl.to(svg, { opacity: 0, duration: 0.18 }, ">");
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, onComplete });
      tl.set(svg, { opacity: 1 });
      tl.set("#hy-veil", { opacity: 1, fill: "#13140E" });
      tl.set(".hy-vapor", { yPercent: 60, opacity: 0, transformOrigin: "50% 100%" });

      // Vapor billows up from the bottom in three plumes
      tl.to(".hy-vapor", {
        opacity: 1,
        duration: 0.4,
        stagger: { each: 0.08, from: "edges" },
      }, 0);
      tl.to(".hy-vapor", {
        yPercent: -10,
        duration: 1.0,
        stagger: { each: 0.05 },
        ease: "power1.out",
      }, 0);

      // Brief filter inversion in the middle of the transition
      tl.to(svg, {
        filter: "invert(0.92) hue-rotate(30deg)",
        duration: 0.14,
      }, 0.55);
      tl.to(svg, {
        filter: "invert(0) hue-rotate(0deg)",
        duration: 0.16,
      }, 0.78);

      // Veil bleeds to oxblood under the vapor
      tl.to("#hy-veil", { attr: { fill: "#3A1414" }, duration: 0.35 }, 0.4);

      // Veil + vapor clear
      tl.to("#hy-veil", { opacity: 0, duration: 0.32 }, 1.15);
      tl.to(".hy-vapor", { opacity: 0, duration: 0.28 }, 1.20);
      tl.to(svg, { opacity: 0, duration: 0.18 }, 1.45);
    }, svg);

    return () => ctx.revert();
  }, [reduced, onComplete]);

  return (
    <svg
      ref={svgRef}
      className="hyde-transition"
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
      <rect id="hy-veil" x="0" y="0" width="100" height="100" fill="#13140E" />
      <g className="hy-vapor-group">
        <ellipse className="hy-vapor" cx="20" cy="100" rx="28" ry="22" fill="#6B8E4E" opacity="0.55" />
        <ellipse className="hy-vapor" cx="50" cy="100" rx="34" ry="28" fill="#9CB078" opacity="0.5" />
        <ellipse className="hy-vapor" cx="80" cy="100" rx="26" ry="20" fill="#6B8E4E" opacity="0.55" />
      </g>
    </svg>
  );
}
