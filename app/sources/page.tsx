import type { Metadata } from "next";
import Link from "next/link";
import { FULL_MONSTERS } from "@/lib/data/monsters";
import type { Citation, Monster } from "@/lib/data/types";

export const metadata: Metadata = {
  title: "The Bibliography — The Cabinet of Shadows",
  description:
    "Every citation in the Cabinet, grouped by case. Real peer-reviewed sources with DOI links where available.",
};

function formatCitation(c: Citation): string {
  const parts = [`${c.authors} (${c.year}).`, c.title.endsWith(".") ? c.title : `${c.title}.`];
  const venuePart = [c.venue, c.volume, c.pages].filter(Boolean).join(", ");
  if (venuePart) parts.push(`${venuePart}.`);
  return parts.join(" ");
}

interface Section {
  slug: string;
  name: string;
  source: Monster["source"];
  phenomenon: string;
  citations: readonly Citation[];
}

function gatherSections(): Section[] {
  const out: Section[] = [];
  for (const m of Object.values(FULL_MONSTERS)) {
    out.push({
      slug: m.slug,
      name: m.name,
      source: m.source,
      phenomenon: m.diagnosis.phenomenon,
      citations: m.clinicalNote.citations,
    });
  }
  return out;
}

export default function SourcesPage() {
  const sections = gatherSections();
  const totalCitations = sections.reduce((acc, s) => acc + s.citations.length, 0);

  return (
    <main id="main" className="sources">
      <header className="sources__header">
        <p className="sources__eyebrow">The Cabinet of Shadows</p>
        <h1 className="sources__title">The Bibliography</h1>
        <p className="sources__lede">
          Every clinical claim in this casebook is anchored to a real peer-reviewed source. The
          alienist's prose is original; the science he draws on is not. {totalCitations} citations
          across {sections.length} cases, grouped here by the monster they explicate.
        </p>
        <p className="sources__return">
          <Link href="/">← back to the Cabinet</Link>
        </p>
      </header>

      <ol className="sources__list">
        {sections.map((s, i) => (
          <li key={s.slug} className="sources__case">
            <header className="sources__case-head">
              <p className="sources__case-num">Case {String(i + 1).padStart(2, "0")}</p>
              <h2 className="sources__case-name">
                <Link href={`/dossier/${s.slug}`}>{s.name}</Link>
              </h2>
              <p className="sources__case-meta">
                from <cite>{s.source.title}</cite> · {s.source.author} · {s.source.year} ·{" "}
                <span className="sources__phenomenon">{s.phenomenon}</span>
              </p>
            </header>
            <ol className="sources__refs">
              {s.citations.map((c, ci) => (
                <li key={c.id}>
                  <span className="sources__ref-marker">[{ci + 1}]</span>
                  <span className="sources__ref-body">
                    {formatCitation(c)}
                    {c.doi && (
                      <>
                        {" "}
                        <a
                          href={`https://doi.org/${c.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sources__doi"
                        >
                          doi:{c.doi}
                        </a>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>

      <footer className="sources__footer">
        <p>
          References are formatted in APA 7 with minor concessions to the alienist's antiquarian
          eye. Where a DOI is published, it is linked; readers who wish to consult the originals
          will find that most academic libraries carry them and that the open-access ones are
          marked.
        </p>
      </footer>

      <style>{`
        .sources {
          --measure: 44rem;
          max-width: 100%;
          padding: 5rem 1.5rem 6rem;
          margin: 0 auto;
        }
        .sources__header,
        .sources__case,
        .sources__footer {
          max-width: var(--measure);
          margin: 0 auto;
        }
        .sources__eyebrow {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          opacity: 0.7;
          color: var(--color-cabinet-accent);
          margin: 0;
        }
        .sources__title {
          font-family: var(--font-display-default);
          font-style: italic;
          font-size: clamp(2.5rem, 4vw + 1rem, 4rem);
          line-height: 1.05;
          margin: 0.4rem 0 1.25rem;
        }
        .sources__lede {
          font-family: var(--font-body-default);
          font-size: 1.05rem;
          line-height: 1.65;
          opacity: 0.92;
          max-width: 38rem;
          margin: 0;
        }
        .sources__return {
          margin: 2rem 0 0;
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0.85;
        }
        .sources__return a {
          text-decoration: none;
        }
        .sources__return a:hover {
          text-decoration: underline;
        }

        .sources__list {
          list-style: none;
          padding: 0;
          margin: 4rem 0 0;
          display: grid;
          gap: 3rem;
        }
        .sources__case {
          padding-top: 2rem;
          border-top: 1px solid var(--color-cabinet-rule);
        }
        .sources__case-head { margin-bottom: 1.25rem; }
        .sources__case-num {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--color-cabinet-accent);
          opacity: 0.85;
          margin: 0;
        }
        .sources__case-name {
          font-family: var(--font-display-default);
          font-style: italic;
          font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
          margin: 0.25rem 0 0.4rem;
        }
        .sources__case-name a {
          text-decoration: none;
          color: var(--color-cabinet-ink);
          border-bottom: 1px solid transparent;
          transition: border-bottom-color 180ms ease;
        }
        .sources__case-name a:hover,
        .sources__case-name a:focus-visible {
          border-bottom-color: var(--color-cabinet-accent);
        }
        .sources__case-meta {
          font-family: var(--font-body-default);
          font-size: 0.92rem;
          opacity: 0.78;
          margin: 0;
        }
        .sources__phenomenon {
          color: var(--color-cabinet-accent);
          opacity: 0.95;
          font-style: italic;
        }

        .sources__refs {
          list-style: none;
          padding: 1rem 0 0;
          margin: 0;
          display: grid;
          gap: 0.85rem;
        }
        .sources__refs li {
          display: grid;
          grid-template-columns: 2.4rem 1fr;
          gap: 0.5rem;
          font-family: var(--font-body-default);
          font-size: 0.96rem;
          line-height: 1.55;
        }
        .sources__ref-marker {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.78rem;
          color: var(--color-cabinet-accent);
          padding-top: 0.1rem;
        }
        .sources__ref-body cite,
        .sources__ref-body em { font-style: italic; }
        .sources__doi {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.82rem;
          text-decoration: none;
          opacity: 0.9;
        }
        .sources__doi:hover { text-decoration: underline; }

        .sources__footer {
          margin-top: 4.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--color-cabinet-rule);
        }
        .sources__footer p {
          font-family: var(--font-body-default);
          font-style: italic;
          font-size: 0.92rem;
          line-height: 1.6;
          opacity: 0.7;
          margin: 0;
        }
      `}</style>
    </main>
  );
}
