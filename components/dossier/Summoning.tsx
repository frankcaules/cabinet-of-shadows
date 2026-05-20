"use client";

import { useEffect, useRef, useState } from "react";
import type { Monster } from "@/lib/data/types";
import { useReducedMotion } from "@/components/a11y/MotionProvider";

/**
 * Atmospheric video backgrounds per monster (generated via Wan 2.1 T2V).
 * If a video file is missing we silently fall back to the static radial glow.
 */
const HERO_VIDEOS: Record<string, string> = {
  "dracula": "/videos/dracula/hero.webm",
  "the-creature": "/videos/the-creature/hero.webm",
  "hyde": "/videos/hyde/hero.webm",
  "the-wolf": "/videos/the-wolf/hero.webm",
};

/**
 * The Summoning — the dossier hero.
 *
 * Top of the page: sigil, eyebrow, source quote typing in word-by-word
 * (characters animate but words stay together for line wrapping), the
 * source attribution, and (if available) a subtly looped atmospheric
 * video behind the quote at low opacity.
 */
export function Summoning({ monster }: { monster: Monster }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      return;
    }
    const id = window.setTimeout(() => setRevealed(true), 350);
    return () => window.clearTimeout(id);
  }, [reduced]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduced) {
      v.pause();
      return;
    }
    v.play().catch(() => {/* user gesture required on some browsers; ignore */});
  }, [reduced]);

  // Tokenize by word so line wrapping respects word boundaries even though
  // each glyph is its own inline-block for the typing reveal.
  const tokens = monster.sourceQuote.split(/(\s+)/);
  let charIndex = 0;

  const videoSrc = HERO_VIDEOS[monster.slug];

  return (
    <section ref={ref} className="dossier__hero" aria-label="The Summoning">
      {videoSrc && !reduced && (
        <video
          ref={videoRef}
          className="dossier__hero-video"
          data-ready={videoReady}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        />
      )}
      <div className="dossier__hero-veil" aria-hidden="true" />

      <p className="dossier__hero-eyebrow">From the casebook of the alienist · Subject {String(monster.source.year).slice(-2)}</p>

      <div
        className="dossier__hero-sigil"
        role="img"
        aria-label={`The sigil of ${monster.name}`}
        style={{ backgroundImage: `url(${monster.sigil})` }}
      />

      <blockquote
        className="dossier__hero-quote"
        data-revealed={revealed}
        data-reduced={reduced}
      >
        <span aria-hidden="true">
          {tokens.map((token, ti) => {
            if (/^\s+$/.test(token)) {
              charIndex += token.length;
              return <span key={`t${ti}`}> </span>;
            }
            return (
              <span key={`t${ti}`} className="dossier__hero-word">
                {Array.from(token).map((glyph, gi) => {
                  const i = charIndex++;
                  return (
                    <span
                      key={gi}
                      className="dossier__hero-char"
                      style={{ transitionDelay: `${i * 28}ms` }}
                    >
                      {glyph}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </span>
        <span className="sr-only">{monster.sourceQuote}</span>
        <cite className="dossier__hero-cite">— {monster.source.author}, <em>{monster.source.title}</em> ({monster.source.year})</cite>
      </blockquote>

      <p className="dossier__hero-scroll" aria-hidden="true">scroll to begin the case</p>

      <style>{`
        .dossier__hero {
          min-height: 92dvh;
          display: grid;
          place-content: center;
          gap: 1.5rem;
          padding: 5rem 1rem 3rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .dossier__hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          opacity: 0;
          transition: opacity 1.2s ease-out;
          filter: contrast(1.05) saturate(0.65) brightness(0.55);
          pointer-events: none;
        }
        .dossier__hero-video[data-ready="true"] {
          opacity: 0.42;
        }
        .dossier__hero-veil {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            radial-gradient(ellipse 60% 50% at 50% 45%, transparent 0%, var(--color-bg, #0B0608) 78%),
            radial-gradient(ellipse 60% 40% at 50% 40%, var(--color-accent, var(--color-cabinet-accent)) 0%, transparent 70%);
          opacity: 0.95;
          pointer-events: none;
        }
        .dossier__hero > .dossier__hero-eyebrow,
        .dossier__hero > .dossier__hero-sigil,
        .dossier__hero > .dossier__hero-quote,
        .dossier__hero > .dossier__hero-scroll {
          position: relative;
          z-index: 2;
        }
        .dossier__hero-eyebrow {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          opacity: 0.78;
          margin: 0 auto;
        }
        .dossier__hero-sigil {
          width: 6rem;
          height: 6rem;
          margin: 0.5rem auto 1rem;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          opacity: 0.88;
          filter: drop-shadow(0 0 24px var(--color-accent, var(--color-cabinet-accent)));
        }
        .dossier__hero-quote {
          max-width: 36rem;
          margin: 0 auto;
          padding: 0;
          border: 0;
          font-family: var(--font-accent, var(--font-display));
          font-style: italic;
          font-size: clamp(1.5rem, 2.4vw + 0.9rem, 2.6rem);
          line-height: 1.35;
          color: var(--color-ink);
          text-shadow: 0 2px 12px rgba(0,0,0,0.55);
        }
        .dossier__hero-word {
          display: inline-block;
          white-space: nowrap;
        }
        .dossier__hero-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(0.25em);
          transition: opacity 420ms ease, transform 420ms cubic-bezier(.22,1,.36,1);
        }
        .dossier__hero-quote[data-revealed="true"] .dossier__hero-char {
          opacity: 1;
          transform: translateY(0);
        }
        .dossier__hero-quote[data-reduced="true"] .dossier__hero-char {
          transition: none;
          opacity: 1;
          transform: none;
        }
        .dossier__hero-cite {
          display: block;
          margin-top: 1.4rem;
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-style: normal;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0.7;
        }
        .dossier__hero-scroll {
          margin-top: 3rem;
          font-family: var(--font-accent, var(--font-body));
          font-style: italic;
          font-size: 0.78rem;
          letter-spacing: 0.22em;
          opacity: 0.5;
          animation: cosBreath 3s ease-in-out infinite;
        }
        @keyframes cosBreath {
          0%, 100% { opacity: 0.35; transform: translateY(0); }
          50% { opacity: 0.7; transform: translateY(4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .dossier__hero-scroll { animation: none; opacity: 0.5; }
          .dossier__hero-video { display: none; }
        }
        .sr-only {
          position: absolute !important;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </section>
  );
}
