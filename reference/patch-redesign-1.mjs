import fs from 'node:fs';
let css = fs.readFileSync('src/app/globals.css', 'utf8');
if (!css.includes('tp-marquee')) {
  css += `
/* ---------- redesign: marquee, seal, editorial helpers ---------- */
@keyframes tp-marquee { to { transform: translateX(-100%); } }
.marquee-track { animation: tp-marquee var(--marquee-speed, 38s) linear infinite; min-width: 100%; justify-content: space-around; }
.marquee:hover .marquee-track { animation-play-state: paused; }
@keyframes tp-spin { to { transform: rotate(360deg); } }
.spin-slow { animation: tp-spin 22s linear infinite; }
.text-giant { font-size: clamp(3.2rem, 1rem + 11vw, 11rem); line-height: 0.88; letter-spacing: -0.03em; }
.chapter { font-family: var(--font-hand); font-weight: 600; letter-spacing: 0.02em; }
.photo-frame { border: 3px solid var(--color-cocoa); box-shadow: 0 8px 0 var(--color-cocoa); }
@media (prefers-reduced-motion: reduce) { .marquee-track, .spin-slow { animation: none !important; } }
`;
  fs.writeFileSync('src/app/globals.css', css);
}
let l = fs.readFileSync('src/app/layout.tsx', 'utf8');
if (!l.includes('ScrollProgress')) {
  l = l.replace("import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';", "import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';\nimport { ScrollProgress } from '@/components/motion/ScrollProgress';");
  l = l.replace('<Header />', '<ScrollProgress />\n        <Header />');
  fs.writeFileSync('src/app/layout.tsx', l);
}
console.log('ok', css.includes('tp-marquee'), l.includes('<ScrollProgress />'));
