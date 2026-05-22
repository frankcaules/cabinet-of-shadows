/**
 * RepoLink
 * --------
 * Persistent fixed pill in the top-right corner — sits to the left of
 * the LanguageSwitcher — that links to the source repository on GitHub.
 *
 * Visual language matches the language switcher: same height, same pill
 * shape, same backdrop blur, same monospace tone. The GitHub mark is
 * inline SVG so it ships zero JS and zero network requests beyond what
 * the page already loads.
 *
 * The whole project is open source under MIT + CC BY-NC-SA 4.0; making
 * the source one click away from every page is a small kindness to
 * curious readers.
 */
export function RepoLink() {
  return (
    <a
      className="cos-repo"
      href="https://github.com/frankcaules/cabinet-of-shadows"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View source on GitHub"
      title="View source on GitHub"
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.07c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.27-1.7-1.27-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.8.55C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
      </svg>
      <span>SOURCE</span>

      <style>{`
        .cos-repo {
          position: fixed;
          top: 1rem;
          /* Sits to the LEFT of the language switcher (which is at right: 1rem).
             The lang pill is roughly 4.8rem wide — leave a 0.4rem gap. */
          right: calc(1rem + 5.2rem);
          z-index: 110;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          height: 2.26rem;
          padding: 0 0.7rem;
          background: rgba(11, 6, 8, 0.5);
          border: 1px solid var(--color-rule, var(--color-cabinet-rule));
          border-radius: 9999px;
          backdrop-filter: blur(6px);

          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.66rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-ink, var(--color-cabinet-ink));
          opacity: 0.55;
          text-decoration: none;
          transition: opacity 160ms ease, color 160ms ease;
        }
        .cos-repo svg { display: block; }
        .cos-repo:hover,
        .cos-repo:focus-visible {
          opacity: 1;
          color: var(--color-accent, var(--color-cabinet-accent));
          outline: none;
        }
        /* Narrow phones: collapse to icon only so we don't crowd the lang pill */
        @media (max-width: 480px) {
          .cos-repo span { display: none; }
          .cos-repo {
            right: calc(1rem + 5.2rem);
            padding: 0 0.55rem;
          }
        }
        /* Mobile landscape — same rule as the cabinet hint: hide. */
        @media (orientation: landscape) and (max-height: 480px) {
          .cos-repo { display: none; }
        }
      `}</style>
    </a>
  );
}
