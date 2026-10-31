# Interaction Spec

Legend: ✅ read from reference JS/CSS or observed live · 🟡 inferred · ❓ unverified. Code evidence in `reference/js/1wa3jfz4v5w2v.js` (actor engine) and `177ya708_1zuj.js` (action library).

## 1. pup-actor — **correction to earlier briefs**

The "cursor" is **not** a pointer-following circle. It is **Teddy**, an inline-SVG puppy mascot (`.pup-layer > .pup-actor > .pup-actor__body` + `.pup-bubble`) driven by a rAF loop (`s.y.update`):

| Fact | Evidence |
|---|---|
| Layer is `position: fixed`, `z-index: 15`, `pointer-events: none`, `aria-hidden` | computed style ✅ |
| Teddy **walks along "stops"** (`[data-pup-stop]` elements on the page, `data-pose/facing/act/lane`) as the user **scrolls**; position written via `translate3d`, scale via `scale()` | code + live: transform changed (397,519)→(189,671) after 1800px wheel ✅ |
| Pointer: `pointermove` listener (passive) tracks the mouse; Teddy **faces** and **looks at** it (`lookAt`, `face(±1)`); hover on Teddy ⇒ `petting(true)`+wag | code ✅ |
| Click on Teddy runs a random action from a pool without immediate repeats: **jump** (`wheee!` / `boing!` / `yip!`), **woof** (`woof!`), **love** (`I like you!` + hearts), **sneeze** (`achoo!`). Rapid clicks escalate (`zoomies!`, spin) | code ✅ |
| `hm?` = **tilt** action (head cock −14°→12°→0 over 1.6s) triggered by idle `track` stops/click pool for `peek` poses | code ✅ |
| `coming?` = bubble shown when Teddy has **stood still > 2.6 s** while the pointer is away (`ee>2.6`) | code ✅ |
| `peekaboo!` plays once on load if first stop is `peekaboo` (pose peek, looks at first/last lineup friend) | code ✅ |
| Pup leaves paw-print trail (`.pup-prints`, 24 SVG prints, 2.6 s fade, opacity .45) while walking | code ✅ |
| Disabled when `prefers-reduced-motion: reduce` (listens to `change`, tears down) and when fewer than 2 stops | code ✅ |
| Mobile/touch: layer was **visible** at 390px touch emulation (`hidden:false`); pointer handlers only react to `pointerType==="mouse"` | live ✅ |
| Bubble: `.pup-bubble[data-show]`, auto-hides after timeout, anchored left/right of head depending on facing | code ✅ |

Button hover note: the mascot's `hm?` is **not** a bubble attached to the cursor over the "Enquire" button; earlier third-party audit text was an interpretation. ❓ whether any CTA triggers a `pup:cue` custom event (listener `pup:cue` exists; dispatcher `cuePup(detail)` exported).

### Recommended implementation
`PupActor` client component, rAF loop mutating refs (no React state per frame), stops registered through `data-pup-stop`, `pup:cue` CustomEvent API, `matchMedia('(prefers-reduced-motion)')` teardown, `pointer: coarse` → static Teddy. SVG puppy drawn by us.

## 2. Other interactions

| Interaction | Status |
|---|---|
| Mobile menu | ✅ native `<dialog class="tp-menu bg-honey">`, full-screen, big Fraunces links (`tp-menu-link`, staggered via `tp-menu-link` keyframe), 6 links + WhatsApp; opens via button labelled "Menu" (no aria-expanded ❓ — add in clone) |
| Header nav | ✅ 6 links + green WhatsApp pill; transparent header |
| FAQ accordion | ✅ `<h2 class="tp-note__q">` contains button, `aria-expanded` false→true on click |
| Photo wall | ✅ 64 `button[aria-label="Open photo N of 64: <caption>"]` → lightbox (native dialog ❓ prev/next/Esc behaviour not asserted) |
| Catalogue filters | ✅ chips: Everywhere/Imported, breeds, Boys/Girls; client-side; URL params `origin`, `breed` ✅ |
| Puppy page | ✅ gallery "1 / 11 ‹ ›", ▶ for video, previous/next pup links, enquiry form with prefilled message "Hi! I'd love to know more about <name>." and hidden "Website" honeypot field |
| Contact form | ✅ 12-option puppy select; success text "Message received! …" exists in payload. ❓ backend (appears to POST somewhere) — clone must not claim delivery without a backend |
| Card hover | 🟡 `translate .6s cubic-bezier(.34,1.56,.64,1) .15s` (springy overshoot) on `.tp-lineup__pup`; computed transform at rest `none` |
| Scroll reveals | ❓ no `[data-reveal]` / `*reveal*` classes found; section-specific `tp-*` keyframes (step-in, stamp-in, poster-in, msg-in, env-in, curtain-*) are scene animations |
| Skip link | ✅ "Skip to content" → `#main` |

## 3. Keyframes catalogued (✅, 50)
tp-blink-open/shut, box-up, breathe, curtain-cover/lift/rest, doodle-hop, door-open, dot, ear-twitch, env-in, env-post, flag, flap, float, hold-still, house-open, letter-fold, menu-backdrop-out, menu-in, menu-link, menu-out, msg-in, paw-pat, peek, plane-bob, pop-up, poster-in, print-bound, print-step, runner-bob/ear/leg-a/leg-b/wag/x, sent-in, stamp-in, stamp-thump, step-in, sunrise, sun-set, tag-nudge, tag-swing, twinkle.
