'use client';

import { useEffect, useState } from 'react';
import { cursorEnabled, hasFinePointer, REDUCED_QUERY, setCursorPref, watchMode } from '@/hooks/cursorMode';
import { PawIcon } from '@/components/ui/parts';

/**
 * Footer switch for the puppy cursor. Only rendered where a mouse exists.
 * Default follows `prefers-reduced-motion`; flipping it on is an explicit opt-in that overrides that default.
 */
export function CursorToggle() {
  const [fine, setFine] = useState(false);
  const [on, setOn] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const stop = watchMode(cursorEnabled, v => {
      setOn(v);
      setFine(hasFinePointer());
      setReduced(matchMedia(REDUCED_QUERY).matches);
    });
    return stop;
  }, []);

  if (!fine) return null;
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setCursorPref(on ? 'off' : 'on')}
      className="inline-flex items-center gap-2 rounded-full border border-milk/30 bg-milk/10 px-3.5 py-1.5 text-sm font-semibold text-milk transition-colors duration-200 hover:border-honey hover:bg-honey hover:text-cocoa"
    >
      <PawIcon className="size-3.5" />
      Puppy cursor: {on ? 'on' : 'off'}
      {!on && reduced && <span className="font-normal text-milk/70"> (reduced motion)</span>}
    </button>
  );
}
