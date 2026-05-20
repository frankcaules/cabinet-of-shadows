"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/components/a11y/MotionProvider";
import type { TransitionProps } from "./transitionRegistry";

/**
 * Claw-Rake transition (The Werewolf)
 *
 * Three diagonal claw marks slash across the viewport in quick succession.
 * The veil tears along each rake, lifting away to reveal the page. A full
 * moon glow blooms briefly behind the rakes. ~1.9s total. Reduced motion
 * → quick crossfade.
 */
export function WolfTransition({ onComplete }: TransitionProps) {
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
        tl.to("#wf-veil", { opacity: 0, duration: 0.22 }, 0);
        tl.to(svg, { opacity: 0, duration: 0.18 }, ">");
        return;
      }

      // Each claw is a path with stroke-dasharray for the "draw" effect.
      const claws = svg.querySelectorAll<SVGPathElement>(".wf-claw");
      claws.forEach((el) => {
        const len = el.getTotalLength();
        el.style.strokeDasharray = String(len);
        el.style.strokeDashoffset = String(len);
      });

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, onComplete });
      tl.set(svg, { opacity: 1 });
      tl.set("#wf-veil", { opacity: 1, fill: "#10140C" });
      tl.set("#wf-moon", { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" });

      // Moon blooms behind the rakes
      tl.to("#wf-moon", { opacity: 0.55, scale: 1, duration: 0.5 }, 0);

      // Three claw rakes drawn in fast succession
      tl.to(".wf-claw", {
        strokeDashoffset: 0,
        duration: 0.32,
        stagger: 0.08,
        ease: "power3.in",
      }, 0.15);

      // Brief flash of moon-silver light at the peak of the third claw
      tl.to("#wf-flash", { opacity: 0.4, duration: 0.1 }, 0.55);
      tl.to("#wf-flash", { opacity: 0,   duration: 0.25 }, 0.65);

      // Veil tears off — slide the masked halves apart, opacity falls
      tl.to("#wf-veil", { opacity: 0.55, duration: 0.25 }, 0.7);
      tl.to(".wf-claw", { opacity: 0, duration: 0.45 }, 0.95);
      tl.to("#wf-moon", { opacity: 0, scale: 1.4, duration: 0.45 }, 0.95);
      tl.to("#wf-veil", { opacity: 0, duration: 0.45 }, 1.0);
      tl.to(svg, { opacity: 0, duration: 0.22 }, 1.55);
    }, svg);

    return () => ctx.revert();
  }, [reduced, onComplete]);

  return (
    <svg
      ref={svgRef}
      className="wolf-transition"
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
      <rect id="wf-veil" x="0" y="0" width="100" height="100" fill="#10140C" />
      <circle id="wf-moon" cx="50" cy="50" r="22" fill="#E2DCC8" opacity="0" />
      <rect id="wf-flash" x="0" y="0" width="100" height="100" fill="#E2DCC8" opacity="0" />
      <g fill="none" stroke="#7C6CA8" strokeWidth="0.8" strokeLinecap="round" opacity="0.95">
        <path className="wf-claw" d="M2 12 Q40 35 98 22" />
        <path className="wf-claw" d="M2 42 Q42 65 98 52" />
        <path className="wf-claw" d="M2 72 Q40 95 98 82" />
      </g>
    </svg>
  );
}
