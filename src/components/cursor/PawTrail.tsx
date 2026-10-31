'use client';

import { useEffect, useState } from 'react';
import { cursorEnabled, watchMode } from '@/hooks/cursorMode';

const POOL = 14; // hard cap on live prints
const STRIDE = 56; // px of travel between prints
const MIN_GAP = 70; // ms between prints
const PAW = `<svg viewBox="0 0 64 64" width="16" height="16" fill="currentColor" aria-hidden="true"><ellipse cx="14" cy="28" rx="6" ry="8"/><ellipse cx="27" cy="16" rx="6" ry="9"/><ellipse cx="41" cy="16" rx="6" ry="9"/><ellipse cx="53" cy="28" rx="6" ry="8"/><path d="M32 30c-9 0-17 9-17 17 0 6 5 9 10 8 3-.6 5-1.6 7-1.6s4 1 7 1.6c5 1 10-2 10-8 0-8-8-17-17-17Z"/></svg>`;

function Trail() {
  useEffect(() => {
    const host = document.createElement('div');
    host.setAttribute('aria-hidden', 'true');
    host.dataset.testid = 'paw-trail';
    document.body.appendChild(host);
    const prints = Array.from({ length: POOL }, () => {
      const el = document.createElement('div');
      el.className = 'paw-print';
      el.innerHTML = PAW;
      host.appendChild(el);
      return el;
    });
    let i = 0;
    let side = 1;
    let px = NaN;
    let py = NaN;
    let dist = 0;
    let lastT = 0;
    let paused = !document.hasFocus() || document.hidden;
    const pause = () => {
      paused = true;
      px = NaN;
    };
    const resume = () => (paused = document.hidden);

    const stamp = (x: number, y: number, angle: number) => {
      const el = prints[i++ % POOL];
      el.getAnimations().forEach(a => a.cancel()); // recycle: never more than POOL prints exist
      const rot = (angle * 180) / Math.PI + 90 + (Math.random() * 24 - 12);
      const ox = Math.cos(angle + Math.PI / 2) * 7 * side;
      const oy = Math.sin(angle + Math.PI / 2) * 7 * side;
      side = -side;
      const at = `translate(${(x + ox - 8).toFixed(1)}px, ${(y + oy - 8).toFixed(1)}px) rotate(${rot.toFixed(0)}deg)`;
      el.animate(
        [
          { opacity: 0, transform: `${at} scale(0.6)` },
          { opacity: 0.36, transform: `${at} scale(1)`, offset: 0.14 },
          { opacity: 0.28, transform: `${at} scale(1)`, offset: 0.55 },
          { opacity: 0, transform: `${at} scale(0.45)` },
        ],
        { duration: 1700, easing: 'ease-out', fill: 'both' },
      );
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || paused) return;
      const t = e.target as Element | null;
      if (e.buttons || t?.closest('input, textarea, select, [contenteditable="true"]')) {
        px = NaN; // selecting text / typing: no prints
        return;
      }
      if (Number.isNaN(px)) {
        px = e.clientX;
        py = e.clientY;
        return;
      }
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      dist += Math.hypot(dx, dy);
      const now = performance.now();
      if (dist >= STRIDE && now - lastT >= MIN_GAP) {
        stamp(e.clientX, e.clientY, Math.atan2(dy, dx));
        dist = 0;
        lastT = now;
      }
      px = e.clientX;
      py = e.clientY;
    };
    addEventListener('pointermove', onMove, { passive: true });
    addEventListener('blur', pause);
    addEventListener('focus', resume);
    return () => {
      removeEventListener('pointermove', onMove);
      removeEventListener('blur', pause);
      removeEventListener('focus', resume);
      host.remove();
    };
  }, []);
  return null;
}

/** Soft paw prints behind the pointer: distance + time throttled, pooled (max 14 DOM nodes), pointer-events none. */
export function PawTrail() {
  const [on, setOn] = useState(false);
  useEffect(() => watchMode(cursorEnabled, setOn), []);
  return on ? <Trail /> : null;
}
