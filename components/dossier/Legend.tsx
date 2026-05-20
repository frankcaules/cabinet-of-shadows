import type { Locale } from "@/lib/data/types";
import { t } from "@/lib/i18n/messages";

export function Legend({ paragraphs, locale = "en" }: { paragraphs: string[]; locale?: Locale }) {
  return (
    <section aria-labelledby="dossier-legend" className="dossier__section">
      <header className="dossier__section-head">
        <p className="dossier__section-num">I.</p>
        <h2 id="dossier-legend" className="dossier__section-title">{t(locale, "sectionLegend")}</h2>
      </header>
      <div className="dossier__prose">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <style>{`
        .dossier__section {
          margin: 5rem auto;
        }
        .dossier__section-head {
          display: grid;
          gap: 0.25rem;
          margin-bottom: 1.25rem;
        }
        .dossier__section-num {
          font-family: var(--font-accent, var(--font-body));
          font-style: italic;
          opacity: 0.6;
          letter-spacing: 0.18em;
          font-size: 0.85rem;
        }
        .dossier__section-title {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 2.2vw + 1rem, 2.5rem);
          line-height: 1.1;
          margin: 0;
        }
        .dossier__prose p {
          margin: 0 0 1.1rem;
          font-family: var(--font-body);
          line-height: 1.7;
          text-align: justify;
          hyphens: auto;
        }
      `}</style>
    </section>
  );
}
