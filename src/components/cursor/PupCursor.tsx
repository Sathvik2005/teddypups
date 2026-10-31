'use client';

import { useEffect, useRef, useState } from 'react';
import { cursorEnabled, watchMode } from '@/hooks/cursorMode';
import { PawIcon } from '@/components/ui/parts';
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

// chase tuning
const REST = 40; // px: the puppy stops this far from the pointer, like a pup waiting beside you
const K = 58; // spring stiffness (soft, so it lags and overshoots a little)
const C = 9.5; // damping (< critical 15 ⇒ playful overshoot)
const MAX_SPEED = 1500;

function Engine() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const patRef = useRef<HTMLSpanElement>(null);
  const [view, setView] = useState<{ state: CursorState; say: string }>({ state: 'idle', say: '' });

  useEffect(() => {
    const root = rootRef.current!;
    const tilt = tiltRef.current!;
    const face = tilt.firstElementChild as HTMLElement;
    const pat = patRef.current!;
    let px = -200,
      py = -200; // pointer
    let x = -200,
      y = -200,
      vx = 0,
      vy = 0; // puppy (feet position)
    let seen = false;
    let paused = document.hidden;
    let lastMove = performance.now();
    let restSaid = false;
    let hover: Reaction = { state: 'idle' };
    let current = 'idle|';
    let timer = 0;
    let raf = 0;
    let last = performance.now();
    let facing = 1;
    let prevSign = 0;
    let wasRunning = false;
    let calmSince = 0;
    let skidUntil = 0;

    const show = (r: Reaction, ttl = 0) => {
      const key = `${r.state}|${r.say ?? ''}`;
      if (key !== current) {
        current = key;
        setView({ state: r.state, say: r.say ?? '' });
      }
      clearTimeout(timer);
      if (ttl) timer = window.setTimeout(() => show(hover), ttl);
    };
    const kick = (name: 'skid' | 'settle', ms: number) => {
      face.dataset.kick = name;
      skidUntil = performance.now() + ms;
      setTimeout(() => {
        if (performance.now() >= skidUntil - 20) delete face.dataset.kick;
      }, ms);
    };
    const sync = () => {
      root.dataset.on = seen && !paused ? 'true' : 'false';
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      px = e.clientX;
      py = e.clientY;
      if (!seen) {
        seen = true;
        x = px - REST;
        y = py + 18; // pops in just behind the pointer
        // the pointer may already be over something (e.g. the engine mounted after hydration)
        hover = reactionFor(e.target as Element);
        show(hover);
      }
      lastMove = performance.now();
      sync();
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
      // a paw "pat" where you clicked, and an achoo from the puppy
      pat.style.transform = `translate(${e.clientX - 14}px, ${e.clientY - 14}px)`;
      pat.firstElementChild?.getAnimations().forEach(a => a.cancel());
      pat.firstElementChild?.animate(
        [
          { opacity: 0.85, transform: 'scale(0.4) rotate(-14deg)' },
          { opacity: 0.85, transform: 'scale(1.25) rotate(8deg)', offset: 0.35 },
          { opacity: 0, transform: 'scale(1) rotate(8deg)' },
        ],
        { duration: 560, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'both' },
      );
      show({ state: 'sneeze', say: 'achoo!' }, 900);
    };
    const onLeave = () => {
      seen = false;
      sync();
    };
    const pause = () => {
      paused = true;
      sync();
    };
    const resume = () => {
      paused = false;
      sync();
    };
    const onVis = () => (document.hidden ? pause() : document.hasFocus() && resume());

    const frame = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const t = now / 1000;

      // chase: spring toward a ring of radius REST around the pointer (a pup waiting beside you, not on top of you)
      const dx = px - x;
      const dy = py - y;
      const dist = Math.hypot(dx, dy) || 1;
      // …and if momentum carries it inside the ring, nudge it back out (softer), so it never ends up sitting on the pointer
      const err = dist - REST;
      const pull = Math.abs(err) < 4 ? 0 : err > 0 ? err * K : err * K * 0.6;
      vx += ((dx / dist) * pull - vx * C) * dt;
      vy += ((dy / dist) * pull - vy * C) * dt;
      const sp = Math.hypot(vx, vy);
      if (sp > MAX_SPEED) {
        vx *= MAX_SPEED / sp;
        vy *= MAX_SPEED / sp;
      }
      x += vx * dt;
      y += vy * dt;

      const speed = Math.hypot(vx, vy);
      const running = speed > 90;

      // heading: face the way we're going; when waiting, face the pointer
      if (Math.abs(vx) > 40) facing = vx > 0 ? 1 : -1;
      else if (Math.abs(dx) > 14) facing = dx > 0 ? 1 : -1;

      // sharp reversal ⇒ little skid; stopping after a run ⇒ settle (squash + wag)
      const sign = Math.abs(vx) > 160 ? Math.sign(vx) : 0;
      if (sign && prevSign && sign !== prevSign) kick('skid', 360);
      if (sign) prevSign = sign;
      if (running) {
        wasRunning = true;
        calmSince = 0;
      } else if (wasRunning) {
        calmSince = calmSince || now;
        if (now - calmSince > 160) {
          wasRunning = false;
          kick('settle', 520);
        }
      }

      const bounce = running ? Math.abs(Math.sin(t * 15)) * 7 * Math.min(1, speed / 420) : Math.sin(t * 2.4) * 1.3;
      const lean = Math.max(-20, Math.min(20, vx / 42)) + (running ? Math.sin(t * 15) * 3 : 0);
      const pitch = Math.max(-6, Math.min(6, vy / 90));
      root.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      tilt.style.transform = `translateY(${(-bounce).toFixed(2)}px) scaleX(${facing}) rotate(${(lean * facing + pitch * facing).toFixed(1)}deg)`;
      root.dataset.motion = running ? 'run' : 'idle';

      if (seen && !paused && !restSaid && now - lastMove > 1100 && current === 'idle|') {
        restSaid = true;
        show({ state: 'idle', say: 'hm?' }, 2400);
      }
      raf = requestAnimationFrame(frame);
    };

    addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    addEventListener('pointerdown', onDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    addEventListener('blur', pause);
    addEventListener('focus', resume);
    document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(frame);
    document.documentElement.dataset.pupCursor = 'on'; // enables the paw-shaped cursor image (see globals.css)

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      removeEventListener('blur', pause);
      removeEventListener('focus', resume);
      document.removeEventListener('visibilitychange', onVis);
      delete document.documentElement.dataset.pupCursor;
    };
  }, []);

  return (
    <>
      <div ref={rootRef} className="pup-cursor" data-testid="pup-cursor" data-on="false" data-motion="idle" data-state={view.state} aria-hidden="true">
        <CursorReaction state={view.state} say={view.say} tiltRef={tiltRef} bubbleRef={bubbleRef} />
      </div>
      <span ref={patRef} className="pup-pat" data-testid="pup-pat" aria-hidden="true">
        <PawIcon className="size-7 text-toffee" />
      </span>
    </>
  );
}

export function PupCursor() {
  const [on, setOn] = useState(false);
  useEffect(() => watchMode(cursorEnabled, setOn), []);
  return on ? <Engine /> : null;
}
