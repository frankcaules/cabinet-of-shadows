"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/components/a11y/MotionProvider";
import type { TransitionProps } from "./transitionRegistry";

const BAT_COUNT = 26;

export function DraculaTransition({ onComplete }: TransitionProps) {
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
        tl.to("#prev-veil", { opacity: 0, duration: 0.22 }, 0);
        tl.to(svg, { opacity: 0, duration: 0.18 }, ">");
        return;
      }
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete,
      });
      tl.set(svg, { opacity: 1 });
      tl.set(".cos-bat", {
        x: -20,
        y: (i) => -10 + ((i * 41) % 110),
        opacity: 0,
        scale: () => 0.7 + ((Math.random() * 0.6) | 0) * 0.1,
        transformOrigin: "50% 50%",
      });
      tl.set("#prev-veil", { opacity: 1, fill: "#0B0608" });

      // Swarm sweeps L -> R
      tl.to(".cos-bat", {
        opacity: 1,
        duration: 0.12,
        stagger: { each: 0.02, from: "random" },
      }, 0);
      tl.to(".cos-bat", {
        x: 130,
        duration: 1.05,
        stagger: { each: 0.018, from: "start" },
        ease: "power1.in",
      }, 0);

      // Veil shifts to oxblood mid-sweep
      tl.to("#prev-veil", {
        attr: { fill: "#5C0A0A" },
        duration: 0.28,
      }, 0.72);

      // Reveal underlying page
      tl.to("#prev-veil", { opacity: 0, duration: 0.32 }, 1.35);
      tl.to(svg, { opacity: 0, duration: 0.2 }, 1.55);
    }, svg);

    return () => ctx.revert();
  }, [reduced, onComplete]);

  return (
    <svg
      ref={svgRef}
      className="dracula-transition"
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
      <defs>
        <symbol id="cos-bat-sprite" viewBox="0 0 10 6" overflow="visible">
          <path
            d="M5 3 Q3.2 1.2 0.2 2.2 Q1.8 3.4 5 3.2 Q8.2 3.4 9.8 2.2 Q6.8 1.2 5 3 Z"
            fill="#0B0608"
          />
        </symbol>
      </defs>
      <rect id="prev-veil" x="0" y="0" width="100" height="100" fill="#0B0608" />
      {Array.from({ length: BAT_COUNT }).map((_, i) => (
        <use
          key={i}
          className="cos-bat"
          href="#cos-bat-sprite"
          width="8"
          height="5"
          x="0"
          y="0"
        />
      ))}
    </svg>
  );
}
