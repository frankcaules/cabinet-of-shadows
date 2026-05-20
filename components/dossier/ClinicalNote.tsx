import type { ClinicalNote as ClinicalNoteType, Citation } from "@/lib/data/types";

function formatCitation(c: Citation): string {
  const parts: string[] = [
    `${c.authors} (${c.year}).`,
    c.title.endsWith(".") ? c.title : `${c.title}.`,
  ];
  const venuePart = [c.venue, c.volume, c.pages].filter(Boolean).join(", ");
  if (venuePart) parts.push(`${venuePart}.`);
  return parts.join(" ");
}

export function ClinicalNote({ note }: { note: ClinicalNoteType }) {
  return (
    <section aria-labelledby="dossier-clinical" className="dossier__section dossier__section--clinical">
      <header className="dossier__section-head">
        <p className="dossier__section-num">III.</p>
        <h2 id="dossier-clinical" className="dossier__section-title">The Clinical Note</h2>
      </header>

      <div className="dossier__prose">
        <p className="clinical__intro">{note.intro}</p>
        {note.paragraphs.map((p, i) => (
          <p key={i}>
            {p.text}
            {p.citations.length > 0 && (
              <>
                {" "}
                {p.citations.map((n, idx) => (
                  <sup key={idx} className="cite-ref">
                    <a href={`#cite-${n}`} aria-label={`Citation ${n}`}>[{n}]</a>
                  </sup>
                ))}
              </>
            )}
          </p>
        ))}
      </div>

      <section aria-label="Citations" className="clinical__citations">
        <h3>References</h3>
        <ol>
          {note.citations.map((c, i) => {
            const n = i + 1;
            return (
              <li key={c.id} id={`cite-${n}`}>
                <span aria-hidden="true" className="cite-marker">[{n}]</span>
                <span className="cite-body">
                  {formatCitation(c)}
                  {c.doi && (
                    <>
                      {" "}
                      <a
                        href={`https://doi.org/${c.doi}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        doi:{c.doi}
                      </a>
                    </>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      <style>{`
        .dossier__section--clinical {
          border-top: 1px solid var(--color-rule);
          padding-top: 3rem;
        }
        .dossier__section--clinical .dossier__prose p {
          text-align: justify;
        }
        .clinical__intro {
          font-style: italic;
          color: var(--color-ink);
          opacity: 0.9;
        }
        .cite-ref {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.7em;
          margin-left: 0.05em;
        }
        .cite-ref a {
          text-decoration: none;
          color: var(--color-ink);
          opacity: 0.92;
          border-bottom: 1px solid var(--color-accent);
          padding-bottom: 1px;
        }
        .cite-ref a:hover, .cite-ref a:focus-visible {
          color: var(--color-candlelight, var(--color-accent));
          border-bottom-color: var(--color-candlelight, var(--color-accent));
        }
        .clinical__citations {
          margin-top: 2.5rem;
          padding: 1.25rem 1.25rem 1rem;
          border: 1px dashed var(--color-rule);
          background: rgba(0,0,0,0.18);
        }
        .clinical__citations h3 {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin: 0 0 0.75rem;
          opacity: 0.7;
        }
        .clinical__citations ol {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.6rem;
        }
        .clinical__citations li {
          display: grid;
          grid-template-columns: 2rem 1fr;
          gap: 0.35rem;
          font-family: var(--font-body);
          font-size: 0.92rem;
          line-height: 1.5;
        }
        .cite-marker {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.78rem;
          color: var(--color-ink);
          opacity: 0.85;
          padding-top: 0.15rem;
        }
        .clinical__citations a {
          color: var(--color-ink);
          opacity: 0.92;
          text-decoration: underline;
          text-decoration-color: var(--color-accent);
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }
        .clinical__citations a:hover,
        .clinical__citations a:focus-visible {
          color: var(--color-candlelight, var(--color-accent));
        }
      `}</style>
    </section>
  );
}
