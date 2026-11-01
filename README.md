# TeddyPups U.A.E. — website reconstruction

A faithful, fully interactive rebuild of <https://puppy.instabizweb.com/> (premium teacup puppies, Downtown Dubai), plus a layer of puppy personality: original mascots, a puppy cursor and a paw-print trail.

Built as a technical assignment and internal Logikality showcase.

- **Live site:** _pending deployment_
- **Repository:** _pending push_

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · React Hook Form + Zod · Lucide · Playwright (+ axe-core for accessibility checks)

Fonts are the reference's own, verified from its CSS: **Fraunces** (display), **Figtree** (UI), **Shantell Sans** (handwriting), loaded with `next/font/google`. Colour tokens (`milk`, `cocoa`, `honey`, `toffee`, `blush`, `sky`) come straight from the reference stylesheet.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
npx playwright test  # uses system Edge locally; set CI=1 to use Chromium
```

Optional: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` (canonical URLs, sitemap, WhatsApp profile links). On Vercel it falls back to `VERCEL_PROJECT_PRODUCTION_URL`.

## Routes

`/` · `/puppies` (`?origin=` `?breed=` `?gender=`) · `/puppies/[slug]` (15 profiles) · `/happy-families` (64 photos + lightbox) · `/gone-home` (27) · `/how-it-works` · `/faq` · `/contact` · custom 404 · `sitemap.xml` · `robots.txt`. All 26 pages are statically generated.

## Structure

```
src/
  app/                    routes, layout, loading, 404, sitemap, robots
  components/
    layout/               Header, MobileMenu (native <dialog>), Footer, WhatsAppFloat
    home/                 Hero, MeetPups, TwoWays, Journey(+Chat), Trust, Families, FaqPreview, FinalCta
    puppies/              PuppyCard (door), PuppyRail, PuppyCatalogue (URL-synced filters), PuppyGallery, EnquiryForm
    gallery/              PhotoWall, Lightbox (native <dialog>, keyboard)
    mascot/               PuppyMascot, MascotExpression, MascotSpeechBubble, MascotShowcase, IntroMascot, PupActor (walking Teddy)
    cursor/               PupCursor, PawTrail, CursorReaction
    decorations/          Decor + presets (bones, hearts, stars, balls, clouds, treats, paws)
    motion/               Reveal, Floating, HoverLift
    ui/                   Accordion, shared parts
  data/                   typed data: puppies.generated.ts, families.ts, gone-home.ts, faq.ts, site.ts
  lib/                    whatsapp.ts, filters.ts, cn.ts
  hooks/                  cursorMode.ts (device/reduced-motion gating)
public/images/            original assets (156 files) downloaded from the reference
tests/                    Playwright specs (cursor, mascots, routes)
docs/                     research and planning (see below)
reference/                capture / extraction scripts used during research
```

## Key decisions

- **Data is generated, not hand-written.** `reference/gen-data.mjs` builds typed data from the reference's own payload (dimensions, alt text, video + poster), so no repeated JSX and no invented facts.
- **The reference's "pup-actor" is not a cursor.** Reading its JS showed a scroll-driven walking mascot. I kept that behaviour for touch / small screens (`PupActor`) and built the requested pointer-following puppy (`PupCursor`) for fine-pointer desktops. They never run together.
- **Motion without an animation library.** Reveals, word-by-word headlines and image wipes are CSS animations triggered by a tiny IntersectionObserver; parallax and the scroll-progress bar are CSS scroll-driven animations (`animation-timeline`), so they cost no JavaScript (browsers without support just show things still). Framer Motion was removed after measuring: it cut transferred JavaScript and main-thread work on mobile.
- **No React renders per pointer move.** Cursor, paw trail and mascot eye-tracking use rAF and direct DOM writes; the trail is a pool of 14 recycled nodes.
- **Native cursor is kept.** The puppy trails the real pointer instead of replacing it, so clicks, text selection, inputs and dialogs are unaffected. It hides over form fields.
- **Reduced motion:** cursor, trail, walker and reveals are disabled/instant.
- **Honest forms.** There is no backend, so the enquiry form validates (Zod), then offers a WhatsApp / email hand-off and states plainly that nothing has been sent.
- **Dog-only brief:** the reference's decorative fish was replaced with bones, balls and treats.

## Verified vs approximated

Verified from the reference: fonts, colour tokens, route list, all copy, all 15 puppy records, 64 family photos, header height (76/64px), H1/H2 sizes, CTA height, mobile menu structure, FAQ accordion semantics, WhatsApp URL.

Approximated: exact hover transforms and easing curves, the pinned "Meet the pups" scene (rebuilt as a scroll-snap strip of doors), illustrations (plane, chat, mascots — all original), footer height (within ~5%).

## Testing

Playwright specs cover the puppy cursor (follow, `hm?`, `achoo!`, `coming?`, nesting without flicker, form fields, no click interception), the paw trail (creation, cap of 14 nodes, cleanup, no prints while selecting), touch and reduced-motion fallbacks, mascots, keyboard use, the honest enquiry form, every route (200, one `h1`, no console errors, no broken images), horizontal overflow at 1920 / 1440 / 1024 / 768 / 390 / 375, catalogue filters, profiles, galleries and the mobile menu. Frame-time check: p95 16.8 ms during heavy pointer movement.

## Known limitations

- Photos are the shop's real listings, used for an internal, non-commercial showcase. Do not redistribute or publish commercially without the owner's consent.
- Enquiries are not stored or sent by the site.
- "Meet the pups" is not the reference's pinned scroll scene.

## Docs

`docs/PROGRESS.md` · `PROJECT_PLAN.md` · `REFERENCE_AUDIT.md` · `DESIGN_SYSTEM.md` · `ROUTE_INVENTORY.md` · `INTERACTION_SPEC.md` · `ASSET_MANIFEST.md` · `DEPLOYMENT.md` · `PROMPTS_LOG.md` · `LOOM_OUTLINE.md`
