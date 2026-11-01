'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/**
 * Fade-up reveal. Content below the fold starts hidden and is shown once by an IntersectionObserver;
 * content already in view (and no-JS / reduced motion) is never hidden.
 * Robust against fast scrolling: anything the visitor has scrolled past (or that sits above the viewport) is shown too,
 * and a timer shows whatever is already on screen if the observer never reports it.
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'hidden' | 'shown'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < innerHeight * 0.92) return;
    setState('hidden');
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setState('shown');
      io.disconnect();
      clearInterval(guard);
    };
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting || e.boundingClientRect.bottom < 0)) show();
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0 },
    );
    io.observe(el);
    // safety net: if it is on screen (or behind us) but the observer has not fired, show it
    const guard = setInterval(() => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top < innerHeight * 0.94) show();
    }, 400);
    return () => {
      done = true;
      io.disconnect();
      clearInterval(guard);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal={state === 'idle' ? undefined : state}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
