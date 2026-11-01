import fs from 'node:fs';
const read = f => fs.readFileSync(f, 'utf8');
const write = (f, s) => fs.writeFileSync(f, s);
const sub = (f, from, to, all = false) => {
  const s = read(f);
  if (!s.includes(from)) throw new Error(`${f}: no match for ${from.slice(0, 80)}`);
  write(f, all ? s.replaceAll(from, to) : s.replace(from, to));
  console.log('patched', f);
};

// fonts: restore preloading for the two faces the first paint needs (removing it caused a 0.3 layout shift); keep the handwriting face lazy
sub('src/app/layout.tsx', "display: 'swap', preload: false })", "display: 'swap' })", false);
let l = read('src/app/layout.tsx');
l = l.replace("Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap', preload: false })", "Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' })");
write('src/app/layout.tsx', l);
console.log('fonts:', (l.match(/preload: false/g) || []).length, 'face(s) with preload off (Shantell only expected)');

// above-the-fold reveals play from the server-rendered HTML
sub('src/components/home/HeroCollage.tsx', '<ImageReveal delay={0.25} className', '<ImageReveal when="load" delay={0.25} className');
sub('src/components/home/HeroCollage.tsx', '<ImageReveal delay={0.4} className', '<ImageReveal when="load" delay={0.4} className');
let p = read('src/components/ui/parts.tsx');
p = p.replaceAll('<ImageReveal className="photo-frame relative aspect-[3/4]', '<ImageReveal when="load" className="photo-frame relative aspect-[3/4]');
p = p.replaceAll('<ImageReveal delay={0.2} className', '<ImageReveal when="load" delay={0.2} className').replaceAll('<ImageReveal delay={0.35} className', '<ImageReveal when="load" delay={0.35} className');
write('src/components/ui/parts.tsx', p);
console.log('patched parts');

// unused motion helpers that pulled in the library
for (const f of ['src/components/motion/Floating.tsx', 'src/components/motion/HoverLift.tsx']) if (fs.existsSync(f)) { fs.rmSync(f); console.log('removed', f); }

// css
let css = read('src/app/globals.css');
css += `
/* ---------- motion without a library: IntersectionObserver-triggered CSS + scroll-driven animations ---------- */
@keyframes tp-sw { from { transform: translateY(112%) rotate(4deg); } to { transform: none; } }
.sw { display: inline-block; }
[data-split]:not([data-in]) .sw { transform: translateY(112%) rotate(4deg); }
[data-split][data-in] .sw { animation: tp-sw 0.8s cubic-bezier(0.2, 0.9, 0.25, 1) both; animation-delay: calc(var(--i, 0) * 75ms + var(--d, 0s)); }

@keyframes tp-wipe-load { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes tp-settle { from { transform: scale(1.18); } to { transform: none; } }
.img-reveal[data-reveal-when='view']:not([data-in]) { clip-path: inset(100% 0 0 0); }
.img-reveal[data-reveal-when='view']:not([data-in]) .img-reveal__inner { transform: scale(1.18); }
.img-reveal[data-reveal-when='view'][data-in] { clip-path: inset(0 0 0 0); transition: clip-path 1s cubic-bezier(0.2, 0.9, 0.25, 1) var(--rd, 0s); }
.img-reveal[data-reveal-when='view'][data-in] .img-reveal__inner { transition: transform 1.4s cubic-bezier(0.2, 0.9, 0.25, 1) var(--rd, 0s); }
.img-reveal[data-reveal-when='load'] { animation: tp-wipe-load 1s cubic-bezier(0.2, 0.9, 0.25, 1) both; animation-delay: var(--rd, 0s); }
.img-reveal[data-reveal-when='load'] .img-reveal__inner { animation: tp-settle 1.4s cubic-bezier(0.2, 0.9, 0.25, 1) both; animation-delay: var(--rd, 0s); }

@keyframes tp-chat-pop { from { opacity: 0; transform: translateY(18px) scale(0.94); } to { opacity: 1; transform: none; } }
.chat-pop { animation: tp-chat-pop 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) both; animation-delay: var(--d, 0s); }

@keyframes tp-parallax { from { transform: translateY(calc(var(--px, 0px) * -1)); } to { transform: translateY(var(--px, 0px)); } }
@keyframes tp-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.scroll-progress { display: none; }
@supports (animation-timeline: view()) {
  .parallax { animation: tp-parallax linear both; animation-timeline: view(); animation-range: cover; }
  .scroll-progress { display: block; position: fixed; inset: 0 0 auto 0; z-index: 70; height: 3px; transform-origin: 0 50%; background: var(--color-toffee); animation: tp-progress linear both; animation-timeline: scroll(root); }
}
@media (prefers-reduced-motion: reduce) {
  [data-split] .sw { transform: none !important; animation: none !important; }
  .img-reveal, .img-reveal .img-reveal__inner { clip-path: none !important; transform: none !important; animation: none !important; transition: none !important; }
  .chat-pop { animation: none !important; }
  .parallax, .scroll-progress { animation: none !important; }
  .scroll-progress { display: none; }
}
`;
write('src/app/globals.css', css);
console.log('css appended');
