"use client";

import Link from "next/link";
import Image from "next/image";
import { FULL_MONSTERS } from "@/lib/data/monsters";

/**
 * Accessible static grid for users without WebGL or with prefers-reduced-motion.
 * Same visual identity as the 3D Cabinet, just laid out as a calm grid of
 * sigil cards.
 */
export function CabinetFallback() {
  const monsters = Object.values(FULL_MONSTERS);
  return (
    <div className="cabinet-fallback">
      <ol>
        {monsters.map((m) => (
          <li key={m.slug}>
            <Link
              href={`/dossier/${m.slug}`}
              className="cabinet-fallback__card"
              style={{
                ["--card-accent" as string]: m.palette.accent,
                ["--card-ink" as string]: m.palette.ink,
              }}
            >
              <span className="cabinet-fallback__sigil-wrap">
                <Image
                  src={m.sigil}
                  alt=""
                  width={120}
                  height={120}
                  className="cabinet-fallback__sigil"
                />
              </span>
              <span className="cabinet-fallback__name" style={{ fontFamily: m.typography.display }}>
                {m.name}
              </span>
              <span className="cabinet-fallback__epithet">{m.epithet}</span>
            </Link>
          </li>
        ))}
      </ol>

      <style>{`
        .cabinet-fallback {
          position: relative;
          z-index: 2;
          padding: 8vh 1.5rem 6vh;
        }
        .cabinet-fallback ol {
          list-style: none;
          padding: 0;
          margin: 0 auto;
          max-width: 70rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
          gap: 1.25rem;
        }
        .cabinet-fallback__card {
          --card-accent: var(--color-cabinet-accent);
          --card-ink: var(--color-cabinet-ink);
          display: grid;
          gap: 0.4rem;
          padding: 1rem 0.75rem 1.1rem;
          border: 1px solid var(--color-cabinet-rule);
          background: rgba(11,6,8,0.55);
          text-decoration: none;
          color: var(--card-ink);
          text-align: center;
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
        }
        .cabinet-fallback__card:hover,
        .cabinet-fallback__card:focus-visible {
          transform: translateY(-4px);
          border-color: var(--card-accent);
          box-shadow: 0 6px 30px -10px var(--card-accent);
          outline: none;
        }
        .cabinet-fallback__sigil-wrap {
          display: grid;
          place-items: center;
          height: 6rem;
          filter: drop-shadow(0 0 14px var(--card-accent));
        }
        .cabinet-fallback__sigil {
          width: auto;
          max-height: 100%;
          object-fit: contain;
        }
        .cabinet-fallback__name {
          font-style: italic;
          font-size: 1.05rem;
          line-height: 1.15;
        }
        .cabinet-fallback__epithet {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--card-accent);
          opacity: 0.92;
        }
      `}</style>
    </div>
  );
}
