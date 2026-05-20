"use client";

import Link from "next/link";
import { FULL_MONSTERS } from "@/lib/data/monsters";

/**
 * CabinetKeyboardList
 * --------------------
 * Visually-hidden navigation that mirrors the 3D Cabinet for keyboard
 * and screen-reader users. Each link becomes briefly visible when
 * focused so sighted keyboard users can see where they are.
 */
export function CabinetKeyboardList() {
  const monsters = Object.values(FULL_MONSTERS);
  return (
    <nav aria-label="Patient list (keyboard navigation)" className="cabinet-keys">
      <p className="cabinet-keys__heading sr-only">Patients in the Cabinet</p>
      <ol>
        {monsters.map((m) => (
          <li key={m.slug}>
            <Link
              href={`/dossier/${m.slug}`}
              className="cabinet-keys__link"
              style={{
                ["--card-accent" as string]: m.palette.accent,
              }}
            >
              <span className="cabinet-keys__name" style={{ fontFamily: m.typography.display }}>
                {m.name}
              </span>
              <span className="cabinet-keys__epithet"> — {m.epithet}</span>
            </Link>
          </li>
        ))}
      </ol>

      <style>{`
        .cabinet-keys {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 80;
          pointer-events: none;
        }
        .cabinet-keys ol {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .cabinet-keys li {
          margin: 0;
        }
        .cabinet-keys__link {
          position: absolute;
          left: -9999px;
          top: 0;
          padding: 0.55rem 0.9rem;
          background: var(--color-cabinet-bg);
          color: var(--color-cabinet-ink);
          border: 1px solid var(--card-accent, var(--color-cabinet-accent));
          font-family: var(--font-body-default);
          font-size: 0.95rem;
          text-decoration: none;
          line-height: 1.4;
          pointer-events: auto;
          box-shadow: 0 6px 24px -10px rgba(0,0,0,0.8);
        }
        .cabinet-keys__link:focus-visible {
          left: 1rem;
          top: 1rem;
          outline: 2px solid var(--card-accent, var(--color-cabinet-accent));
          outline-offset: 3px;
        }
        .cabinet-keys__name {
          font-style: italic;
        }
        .cabinet-keys__epithet {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--card-accent, var(--color-cabinet-accent));
          opacity: 0.95;
          margin-left: 0.5rem;
        }
      `}</style>
    </nav>
  );
}
