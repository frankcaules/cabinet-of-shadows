"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/components/a11y/MotionProvider";

/**
 * TransitionMedia
 * ---------------
 * Mounted by TransitionLayer for each route change. Renders a full-viewport
 * painted backdrop from /transitions/<slug>.webp that animates in beneath
 * the SVG transition. The painted image gives the transition cinematic
 * depth — instead of just animated SVG primitives on a flat veil, you get
 * a dramatic painted scene (looming bat, claw rake, crimson curtain, etc.)
 * revealing itself as the veil fades.
 *
 * Timing: the image stays nearly invisible during the first ~0.6s while the
 * SVG primitives swarm/strike, peaks at 0.78 opacity around 1.0–1.2s as the
 * SVG veil thins, then fades out together with the SVG at ~1.6s+.
 *
 * z-index: image sits at 99 — BELOW the SVG transition (z 100). The painted
 * scene shows through the SVG veil only when the veil's own opacity drops
 * during the timeline.
 *
 * Audio: previously this component also played a per-monster transition
 * stinger; audio has been removed from the site entirely.
 */
export function TransitionMedia({ slug }: { slug: string }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    if (reduced) {
      // Reduced motion: a single soft fade
      const tl = gsap.timeline();
      tl.set(el, { opacity: 0 });
      tl.to(el, { opacity: 0.45, duration: 0.18 }, 0);
      tl.to(el, { opacity: 0, duration: 0.18 }, 0.22);
      return () => { tl.kill(); };
    }

    const tl = gsap.timeline();
    // Start slightly zoomed-in for a parallax-pull feel as it reveals
    tl.set(el, { opacity: 0, scale: 1.12, transformOrigin: "50% 50%" });
    // Subtle pre-bleed during the first half of the transition
    tl.to(el, { opacity: 0.18, duration: 0.45, ease: "power2.out" }, 0.0);
    // Peak — the painted scene becomes the dominant image as the SVG veil thins
    tl.to(el, { opacity: 0.78, duration: 0.55, ease: "power2.inOut" }, 0.55);
    // Slow inward dolly — feels cinematic
    tl.to(el, { scale: 1.0, duration: 1.2, ease: "power2.out" }, 0);
    // Fade out together with the new page reveal
    tl.to(el, { opacity: 0, duration: 0.45, ease: "power2.in" }, 1.35);

    return () => { tl.kill(); };
  }, [slug, reduced]);

  return (
    <div
      ref={imgRef}
      className="cos-transition-media"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100dvw",
        height: "100dvh",
        backgroundImage: `url("/transitions/${slug}.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 99,
        pointerEvents: "none",
        opacity: 0,
        // Gentle vignette so the painted image blends into the surrounding veil
        // even when the SVG transition's own veil is partly transparent.
        boxShadow: "inset 0 0 220px 80px rgba(0,0,0,0.55)",
      }}
    />
  );
}
