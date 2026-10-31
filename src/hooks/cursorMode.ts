/**
 * When do the puppy cursor and paw trail run?
 *  - a mouse-like pointer exists (`any-pointer: fine` + `any-hover: hover`, so touch laptops still count) and the viewport is ≥640px
 *  - AND the visitor has not asked for less motion — unless they explicitly switched the puppy ON with the footer toggle.
 * Touch events are ignored by the engines themselves (they only react to `pointerType === 'mouse'`).
 */
export const FINE_QUERY = '(any-pointer: fine) and (any-hover: hover) and (min-width: 640px)';
export const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

const KEY = 'tp-pup-cursor';
const EVENT = 'pup:cursor-pref';

export type CursorPref = 'on' | 'off' | null;

export function getCursorPref(): CursorPref {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'on' || v === 'off' ? v : null;
  } catch {
    return null;
  }
}

export function setCursorPref(v: CursorPref) {
  try {
    if (v) localStorage.setItem(KEY, v);
    else localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable — the in-memory event below still updates this tab */
  }
  window.dispatchEvent(new Event(EVENT));
}

export const hasFinePointer = () => matchMedia(FINE_QUERY).matches;

export function cursorEnabled() {
  if (!hasFinePointer()) return false;
  const pref = getCursorPref();
  if (pref === 'off') return false;
  if (pref === 'on') return true; // explicit opt-in beats the reduced-motion default
  return !matchMedia(REDUCED_QUERY).matches;
}

/** Walking Teddy: the companion for touch / small screens. Never for reduced motion, never alongside the cursor. */
export const walkerEnabled = () => !matchMedia(REDUCED_QUERY).matches && !hasFinePointer();

/** Subscribe to a media/preference-derived boolean. Calls `cb` immediately and on every change; returns an unsubscribe. */
export function watchMode(read: () => boolean, cb: (on: boolean) => void) {
  const lists = [matchMedia(FINE_QUERY), matchMedia(REDUCED_QUERY)];
  const f = () => cb(read());
  lists.forEach(l => l.addEventListener('change', f));
  window.addEventListener(EVENT, f);
  window.addEventListener('storage', f);
  f();
  return () => {
    lists.forEach(l => l.removeEventListener('change', f));
    window.removeEventListener(EVENT, f);
    window.removeEventListener('storage', f);
  };
}
