'use client';

import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Puppy } from '@/data/types';
import { PuppyCard } from './PuppyCard';

const EDGE = 0.26; // fraction of the rail's width, at each end, that pulls the rail along
const MAX_STEP = 16; // px per frame at the very edge

/**
 * Street of doors. Doors are shut; the one under the pointer swings open (CSS), and moving toward either edge
 * drags the rail along so the next door arrives under the cursor. Touch: the door nearest the centre opens.
 * Keyboard / buttons: arrows scroll by a page; focused cards open.
 */
export function PuppyRail({ puppies }: { puppies: Puppy[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const by = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' });

  // mouse: edge-proximity auto-drag
  useEffect(() => {
    const rail = ref.current;
    if (!rail || !matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = -1;
    let raf = 0;
    const tick = () => {
      const r = rail.getBoundingClientRect();
      const t = (x - r.left) / r.width;
      let step = 0;
      if (t > 1 - EDGE) step = ((t - (1 - EDGE)) / EDGE) * MAX_STEP;
      else if (t < EDGE) step = -((EDGE - t) / EDGE) * MAX_STEP;
      if (step) {
        rail.dataset.drag = 'true'; // suspend scroll-snap while we move it ourselves
        rail.scrollLeft += step;
      }
      raf = requestAnimationFrame(tick);
    };
    const enter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') x = e.clientX;
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      delete rail.dataset.drag; // snap settles on the nearest door
    };
    rail.addEventListener('pointerenter', enter);
    rail.addEventListener('pointermove', move);
    rail.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      rail.removeEventListener('pointerenter', enter);
      rail.removeEventListener('pointermove', move);
      rail.removeEventListener('pointerleave', leave);
    };
  }, []);

  // touch: open the door nearest the middle of the rail
  useEffect(() => {
    const rail = ref.current;
    if (!rail || !matchMedia('(hover: none)').matches) return;
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) e.target.querySelector('.door-card')?.setAttribute('data-open', e.isIntersecting ? 'true' : 'false');
      },
      { root: rail, rootMargin: '0px -34% 0px -34%', threshold: 0.4 },
    );
    rail.querySelectorAll('li[data-door]').forEach(li => io.observe(li));
    return () => io.disconnect();
  }, []);

  return (
    <div className="cv-rail relative mt-12 md:mt-16">
      <ul
        ref={ref}
        role="list"
        aria-label="Available puppies"
        tabIndex={0}
        style={{ scrollPaddingInline: 'clamp(1rem,3vw,3rem)' }}
        className="gutter flex snap-x snap-mandatory gap-6 overflow-x-auto pt-3 pb-6 [scrollbar-width:none] data-[drag=true]:snap-none md:gap-9 [&::-webkit-scrollbar]:hidden"
      >
        {puppies.map((p, i) => (
          <li key={p.slug} data-door className="w-[64vw] max-w-[19rem] shrink-0 snap-start sm:w-[19rem]" style={{ marginTop: i % 2 ? '2.5rem' : 0 }}>
            <PuppyCard puppy={p} index={i} priority={i < 3} variant="door" />
          </li>
        ))}
        <li aria-hidden="true" className="w-4 shrink-0" />
      </ul>
      <div className="gutter mx-auto mt-4 flex max-w-[110rem] items-center justify-between">
        <p className="chapter text-lg text-cocoa-soft">{puppies.length} doors · hover to open, move to the edge to keep going</p>
        <div className="flex gap-3">
          <button type="button" aria-label="Scroll puppies left" onClick={() => by(-1)} className="btn btn-sm bg-milk px-3 text-cocoa shadow-[0_4px_0_var(--color-cocoa)]">
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Scroll puppies right" onClick={() => by(1)} className="btn btn-sm bg-cocoa px-3 text-milk shadow-[0_4px_0_var(--color-toffee)]">
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
