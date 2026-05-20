"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/data/types";

interface Chapter {
  id: string;
  numeral: string;
  label: Record<Locale, string>;
}

const CHAPTERS: Chapter[] = [
  { id: "dossier-legend", numeral: "I", label: { en: "Legend", th: "ตำนาน" } },
  { id: "dossier-anxiety", numeral: "II", label: { en: "Anxiety", th: "ความวิตก" } },
  { id: "dossier-clinical", numeral: "III", label: { en: "Clinical", th: "คลินิก" } },
  { id: "dossier-diagnosis", numeral: "IV", label: { en: "Diagnosis", th: "วินิจฉัย" } },
];

/**
 * ChapterIndex
 * -------------
 * Sticky vertical chapter rail on the right side. Updates as the reader
 * scrolls so they know which section of the four they are in. On small
 * screens it collapses to numerals only.
 */
export function ChapterIndex({ locale = "en" }: { locale?: Locale }) {
  const [active, setActive] = useState<string>(CHAPTERS[0].id);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = CHAPTERS
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="chapter-index" aria-label="Dossier chapters">
      <ol>
        {CHAPTERS.map((c) => (
          <li key={c.id} data-active={active === c.id}>
            <a href={`#${c.id}`}>
              <span className="chapter-index__num">{c.numeral}</span>
              <span className="chapter-index__label">{c.label[locale]}</span>
            </a>
          </li>
        ))}
      </ol>

      <style>{`
        .chapter-index {
          position: fixed;
          right: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          pointer-events: none;
        }
        .chapter-index ol {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.4rem;
          pointer-events: auto;
        }
        .chapter-index a {
          display: grid;
          grid-template-columns: 1.4rem auto;
          align-items: center;
          gap: 0.5rem;
          padding: 0.3rem 0.4rem;
          text-decoration: none;
          color: var(--color-ink);
          opacity: 0.5;
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border-right: 1px solid transparent;
          transition: opacity 200ms ease, border-right-color 200ms ease, transform 200ms ease;
        }
        .chapter-index a:hover,
        .chapter-index a:focus-visible {
          opacity: 0.95;
          outline: none;
        }
        .chapter-index li[data-active="true"] a {
          opacity: 1;
          border-right-color: var(--color-accent);
          transform: translateX(-2px);
        }
        .chapter-index__num {
          font-style: italic;
          color: var(--color-accent);
          text-align: right;
        }
        .chapter-index__label {
          opacity: 0.85;
        }

        @media (max-width: 920px) {
          .chapter-index { right: 0.5rem; }
          .chapter-index__label { display: none; }
          .chapter-index a {
            grid-template-columns: 1.4rem;
            padding: 0.4rem 0.3rem;
          }
        }
        @media (max-width: 480px) {
          .chapter-index { display: none; }
        }
      `}</style>
    </nav>
  );
}
