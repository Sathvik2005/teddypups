'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { puppyPhoto, hasVideo } from '@/data/puppies';
import type { Puppy } from '@/data/types';
import { cn } from '@/lib/cn';
import { cuePup } from '@/components/mascot/PupActor';

const DOORS = ['#a24a1a', '#5a3a28', '#d98a3d', '#b8604b', '#7a4a2e', '#c2622b'];

export const puppyMeta = (p: Puppy) => `${p.name !== p.breed ? `${p.breed}, ` : ''}${p.gender}, ${p.age}${hasVideo(p) ? ', with video' : ''}`;

export function PuppyCard({ puppy, index = 0, priority = false, className }: { puppy: Puppy; index?: number; priority?: boolean; className?: string }) {
  const photo = puppyPhoto(puppy);
  const door = DOORS[index % DOORS.length];
  return (
    <Link
      href={`/puppies/${puppy.slug}`}
      aria-label={`Meet ${puppy.name}, ${puppy.breed}`}
      onPointerEnter={e => e.pointerType === 'mouse' && cuePup({ say: 'coming?' })}
      className={cn('door-card pup-card group flex flex-col items-center text-center', className)}
    >
      <h3 className="h-card min-h-[2.2em] text-[1.45rem] md:text-[1.6rem]">{puppy.name}</h3>
      <p className="mt-1 mb-3 max-w-[16rem] text-sm text-cocoa-soft">{puppyMeta(puppy)}</p>
      <div className="arch relative aspect-[3/4] w-full max-w-[17rem]">
        {photo.kind === 'image' && (
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width:1024px) 17rem, 45vw" priority={priority} className="zoom-img object-cover" style={{ objectPosition: '50% 40%' }} />
        )}
        <div className="door-swing absolute inset-0 border-r-[3px] border-cocoa" style={{ background: door }}>
          <div className="absolute inset-[14%_12%_0] rounded-t-full border-2 border-white/25" />
          <svg viewBox="0 0 64 64" aria-hidden="true" className="absolute top-[22%] left-1/2 w-9 -translate-x-1/2 text-white/45" fill="currentColor">
            <ellipse cx="14" cy="28" rx="6" ry="8" />
            <ellipse cx="27" cy="16" rx="6" ry="9" />
            <ellipse cx="41" cy="16" rx="6" ry="9" />
            <ellipse cx="53" cy="28" rx="6" ry="8" />
            <path d="M32 30c-9 0-17 9-17 17 0 6 5 9 10 8 3-.6 5-1.6 7-1.6s4 1 7 1.6c5 1 10-2 10-8 0-8-8-17-17-17Z" />
          </svg>
          <span className="absolute top-1/2 right-[12%] size-3 rounded-full border-2 border-cocoa bg-honey" />
        </div>
        <span className="badge-available absolute top-[14%] right-2 z-10">Available</span>
        {hasVideo(puppy) && (
          <span className="absolute bottom-2 left-2 z-10 inline-flex items-center gap-1 rounded-full bg-cocoa/80 px-2 py-0.5 text-xs font-semibold text-milk">
            <Play size={11} fill="currentColor" aria-hidden="true" /> video
          </span>
        )}
      </div>
    </Link>
  );
}
