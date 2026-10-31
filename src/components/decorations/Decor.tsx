import { cn } from '@/lib/cn';

export type DecorKind = 'bone' | 'paw' | 'heart' | 'star' | 'ball' | 'cloud' | 'treat';

const INK = '#2a170e';

/** Little illustrated props in the same style as the mascots (3px cocoa stroke, warm fills). */
const SHAPES: Record<DecorKind, React.ReactNode> = {
  bone: (
    <svg viewBox="0 0 64 28" aria-hidden="true">
      <path d="M14 6a6 6 0 1 0-8 8 6 6 0 1 0 8 8h36a6 6 0 1 0 8-8 6 6 0 1 0-8-8H14Z" fill="#fff6e6" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" transform="translate(0 -1) scale(.97 .97) translate(1 1)" />
    </svg>
  ),
  paw: (
    <svg viewBox="0 0 64 64" aria-hidden="true" fill="#c2622b">
      <ellipse cx="14" cy="28" rx="6" ry="8" />
      <ellipse cx="27" cy="16" rx="6" ry="9" />
      <ellipse cx="41" cy="16" rx="6" ry="9" />
      <ellipse cx="53" cy="28" rx="6" ry="8" />
      <path d="M32 30c-9 0-17 9-17 17 0 6 5 9 10 8 3-.6 5-1.6 7-1.6s4 1 7 1.6c5 1 10-2 10-8 0-8-8-17-17-17Z" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 48 44" aria-hidden="true">
      <path d="M24 40C6 28 3 17 9 10c5-5 13-3 15 3 2-6 10-8 15-3 6 7 3 18-15 30Z" fill="#f4a08a" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="m24 5 5.2 11.6 12.6 1.3-9.4 8.5 2.7 12.4L24 32.4 12.9 38.8l2.7-12.4-9.4-8.5 12.6-1.3Z" fill="#f2be6b" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  ),
  ball: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="19" fill="#d8e85a" stroke={INK} strokeWidth="2.6" />
      <path d="M8 14c9 4 9 16 0 20M40 14c-9 4-9 16 0 20" fill="none" stroke="#fffdf8" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 80 40" aria-hidden="true">
      <path d="M18 34a12 12 0 0 1-1-24 15 15 0 0 1 28-3 13 13 0 0 1 20 9 10 10 0 0 1-2 18Z" fill="#fffdf8" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  ),
  treat: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 5c7 0 7 8 13 8 5 0 8 6 5 11-2 4 1 7-1 11-3 6-9 3-17 8-8-5-14-2-17-8-2-4 1-7-1-11-3-5 0-11 5-11 6 0 6-8 13-8Z" fill="#e8ae68" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
      <circle cx="19" cy="22" r="2" fill={INK} opacity=".5" />
      <circle cx="29" cy="27" r="2" fill={INK} opacity=".5" />
      <circle cx="21" cy="33" r="2" fill={INK} opacity=".5" />
    </svg>
  ),
};

export interface DecorItem {
  kind: DecorKind;
  /** position as CSS values, e.g. { left: '6%', top: '20%' } */
  at: React.CSSProperties;
  /** width in rem */
  size?: number;
  rotate?: number;
  delay?: number;
  duration?: number;
  opacity?: number;
  sway?: boolean;
  /** hide below this breakpoint to keep small screens clean */
  hideBelow?: 'sm' | 'md' | 'lg';
}

const HIDE = { sm: 'hidden sm:block', md: 'hidden md:block', lg: 'hidden lg:block' } as const;

/** Decorative only: aria-hidden, pointer-events none, no layout impact (absolute). */
export function Decor({ items, className }: { items: DecorItem[]; className?: string }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {items.map((d, i) => (
        <span
          key={i}
          className={cn('decor', d.sway && 'decor-sway', d.hideBelow && HIDE[d.hideBelow])}
          style={{ ...d.at, width: `${d.size ?? 2.6}rem`, ['--r' as string]: `${d.rotate ?? 0}deg`, ['--d' as string]: `${d.delay ?? i * 0.25}s`, ['--dur' as string]: `${d.duration ?? 5 + (i % 3)}s`, ['--o' as string]: d.opacity ?? 0.9 } as React.CSSProperties}
        >
          {SHAPES[d.kind]}
        </span>
      ))}
    </div>
  );
}
