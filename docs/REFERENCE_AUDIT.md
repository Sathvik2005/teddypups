# Reference Audit — puppy.instabizweb.com

Research write-up for the Logikality internal showcase. Method: HTTP fetch of all 22 routes, CSS/JS chunk analysis (`reference/js/`), and live Microsoft Edge automation via Playwright (`reference/capture.mjs`, `reference/probe.mjs`). Date: 2026-10-31.

**Legend:** ✅ verified (read from source/computed style/live browser) · 🟡 estimate · ❓ unverified

## 1. Stack (✅)

Next.js App Router (RSC flight payload, `/_next/image`), React, Tailwind v4 (`--color-*` / `--font-*` theme vars), self-hosted Google fonts via `next/font`, Cloudflare in front. Images are served from `/media/<id>/<hash>/<name>` and optimised through `/_next/image`.

## 2. Page inventory (✅)

| Route | Notes |
|---|---|
| `/` | Hero with Teddy mascot + puppy lineup, then 8 more sections |
| `/puppies` | 15 listings, client-side filter chips (Everywhere/Imported · breeds · Boys/Girls) |
| `/puppies/[slug]` | 15 profiles, gallery 2–11 media (images + mp4 w/ poster), enquiry form |
| `/happy-families` | 64-photo wall, each a `button[aria-label="Open photo N of 64: …"]` |
| `/gone-home` | 27 "ticket" images (`admit one` / `home ♥`), no live detail pages |
| `/how-it-works` | Anchors `#two-ways #promise #delivery #why` |
| `/faq` | 9 Q&As, `<h2 class="tp-note__q">` + `aria-expanded` button |
| `/contact` | Form (12-option puppy select), Google Maps link |
| 404 | Custom "this page has wandered off" with Teddy |

Gone-home slugs such as `/puppies/pomeranian-ace-boy` are linked in markup but are **not** real pages (the clone must not link them).

## 3. Layout measurements (✅ computed in Edge)

| Item | 1440×900 | 390×844 |
|---|---|---|
| Header | fixed, 76px tall, transparent bg | fixed, 64px tall |
| Body | Figtree 17px, `#2a170e` on `#fffdf8` | same |
| H1 | Fraunces 800, 99px / 91px lh | 41.6px / 38.3px lh |
| H2 | Fraunces, 92.16px (fluid clamp) | 41.6px |
| Nav links | 16px, Home x=411 → Visit & contact x=931 | hidden → `Menu` button |
| WhatsApp button | 136×44, bg `#1f7a4d`, text white, 15.2px/650, pad 9.6×21.6 | in menu |
| Primary CTA | 229×52, bg `#a24a1a`, text `#fffdf8`, 17px/650, pad 13.6×25.6, fully rounded | same |
| Footer | 701px tall, bg `#24130b`, text `#fffdf8` | 1303px |
| Home section heights (top→bottom) | hero 824 · pups 4126 · 1107 · 1697 · 922 · 1575 · 636 · 1021 | hero 780 · 9140 · 1289 · 1539 · 1262 · 1712 · 964 · 992 |

Horizontal overflow: none at any of the 6 viewports (✅ `reference/capture-report.json`). Console errors: none.

Screenshots: `reference/screenshots/` — home at 1920×1080, 1440×900, 1024×768, 768×1024, 390×844, 375×812; all 8 page types at 1440 and 390; mobile menu open at 390.

## 4. Homepage section order (✅ from rendered text)

1. Hero — "every puppy is family" / **Premium teacup puppies in Dubai** / 2 CTAs / Teddy peeking over quilt + 6-pup lineup (Max, Korean Teacup Maltipoo, Korean Teacup Poodle, Maltipoo & Cavapoo, Toy Poodle, Maltipoo) 
2. Meet the pups — 15 cards, "See all available puppies", "Meet them all"
3. Two ways to meet your puppy — *In our showroom* / *Imported for you*
4. Your puppy journey — 3 steps with animated WhatsApp-chat illustration
5. Why families trust TeddyPups — 4 points ("puppy passport")
6. Happy families & puppies — testimonial (Sarah M.) + 8-photo wall
7. Questions, answered — 3 FAQ preview
8. Ready to meet your new best friend? — "welcome home" CTA
9. Footer — "Home, at last." + Teddy in basket

## 5. Puppy data (✅ `reference/puppies-summary.json`)

All 15 listings show **Where: Imported for you** and **Available**. The `origin=local` filter therefore yields an empty set in the original (❓ confirm empty-state copy visually). SSR HTML always contains all 15 cards regardless of query string → filtering is client-side after hydration.

## 6. Unverified

- ❓ Breakpoints (only 390 / 1440 values measured; Tailwind defaults assumed 640/768/1024/1280)
- ❓ Lightbox and contact-form selectors (dialog is a native `<dialog>`, not `role="dialog"`; probe could not assert its content)
- ❓ Exact empty-state text for filters; contact form success/validation copy beyond "Message received!"
- ❓ Hover transform on cards (computed transform `none`; only a `translate .6s cubic-bezier(.34,1.56,.64,1) .15s` transition was read)
- ❓ Gone-home image dimensions (AVIF; not parsed)
- 🟡 The pasted third-party audit palette (`#FDF6EC`, `#E67E22`, …) is superseded by the verified tokens in `DESIGN_SYSTEM.md`.
