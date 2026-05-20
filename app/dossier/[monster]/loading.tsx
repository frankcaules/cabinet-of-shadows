/**
 * Dossier loading skeleton.
 *
 * Mirrors the actual dossier shell — hero with a placeholder sigil and
 * a shimmering quote line, then the citation card, then prose blocks —
 * so the user sees the page's structure resolving rather than a generic
 * spinner. Picks up per-monster colour vars from the dossier layout's
 * `data-monster` wrapper.
 */
export default function DossierLoading() {
  return (
    <div className="cos-dossier-loading" aria-label="Loading the case file">
      <section className="cos-dl__hero">
        <p className="cos-dl__eyebrow">opening the case…</p>
        <div className="cos-dl__sigil" aria-hidden="true" />
        <div className="cos-dl__quote-row cos-dl__quote-row--wide" />
        <div className="cos-dl__quote-row cos-dl__quote-row--mid" />
        <div className="cos-dl__cite" />
      </section>

      <section className="cos-dl__card" aria-hidden="true">
        <div className="cos-dl__card-name" />
        <div className="cos-dl__card-meta" />
        <div className="cos-dl__card-meta cos-dl__card-meta--short" />
      </section>

      <section className="cos-dl__visage" aria-hidden="true">
        <div className="cos-dl__visage-frame" />
      </section>

      <section className="cos-dl__section" aria-hidden="true">
        <div className="cos-dl__numeral">I.</div>
        <div className="cos-dl__heading" />
        <div className="cos-dl__line" />
        <div className="cos-dl__line" />
        <div className="cos-dl__line cos-dl__line--short" />
      </section>

      <style>{`
        .cos-dossier-loading {
          min-height: 100dvh;
          padding: 0 1.25rem 6rem;
          max-width: 38rem;
          margin: 0 auto;
          color: var(--color-ink, #E8DCC4);
        }
        .cos-dl__hero {
          min-height: 80dvh;
          display: grid;
          gap: 1rem;
          place-content: center;
          text-align: center;
          padding: 4rem 0 2rem;
        }
        .cos-dl__eyebrow {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          font-size: 0.7rem;
          opacity: 0.7;
          color: var(--color-accent, #D4A574);
          margin: 0;
        }
        .cos-dl__sigil {
          width: 6rem;
          height: 6rem;
          margin: 0.5rem auto 1rem;
          border-radius: 50%;
          background:
            radial-gradient(circle at 50% 50%, var(--color-accent, #D4A574) 0%, transparent 65%);
          opacity: 0.25;
          animation: cosDlPulse 2.2s ease-in-out infinite;
        }
        .cos-dl__quote-row {
          height: 1.2rem;
          margin: 0 auto;
          border-radius: 2px;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.04) 0%,
            rgba(255,255,255,0.12) 50%,
            rgba(255,255,255,0.04) 100%
          );
          background-size: 200% 100%;
          animation: cosDlShimmer 2.4s ease-in-out infinite;
        }
        .cos-dl__quote-row--wide { width: min(28rem, 88%); }
        .cos-dl__quote-row--mid  { width: min(22rem, 70%); }
        .cos-dl__cite {
          height: 0.7rem;
          width: 12rem;
          margin: 1rem auto 0;
          border-radius: 2px;
          background: rgba(255,255,255,0.06);
          opacity: 0.6;
        }

        .cos-dl__card,
        .cos-dl__visage,
        .cos-dl__section {
          margin: 4rem auto;
          max-width: 38rem;
        }
        .cos-dl__card {
          border: 1px solid var(--color-rule, rgba(255,255,255,0.18));
          padding: 1.5rem 1.25rem;
          display: grid;
          gap: 0.75rem;
        }
        .cos-dl__card-name {
          height: 2.2rem;
          width: min(20rem, 80%);
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
        }
        .cos-dl__card-meta {
          height: 0.7rem;
          width: 70%;
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
        }
        .cos-dl__card-meta--short { width: 30%; }

        .cos-dl__visage-frame {
          margin: 0 auto;
          max-width: 28rem;
          aspect-ratio: 3 / 4;
          border: 1px solid var(--color-rule, rgba(255,255,255,0.18));
          background:
            radial-gradient(ellipse 60% 50% at 50% 30%, var(--color-accent, #D4A574) 0%, transparent 70%),
            rgba(0,0,0,0.3);
          opacity: 0.45;
          animation: cosDlPulse 2.6s ease-in-out infinite;
        }

        .cos-dl__numeral {
          font-family: var(--font-accent, var(--font-display-default, serif));
          font-style: italic;
          opacity: 0.5;
          letter-spacing: 0.18em;
          font-size: 0.85rem;
        }
        .cos-dl__heading {
          height: 2rem;
          width: 12rem;
          margin: 0.4rem 0 1.5rem;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
        }
        .cos-dl__line {
          height: 0.9rem;
          margin: 0 0 0.85rem;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.04) 0%,
            rgba(255,255,255,0.10) 50%,
            rgba(255,255,255,0.04) 100%
          );
          background-size: 200% 100%;
          border-radius: 2px;
          animation: cosDlShimmer 2.4s ease-in-out infinite;
        }
        .cos-dl__line--short { width: 60%; }

        @keyframes cosDlPulse {
          0%, 100% { opacity: 0.25; }
          50%      { opacity: 0.65; }
        }
        @keyframes cosDlShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cos-dl__sigil, .cos-dl__visage-frame { animation: none; opacity: 0.4; }
          .cos-dl__quote-row, .cos-dl__line { animation: none; background: rgba(255,255,255,0.08); }
        }
      `}</style>
    </div>
  );
}
