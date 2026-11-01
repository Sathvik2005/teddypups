import fs from 'node:fs';
const read = f => fs.readFileSync(f, 'utf8');
const write = (f, s) => fs.writeFileSync(f, s);
const sub = (f, from, to) => {
  const s = read(f);
  if (!s.includes(from)) throw new Error(`${f}: no match for ${from.slice(0, 80)}`);
  write(f, s.replace(from, to));
  console.log('patched', f);
};

// css: server-side friendly entrance animations
let css = read('src/app/globals.css');
css += `
/* ---------- CSS-only entrances (visible in the server-rendered HTML; no JS needed for first paint) ---------- */
@keyframes tp-page-in { from { opacity: 0.6; transform: translateY(14px); } to { opacity: 1; transform: none; } }
.page-enter { animation: tp-page-in 0.45s cubic-bezier(0.2, 0.9, 0.25, 1) both; }
@keyframes tp-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
.rise { animation: tp-rise 0.65s cubic-bezier(0.2, 0.9, 0.25, 1) both; animation-delay: var(--d, 0s); }
@keyframes tp-word { from { transform: translateY(112%) rotate(4deg); } to { transform: none; } }
.word { display: inline-block; animation: tp-word 0.7s cubic-bezier(0.2, 0.9, 0.25, 1) both; animation-delay: calc(var(--i, 0) * 55ms + var(--d, 0s)); }
@media (prefers-reduced-motion: reduce) { .page-enter, .rise, .word { animation: none !important; } }
`;
write('src/app/globals.css', css);

// hero: the big arch is the LCP image on desktop, so it must not wait on a reveal animation
sub('src/components/home/HeroCollage.tsx', `<ImageReveal className="photo-frame relative h-[min(100%,34rem)] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-honey-soft" style={{ aspectRatio: '4/5' }}>
            <Image src={big.src} alt={big.alt} fill priority sizes="(min-width:1024px) 30vw, 70vw" className="object-cover" style={{ objectPosition: '50% 38%' }} />
          </ImageReveal>`, `<div className="photo-frame relative h-[min(100%,34rem)] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-honey-soft" style={{ aspectRatio: '4/5' }}>
            <Image src={big.src} alt={big.alt} fill priority fetchPriority="high" sizes="(min-width:1024px) 30vw, 70vw" className="object-cover" style={{ objectPosition: '50% 38%' }} />
          </div>`);

// photo collage on the home page is far below the fold: lazy; the dense wall keeps its first rows eager
sub('src/components/gallery/PhotoWall.tsx', "loading={i < 8 ? 'eager' : 'lazy'}", "loading={variant === 'wall' && i < 8 ? 'eager' : 'lazy'}");
