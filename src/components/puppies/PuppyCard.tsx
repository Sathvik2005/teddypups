'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import { puppyPhoto, hasVideo } from '@/data/puppies';
import type { Puppy } from '@/data/types';
import { cn } from '@/lib/cn';
import { cuePup } from '@/components/mascot/PupActor';
import { PawIcon } from '@/components/ui/parts';

export const puppyMeta = (p: Puppy) => `${p.name !== p.breed ? `${p.breed}, ` : ''}${p.gender}, ${p.age}${hasVideo(p) ? ', with video' : ''}`;

const DOORS = ['#a24a1a', '#5a3a28', '#d98a3d', '#b8604b', '#7a4a2e', '#c2622b'];

/**
 * Arch card. `variant="photo"` (catalogue, related) shows the puppy straight away.
 * `variant="door"` (home rail) starts with the door shut; it swings open on hover / keyboard focus
 * (or, on touch screens, when the rail brings it to the centre — see PuppyRail).
 */
export function PuppyCard({ puppy, index = 0, priority = false, className, variant = 'photo' }: { puppy: Puppy; index?: number; priority?: boolean; className?: string; variant?: 'photo' | 'door' }) {
  const photo = puppyPhoto(puppy);
  return (
    <Link
      href={`/puppies/${puppy.slug}`}
      onPointerEnter={e => e.pointerType === 'mouse' && cuePup({ say: 'coming?' })}
      data-variant={variant}
      className={cn('door-card pup-card group block w-full max-w-[19rem]', className)}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] rounded-b-[1.75rem] border-[3px] border-cocoa bg-honey-soft shadow-[0_6px_0_var(--color-cocoa)] transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_14px_0_var(--color-cocoa)] group-focus-visible:-translate-y-2">
        {photo.kind === 'image' && (
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width:1024px) 19rem, 60vw" priority={priority} className="zoom-img object-cover" style={{ objectPosition: '50% 38%' }} />
        )}
        {variant === 'door' && (
          <span aria-hidden="true" className="door-swing absolute inset-0 z-[5] border-r-[3px] border-cocoa" style={{ background: DOORS[index % DOORS.length] }}>
            <span className="absolute inset-[13%_11%_0] rounded-t-full border-2 border-white/25" />
            <PawIcon className="absolute top-[24%] left-1/2 w-10 -translate-x-1/2 text-white/45" />
            <span className="absolute top-1/2 right-[11%] size-3.5 rounded-full border-2 border-cocoa bg-honey" />
          </span>
        )}
        <span className="badge-available absolute top-[15%] right-2 z-10">Available</span>
        {hasVideo(puppy) && (
          <span className="absolute top-[15%] left-2 z-10 inline-flex items-center gap-1 rounded-full bg-cocoa/85 px-2 py-0.5 text-xs font-semibold text-milk">
            <Play size={11} fill="currentColor" aria-hidden="true" /> video
          </span>
        )}
        <span aria-hidden="true" className="open-pill absolute inset-x-3 bottom-3 z-10 flex translate-y-[140%] items-center justify-between rounded-full bg-cocoa px-4 py-2.5 text-sm font-semibold text-milk transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 [@media(hover:none)]:translate-y-0">
          Meet {puppy.name}
          <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </div>
      <div className="mt-5 text-center">
        <h3 className="h-card text-[1.55rem]">{puppy.name}</h3>
        <p className="mx-auto mt-1 max-w-[16rem] text-sm text-cocoa-soft">{puppyMeta(puppy)}</p>
      </div>
    </Link>
  );
}
