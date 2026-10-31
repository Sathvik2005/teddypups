# Deployment Plan

Target: GitHub account `Sathvik2005` (new repository) → Vercel. **Not started** — waiting for build approval.

## Pre-flight (before any push)
1. `npm run lint && npm run typecheck && npm run build && npm test` all green.
2. `.gitignore`: `node_modules`, `.next`, `.env*`, `test-results`, `playwright-report`, `reference/screenshots` (large), `reference/js`, `reference/*.html`.
3. Repo size check: `public/images` is ~65 MB (well under GitHub limits; videos are small mp4s). Consider `next/image` only for jpg/webp/avif; serve mp4 as static.
4. No secrets exist. `.env.example` documents `NEXT_PUBLIC_SITE_URL` and optional `NEXT_PUBLIC_WHATSAPP_NUMBER`.
5. `next.config`: allow AVIF/WebP, no remote image domains needed (all assets local).

## GitHub (needs user action)
- Authenticate `gh` (`gh auth login`, run by the user via `! gh auth login`) — I never ask for passwords/tokens.
- `gh repo create Sathvik2005/<repo-name> --public --source . --push` after user confirms the repo name and visibility.
- Commit history: scaffold → tokens/layout → home → catalogue/detail → galleries/pages → mascot/motion → tests → docs.

## Vercel (needs user action)
- Either `npx vercel login` (user runs it) then `vercel --prod`, or import the GitHub repo in the Vercel dashboard.
- Framework preset: Next.js; Node 20+; no build env vars required.

## Post-deploy verification
Open the public URL; check all 8 route types + 15 puppy pages, filters, lightbox, FAQ, mobile menu at 390px, Teddy interactions, images 200 (no broken), console/network clean, `sitemap.xml`, `robots.txt`, OG tags. Only then report the verified URLs.

## Handover
README (setup, scripts, structure), prompts log, AI tools used, known limitations (photos are third-party; Teddy is an original redraw), Loom outline.
