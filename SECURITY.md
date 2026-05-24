# Security policy

The Cabinet of Shadows is a static, content-only site with no user
accounts, no comments, and no APIs that accept user input. The only
third-party JavaScript loaded is Google Tag Manager (which loads
Google Analytics 4, IP-anonymized at collection — full disclosure at
[/privacy](https://cabinetofshadows.me/en/privacy)). Its attack
surface is small but not zero. This document explains what we ship
and how to report something we missed.

## What the site is, and isn't

**Is.** A Next.js 15 App Router site rendered to static HTML at build
time, served by Vercel's CDN. All routes are SSG. The only client-side
JavaScript drives:
- a Three.js cabinet hub (`@react-three/fiber`)
- smooth scroll (`lenis`)
- scroll-triggered prose animations (`gsap`)
- per-monster atmospheric particles (`@tsparticles`)
- a language switcher (`next/link` navigation only)

**Isn't.** No server-side database, no API routes, no authentication, no
forms that POST, no session storage of personal data. The only
third-party scripts loaded are Google Tag Manager and Google Analytics
4 (anonymized page views — see [/privacy](https://cabinetofshadows.me/en/privacy));
no fonts CDN, no chat widgets, no ad networks. The only cookie set is
GA4's `_ga`. No user-generated content is ever rendered.

## Defenses in production

| Defense | How |
|---|---|
| HTTPS | Let's Encrypt cert via Vercel, auto-renewing |
| HSTS | `max-age=63072000; includeSubDomains; preload` |
| Content-Security-Policy | `default-src 'self'`; narrow allowlists for GTM (`*.googletagmanager.com`) and GA4 (`*.google-analytics.com`, `*.analytics.google.com`) on script/img/connect/frame-src only |
| frame-ancestors | `'none'` (the site cannot be iframed by anyone) |
| X-Frame-Options | `DENY` (legacy clickjacking defense) |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | All sensitive browser features (camera, mic, geolocation, payment, etc.) explicitly disabled |
| Cross-Origin-Opener-Policy | `same-origin` (Spectre-class isolation) |
| Cross-Origin-Resource-Policy | `same-origin` |
| `X-Powered-By` | Removed (framework not advertised) |
| `target="_blank"` links | All carry `rel="noopener noreferrer"` |
| Dependency audit | `pnpm audit` runs clean (0 known vulnerabilities) |
| Locked transitive deps | `pnpm.overrides` pins patched `postcss` (>= 8.5.10) |
| CI deploy secrets | Stored as GitHub Actions secrets, never in the repo |

## Static-site advantages

Many web-app vulnerabilities are structurally impossible here:
- SQL injection — no database
- XSS via stored user content — no user content
- CSRF — no state-changing endpoints
- SSRF — no server-side fetches at request time
- Auth bypass — no auth
- Account takeover — no accounts
- File-upload exploits — no uploads

The remaining classes we actively guard against: clickjacking (CSP
`frame-ancestors`), tabnabbing (`rel="noopener noreferrer"`), known
dependency CVEs (`pnpm audit` clean), and supply-chain through new deps
(none added without review).

## Reporting a vulnerability

If you find something — a header that's slipped, an unsafe pattern in
the code, a dependency CVE we haven't picked up, or anything else —
please email **frank.caules@gmail.com** with subject `[security]`.

I'll acknowledge within 72 hours. If the issue requires a fix, I'll
push a patch to `main` and credit you (if you'd like) in the commit.

Please do not file public GitHub issues for security reports; they're
visible to scrapers the moment they're created.

## Out of scope

- Best-practice nits with no exploit path (style, naming, etc.) — open
  a regular issue or PR instead.
- DoS via expensive requests — the entire site is cacheable static
  assets; Vercel's edge handles this.
- Social engineering, physical access, or compromise of the developer's
  laptop.
- Anything that requires the user to first install malicious browser
  extensions or a compromised OS.

## Disclosure

I prefer coordinated disclosure: report privately, give us a chance to
fix, then publish. If the issue is critical and unpatched after 90
days, you have my permission to disclose publicly.

— The Editors
