'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Makes `[data-p="pupil"]` highlights inside `ref` glance toward the pointer.
 * One shared pointermove listener + one rAF per frame serves every mascot on the page (no React state).
 */
type Entry = { el: SVGElement; pupils: NodeListOf<SVGGElement> };
const entries = new Set<Entry>();
let pointer = { x: -1, y: -1 };
let scheduled = 0;
let bound = false;

function apply() {
  scheduled = 0;
  for (const { el, pupils } of entries) {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) continue;
    const dx = pointer.x - (r.left + r.width / 2);
    const dy = pointer.y - (r.top + r.height * 0.45);
    const m = Math.hypot(dx, dy) || 1;
    const k = Math.min(3, m / 90);
    pupils.forEach(p => (p.style.transform = `translate(${((dx / m) * k).toFixed(2)}px, ${((dy / m) * k).toFixed(2)}px)`));
  }
}
const onMove = (e: PointerEvent) => {
  pointer = { x: e.clientX, y: e.clientY };
  if (!scheduled) scheduled = requestAnimationFrame(apply);
};

export function useLookAt(ref: RefObject<SVGElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const entry: Entry = { el, pupils: el.querySelectorAll<SVGGElement>('[data-p="pupil"]') };
    entries.add(entry);
    if (!bound) {
      addEventListener('pointermove', onMove, { passive: true });
      bound = true;
    }
    return () => {
      entries.delete(entry);
      if (!entries.size && bound) {
        removeEventListener('pointermove', onMove);
        cancelAnimationFrame(scheduled);
        scheduled = 0;
        bound = false;
      }
    };
  }, [ref, enabled]);
}
