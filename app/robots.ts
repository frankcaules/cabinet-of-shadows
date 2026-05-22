import type { MetadataRoute } from "next";

/**
 * robots.txt — what well-behaved crawlers may do here.
 *
 * Stance:
 *   • Search engines and the Internet Archive are welcome to index.
 *   • Known AI-training scrapers are explicitly disallowed.
 *
 * This is a Cabinet of citations, peer-reviewed psychology, and original
 * editorial prose; it is licensed for human reading, not for harvest into
 * model weights. The disallow list below is not legally binding (robots.txt
 * is a request, not a fence), but it is a clear declaration of intent and
 * is honoured by most reputable training crawlers.
 *
 * The HTML <head> companion to this lives in `X-Robots-Tag` (set in
 * `next.config.ts`) and the `robots` metadata in `app/layout.tsx` —
 * belt and suspenders.
 */
const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "Applebot-Extended",
  "FacebookBot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "cohere-ai",
  "cohere-training-data-crawler",
  "Diffbot",
  "ImagesiftBot",
  "Omgilibot",
  "Omgili",
  "Timpibot",
  "PanguBot",
  "SemrushBot-OCOB",
  "PetalBot",
  "DuckAssistBot",
  "MistralAI-User",
  "Kangaroo Bot",
  "AI2Bot",
  "Velen Crawler",
  "VelenPublicWebCrawler",
];

const SITE_URL = "https://cabinetofshadows.me";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: anything not named below may crawl the whole site.
      { userAgent: "*", allow: "/" },
      // Explicitly disallow the AI-training crawlers.
      ...AI_BOTS.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
