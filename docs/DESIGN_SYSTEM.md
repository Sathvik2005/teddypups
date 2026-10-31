# Design System (verified from reference CSS)

Source: `/_next/static/chunks/10jf32vdx50lp.css`, `2gh-2btcjgkih.css` (147 KB), plus computed styles in Edge.

## Colour tokens ✅

| Token | Value | Use |
|---|---|---|
| `--color-milk` | `#fffdf8` | page bg, theme-color, text on dark |
| `--color-cocoa` | `#2a170e` | body text, headings |
| `--color-cocoa-soft` | `#5a3a28` | secondary text |
| `--color-honey` | `#f2be6b` | mobile menu bg, accents, footer link hover |
| `--color-honey-soft` | `#fbe3b4` | soft fills |
| `--color-toffee` | `#c2622b` | accent / script labels |
| `--color-toffee-deep` | `#a24a1a` | primary button bg (computed `rgb(162,74,26)`) |
| `--color-toffee-ink` | `#8e3f15` | text-on-light accent |
| `--color-blush` | `#f9cdbf` | scene/illustration fills |
| `--color-sky` | `#bfddf5` | scene backgrounds |
| `--color-sky-deep` | `#2f6e9e` | scene accents |

Computed (not declared as tokens): header WhatsApp button `#1f7a4d`; footer bg `#24130b`.

## Fonts ✅ (all Google Fonts, variable, `font-display: swap`)

| Role | Family | Weights | CSS var |
|---|---|---|---|
| Display / headings | **Fraunces** | 100–900 (H1 uses 800) | `--font-fraunces`, `--font-display` |
| Body / UI | **Figtree** | 300–900 (buttons 650) | `--font-figtree`, `--font-sans` |
| Handwritten labels | **Shantell Sans** | 300–800 | `--font-shantell`, `--font-hand` |

Classes seen in markup: `font-plush` (display), `font-scrawl` (hand). Implement with `next/font/google` so files are self-hosted at build; no manual font download is needed.

## Type scale ✅

H1 99px/800 (desktop) → 41.6px (390); H2 92.16px → 41.6px; body 17px; nav 16px; buttons 15.2px (header) / 17px (CTA). Both H1/H2 are fluid `clamp()` values — derive exact formula during build by sampling 375/768/1024/1920 (❓ not yet sampled).

## Shape & effect ✅/🟡

- Buttons: `border-radius: 9999px`; header 44px tall, CTA 52px.
- Header: no background/blur/shadow at top (✅); behaviour on scroll ❓.
- Shadows: minimal; ❓ individual values.
- Arched puppy frames, scalloped quilt (`#tp-scallop` SVG pattern), `dashed` lines, wavy dividers, diamond/quilt patterns are SVG/CSS (✅ present; exact geometry to be traced from screenshots during build).

## Illustrations ✅

Teddy the puppy mascot is **inline SVG** (`PupBuddy`, viewBox `0 0 300 240`, groups `data-p="root|shadow|…"`), poses: peek, stand, walk, hop, sit/basket. Scenes (`tp-scene`, `tp-horizon` with sun + skyline path, plane, envelope, stamp, curtain) are CSS/SVG keyframe animations. Reproduce as our own SVG components; do not hotlink.
