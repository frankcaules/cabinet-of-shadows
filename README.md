# The Cabinet of Shadows

A Victorian-gothic, penny-dreadful-inspired interactive homage to the classic literary monsters, in which each monster's dossier is also a quietly rigorous lesson in real psychology drawn from peer-reviewed journals.

The conceit: the user is browsing the private case files of an unnamed Victorian alienist who collected, studied, and corresponded with the monsters of Gothic literature as if they were psychiatric patients.

## Status

Phase 1 — Foundation + Dracula proof-of-concept.

## Stack

- Next.js 15 (App Router) + TypeScript strict
- Tailwind CSS v4 (CSS-first config)
- Lenis (smooth scroll) + GSAP 3 (animation) + Framer Motion (route transitions)
- @fontsource (self-hosted gothic fonts)
- Three.js / R3F (deferred to Phase 3 — hub)
- Howler.js (deferred to Phase 4 — atmospheric audio)

## Run

```powershell
pnpm install
pnpm dev
# open http://localhost:3000
```

## Routes (Phase 1)

- `/` — placeholder hub ("Enter the Cabinet")
- `/dossier/dracula` — full Dracula dossier (real prose, real citations)
- `/dossier/<other-slug>` — stub "catalogue pending" page for monsters 2–13
