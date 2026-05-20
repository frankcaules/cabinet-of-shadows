"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useReducedMotion } from "@/components/a11y/MotionProvider";
import { CabinetFallback } from "./CabinetFallback";
import { CabinetKeyboardList } from "./CabinetKeyboardList";

// Display fonts for the 13 monsters' hover labels in the 3D scene.
// These ship only with the Cabinet client bundle (i.e. only on `/`).
import "@fontsource/unifrakturmaguntia/400.css";        // Dracula
import "@fontsource/cormorant-unicase/400.css";         // The Creature
import "@fontsource/playfair-display/400-italic.css";   // Hyde
import "@fontsource/pirata-one/400.css";                // The Werewolf
import "@fontsource/abril-fatface/400.css";             // Griffin
import "@fontsource/italiana/400.css";                  // Carmilla
import "@fontsource/cormorant-sc/400.css";              // Erik
import "@fontsource/bodoni-moda/400-italic.css";        // Dorian
import "@fontsource/im-fell-english/400-italic.css";    // Varney
import "@fontsource/limelight/400.css";                 // Sweeney
import "@fontsource/modak/400.css";                     // Jack
import "@fontsource/frank-ruhl-libre/400.css";          // Golem
import "@fontsource/old-standard-tt/400-italic.css";    // Horseman

// Code-split the R3F tree — Three.js is heavy and unneeded on first paint.
const Cabinet3D = dynamic(
  () => import("./Cabinet3D").then((m) => ({ default: m.Cabinet3D })),
  { ssr: false, loading: () => null },
);

interface CabinetClientProps {
  title: string;
  lede: string;
  small: string;
}

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * CabinetClient — the home page's interactive shell.
 *
 * Decides between the 3D Cabinet and the static fallback based on
 * prefers-reduced-motion and WebGL availability. Renders the
 * shared backdrop, foreground text, and CTAs in both cases.
 */
export function CabinetClient({ title, lede, small }: CabinetClientProps) {
  const reduced = useReducedMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    setWebgl(detectWebGL());
  }, []);

  const use3D = webgl === true && !reduced;
  const decided = webgl !== null;

  return (
    <main id="main" className="cabinet-stage">
      <div className="cabinet-stage__backdrop" aria-hidden="true" />
      <div className="cabinet-stage__veil" aria-hidden="true" />

      {decided && (use3D ? <Cabinet3D /> : <CabinetFallback />)}

      {/* Parallel keyboard-accessible patient list — visually hidden
          unless a card is focused. Always present, so screen reader
          users get a complete navigation even when WebGL is active. */}
      {use3D && <CabinetKeyboardList />}

      <div className="cabinet-stage__overlay">
        <header className="cabinet-stage__top">
          <p className="cabinet-stage__eyebrow">{small}</p>
          <h1 className="cabinet-stage__title">{title}</h1>
        </header>

        <div className="cabinet-stage__spacer" aria-hidden="true" />

        <footer className="cabinet-stage__bottom">
          <p className="cabinet-stage__lede">{lede}</p>
          <nav className="cabinet-stage__meta" aria-label="Cabinet meta">
            <Link href="/the-alienist">about the alienist</Link>
            <span aria-hidden="true"> · </span>
            <Link href="/sources">bibliography</Link>
          </nav>
          {use3D && (
            <p className="cabinet-stage__hint" aria-live="polite">
              hover an object to identify · click to open the case
            </p>
          )}
        </footer>
      </div>

      <style>{`
        .cabinet-stage {
          position: relative;
          min-height: 100dvh;
          overflow: hidden;
          background: #0B0608;
          isolation: isolate;
        }
        .cabinet-stage__backdrop {
          position: absolute;
          inset: 0;
          background-image: url("/illustrations/cabinet/study.webp");
          background-size: cover;
          background-position: center;
          opacity: 0.78;
          filter: contrast(1.08) saturate(0.85) brightness(0.72);
          z-index: 0;
        }
        .cabinet-stage__veil {
          position: absolute;
          inset: 0;
          background:
            /* darker pool behind the title at the top */
            radial-gradient(ellipse 80% 28% at 50% 14%, rgba(11,6,8,0.92) 0%, transparent 65%),
            /* darker pool behind the lede / meta near the bottom */
            radial-gradient(ellipse 75% 32% at 50% 88%, rgba(11,6,8,0.92) 0%, transparent 65%),
            /* gentle outer vignette */
            radial-gradient(ellipse 90% 80% at 50% 50%, transparent 25%, rgba(11,6,8,0.55) 95%);
          z-index: 1;
          pointer-events: none;
        }
        .cabinet-stage__overlay {
          position: relative;
          z-index: 3;
          pointer-events: none;
          min-height: 100dvh;
          display: grid;
          grid-template-rows: auto 1fr auto;
          padding: 3.5rem 1.5rem 2rem;
        }
        .cabinet-stage__top {
          text-align: center;
          display: grid;
          gap: 0.4rem;
        }
        .cabinet-stage__spacer { min-height: 0; }
        .cabinet-stage__bottom {
          text-align: center;
          display: grid;
          gap: 1rem;
          align-self: end;
        }
        .cabinet-stage__eyebrow {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          font-size: 0.72rem;
          color: var(--color-cabinet-accent);
          opacity: 0.85;
          margin: 0;
        }
        .cabinet-stage__title {
          font-family: var(--font-display-default);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(2.5rem, 5vw + 1rem, 5.5rem);
          line-height: 1.05;
          margin: 0;
          color: var(--color-cabinet-ink);
          text-shadow: 0 4px 24px rgba(0,0,0,0.7);
        }
        .cabinet-stage__lede {
          font-family: var(--font-body-default);
          color: var(--color-cabinet-ink);
          opacity: 0.92;
          font-size: clamp(0.95rem, 0.3vw + 0.85rem, 1.05rem);
          line-height: 1.55;
          max-width: 36rem;
          margin: 0 auto;
          text-align: center;
          text-shadow: 0 2px 14px rgba(0,0,0,0.75);
        }
        .cabinet-stage__meta {
          margin: 0.4rem auto 0;
          text-align: center;
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0.7;
          pointer-events: auto;
        }
        .cabinet-stage__meta a {
          color: var(--color-cabinet-ink);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-bottom-color 180ms ease, color 180ms ease;
        }
        .cabinet-stage__meta a:hover,
        .cabinet-stage__meta a:focus-visible {
          color: var(--color-cabinet-accent);
          border-bottom-color: var(--color-cabinet-accent);
        }
        .cabinet-stage__hint {
          margin: 1rem auto 0;
          text-align: center;
          font-family: var(--font-display-default);
          font-style: italic;
          font-size: 0.85rem;
          opacity: 0.55;
          text-shadow: 0 2px 12px rgba(0,0,0,0.55);
        }

        @media (max-width: 720px) {
          .cabinet-stage__overlay {
            padding: 3rem 1rem 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}
