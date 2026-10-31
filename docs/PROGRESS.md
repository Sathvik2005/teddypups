# TeddyPups Clone — Progress Tracker

Reference: https://puppy.instabizweb.com/ · Deploy target: GitHub `Sathvik2005` (new repo) → Vercel
Legend: ✅ done · 🟡 partial · ⬜ not started · ⛔ needs user

| # | Phase | Status | Notes |
|---|-------|--------|-------|
| 1 | Research & docs | ✅ | 7 docs, 20 reference screenshots, 156 assets, verified tokens/fonts |
| 2 | Foundation (tokens, fonts, header/footer, UI kit) | ✅ | Tailwind v4 `@theme`, Fraunces/Figtree/Shantell |
| 3 | Pages (all routes) | ✅ | 26 static pages incl. 15 puppy pages |
| 4 | Interaction & motion | ✅ | puppy cursor, paw trail, mascots, reveals, lightbox, accordion |
| 5 | Testing | 🟡 | 20 Playwright tests green; visual diff vs reference at 6 viewports not done |
| 6 | Quality (lint/tsc/build/a11y/SEO) | 🟡 | lint, tsc, build clean; no Lighthouse/axe run yet |
| 7 | GitHub new repo | ⛔ | needs `gh auth login` by user |
| 8 | Vercel deploy + live verification | ⛔ | needs Vercel login by user |
| 9 | Handover (README, prompts log, Loom outline) | ⬜ | |

## "Cute pass" (latest)
- Mascots (original SVG, one drawing style): Mochi, Biscuit, Coco, Teddy — expressions, blink/breathe/tilt, pupils follow pointer, hover reaction.
- `PupCursor`: spring-follow puppy face beside the native pointer; `hm?` at rest, `achoo!` on click, `coming?` on puppy cards, `woof!` WhatsApp, `boop!` buttons, `treat?`/`pick me!`/`so cute!`/`hello!` via `data-cursor-say`. Hidden over form fields.
- `PawTrail`: distance + time throttled, pool of 14 nodes, alternating paws, fade + shrink.
- Desktop (fine pointer ≥768px) = cursor + trail. Touch/small = walking Teddy companion. Reduced motion = nothing animated.
- Decorations: bones, hearts, stars, balls, clouds, treats, paws (restrained presets). Fish removed (dog-only brief).
- Placement: hero Teddy (waves, "hello!"), Biscuit by the showcase, Coco in the journey, Mochi at FAQ, Teddy at contact, Biscuit on the empty catalogue, sleeping Mochi in the footer, loading state "Fetching the cutest pups…".

## Test evidence
`npx playwright test` → 20 passed. p95 frame time during extended pointer movement 16.8 ms. Paw nodes capped at 14.

## Known limitations
- Meet-the-pups is a scroll-snap rail (reference uses a pinned scene).
- Illustrations (plane, chat, mascots) are original, not copies.
- Enquiry form has no backend; it hands off to WhatsApp/email and says nothing was sent.
- Photos are the shop's real listings (internal showcase use).
- Visual diff against the reference below the hero is still manual.
