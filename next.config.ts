import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 *
 * Content-Security-Policy is the heaviest hitter — it whitelists the
 * sources the browser is allowed to load resources from. The site is
 * mostly self-contained: SSR'd HTML, self-hosted fonts (@fontsource),
 * WebP images, .opus audio (removed but kept in policy for safety),
 * .webm videos, all from the same origin. Two outbound link targets
 * are needed: doi.org for citation links, and Vercel's own asset CDN
 * which Next.js may use for chunks.
 *
 * `'unsafe-inline'` in style-src is required because Next.js inlines
 * critical CSS and component-level <style> blocks; we can't drop it
 * without rewriting how styles ship. Script-src does NOT include
 * 'unsafe-inline' — Next.js hashes its own inline scripts.
 *
 * frame-ancestors 'none' means no site (including subdomains) can
 * iframe the site. base-uri 'self' prevents <base> tag injection.
 * form-action 'self' prevents form-based exfiltration.
 *
 * COOP/CORP/COEP keep the site isolated from cross-origin attackers
 * (Spectre-class). 'same-origin' is the strict default.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  // 2 years HSTS with preload — register at hstspreload.org once stable
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Lock down browser features we never need
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "ambient-light-sensor=()",
      "autoplay=()",
      "battery=()",
      "camera=()",
      "display-capture=()",
      "document-domain=()",
      "encrypted-media=()",
      "fullscreen=(self)",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "picture-in-picture=()",
      "publickey-credentials-get=()",
      "screen-wake-lock=()",
      "sync-xhr=()",
      "usb=()",
      "web-share=()",
      "xr-spatial-tracking=()",
      "interest-cohort=()", // FLoC opt-out
    ].join(", "),
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // Tell crawlers we don't want our content used to train AI models
  // unless explicitly opted in. Belt-and-suspenders with robots.txt.
  { key: "X-Robots-Tag", value: "index, follow, max-image-preview:large" },
];

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Drop the X-Powered-By: Next.js header — no need to advertise framework
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default config;
