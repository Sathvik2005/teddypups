'use client';

import { useEffect, useRef, useState } from 'react';
import { cursorEnabled, watchMode } from '@/hooks/cursorMode';
import { CursorReaction, type CursorState } from './CursorReaction';

interface Reaction {
  state: CursorState;
  say?: string;
}

const FORM = 'input, textarea, select, [contenteditable="true"], [data-cursor="off"]';

/** What the puppy should do for the element under the pointer. Nested children resolve to the same result, so there is no flicker. */
export function reactionFor(el: Element | null): Reaction {
  if (!el) return { state: 'idle' };
  if (el.closest(FORM)) return { state: 'hidden' };
  const tagged = el.closest<HTMLElement>('[data-cursor-say]');
  if (tagged) return { state: 'happy', say: tagged.dataset.cursorSay };
  if (el.closest('.pup-card, .door-card')) return { state: 'coming', say: 'coming?' };
  if (el.closest('a[href*="wa.me"]')) return { state: 'happy', say: 'woof!' };
  if (el.closest('.btn')) return { state: 'happy', say: 'boop!' };
  if (el.closest('a, button, [role="button"], summary')) return { state: 'happy' };
  return { state: 'idle' };
}

function Engine() {
  const rootRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const [view, setView] = useState<{ state: CursorState; say: string }>({ state: 'idle', say: '' });

  useEffect(() => {
    const root = rootRef.current!;
    const face = faceRef.current!;
    let tx = -100,
      ty = -100,
      x = -100,
      y = -100,
      vx = 0,
      vy = 0;
    let seen = false;
    let lastMove = performance.now();
    let restSaid = false;
    let hover: Reaction = { state: 'idle' };
    let current = 'idle|';
    let timer = 0;
    let raf = 0;
    let last = performance.now();

    const show = (r: Reaction, ttl = 0) => {
      const key = `${r.state}|${r.say ?? ''}`;
      if (key !== current) {
        current = key;
        setView({ state: r.state, say: r.say ?? '' });
      }
      clearTimeout(timer);
      if (ttl) timer = window.setTimeout(() => show(hover), ttl);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX + 24;
      ty = e.clientY + 22;
      if (!seen) {
        seen = true;
        x = tx;
        y = ty;
        root.dataset.on = 'true';
        // the pointer may already be over something (e.g. engine mounted after hydration)
        hover = reactionFor(e.target as Element);
        show(hover);
      }
      lastMove = performance.now();
      if (restSaid) {
        restSaid = false;
        if (current === 'idle|hm?') show(hover);
      }
    };
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      hover = reactionFor(e.target as Element);
      show(hover);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      if ((e.target as Element).closest(FORM)) return;
      show({ state: 'sneeze', say: 'achoo!' }, 900);
    };
    const onLeave = () => {
      root.dataset.on = 'false';
      seen = false;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      // damped spring toward the pointer: gives a soft trailing lag with a hint of overshoot
      const K = 190;
      const C = 20;
      vx += ((tx - x) * K - vx * C) * dt;
      vy += ((ty - y) * K - vy * C) * dt;
      x += vx * dt;
      y += vy * dt;
      root.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      face.style.rotate = `${Math.max(-16, Math.min(16, vx / 55)).toFixed(1)}deg`;
      if (seen && !restSaid && now - lastMove > 1100 && current === 'idle|') {
        restSaid = true;
        show({ state: 'idle', say: 'hm?' }, 2400);
      }
      raf = requestAnimationFrame(frame);
    };

    addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    addEventListener('pointerdown', onDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(frame);
    document.documentElement.dataset.pupCursor = 'on';

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      delete document.documentElement.dataset.pupCursor;
    };
  }, []);

  return (
    <div ref={rootRef} className="pup-cursor" data-testid="pup-cursor" data-on="false" data-state={view.state} aria-hidden="true">
      <CursorReaction state={view.state} say={view.say} faceRef={faceRef} bubbleRef={bubbleRef} />
    </div>
  );
}

export function PupCursor() {
  const [on, setOn] = useState(false);
  useEffect(() => watchMode(cursorEnabled, setOn), []);
  return on ? <Engine /> : null;
}
