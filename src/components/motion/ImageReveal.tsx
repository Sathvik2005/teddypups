'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Clip-path wipe-in with a settling zoom, in CSS.
 *  - `when="view"` (default): plays once when it scrolls into view (tiny IntersectionObserver).
 *  - `when="load"`: plays straight away from the server-rendered HTML — for above-the-fold images, so nothing waits on JavaScript.
 */
export function ImageReveal({ children, className, delay = 0, when = 'view', style }: { children: ReactNode; className?: string; delay?: number; when?: 'view' | 'load'; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || when === 'load') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.dataset.in = 'true';
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting || e.boundingClientRect.bottom < 0)) {
          el.dataset.in = 'true';
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [when]);

  return (
    <div ref={ref} data-reveal-when={when} className={cn('img-reveal', className)} style={{ ...style, ['--rd' as string]: `${delay}s` } as CSSProperties}>
      <div className="img-reveal__inner h-full w-full">{children}</div>
    </div>
  );
}
