import Link from "next/link";

export function ExitLine() {
  return (
    <section className="dossier__exit" aria-label="Closing remark">
      <p className="exit__line">
        Consider, reader, that we built him to be hated, and find ourselves grieving when he falls.
      </p>
      <p className="exit__return">
        <Link href="/">— close the file —</Link>
      </p>

      <style>{`
        .dossier__exit {
          margin: 6rem auto 0;
          padding: 4rem 0 2rem;
          border-top: 1px solid var(--color-rule);
          text-align: center;
        }
        .exit__line {
          font-family: var(--font-accent, var(--font-display));
          font-style: italic;
          font-size: clamp(1.1rem, 1.2vw + 0.9rem, 1.4rem);
          line-height: 1.5;
          max-width: 32rem;
          margin: 0 auto;
          opacity: 0.92;
        }
        .exit__return {
          margin-top: 2rem;
          letter-spacing: 0.2em;
          text-transform: lowercase;
          font-size: 0.85rem;
        }
        .exit__return a {
          color: var(--color-ink);
          opacity: 0.9;
          text-decoration: none;
          border-bottom: 1px solid var(--color-accent);
          padding-bottom: 2px;
          transition: color 180ms ease, border-bottom-color 180ms ease;
        }
        .exit__return a:hover,
        .exit__return a:focus-visible {
          color: var(--color-candlelight, var(--color-accent));
          border-bottom-color: var(--color-candlelight, var(--color-accent));
        }
      `}</style>
    </section>
  );
}
