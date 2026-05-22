# Contributing

The Cabinet of Shadows is, in the deepest sense, a one-author project — a
single editor's reading of thirteen Gothic novels, a single voice doing
the alienist, a single hand on the bibliography. The voice would not
survive shared authorship.

That said, there are real ways to contribute, and any of them would be
welcome.

## What is welcome

### Citation corrections
If you read a dossier and notice that a paper is misattributed, that a
year is wrong, that a DOI does not resolve, or that the alienist has
misrepresented an argument the paper actually makes — please open an
issue or write to `frank.caules@gmail.com`. Citation accuracy is the
spine of the whole project. Errors here will be treated as bugs and
fixed quickly.

### Accessibility reports
If anything on the site is hard to use with the assistive technology you
rely on — screen reader, voice control, switch control, magnifier,
keyboard-only navigation, high-contrast mode, anything — please write
to `frank.caules@gmail.com` with subject `[accessibility]`. Describe
what you were trying to do, what got in the way, and what device or
assistive technology you were using. We treat accessibility bugs at the
same priority as security bugs.

### Thai copy edits from native readers
The Thai prose was hand-translated rather than machine-translated, and
was reviewed by the editor before publication — but the editor is not a
native Thai reader. If you are, and a sentence reads as awkward,
calques-from-English, or breaks the formal-literary register, please
open an issue with the dossier slug, the section, and the suggested
alternative. Tone matters as much as accuracy here; we are aiming for
the same voice in Thai that the alienist has in English.

### Bug reports
If something is broken — a transition stuck mid-frame, a font that fails
to load, a route that 404s, a layout that breaks on a particular device —
open a GitHub issue with:

- the URL where you saw it
- the browser and OS
- the viewport size (if a layout bug)
- whether `prefers-reduced-motion` was set
- a screenshot if applicable

### Security reports
**Do not file a public GitHub issue for a security report.** They are
visible to scrapers the moment they are created. Instead, email
`frank.caules@gmail.com` with subject `[security]`. See
[SECURITY.md](./SECURITY.md) for the full disclosure policy. You will
get an acknowledgement within 72 hours.

### Performance regressions
If a page is noticeably slower than the rest of the site on a device
that should handle it — slow first paint, dropped scroll frames, jank on
the 3D hub on a normal laptop — open an issue. Include the device, the
browser, the network throttle if you tested with one, and what page.

## What is less welcome

### New monsters
The Cabinet is a closed set of thirteen, chosen with care to span the
arc of nineteenth-century Gothic and to map cleanly onto thirteen
distinct, well-documented psychological phenomena. Adding a fourteenth
would unbalance the structure. The thirteen are the project.

### Voice rewrites
The alienist's voice is the connective tissue of the whole site, and is
the editorial choice this project is most committed to. Pull requests
that "modernise" or "simplify" the prose will not be merged. The same
applies to the Thai translations — they are tonal sister documents, not
literal renderings.

### Adding analytics or tracking
The no-tracking pledge at [/privacy](https://cabinetofshadows.me/en/privacy)
is structural. Pull requests that add Google Analytics, Plausible,
Vercel Analytics, or any other tracker — even "for performance
monitoring" — will not be merged. The same applies to cookies, account
systems, comment systems, newsletter signups, and contact forms.

### Adding dependencies
Every new runtime dependency expands the supply-chain attack surface,
increases the JS bundle, and increases the cost of maintaining the
project over years. Pull requests that add a dependency will be reviewed
sceptically; please open an issue first to discuss the tradeoff. The
question to answer is: *what does the user gain that they could not
have without this?*

## Development workflow

Requires Node 22 LTS and pnpm 10.

```powershell
git clone https://github.com/ncsergiis/cabinet-of-shadows.git
cd cabinet-of-shadows
pnpm install
pnpm dev          # → http://localhost:3000
```

Before submitting a pull request:

```powershell
pnpm lint         # next lint must pass
pnpm typecheck    # tsc --noEmit must pass
pnpm build        # next build must pass
```

If you are touching the data layer (anything under `lib/data/monsters/`),
also walk through the affected dossier in the browser and check that
the citations render with the right numbers and the right DOI links.

## Branch and commit conventions

- Branch from `main` with a short, hyphenated name: `fix-dracula-doi`,
  `a11y-skip-link-focus`, `th-copy-edit-carmilla`.
- Keep commits small and scoped. Write commit messages in the
  imperative mood: *fix dracula DOI for Clasen 2012*, not *fixed* or
  *fixes*.
- For documentation changes only, prefix the subject with `docs:`. For
  copy edits, `copy:`. Other changes need no prefix.
- Pull requests should describe the user-visible effect of the change
  in one or two sentences at the top, then the implementation notes
  underneath.

## Code style

- TypeScript strict mode. No `any` without a comment explaining why.
- Functional components only.
- Server components by default; `"use client"` only when the component
  actually needs the browser.
- One component per file. Filename matches the export.
- Tailwind v4 utility classes for one-off styling; per-dossier visual
  identity goes in `app/globals.css` under the matching `[data-monster]`
  scope block.
- No new global CSS rules unless there is no reasonable alternative.
- Prose data (the dossier text) lives in `lib/data/monsters/<slug>.ts`
  (English) and `lib/data/monsters/<slug>.th.ts` (Thai). Both must
  conform to the strict `Monster` schema in `lib/data/types.ts`.

## Code of conduct

Be civil. Be specific. Disagreement is fine; cruelty is not. Issues and
pull requests that violate this in any direction will be closed without
discussion.

## Licence

By contributing, you agree that your contribution will be released
under the same dual licence as the rest of the project — MIT for code,
CC BY-NC-SA 4.0 for editorial prose. Full text in [LICENSE](./LICENSE).

---

*— the Editors*
