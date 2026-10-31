# Loom outline (aim for 8–10 minutes)

1. **Intro (30s)** — who you are; the assignment; live URL + repo on screen.
2. **Tour (1.5 min)** — home top to bottom, then catalogue filters, a puppy profile, happy-families lightbox, FAQ, contact.
3. **Process and structure (1.5 min)** — research first: fetched all 22 routes, read the CSS and JS, extracted real data/assets (`reference/`), docs in `docs/`. Show the folder tree.
4. **Tech and why (1 min)** — Next App Router + static generation, Tailwind v4 tokens from the reference, next/font, Framer Motion for UI, rAF for the cursor.
5. **The mascot and cursor (1.5 min)** — finding that the reference's "pup-actor" is a walking mascot (show `reference/js`), so desktop gets `PupCursor` + `PawTrail`, touch gets the walker. Demo `hm?`, `achoo!`, `coming?`, paw trail, forms hiding the puppy, reduced motion.
6. **Responsive (45s)** — 1440 → 390, mobile menu, no overflow.
7. **Testing (1 min)** — run `npx playwright test`; mention the race I hit (hydration timing) and how I fixed the product + tests; frame-time check.
8. **AI tools and prompts (1 min)** — Claude Code; show `docs/PROMPTS_LOG.md`; what I verified myself.
9. **Challenges and decisions (1 min)** — honest forms (no backend), approximated pinned scene, disk-space incident on the dev machine, dog-only brief (fish removed).
10. **Deploy (30s)** — GitHub → Vercel, live verification.
