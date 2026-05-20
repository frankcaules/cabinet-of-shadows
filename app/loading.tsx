/**
 * Root loading skeleton.
 *
 * Shown when navigating to any non-dossier route while the new segment
 * loads. Intentionally restrained: a tracked-out eyebrow + the title in
 * the cabinet's display font, both pulsing very gently. The colour
 * comes through from the layout's cabinet defaults, so it reads as a
 * dimmer version of the destination rather than a generic spinner.
 */
export default function RootLoading() {
  return (
    <main className="cos-loading" aria-label="Loading">
      <div className="cos-loading__inner">
        <p className="cos-loading__eyebrow">opening the cabinet…</p>
        <p className="cos-loading__title">The Cabinet of Shadows</p>
        <div className="cos-loading__rule" aria-hidden="true" />
      </div>

      <style>{`
        .cos-loading {
          min-height: 100dvh;
          display: grid;
          place-items: center;
          padding: 3rem 1.5rem;
          background: var(--color-bg, #0B0608);
          color: var(--color-ink, #E8DCC4);
        }
        .cos-loading__inner {
          display: grid;
          gap: 1.5rem;
          text-align: center;
          animation: cosLoadingBreath 2.4s ease-in-out infinite;
        }
        .cos-loading__eyebrow {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          font-size: 0.72rem;
          color: var(--color-accent, #D4A574);
          opacity: 0.85;
          margin: 0;
        }
        .cos-loading__title {
          font-family: var(--font-display-default, "EB Garamond", serif);
          font-style: italic;
          font-size: clamp(2rem, 3vw + 1rem, 3.5rem);
          line-height: 1.05;
          margin: 0;
        }
        .cos-loading__rule {
          margin: 0 auto;
          width: 5rem;
          height: 1px;
          background: var(--color-accent, #D4A574);
          opacity: 0.6;
          animation: cosLoadingRule 1.6s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes cosLoadingBreath {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 0.95; }
        }
        @keyframes cosLoadingRule {
          0%, 100% { transform: scaleX(0.4); }
          50%      { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cos-loading__inner { animation: none; opacity: 0.8; }
          .cos-loading__rule { animation: none; transform: scaleX(1); }
        }
      `}</style>
    </main>
  );
}
