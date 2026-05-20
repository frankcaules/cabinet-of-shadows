"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/a11y/MotionProvider";

export function SourceQuote({ text }: { text: string }) {
  const ref = useRef<HTMLQuoteElement>(null);
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  const characters = Array.from(text);

  return (
    <section aria-label="Source quotation" className="dossier__quote">
      <blockquote ref={ref} className="source-quote" data-revealed={revealed} data-reduced={reduced}>
        <span aria-hidden="true" className="source-quote__visual">
          {characters.map((c, i) => (
            <span
              key={i}
              className="source-quote__char"
              style={{ transitionDelay: `${i * 22}ms` }}
            >
              {c === " " ? " " : c}
            </span>
          ))}
        </span>
        <span className="sr-only">{text}</span>
      </blockquote>

      <style>{`
        .dossier__quote {
          margin: 5rem auto;
          text-align: center;
        }
        .source-quote {
          font-family: var(--font-accent, var(--font-display));
          font-style: italic;
          font-size: clamp(1.4rem, 2vw + 0.9rem, 2rem);
          line-height: 1.4;
          color: var(--color-ink);
          opacity: 0.95;
          border: 0;
          padding: 0 0.5rem;
          margin: 0;
        }
        .source-quote__visual {
          display: inline;
        }
        .source-quote__char {
          display: inline-block;
          opacity: 0;
          transform: translateY(0.3em);
          transition: opacity 380ms ease, transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .source-quote[data-revealed="true"] .source-quote__char {
          opacity: 1;
          transform: translateY(0);
        }
        .source-quote[data-reduced="true"] .source-quote__char {
          transition: none;
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
