import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/data/monsters";
import { LOCALES } from "@/lib/data/types";

const SITE_URL = "https://cabinetofshadows.me";

/**
 * Sitemap — every reachable, indexable URL of the Cabinet, both locales.
 *
 * Static routes per locale: `/`, `/the-alienist`, `/sources`,
 * `/privacy`, `/terms`, `/accessibility`.
 *
 * Plus a `/dossier/<slug>` page per monster (full + stub) per locale.
 *
 * `alternates.languages` lets search engines surface the right locale
 * to each reader and prevents en/th routes from being treated as
 * duplicate content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const slugs = getAllSlugs();

  const staticPaths = ["", "/the-alienist", "/sources", "/privacy", "/terms", "/accessibility"];
  const dossierPaths = slugs.map((slug) => `/dossier/${slug}`);
  const allPaths = [...staticPaths, ...dossierPaths];

  return allPaths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/dossier/") ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]),
        ),
      },
    })),
  );
}
