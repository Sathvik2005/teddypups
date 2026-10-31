# Project Plan — TeddyPups Clone (Logikality internal showcase)

Deliverables (assignment): live URL · GitHub repo · Loom video. Deadline: 48 h from acceptance. Progress is tracked in `PROGRESS.md`.

## Decisions

| Area | Decision | Why |
|---|---|---|
| Framework | Next.js App Router + TypeScript | Same stack as reference; SSG for 15 puppy pages; `next/image`, `next/font` |
| Styling | Tailwind v4 with `@theme` tokens copied from reference | Reference uses the same variable names (`milk`, `cocoa`, `honey`, …) |
| Fonts | `next/font/google`: Fraunces, Figtree, Shantell Sans | Verified exact families |
| Motion | Framer Motion for UI (menu, lightbox, FAQ, reveals); **hand-rolled rAF engine for Teddy** | No per-frame React renders; matches reference's rAF design |
| Mascot | Our own inline-SVG `PupBuddy` + `PupActor` engine | Reference mascot is SVG + scroll-driven, not a cursor (see INTERACTION_SPEC) |
| Forms | React Hook Form + Zod; no fake submission — `mailto`/WhatsApp hand-off, honest copy | No backend is specified |
| Data | `src/data/*.ts` typed, generated once from `reference/asset-manifest.json` | No hardcoded repeated JSX |
| Tests | Playwright (Edge channel locally, Chromium in CI) | Disk on dev machine is tight; CI has space |
| Hosting | Vercel from a new GitHub repo | Next.js native |

## Architecture (improvements over the proposed tree)

```
src/
  app/ (layout, page, puppies/[slug], happy-families, gone-home, how-it-works, faq, contact, not-found, sitemap, robots)
  components/
    layout/ Header, Footer, MobileMenu (native <dialog>), SkipLink
    mascot/ PupBuddy.tsx (SVG), PupActor.tsx (engine + layer), usePupCue.ts   # replaces "motion/PupCursor"
    motion/ Reveal, FloatingDecor
    home/   Hero, MeetPups, TwoWays, Journey, Trust, FamiliesStrip, FaqPreview, FinalCta
    puppies/ PuppyCard, PuppyGrid, PuppyFilters, PuppyGallery, EnquiryForm
    gallery/ PhotoWall, Lightbox
    ui/ Button, Badge, Container, SectionHeading, Arch
  data/ puppies.ts families.ts gone-home.ts faq.ts site.ts (contact + WhatsApp builders)
  lib/ whatsapp.ts, filters.ts, cn.ts
public/images/{brand,puppies,families,gone-home,contact}   # already populated
tests/ e2e/*.spec.ts, visual/*.spec.ts
```

## Phases and exit criteria

| # | Phase | Exit |
|---|---|---|
| 1 | Research (done except approval) | 7 docs, 20 screenshots, 156 assets, plan approved |
| 2 | Foundation: tokens, fonts, layout, Header/Footer/MobileMenu, UI kit | dev server up; header/footer ≈ reference at 1440 & 390 |
| 3 | Homepage 9 sections with real assets | section order/heights within ~5% of measured |
| 4 | Catalogue, filters (URL-synced), puppy pages, gallery, enquiry | all 15 routes, filters via `?origin` `?breed` |
| 5 | Families wall + lightbox (keyboard), gone-home, how-it-works, FAQ, contact | 64-photo lightbox arrows/Esc/counter |
| 6 | Motion + Teddy actor, reduced-motion | each interaction exercised in browser |
| 7 | QA: Playwright e2e + screenshot diffs at 6 viewports, lint, tsc, build, a11y/SEO | all green; no overflow/console errors |
| 8 | GitHub new repo `Sathvik2005/<name>` + README | pushed, clean history, no secrets |
| 9 | Vercel deploy + live verification | live URL tested on routes/images/mobile |
| 10 | Handover: README, prompts log, Loom outline | docs complete |

## Responsive strategy
Mobile-first; verify 375, 390, 768, 1024, 1440, 1920. Fluid `clamp()` for H1/H2 (sample reference at those widths first). Cards use fixed aspect ratios from asset dimensions. Header 64px < md, 76px ≥ md.

## Risks
1. Teddy SVG/animation fidelity is the largest effort — build a good-enough original puppy; keep engine faithful.
2. C: drive nearly full on dev machine → keep `TEMP` on E:, use Edge channel for Playwright.
3. Reference photos are third-party content — flagged in ASSET_MANIFEST.
4. Exact contact-form backend unknown — honest local handling.

## Unverified blockers
Breakpoints, lightbox internals, hover transforms, fluid type formula, filter param names for Boys/Girls/Korean Teacup (see REFERENCE_AUDIT §6).
