<div align="center">

# The Cabinet of Shadows

### *A Victorian alienist's casebook of the monsters of Gothic literature*

[**cabinetofshadows.me**](https://cabinetofshadows.me)

[![Live](https://img.shields.io/badge/site-cabinetofshadows.me-D4A574?style=flat-square)](https://cabinetofshadows.me)
[![Deploy](https://img.shields.io/github/actions/workflow/status/frankcaules/cabinet-of-shadows/deploy.yml?branch=main&style=flat-square&label=deploy)](https://github.com/frankcaules/cabinet-of-shadows/actions/workflows/deploy.yml)
[![Code: MIT](https://img.shields.io/badge/code-MIT-blue?style=flat-square)](./LICENSE)
[![Prose: CC BY-NC-SA 4.0](https://img.shields.io/badge/prose-CC%20BY--NC--SA%204.0-green?style=flat-square)](./LICENSE)
[![No tracking](https://img.shields.io/badge/tracking-none-success?style=flat-square)](./app/[locale]/privacy/page.tsx)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Made by Frank Caules](https://img.shields.io/badge/made%20by-Frank%20Caules-D4A574?style=flat-square)](mailto:frank.caules@gmail.com)

</div>

---

## What this is

The Cabinet of Shadows is a long-form, hand-built reading experience. The
conceit is that you have stumbled into the reconstructed casebook of an
unnamed Victorian alienist — that is, a nineteenth-century doctor of the
mind, predating the word *psychiatrist* by several decades — who treated
the monsters of Gothic literature as if they were his patients.

Thirteen patients. Thirteen dossiers. Thirteen peer-reviewed
psychological phenomena — disorganised attachment, clinical lycanthropy,
mass sociogenic illness, the *Unheimliche*, deindividuation, depersonalisation,
narcissistic personality structure, and the rest — held up against the
novels that anticipated them by a century. Every clinical claim is cited;
the DOIs are live; the bibliography is open. The alienist is a fiction,
but everything he reads can be fact-checked by anyone who wishes to.

Dracula sits across his desk under one reading. Frankenstein's Creature
sits across the same desk under another. The framing is the joke. The
science is the point.

| Layer | What it is |
|---|---|
| **Frame** | A nineteenth-century alienist's hand-bound casebook |
| **Cast** | Dracula · the Creature · Mr Hyde · the Werewolf · the Invisible Man · Carmilla · the Phantom · Dorian Gray · Varney · Sweeney Todd · Spring-Heeled Jack · the Golem · the Headless Horseman |
| **Anchor** | ~80 peer-reviewed citations, live DOIs, grouped by case |
| **Voice** | English and Thai, both written from scratch |
| **Surface** | Next.js 15 + React 19 + TypeScript strict, Tailwind v4, Three.js hub, GSAP scroll choreography |

---

## Take a tour

```
cabinetofshadows.me/                         the cabinet hub (3D)
cabinetofshadows.me/en/dossier/dracula       a sample case (English)
cabinetofshadows.me/th/dossier/dracula       the same case (Thai)
cabinetofshadows.me/en/sources               the full bibliography
cabinetofshadows.me/en/the-alienist          a note from the editors
cabinetofshadows.me/en/privacy               the no-tracking pledge
```

---

## What is shipped, deliberately

| Yes | No |
|---|---|
| ✅ Original prose, English and Thai, hand-written | ❌ No analytics. None. Not Google, not Plausible, not Vercel's, not anything. |
| ✅ ~80 peer-reviewed citations with live DOIs, fact-checkable | ❌ No cookies. None. No banner because none to consent to. |
| ✅ Self-hosted fonts via `@fontsource` | ❌ No third-party JS. No Google Fonts. No CDN-jQuery. No anything. |
| ✅ Self-hosted illustrations and 3D assets | ❌ No accounts, no forms, no newsletter, no "share your email" |
| ✅ Three.js hub with full keyboard fallback | ❌ No paywall. No subscription. No ads. No affiliate links. |
| ✅ Full bilingual i18n (EN + TH) | ❌ No machine translation; Thai is hand-written |
| ✅ `prefers-reduced-motion` honoured at every layer | ❌ No flashing content; checked against WCAG 2.3.1 |
| ✅ WCAG 2.2 AA target; skip link; screen-reader tested | ❌ No images without alt; no colour-only signal |
| ✅ Strict CSP, HSTS preload, COOP/CORP, frame-ancestors none | ❌ No `X-Powered-By`. No version disclosure. |
| ✅ AI training: explicit `robots.txt` opt-out + EU Article 4 | ❌ No license to train models on this work |

The full receipt for the no-tracking claim is at
[**/privacy**](https://cabinetofshadows.me/en/privacy). The full security
posture is in [**SECURITY.md**](./SECURITY.md). The full accessibility
statement is at [**/accessibility**](https://cabinetofshadows.me/en/accessibility).

---

## Stack

The whole site is statically generated at build time and served from
Vercel's edge. There is no application server. There is no database.
There is, by design, almost nothing to attack.

**Runtime**
- **[Next.js 15](https://nextjs.org)** App Router · React 19 · TypeScript strict mode
- **[Tailwind CSS v4](https://tailwindcss.com)** CSS-first config; per-monster palette via `[data-monster]` scope blocks
- **[Lenis](https://lenis.darkroom.engineering)** smooth scroll, ticker-synced to GSAP
- **[GSAP 3](https://gsap.com)** scroll choreography + `@gsap/react` for safe lifecycle
- **[Framer Motion](https://www.framer.com/motion/)** route-transition orchestration
- **[Three.js](https://threejs.org) + [React Three Fiber](https://r3f.docs.pmnd.rs)** for the Cabinet hub
- **[@tsparticles](https://particles.js.org)** for per-dossier atmospheric layers
- **[@fontsource](https://fontsource.org)** for ~25 self-hosted display and body fonts

**Build / deploy**
- **pnpm 10** package manager (with `pnpm.overrides` pinning patched transitive deps)
- **GitHub Actions** for `main → Vercel prod`
- **Vercel** edge for serving; nothing else

**Languages of the prose**
- **English** (the alienist's original voice — measured, faintly self-amused, never
  afraid of a Latinate verb when an Anglo-Saxon one will not do the work)
- **ภาษาไทย** (the same voice translated by hand into formal literary Thai with
  light scholarly archaism — not machine-translated)

---

## Repository tour

```
cabinet-of-shadows/
├── app/                          Next 15 App Router
│   ├── [locale]/                 en | th
│   │   ├── page.tsx              the 3D Cabinet hub
│   │   ├── dossier/[monster]/    the 13 case files
│   │   ├── the-alienist/         editorial note
│   │   ├── sources/              the full bibliography
│   │   ├── privacy/              the no-tracking pledge
│   │   ├── terms/                conditions of use
│   │   └── accessibility/        accessibility statement
│   ├── robots.ts                 AI-crawler opt-out
│   ├── sitemap.ts                generated from monster registry
│   └── globals.css               Tailwind v4 @theme + per-monster scopes
├── components/
│   ├── a11y/                     skip link, motion provider, language switch
│   ├── cabinet/                  R3F scene + 2D fallback + keyboard list
│   ├── dossier/                  the 9-section case-file shell
│   ├── transitions/              13 signature page transitions
│   ├── scroll/                   Lenis ↔ GSAP ticker plumbing
│   └── site/                     Colophon (the persistent fine-print footer)
├── lib/
│   ├── data/
│   │   ├── monsters/             one TS file per monster × locale
│   │   ├── monsters.ts           the typed registry
│   │   └── types.ts              the strict schemas
│   └── i18n/                     UI strings, EN + TH
├── public/
│   ├── illustrations/            self-hosted WebP per monster
│   ├── sigils/                   13 monster sigils as SVG
│   └── transitions/              per-monster transition layers
├── scripts/                      Python: ComfyUI/Blender content pipelines
├── SECURITY.md                   security policy + disclosure
├── LICENSE                       MIT (code) + CC BY-NC-SA 4.0 (prose)
├── next.config.ts                the full security-header bank
└── vercel.json                   legacy-domain redirect
```

---

## Running it locally

Requires Node 22 LTS and pnpm 10.

```powershell
git clone https://github.com/frankcaules/cabinet-of-shadows.git
cd cabinet-of-shadows
pnpm install
pnpm dev          # → http://localhost:3000
```

Useful scripts:

```powershell
pnpm dev          # next dev (with web-storage flag for R3F)
pnpm build        # next build — produces 44 static pages
pnpm start        # serve the build
pnpm lint         # next lint
pnpm typecheck    # tsc --noEmit
```

The build is fully static; `pnpm build` writes a `.next/` and that is
everything Vercel needs. There is no server-side runtime in production.

---

## Editorial process

Every dossier is structured the same way, and was written the same way:

1. **Read the source novel.** Mark passages that read as clinically
   suggestive even before Freud existed to have a vocabulary for them.
2. **Find the modern paper.** Search PubMed and Google Scholar for the
   peer-reviewed work that names the phenomenon — often the literature
   already cites the novel.
3. **Read the paper in full.** Not the abstract.
4. **Write the dossier in the alienist's voice.** Nine sections: the
   summoning, the citation header, the visage, the legend, the anxiety
   of the period, the clinical note (with inline numbered citations),
   the diagnosis card (phenomenon · first described by · year · DSM
   status · further reading), the exit line.
5. **Translate to Thai by hand.** Not by machine. The Thai voice mirrors
   the English: formal literary register, light scholarly archaism,
   the same self-aware tone in a different mouth.
6. **Generate the atmosphere.** A WebP visage per monster (ComfyUI),
   a sigil (SVG, hand-cut or ComfyUI-piloted), an ambient palette,
   a signature page-transition.

The alienist's chronology is deliberately impossible — he reads Bowlby
to diagnose Frankenstein's Creature in 1819; he reads Spiegel and
Loewenstein to diagnose Mr Hyde in 1886. The conceit is openly admitted
in **[/the-alienist](https://cabinetofshadows.me/en/the-alienist)**.

---

## On the no-tracking pledge

Open your browser's developer tools. Go to the Network tab. Reload
[any page here](https://cabinetofshadows.me). Watch every request.
They all go to `cabinetofshadows.me` (or to Vercel's edge, which is how
the bytes reach you, not a tracker). No analytics beacons go out.
No third-party scripts load. No cookies are set.

We did not turn analytics off. We never turned them on. There has
never been a tracker on this site. The full audit is at
[/privacy](https://cabinetofshadows.me/en/privacy); the source code is
this repository, in the open.

---

## On security

The site is statically generated, has no database, no API routes, no
authentication, no user-generated content, and ships no third-party
JavaScript. Many web-application vulnerability classes are therefore
structurally impossible here — there is no SQL to inject, no stored XSS
to land, no CSRF endpoint to forge against, no SSRF surface to abuse.

What remains we guard against directly: clickjacking via
`frame-ancestors 'none'`, tabnabbing via `rel="noopener noreferrer"` on
every outbound link, known transitive-dependency CVEs via `pnpm audit`
and `pnpm.overrides`, supply-chain risk via a small and reviewed
dependency tree.

Full posture and reporting policy: **[SECURITY.md](./SECURITY.md)**.

---

## Licence

This repository is dual-licensed:

- **Code** — every `.ts`, `.tsx`, `.css`, `.json`, build script, and config
  file — under the **MIT License**. Use it however you like. A credit
  is appreciated but not required.
- **Editorial content** — the alienist's prose, the Thai translations,
  the curated bibliography, the framing essays — under
  **CC BY-NC-SA 4.0**. Quote, translate, remix, and share, but credit
  the source, do not put it behind a paywall, do not train commercial
  models on it, and release whatever you make from it under the same
  licence.

Full text in [**LICENSE**](./LICENSE).

---

## Contributing

Bug reports, accessibility reports, citation corrections, and Thai-language
copy edits from native readers are all warmly welcomed. The protocol is in
[**CONTRIBUTING.md**](./CONTRIBUTING.md).

Security reports go privately to `frank.caules@gmail.com` with the subject
`[security]` — please do not open a public issue. See
[**SECURITY.md**](./SECURITY.md).

---

## Credits

Built and edited by **Frank Caules** ([frank.caules@gmail.com](mailto:frank.caules@gmail.com)).
Deployed by Vercel. Fonts by [Fontsource](https://fontsource.org). 3D engine
by [Three.js](https://threejs.org). Smooth scroll by
[Lenis](https://lenis.darkroom.engineering).
The clinical literature is the work of its authors — see the
[bibliography](https://cabinetofshadows.me/en/sources) for the proper
attributions.

The alienist is a fiction. The bibliography is not. Fact-check at will.

> *— the Editors, 2026*
