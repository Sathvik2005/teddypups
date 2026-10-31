# AI tools and prompts

**Tool:** Claude Code (Anthropic), working directly in the repository: reading the reference site's HTML/CSS/JS, writing code, running the app and Playwright, and fixing what the tests and screenshots showed.

The assignment allows any AI tools provided I can explain the workflow. These are the prompts that steered the work, in order. Paste the exact original text from your own Claude Code session history here before submitting the Loom (the session transcript is the source of truth; below is a faithful summary of each).

| # | Prompt (summary) | Result |
|---|---|---|
| 1 | Master context: clone puppy.instabizweb.com for the Insta Biz Web assignment — Next.js/TS/Tailwind/Framer Motion, all routes, pup-actor cursor (`hm?`, `achoo!`, `coming?`), animations, tests, GitHub, Vercel, handover docs. Do not fabricate reference details; label assumptions. | Plan, phased tracker |
| 2 | Task 01: research only — inspect repo and reference at six viewports, extract fonts/colours/assets, investigate the cursor, write seven docs, then stop for approval. | `docs/`, `reference/`, 156 assets |
| 3 | "Let's start building then." | Foundation + all routes |
| 4 | "Design this in a cute manner": mascots (Mochi, Biscuit, Coco, Teddy), PupCursor, paw trail, floating decorations, empty/loading states, dog-only, performance and accessibility rules, tests. | Mascot system, cursor, trail, decorations |
| 5 | "Steps 1 to 3 (commit ready to deploy)": visual comparison, QA tests, README/handover. | This commit |

## What I checked myself
- Verified tokens and fonts against the reference CSS rather than trusting pasted estimates (the pasted audit palette was wrong).
- Found by reading the reference JS that its "cursor" is a scroll-driven walking mascot, and changed the plan accordingly.
- Reviewed screenshots of the hero, door cards, mascot crew and footer against the reference.
