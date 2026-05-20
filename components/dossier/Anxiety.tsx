import type { Locale } from "@/lib/data/types";
import { t } from "@/lib/i18n/messages";

export function Anxiety({ paragraphs, locale = "en" }: { paragraphs: string[]; locale?: Locale }) {
  return (
    <section aria-labelledby="dossier-anxiety" className="dossier__section dossier__section--anxiety">
      <header className="dossier__section-head">
        <p className="dossier__section-num">II.</p>
        <h2 id="dossier-anxiety" className="dossier__section-title">{t(locale, "sectionAnxiety")}</h2>
      </header>
      <div className="dossier__prose">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <style>{`
        .dossier__section--anxiety {
          border-top: 1px solid var(--color-rule);
          padding-top: 3rem;
        }
      `}</style>
    </section>
  );
}
