"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/components/a11y/MotionProvider";
import type { TransitionProps } from "./transitionRegistry";

/**
 * Shared scaffolding for the nine Phase-2 transitions.
 *
 * Each transition uses a single full-viewport SVG with a tonally
 * appropriate veil and one or two layered motifs that animate via GSAP.
 * Reduced motion → a 220 ms crossfade.
 *
 * The transitions are intentionally restrained — the brief asks for
 * motion that signposts arrival, not motion that competes with the
 * dossier content beneath.
 */

interface TweenSpec {
  setup: (svg: SVGSVGElement, gsap: typeof import("gsap").gsap) => void;
  timeline: (tl: gsap.core.Timeline) => void;
  reducedSelector: string; // CSS selector for the element whose opacity fades on reduced-motion
}

function useTransition(spec: TweenSpec, onComplete: () => void) {
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
        tl.to(spec.reducedSelector, { opacity: 0, duration: 0.22 }, 0);
        tl.to(svg, { opacity: 0, duration: 0.18 }, ">");
        return;
      }
      spec.setup(svg, gsap);
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, onComplete });
      tl.set(svg, { opacity: 1 });
      spec.timeline(tl);
    }, svg);
    return () => ctx.revert();
  }, [reduced, onComplete, spec]);

  return svgRef;
}

function fullViewportSvgStyle(): React.CSSProperties {
  return {
    position: "fixed",
    inset: 0,
    width: "100dvw",
    height: "100dvh",
    zIndex: 100,
    pointerEvents: "none",
    opacity: 0,
  };
}

// =====================================================================
// 5. Griffin — bandage-unwrap: bandages unwrap horizontally; faint
//    footprint impression flashes at the end.
// =====================================================================
export function GriffinTransition({ onComplete }: TransitionProps) {
  const ref = useTransition(
    {
      reducedSelector: "#gr-veil",
      setup: () => {
        gsap.set(".gr-band", { scaleX: 1, transformOrigin: "50% 50%" });
        gsap.set("#gr-footprint", { opacity: 0 });
      },
      timeline: (tl) => {
        tl.set("#gr-veil", { opacity: 1 });
        tl.to(".gr-band", {
          scaleX: 0,
          duration: 0.6,
          stagger: { each: 0.06, from: "edges" },
          ease: "expo.in",
        }, 0);
        tl.to("#gr-veil", { opacity: 0, duration: 0.4 }, 0.55);
        tl.to("#gr-footprint", { opacity: 0.55, duration: 0.18 }, 0.95);
        tl.to("#gr-footprint", { opacity: 0,    duration: 0.32 }, 1.15);
        tl.to(ref.current!, { opacity: 0, duration: 0.2 }, 1.4);
      },
    },
    onComplete,
  );
  return (
    <svg ref={ref} className="griffin-transition" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={fullViewportSvgStyle()}>
      <rect id="gr-veil" x="0" y="0" width="100" height="100" fill="#14130E" />
      <g>
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} className="gr-band" x="0" y={i * 11} width="100" height="9" fill="#E8E0D0" opacity="0.96" />
        ))}
      </g>
      <ellipse id="gr-footprint" cx="50" cy="62" rx="6" ry="3" fill="#C9A86A" opacity="0" />
    </svg>
  );
}

// =====================================================================
// 6. Carmilla — silk-curtain: black silk curtains close from both sides
//    slowly; petals fall and turn to droplets near the floor.
// =====================================================================
export function CarmillaTransition({ onComplete }: TransitionProps) {
  const ref = useTransition(
    {
      reducedSelector: "#cm-veil-l,#cm-veil-r",
      setup: () => {
        gsap.set("#cm-veil-l", { xPercent: -100 });
        gsap.set("#cm-veil-r", { xPercent: 100 });
        gsap.set(".cm-petal", { y: -10, opacity: 0 });
      },
      timeline: (tl) => {
        // curtains close
        tl.to("#cm-veil-l", { xPercent: 0, duration: 0.85, ease: "power3.inOut" }, 0);
        tl.to("#cm-veil-r", { xPercent: 0, duration: 0.85, ease: "power3.inOut" }, 0);
        // petals fall
        tl.to(".cm-petal", {
          opacity: 1,
          duration: 0.18,
          stagger: { each: 0.05, from: "random" },
        }, 0.3);
        tl.to(".cm-petal", {
          y: 110,
          duration: 1.0,
          stagger: { each: 0.05, from: "random" },
          ease: "power1.in",
        }, 0.3);
        // curtains part
        tl.to("#cm-veil-l", { xPercent: -100, duration: 0.7, ease: "power3.inOut" }, 1.25);
        tl.to("#cm-veil-r", { xPercent: 100,  duration: 0.7, ease: "power3.inOut" }, 1.25);
        tl.to(ref.current!, { opacity: 0, duration: 0.22 }, 1.85);
      },
    },
    onComplete,
  );
  return (
    <svg ref={ref} className="carmilla-transition" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={fullViewportSvgStyle()}>
      <rect id="cm-veil-l" x="0"  y="0" width="50" height="100" fill="#0D0510" />
      <rect id="cm-veil-r" x="50" y="0" width="50" height="100" fill="#0D0510" />
      <g>
        {Array.from({ length: 14 }).map((_, i) => (
          <ellipse
            key={i}
            className="cm-petal"
            cx={6 + (i * 7) % 92}
            cy={-2}
            rx={1.4}
            ry={2.4}
            fill={i % 3 === 0 ? "#7A1A2A" : "#B58AB0"}
            opacity="0"
          />
        ))}
      </g>
    </svg>
  );
}

// =====================================================================
// 7. Erik — opera-curtain: red velvet curtain drops from the top; sheet
//    music notes scatter upward; brief tilt.
// =====================================================================
export function ErikTransition({ onComplete }: TransitionProps) {
  const ref = useTransition(
    {
      reducedSelector: "#er-curtain",
      setup: () => {
        gsap.set("#er-curtain", { yPercent: -100 });
        gsap.set(".er-note", { y: 105, opacity: 0 });
      },
      timeline: (tl) => {
        tl.to("#er-curtain", { yPercent: 0, duration: 0.6, ease: "power3.in" }, 0);
        tl.to(ref.current!, { rotation: 1, duration: 0.18 }, 0);
        tl.to(ref.current!, { rotation: 0, duration: 0.2 }, 0.5);
        tl.to(".er-note", {
          opacity: 1,
          duration: 0.18,
          stagger: { each: 0.04 },
        }, 0.55);
        tl.to(".er-note", {
          y: -8,
          duration: 1.1,
          stagger: { each: 0.04 },
          ease: "power1.out",
        }, 0.55);
        tl.to("#er-curtain", { yPercent: -100, duration: 0.6, ease: "power3.out" }, 1.4);
        tl.to(".er-note", { opacity: 0, duration: 0.4 }, 1.6);
        tl.to(ref.current!, { opacity: 0, duration: 0.22 }, 1.95);
      },
    },
    onComplete,
  );
  return (
    <svg ref={ref} className="erik-transition" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={fullViewportSvgStyle()}>
      <rect id="er-curtain" x="0" y="0" width="100" height="100" fill="#6B0F1A" />
      <g>
        {Array.from({ length: 12 }).map((_, i) => (
          <text
            key={i}
            className="er-note"
            x={6 + (i * 8.5) % 92}
            y="105"
            fontSize="6"
            fill="#BFA34A"
            opacity="0"
          >
            ♪
          </text>
        ))}
      </g>
    </svg>
  );
}

// =====================================================================
// 8. Dorian — portrait-age: viewport ages (filter craquelure overlay),
//    gilded frame snaps in then out.
// =====================================================================
export function DorianTransition({ onComplete }: TransitionProps) {
  const ref = useTransition(
    {
      reducedSelector: "#do-veil",
      setup: () => {
        gsap.set("#do-frame", { opacity: 0, scale: 0.92, transformOrigin: "50% 50%" });
        gsap.set("#do-veil", { opacity: 0 });
      },
      timeline: (tl) => {
        tl.to("#do-frame", { opacity: 1, scale: 1, duration: 0.32, ease: "back.out(2)" }, 0);
        tl.to(ref.current!, { filter: "sepia(0.5) saturate(0.65)", duration: 0.35 }, 0);
        tl.to("#do-veil", { opacity: 1, duration: 0.3 }, 0.4);
        tl.to(ref.current!, { filter: "sepia(0) saturate(1)", duration: 0.4 }, 0.95);
        tl.to("#do-frame", { opacity: 0, scale: 1.05, duration: 0.4 }, 1.05);
        tl.to("#do-veil", { opacity: 0, duration: 0.4 }, 1.05);
        tl.to(ref.current!, { opacity: 0, duration: 0.22 }, 1.6);
      },
    },
    onComplete,
  );
  return (
    <svg ref={ref} className="dorian-transition" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={fullViewportSvgStyle()}>
      <rect id="do-veil" x="0" y="0" width="100" height="100" fill="#1A1410" opacity="0" />
      <g id="do-frame" opacity="0">
        {/* outer gilded frame */}
        <rect x="2" y="2" width="96" height="96" fill="none" stroke="#B89D4F" strokeWidth="2" />
        <rect x="5" y="5" width="90" height="90" fill="none" stroke="#B89D4F" strokeWidth="0.5" opacity="0.6" />
        {/* craquelure suggestion */}
        <g stroke="#3A2A1A" strokeWidth="0.15" fill="none" opacity="0.6">
          <path d="M10 20 L30 30 L50 20 L70 30 L90 18" />
          <path d="M12 70 L32 60 L52 70 L72 60 L88 72" />
          <path d="M20 40 L20 60" />
          <path d="M80 40 L80 60" />
        </g>
      </g>
    </svg>
  );
}

// =====================================================================
// 9. Varney — newsprint-flutter: a torn newsprint page flutters across;
//    lightning flash; thunder veil.
// =====================================================================
export function VarneyTransition({ onComplete }: TransitionProps) {
  const ref = useTransition(
    {
      reducedSelector: "#vr-veil",
      setup: () => {
        gsap.set("#vr-page", { x: -120, rotation: -8 });
        gsap.set("#vr-flash", { opacity: 0 });
      },
      timeline: (tl) => {
        tl.set("#vr-veil", { opacity: 1 });
        tl.to("#vr-page", { x: 120, rotation: 8, duration: 1.15, ease: "power1.in" }, 0);
        tl.to("#vr-flash", { opacity: 0.6, duration: 0.06 }, 0.65);
        tl.to("#vr-flash", { opacity: 0,   duration: 0.18 }, 0.75);
        tl.to("#vr-veil", { opacity: 0, duration: 0.4 }, 0.95);
        tl.to(ref.current!, { opacity: 0, duration: 0.22 }, 1.45);
      },
    },
    onComplete,
  );
  return (
    <svg ref={ref} className="varney-transition" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={fullViewportSvgStyle()}>
      <rect id="vr-veil" x="0" y="0" width="100" height="100" fill="#14110C" />
      <g id="vr-page">
        <rect x="-30" y="35" width="60" height="30" fill="#D4C896" opacity="0.95" />
        <g stroke="#3A2A1A" strokeWidth="0.4" opacity="0.7">
          <line x1="-26" y1="40" x2="26" y2="40" />
          <line x1="-26" y1="43" x2="26" y2="43" />
          <line x1="-26" y1="46" x2="26" y2="46" />
          <line x1="-26" y1="49" x2="26" y2="49" />
          <line x1="0" y1="38" x2="0" y2="62" />
          <line x1="-26" y1="55" x2="26" y2="55" />
          <line x1="-26" y1="58" x2="26" y2="58" />
        </g>
        <path d="M30 35 L30 65 Q22 50 14 38 Q22 32 30 35 Z" fill="#3A1414" opacity="0.85" />
      </g>
      <rect id="vr-flash" x="0" y="0" width="100" height="100" fill="#F0E5BC" opacity="0" />
    </svg>
  );
}

// =====================================================================
// 10. Sweeney — razor-slice: a razor cuts horizontally across the
//     viewport; the two halves part vertically.
// =====================================================================
export function SweeneyTransition({ onComplete }: TransitionProps) {
  const ref = useTransition(
    {
      reducedSelector: "#sw-veil-top,#sw-veil-bot",
      setup: () => {
        gsap.set("#sw-razor", { x: -110 });
        gsap.set("#sw-veil-top", { y: 0 });
        gsap.set("#sw-veil-bot", { y: 0 });
        gsap.set("#sw-line", { scaleX: 0, transformOrigin: "0% 50%" });
      },
      timeline: (tl) => {
        // razor sweeps across drawing a red line
        tl.to("#sw-razor", { x: 110, duration: 0.55, ease: "power3.in" }, 0);
        tl.to("#sw-line", { scaleX: 1, duration: 0.55, ease: "power3.in" }, 0);
        // halves part vertically
        tl.to("#sw-veil-top", { y: -55, duration: 0.6, ease: "expo.in" }, 0.55);
        tl.to("#sw-veil-bot", { y:  55, duration: 0.6, ease: "expo.in" }, 0.55);
        tl.to("#sw-line", { opacity: 0, duration: 0.4 }, 0.95);
        tl.to(ref.current!, { opacity: 0, duration: 0.22 }, 1.45);
      },
    },
    onComplete,
  );
  return (
    <svg ref={ref} className="sweeney-transition" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={fullViewportSvgStyle()}>
      <rect id="sw-veil-top" x="0" y="0"  width="100" height="50" fill="#131210" />
      <rect id="sw-veil-bot" x="0" y="50" width="100" height="50" fill="#131210" />
      <rect id="sw-line" x="0" y="49.5" width="100" height="1" fill="#9C1B1B" />
      <g id="sw-razor">
        <rect x="-12" y="48" width="14" height="2.4" fill="#C8C8C8" stroke="#3A2A1A" strokeWidth="0.2" />
        <rect x="-12" y="50.4" width="14" height="0.8" fill="#9C1B1B" opacity="0.7" />
      </g>
    </svg>
  );
}

// =====================================================================
// 11. Spring-Heeled Jack — spring-leap: blue flames flash from corners,
//     a leaping silhouette streaks diagonally; clawed scratches drag
//     the veil upward.
// =====================================================================
export function JackTransition({ onComplete }: TransitionProps) {
  const ref = useTransition(
    {
      reducedSelector: "#jk-veil",
      setup: () => {
        gsap.set(".jk-flame", { opacity: 0, scale: 0.6, transformOrigin: "50% 100%" });
        gsap.set("#jk-leaper", { x: -30, y: 110, opacity: 0 });
      },
      timeline: (tl) => {
        tl.set("#jk-veil", { opacity: 1 });
        // blue flames from bottom corners
        tl.to(".jk-flame", { opacity: 0.85, scale: 1, duration: 0.35, stagger: 0.05 }, 0);
        // leaper streaks diagonally up-and-right
        tl.to("#jk-leaper", { x: 130, y: -30, opacity: 1, duration: 0.55, ease: "power2.out" }, 0.25);
        tl.to("#jk-leaper", { opacity: 0, duration: 0.18 }, 0.7);
        // veil scrolls up
        tl.to("#jk-veil", { yPercent: -100, duration: 0.6, ease: "expo.in" }, 0.85);
        tl.to(".jk-flame", { opacity: 0, duration: 0.35 }, 0.95);
        tl.to(ref.current!, { opacity: 0, duration: 0.22 }, 1.55);
      },
    },
    onComplete,
  );
  return (
    <svg ref={ref} className="jack-transition" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={fullViewportSvgStyle()}>
      <rect id="jk-veil" x="0" y="0" width="100" height="100" fill="#15161A" />
      <g>
        <path className="jk-flame" d="M2 100 Q-2 88 6 80 Q8 88 12 86 Q14 94 10 100 Z" fill="#4A8BCC" opacity="0" />
        <path className="jk-flame" d="M98 100 Q102 88 94 80 Q92 88 88 86 Q86 94 90 100 Z" fill="#4A8BCC" opacity="0" />
        <path className="jk-flame" d="M50 100 Q46 90 50 82 Q54 90 50 100 Z" fill="#9CC4F0" opacity="0" />
      </g>
      <g id="jk-leaper" opacity="0">
        <path d="M0 0 L3 -6 L1 -10 L4 -12 L7 -10 L5 -6 L8 -4 L6 0 L4 4 L2 8 L0 4 Z" fill="#15161A" stroke="#E3B23C" strokeWidth="0.4" />
      </g>
    </svg>
  );
}

// =====================================================================
// 12. Golem — clay-dust: aleph stroke draws on screen, fades to met,
//     page crumbles to dust particles.
// =====================================================================
export function GolemTransition({ onComplete }: TransitionProps) {
  const ref = useTransition(
    {
      reducedSelector: "#gm-veil",
      setup: () => {
        const paths = ref.current!.querySelectorAll<SVGPathElement>(".gm-letter");
        paths.forEach((p) => {
          const len = p.getTotalLength();
          p.style.strokeDasharray = String(len);
          p.style.strokeDashoffset = String(len);
        });
        gsap.set(".gm-dust", { opacity: 0, y: 0 });
      },
      timeline: (tl) => {
        tl.set("#gm-veil", { opacity: 1 });
        // letters draw
        tl.to(".gm-letter", {
          strokeDashoffset: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: "power2.out",
        }, 0);
        // aleph fades
        tl.to("#gm-aleph", { opacity: 0, duration: 0.3 }, 0.75);
        // dust rises and clears veil
        tl.to(".gm-dust", { opacity: 0.85, y: -25, duration: 0.7, stagger: 0.02, ease: "power1.out" }, 0.95);
        tl.to("#gm-veil", { opacity: 0, duration: 0.45 }, 1.05);
        tl.to(".gm-dust", { opacity: 0, duration: 0.4 }, 1.4);
        tl.to(ref.current!, { opacity: 0, duration: 0.22 }, 1.7);
      },
    },
    onComplete,
  );
  return (
    <svg ref={ref} className="golem-transition" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={fullViewportSvgStyle()}>
      <rect id="gm-veil" x="0" y="0" width="100" height="100" fill="#1A1610" />
      {/* aleph, mem, taw drawn as paths — stylised */}
      <g fill="none" stroke="#E8DCC4" strokeWidth="1.4" strokeLinecap="round">
        <path id="gm-aleph" className="gm-letter" d="M30 50 L30 64 M30 54 L40 50 M30 54 L20 64" />
        <path className="gm-letter" d="M50 50 L50 64 L60 64 L60 56 L66 56 L66 50 Z" />
        <path className="gm-letter" d="M76 50 L76 64 L84 64 M76 50 L82 50" />
      </g>
      <g>
        {Array.from({ length: 16 }).map((_, i) => (
          <circle
            key={i}
            className="gm-dust"
            cx={20 + i * 4}
            cy={70 + (i % 3) * 4}
            r={0.6 + (i % 4) * 0.2}
            fill="#9C7B4A"
            opacity="0"
          />
        ))}
      </g>
    </svg>
  );
}

// =====================================================================
// 13. Horseman — pumpkin-arc: a flaming pumpkin arcs across the
//     viewport leaving a trail of embers; shatters and embers scatter.
// =====================================================================
export function HorsemanTransition({ onComplete }: TransitionProps) {
  const ref = useTransition(
    {
      reducedSelector: "#hm-veil",
      setup: () => {
        gsap.set("#hm-pumpkin", { x: 110, y: 80, rotation: 0, opacity: 1 });
        gsap.set(".hm-ember", { opacity: 0 });
        gsap.set("#hm-veil", { opacity: 1 });
      },
      timeline: (tl) => {
        // pumpkin arcs right -> left
        tl.to("#hm-pumpkin", {
          motionPath: undefined,
          duration: 0.85,
          ease: "power2.in",
          x: -15,
          y: 70,
          rotation: -260,
        }, 0);
        // embers fire along the way
        tl.to(".hm-ember", {
          opacity: 1,
          duration: 0.12,
          stagger: 0.04,
        }, 0.1);
        tl.to(".hm-ember", {
          y: "+=8",
          opacity: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "power1.out",
        }, 0.22);
        // pumpkin shatters
        tl.to("#hm-pumpkin", { opacity: 0, duration: 0.15 }, 0.82);
        tl.to(".hm-shard", { opacity: 1, duration: 0.08 }, 0.85);
        tl.to(".hm-shard", { x: (i) => (i - 3) * 7, y: (i) => -8 + (i % 2) * 12, opacity: 0, duration: 0.55, ease: "power1.out" }, 0.92);
        tl.to("#hm-veil", { opacity: 0, duration: 0.45 }, 1.15);
        tl.to(ref.current!, { opacity: 0, duration: 0.22 }, 1.65);
      },
    },
    onComplete,
  );
  return (
    <svg ref={ref} className="horseman-transition" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={fullViewportSvgStyle()}>
      <rect id="hm-veil" x="0" y="0" width="100" height="100" fill="#14100B" />
      <g id="hm-pumpkin">
        <ellipse cx="0" cy="0" rx="5" ry="4" fill="#D9601A" stroke="#3A1F0E" strokeWidth="0.4" />
        <rect x="-1" y="-5" width="2" height="2" fill="#3A2A14" />
        <path d="M-3 0 L-1 0 L-2 1.2 Z" fill="#FFE38C" />
        <path d="M1 0 L3 0 L2 1.2 Z" fill="#FFE38C" />
        <path d="M-2 2 Q0 3.4 2 2" fill="none" stroke="#FFE38C" strokeWidth="0.5" />
      </g>
      <g>
        {Array.from({ length: 10 }).map((_, i) => (
          <circle
            key={i}
            className="hm-ember"
            cx={110 - i * 12}
            cy={80 - i * 1.5}
            r={0.6}
            fill="#FFE38C"
            opacity="0"
          />
        ))}
      </g>
      <g>
        {Array.from({ length: 6 }).map((_, i) => (
          <rect
            key={i}
            className="hm-shard"
            x="-15"
            y="68"
            width="1.4"
            height="1.4"
            fill="#D9601A"
            opacity="0"
          />
        ))}
      </g>
    </svg>
  );
}
