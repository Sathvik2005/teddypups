'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface LightboxItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

/** Native <dialog> lightbox: Esc closes, ←/→ navigate, focus returns to the trigger, counter "n / total". */
export function Lightbox({ items, index, onIndex, onClose }: { items: LightboxItem[]; index: number | null; onIndex: (i: number) => void; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const next = (index! + 1) % items.length;
    const prev = (index! - 1 + items.length) % items.length;
    [next, prev].forEach(i => {
      const img = new window.Image();
      img.src = items[i].src;
    });
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onIndex(next);
      if (e.key === 'ArrowLeft') onIndex(prev);
    };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  }, [open, index, items, onIndex]);

  return (
    <dialog
      ref={ref}
      aria-label="Photo viewer"
      className="tp-lightbox fixed inset-0 m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-milk backdrop:bg-cocoa/90"
      onClose={onClose}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      {item && (
        <div className="relative flex h-full flex-col items-center justify-center gap-3 p-4 pb-6" onClick={e => e.target === e.currentTarget && onClose()}>
          <button type="button" onClick={onClose} aria-label="Close photo viewer" className="btn btn-sm absolute top-4 right-4 z-10 bg-milk text-cocoa">
            <X size={18} aria-hidden="true" /> Close
          </button>
          <div key={index} className="relative h-[72dvh] w-full max-w-5xl animate-[tp-pop_.3s_ease-out]">
            <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" priority />
          </div>
          <p className="min-h-6 text-center text-lg">{item.caption}</p>
          <div className="flex items-center gap-4">
            <button type="button" aria-label="Previous photo" className="btn btn-sm bg-milk text-cocoa" onClick={() => onIndex((index! - 1 + items.length) % items.length)}>
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <p aria-live="polite" className="min-w-20 text-center font-semibold">
              {index! + 1} / {items.length}
            </p>
            <button type="button" aria-label="Next photo" className="btn btn-sm bg-milk text-cocoa" onClick={() => onIndex((index! + 1) % items.length)}>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
