'use client';

import Image from 'next/image';
import { useState } from 'react';
import { families } from '@/data/families';
import { cn } from '@/lib/cn';
import { Lightbox } from './Lightbox';

/**
 * Photo wall of the 64 happy-family photos. `limit` shows only the first N as tilted "prints" (home page);
 * every button opens the lightbox over the full set of 64.
 */
export function PhotoWall({ limit, variant = 'wall' }: { limit?: number; variant?: 'wall' | 'prints' }) {
  const [open, setOpen] = useState<number | null>(null);
  const shown = limit ? families.slice(0, limit) : families;
  const total = families.length;
  const items = families.map(f => ({ src: f.src, alt: f.alt, width: f.width, height: f.height, caption: f.caption }));

  return (
    <>
      <ul className={cn(variant === 'wall' ? 'columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5' : 'grid grid-cols-2 gap-5 md:grid-cols-4')}>
        {shown.map((f, i) => (
          <li key={f.id} className={cn(variant === 'wall' ? 'mb-4 break-inside-avoid' : '')}>
            <button
              type="button"
              aria-label={`Open photo ${i + 1} of ${total}: ${f.caption}`}
              data-cursor-say="so cute!"
              onClick={() => setOpen(i)}
              className={cn(
                'photo-card group block w-full overflow-hidden border-[3px] border-cocoa bg-milk text-left transition-transform duration-300',
                variant === 'wall' ? 'rounded-2xl hover:-translate-y-1' : 'rounded-md p-2 pb-8 shadow-[0_5px_0_var(--color-cocoa)] hover:-translate-y-1.5',
                variant === 'prints' && (i % 2 ? 'rotate-[2deg]' : '-rotate-[2deg]'),
              )}
            >
              <span className="relative block overflow-hidden rounded-[0.35rem]" style={{ aspectRatio: variant === 'prints' ? '4/5' : `${f.width}/${f.height}`, background: f.color }}>
                <Image src={f.src} alt={f.alt} fill sizes="(min-width:1280px) 20vw, (min-width:640px) 33vw, 50vw" className="zoom-img object-cover" loading={i < 8 ? 'eager' : 'lazy'} />
              </span>
              {variant === 'prints' && <span className="font-hand mt-2 block text-sm leading-tight">{f.caption}</span>}
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </>
  );
}
