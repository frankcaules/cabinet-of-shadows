import Link from "next/link";
import type { MonsterStub } from "@/lib/data/types";

export function StubDossier({ monster }: { monster: MonsterStub }) {
  return (
    <article id="main" className="stub-dossier">
      <p className="stub-dossier__eyebrow">Case file: {monster.slug.toUpperCase()}</p>
      <h1 className="stub-dossier__title">{monster.name}</h1>
      <p className="stub-dossier__epithet">{monster.epithet}</p>
      <p className="stub-dossier__source">
        From <cite>{monster.source.title}</cite> — {monster.source.author}, {monster.source.year}.
      </p>
      <p className="stub-dossier__lede">
        This dossier is in preparation. The alienist's notes for this patient have not yet been transcribed and bound.
      </p>
      <p className="stub-dossier__return">
        <Link href="/">— return to the Cabinet —</Link>
      </p>

      <style>{`
        .stub-dossier {
          min-height: 100dvh;
          display: grid;
          place-content: center;
          gap: 0.85rem;
          padding: 4rem 1.5rem;
          text-align: center;
        }
        .stub-dossier__eyebrow {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          letter-spacing: 0.22em;
          font-size: 0.72rem;
          color: var(--color-cabinet-accent);
          opacity: 0.85;
        }
        .stub-dossier__title {
          font-family: var(--font-display-default);
          font-style: italic;
          font-size: clamp(2rem, 4vw + 1rem, 3.25rem);
          line-height: 1.1;
          margin: 0;
        }
        .stub-dossier__epithet {
          font-family: var(--font-body-default);
          font-style: italic;
          opacity: 0.8;
        }
        .stub-dossier__source {
          font-family: var(--font-body-default);
          font-size: 0.92rem;
          opacity: 0.7;
        }
        .stub-dossier__lede {
          max-width: 30rem;
          margin: 1rem auto 0;
          opacity: 0.85;
        }
        .stub-dossier__return {
          margin-top: 2rem;
          letter-spacing: 0.2em;
          text-transform: lowercase;
          font-size: 0.8rem;
        }
        .stub-dossier__return a {
          text-decoration: none;
        }
        .stub-dossier__return a:hover {
          text-decoration: underline;
        }
      `}</style>
    </article>
  );
}
