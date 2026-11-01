'use client';

import Image from 'next/image';
import { useState } from 'react';
import { families } from '@/data/families';
import type { FamilyPhoto } from '@/data/types';
import { cn } from '@/lib/cn';
import { Parallax } from '@/components/motion/Parallax';
import { Lightbox } from './Lightbox';

const SPEEDS = [0.1, -0.14, 0.08];

/**
 * The happy-family photos. `wall` = dense masonry of all 64 (its own page); `collage` = `limit` photos in three
 * parallax columns (home page). Every photo is a button that opens the lightbox over the full set of 64.
 */
export function PhotoWall({ limit, variant = 'wall' }: { limit?: number; variant?: 'wall' | 'collage' }) {
  const [open, setOpen] = useState<number | null>(null);
  const shown = limit ? families.slice(0, limit) : families;
  const total = families.length;
  const items = families.map(f => ({ src: f.src, alt: f.alt, width: f.width, height: f.height, caption: f.caption }));

  const photo = (f: FamilyPhoto, i: number) => (
    <button
      type="button"
      aria-label={`Open photo ${i + 1} of ${total}: ${f.caption}`}
      data-cursor-say="so cute!"
      onClick={() => setOpen(i)}
      className={cn(
        'photo-card group block w-full overflow-hidden border-[3px] border-cocoa bg-milk text-left transition-[transform,box-shadow] duration-500',
        variant === 'wall' ? 'rounded-2xl hover:-translate-y-1' : 'rounded-[1.5rem] shadow-[0_6px_0_var(--color-cocoa)] hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_12px_0_var(--color-cocoa)]',
        variant === 'collage' && (i % 2 ? 'rotate-[1.6deg]' : '-rotate-[1.6deg]'),
      )}
    >
      <span className="relative block overflow-hidden" style={{ aspectRatio: `${f.width}/${f.height}`, background: f.color }}>
        <Image src={f.src} alt={f.alt} fill sizes="(min-width:1280px) 22vw, (min-width:640px) 33vw, 50vw" className="zoom-img object-cover" loading={variant === 'wall' && i < 8 ? 'eager' : 'lazy'} />
      </span>
    </button>
  );

  return (
    <>
      {variant === 'wall' ? (
        <ul className="columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5">
          {shown.map((f, i) => (
            <li key={f.id} className="mb-4 break-inside-avoid">
              {photo(f, i)}
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7">
          {[0, 1, 2].map(c => (
            <Parallax key={c} speed={SPEEDS[c]} className={cn(c === 1 && 'pt-14 md:pt-28', c === 2 && 'hidden md:block')}>
              <ul className="space-y-4 md:space-y-7">
                {shown.map((f, i) => (i % 3 === c ? <li key={f.id}>{photo(f, i)}</li> : null))}
              </ul>
            </Parallax>
          ))}
        </div>
      )}
      <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </>
  );
}
