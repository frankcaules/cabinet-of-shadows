import type { Monster } from "@/lib/data/types";

export function CitationHeader({ monster }: { monster: Monster }) {
  return (
    <section className="dossier__citation" aria-label="Citation header">
      <div className="catalog-card">
        <div className="catalog-card__corner">№ {String(monster.source.year).slice(-2)} / {monster.slug.slice(0, 4).toUpperCase()}</div>
        <h1 className="catalog-card__name">{monster.name}</h1>
        <p className="catalog-card__epithet">{monster.epithet}</p>
        <dl className="catalog-card__meta">
          <div>
            <dt>Source</dt>
            <dd><cite>{monster.source.title}</cite></dd>
          </div>
          <div>
            <dt>Author</dt>
            <dd>{monster.source.author}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{monster.source.year}</dd>
          </div>
        </dl>
      </div>

      <style>{`
        .dossier__citation {
          margin-top: 2rem;
        }
        .catalog-card {
          border: 1px solid var(--color-rule);
          padding: 2rem 1.5rem 1.5rem;
          position: relative;
          background:
            linear-gradient(180deg, transparent, rgba(0,0,0,0.10));
        }
        .catalog-card__corner {
          position: absolute;
          top: 0.6rem;
          right: 0.75rem;
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          color: var(--color-accent);
          opacity: 0.85;
        }
        .catalog-card__name {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.25rem);
          line-height: 1.1;
          margin: 0;
        }
        .catalog-card__epithet {
          font-family: var(--font-accent, var(--font-body));
          font-style: italic;
          opacity: 0.85;
          margin-top: 0.35rem;
        }
        .catalog-card__meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
          gap: 0.75rem 1.5rem;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-rule);
        }
        .catalog-card__meta dt {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.6;
        }
        .catalog-card__meta dd {
          font-family: var(--font-body);
          margin: 0.2rem 0 0;
        }
      `}</style>
    </section>
  );
}
