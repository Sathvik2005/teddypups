import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Endless ticker. Content is rendered twice for a seamless loop; the copy is aria-hidden so screen readers read it once. */
export function Marquee({ children, className, speed = 38, reverse = false }: { children: ReactNode; className?: string; speed?: number; reverse?: boolean }) {
  return (
    <div className={cn('marquee flex overflow-hidden', className)} style={{ ['--marquee-speed' as string]: `${speed}s` } as React.CSSProperties}>
      {[0, 1].map(i => (
        <div key={i} aria-hidden={i === 1 ? true : undefined} className={cn('marquee-track flex shrink-0 items-center', reverse && '[animation-direction:reverse]')}>
          {children}
        </div>
      ))}
    </div>
  );
}
