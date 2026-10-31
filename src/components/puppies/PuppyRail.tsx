'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Puppy } from '@/data/types';
import { PuppyCard } from './PuppyCard';

/** Horizontal "street of doors": scroll-snap rail on a wooden ground strip. */
export function PuppyRail({ puppies }: { puppies: Puppy[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const by = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <div className="relative mt-10 md:mt-14">
      <ul
        ref={ref}
        role="list"
        aria-label="Available puppies"
        tabIndex={0}
        style={{ scrollPaddingInline: "clamp(1rem,3vw,3rem)" }} className="gutter flex snap-x snap-mandatory gap-6 overflow-x-auto pt-2 [scrollbar-width:none] md:gap-10 [&::-webkit-scrollbar]:hidden"
      >
        {puppies.map((p, i) => (
          <li key={p.slug} className="w-[62vw] max-w-[17rem] shrink-0 snap-start sm:w-[17rem]">
            <PuppyCard puppy={p} index={i} priority={i < 3} />
          </li>
        ))}
        <li aria-hidden="true" className="w-4 shrink-0" />
      </ul>
      <div
        aria-hidden="true"
        className="h-14 border-t-[3px] border-cocoa md:h-20"
        style={{
          background:
            'repeating-linear-gradient(90deg, transparent 0 119px, rgb(142 63 21 / 0.28) 119px 121px), linear-gradient(180deg, #e8ae68, #d99a50)',
        }}
      />
      <div className="pointer-events-none absolute right-4 bottom-2 flex gap-2 md:right-8">
        <button type="button" aria-label="Scroll puppies left" onClick={() => by(-1)} className="btn btn-sm pointer-events-auto bg-milk px-2.5 text-cocoa shadow-[0_3px_0_var(--color-cocoa)]">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button type="button" aria-label="Scroll puppies right" onClick={() => by(1)} className="btn btn-sm pointer-events-auto bg-milk px-2.5 text-cocoa shadow-[0_3px_0_var(--color-cocoa)]">
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
