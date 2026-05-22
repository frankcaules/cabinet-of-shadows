import Link from "next/link";
import type { Locale } from "@/lib/data/types";
import { t } from "@/lib/i18n/messages";

interface ColophonProps {
  locale: Locale;
  /** When true, render the larger "long-form" colophon with copyright,
   *  no-tracking pledge, license note, and the full link row.
   *  When false, render only the link row (used on the home page so the
   *  cinematic hub isn't crowded). */
  variant?: "full" | "compact";
}

/**
 * Colophon — the persistent fine-print footer.
 *
 * Carries the legal links (privacy, terms, accessibility), the no-tracking
 * pledge, the dual-license note, and the link out to the source on GitHub
 * and the editors' email.
 *
 * Two variants:
 *   • full     — used at the bottom of long-form pages (alienist, sources,
 *                privacy, terms, accessibility, dossier closing). Sets
 *                copyright, no-tracking, and license alongside the links.
 *   • compact  — used on the 3D home page. Only the link row, opacity dimmed,
 *                so it doesn't compete with the cinematic stage.
 *
 * Always pure server component — no client-side state, no JS shipped.
 */
export function Colophon({ locale, variant = "full" }: ColophonProps) {
  const year = new Date().getFullYear();

  const links = (
    <ul className="cos-colophon__links" aria-label="site fine print">
      <li>
        <Link href={`/${locale}/privacy`}>{t(locale, "colophonPrivacy")}</Link>
      </li>
      <li>
        <Link href={`/${locale}/terms`}>{t(locale, "colophonTerms")}</Link>
      </li>
      <li>
        <Link href={`/${locale}/accessibility`}>{t(locale, "colophonAccessibility")}</Link>
      </li>
      <li>
        <a
          href="https://github.com/ncsergiis/cabinet-of-shadows/blob/main/SECURITY.md"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(locale, "colophonSecurity")}
        </a>
      </li>
      <li>
        <a
          href="https://github.com/ncsergiis/cabinet-of-shadows"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(locale, "colophonRepo")}
        </a>
      </li>
      <li>
        <a href="mailto:frank.caules@gmail.com">{t(locale, "colophonEmail")}</a>
      </li>
    </ul>
  );

  if (variant === "compact") {
    return (
      <nav className="cos-colophon cos-colophon--compact" aria-label="fine print">
        {links}
      </nav>
    );
  }

  return (
    <footer className="cos-colophon cos-colophon--full" role="contentinfo">
      <p className="cos-colophon__pledge">{t(locale, "colophonNoTracking")}</p>
      <p className="cos-colophon__license">{t(locale, "colophonLicense")}</p>
      {links}
      <p className="cos-colophon__copy">
        {t(locale, "colophonCopyright", { y: year })}
      </p>
    </footer>
  );
}
