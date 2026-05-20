import type { Diagnosis } from "@/lib/data/types";

export function DiagnosisCard({ diagnosis }: { diagnosis: Diagnosis }) {
  return (
    <section aria-labelledby="dossier-diagnosis" className="dossier__section dossier__section--diagnosis">
      <header className="dossier__section-head">
        <p className="dossier__section-num">IV.</p>
        <h2 id="dossier-diagnosis" className="dossier__section-title">The Diagnosis</h2>
      </header>

      <div className="diagnosis-card">
        <div className="diagnosis-card__row">
          <span className="diagnosis-card__label">Phenomenon</span>
          <span className="diagnosis-card__value diagnosis-card__value--prominent">{diagnosis.phenomenon}</span>
        </div>
        <div className="diagnosis-card__row">
          <span className="diagnosis-card__label">Key Researcher</span>
          <span className="diagnosis-card__value">{diagnosis.researcher}</span>
        </div>
        <div className="diagnosis-card__row">
          <span className="diagnosis-card__label">Year of Theory</span>
          <span className="diagnosis-card__value">{diagnosis.yearOfTheory}</span>
        </div>
        {diagnosis.dsmStatus && (
          <div className="diagnosis-card__row">
            <span className="diagnosis-card__label">DSM / ICD Status</span>
            <span className="diagnosis-card__value">{diagnosis.dsmStatus}</span>
          </div>
        )}
        <div className="diagnosis-card__row">
          <span className="diagnosis-card__label">Recommended Reading</span>
          <ul className="diagnosis-card__reading">
            {diagnosis.furtherReading.map((c) => (
              <li key={c.id}>
                {c.authors} ({c.year}). <cite>{c.title}</cite>. <em>{c.venue}</em>
                {c.volume ? `, ${c.volume}` : ""}
                {c.pages ? `, ${c.pages}` : ""}.
                {c.doi && (
                  <>
                    {" "}
                    <a href={`https://doi.org/${c.doi}`} target="_blank" rel="noopener noreferrer">doi:{c.doi}</a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .dossier__section--diagnosis {
          border-top: 1px solid var(--color-rule);
          padding-top: 3rem;
        }
        .diagnosis-card {
          margin-top: 1rem;
          padding: 1.75rem 1.5rem;
          border: 1px solid var(--color-accent);
          background: linear-gradient(180deg, rgba(0,0,0,0.20), rgba(0,0,0,0.35));
          display: grid;
          gap: 1rem;
        }
        .diagnosis-card__row {
          display: grid;
          gap: 0.25rem;
          padding-bottom: 0.9rem;
          border-bottom: 1px solid var(--color-rule);
        }
        .diagnosis-card__row:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }
        .diagnosis-card__label {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-accent);
          opacity: 0.85;
        }
        .diagnosis-card__value {
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.4;
        }
        .diagnosis-card__value--prominent {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 1vw + 0.9rem, 1.6rem);
          line-height: 1.2;
        }
        .diagnosis-card__reading {
          list-style: none;
          padding: 0;
          margin: 0.4rem 0 0;
          display: grid;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: 0.92rem;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
}
