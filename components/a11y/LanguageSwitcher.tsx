"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/data/types";

/**
 * LanguageSwitcher
 * -----------------
 * Fixed pill in the top-right that lets the reader swap between EN and TH.
 * Preserves the current path under the new locale prefix.
 *
 *   /en/dossier/dracula  ↔  /th/dossier/dracula
 *   /en/the-alienist     ↔  /th/the-alienist
 *
 * Falls back to /<locale> when the current path doesn't start with a locale.
 */
export function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";

  function pathForLocale(target: Locale): string {
    const m = pathname.match(/^\/(en|th)(\/.*)?$/);
    if (m) return `/${target}${m[2] ?? ""}`;
    return `/${target}`;
  }

  // Active locale is the first segment of the current pathname
  const currentMatch = pathname.match(/^\/(en|th)(?:\/|$)/);
  const current: Locale = (currentMatch?.[1] as Locale) ?? "en";

  return (
    <nav className="cos-lang" aria-label="Language">
      {LOCALES.map((locale) => (
        <Link
          key={locale}
          href={pathForLocale(locale)}
          className="cos-lang__btn"
          aria-current={current === locale ? "true" : undefined}
          lang={locale}
        >
          {locale === "en" ? "EN" : "ไทย"}
        </Link>
      ))}

      <style>{`
        .cos-lang {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 110;
          display: inline-flex;
          gap: 0.25rem;
          padding: 0.18rem;
          background: rgba(11, 6, 8, 0.5);
          border: 1px solid var(--color-rule, var(--color-cabinet-rule));
          border-radius: 9999px;
          backdrop-filter: blur(6px);
        }
        .cos-lang__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 2.1rem;
          height: 1.9rem;
          padding: 0 0.55rem;
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-ink, var(--color-cabinet-ink));
          opacity: 0.55;
          text-decoration: none;
          border-radius: 9999px;
          transition: background 160ms ease, color 160ms ease, opacity 160ms ease;
        }
        .cos-lang__btn[lang="th"] {
          font-family: "Sarabun", ui-sans-serif, system-ui, sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0;
        }
        .cos-lang__btn:hover,
        .cos-lang__btn:focus-visible {
          opacity: 1;
          outline: none;
        }
        .cos-lang__btn[aria-current="true"] {
          background: var(--color-accent, var(--color-cabinet-accent));
          color: var(--color-bg, var(--color-cabinet-bg));
          opacity: 1;
        }
      `}</style>
    </nav>
  );
}
