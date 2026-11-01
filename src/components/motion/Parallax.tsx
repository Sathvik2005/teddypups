import type { CSSProperties, ReactNode } from 'react';

/**
 * Moves its child vertically against the scroll, with no JavaScript: a CSS scroll-driven animation (`animation-timeline: view()`).
 * `speed` ≈ px of travel per 100px scrolled (negative = opposite way). Browsers without support simply show it still.
 */
export function Parallax({ children, speed = 0.15, className }: { children: ReactNode; speed?: number; className?: string }) {
  return (
    <div className={className}>
      <div className="parallax" style={{ ['--px' as string]: `${speed * 100}px` } as CSSProperties}>
        {children}
      </div>
    </div>
  );
}
