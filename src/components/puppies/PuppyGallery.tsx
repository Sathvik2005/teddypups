'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { PuppyMedia } from '@/data/types';
import { cn } from '@/lib/cn';

export function PuppyGallery({ media, name }: { media: PuppyMedia[]; name: string }) {
  const [i, setI] = useState(0);
  const n = media.length;
  const go = (d: number) => setI(v => (v + d + n) % n);
  const cur = media[i];
  const thumb = (m: PuppyMedia) => (m.kind === 'video' ? m.poster : m.src);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${name} photo gallery`}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      className="rounded-[2rem] outline-offset-4"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border-[3px] border-cocoa bg-honey-soft shadow-[0_6px_0_var(--color-cocoa)] sm:aspect-[4/5]">
        <div key={i} className="absolute inset-0 animate-[tp-pop_.35s_ease-out]">
          {cur.kind === 'image' ? (
            <Image src={cur.src} alt={cur.alt} fill priority sizes="(min-width:1024px) 55vw, 100vw" className="object-contain" />
          ) : (
            <video key={cur.src} src={cur.src} poster={cur.poster} controls playsInline preload="metadata" aria-label={cur.alt} className="h-full w-full object-contain" />
          )}
        </div>
        {n > 1 && (
          <>
            <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className="btn btn-sm absolute top-1/2 left-3 -translate-y-1/2 bg-milk px-2.5 text-cocoa shadow-[0_3px_0_var(--color-cocoa)]">
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next photo" onClick={() => go(1)} className="btn btn-sm absolute top-1/2 right-3 -translate-y-1/2 bg-milk px-2.5 text-cocoa shadow-[0_3px_0_var(--color-cocoa)]">
              <ChevronRight size={20} aria-hidden="true" />
            </button>
            <p aria-live="polite" className="absolute right-3 bottom-3 rounded-full bg-cocoa/85 px-3 py-1 text-sm font-semibold text-milk">
              {i + 1} / {n}
            </p>
          </>
        )}
      </div>
      {n > 1 && (
        <ul className="mt-4 flex gap-2.5 overflow-x-auto pb-2" aria-label="Choose photo">
          {media.map((m, idx) => (
            <li key={m.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show ${m.kind === 'video' ? 'video' : 'photo'} ${idx + 1} of ${n}`}
                aria-current={idx === i}
                className={cn('relative block size-16 overflow-hidden rounded-xl border-[3px] transition-all duration-200 sm:size-20', idx === i ? 'border-toffee-deep' : 'border-cocoa/30 hover:border-cocoa')}
              >
                <Image src={thumb(m)} alt="" fill sizes="5rem" className="object-cover" />
                {m.kind === 'video' && (
                  <span className="absolute inset-0 grid place-items-center bg-cocoa/35 text-milk">
                    <Play size={18} fill="currentColor" aria-hidden="true" />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
