/** The custom puppy cursor + paw trail run only for a fine, hovering pointer on a ≥768px viewport without reduced motion. */
export const FINE_QUERY = '(pointer: fine) and (hover: hover) and (min-width: 768px)';
export const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

export const cursorEnabled = () => matchMedia(FINE_QUERY).matches && !matchMedia(REDUCED_QUERY).matches;
export const walkerEnabled = () => !matchMedia(REDUCED_QUERY).matches && !matchMedia(FINE_QUERY).matches;

/** Subscribe to a media-derived boolean. Calls `cb` immediately and on every change; returns an unsubscribe. */
export function watchMode(read: () => boolean, cb: (on: boolean) => void) {
  const lists = [matchMedia(FINE_QUERY), matchMedia(REDUCED_QUERY)];
  const f = () => cb(read());
  lists.forEach(l => l.addEventListener('change', f));
  f();
  return () => lists.forEach(l => l.removeEventListener('change', f));
}
