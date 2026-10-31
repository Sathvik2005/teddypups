'use client';

import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import type { FaqItem } from '@/data/types';
import { cn } from '@/lib/cn';

/** Accessible accordion: button inside heading, aria-expanded/controls, animated height + opacity, `inert` when closed. */
export function Accordion({ items, defaultOpen = null }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();
  return (
    <ul className="space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.q} className={cn('rounded-3xl border-[3px] border-cocoa bg-milk transition-shadow duration-300', isOpen ? 'shadow-[0_5px_0_var(--color-cocoa)]' : 'shadow-[0_2px_0_var(--color-cocoa)]')}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                id={`${id}-b${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="font-display flex w-full items-center justify-between gap-4 rounded-3xl px-5 py-4 text-left text-lg font-extrabold md:px-7 md:py-5 md:text-xl"
              >
                {it.q}
                <span className={cn('grid size-8 shrink-0 place-items-center rounded-full bg-honey transition-transform duration-300', isOpen && 'rotate-45')}>
                  <Plus size={18} aria-hidden="true" />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-p${i}`}
              role="region"
              aria-labelledby={`${id}-b${i}`}
              inert={!isOpen}
              className={cn('grid transition-[grid-template-rows,opacity] duration-300 ease-out', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-cocoa-soft md:px-7 md:pb-6">{it.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
