'use client';

import { useEffect, useRef, useState } from 'react';
import { walkerEnabled, watchMode } from '@/hooks/cursorMode';
import { usePathname } from 'next/navigation';
import { PupBuddy } from './PupBuddy';

/**
 * Teddy the pup-actor. A fixed, non-React-rendered mascot that
 *  - walks between `[data-pup-stop]` anchors as the page scrolls (rAF + exponential smoothing),
 *  - looks at the pointer, wags when petted,
 *  - reacts to clicks with a random action (no immediate repeats; rapid clicks => zoomies),
 *  - says "coming?" after standing still, "hm?" when tilting its head, "achoo!" on a sneeze.
 * Other components can talk to it with `window.dispatchEvent(new CustomEvent('pup:cue', { detail: { say, action } }))`.
 * Disabled for prefers-reduced-motion. Position/animation never goes through React state.
 */

type Action = 'jump' | 'woof' | 'love' | 'sneeze' | 'tilt';
const POOL: Action[] = ['jump', 'woof', 'love', 'sneeze', 'tilt'];
const JUMP_WORDS = ['wheee!', 'boing!', 'yip!'];

const pick = <T,>(list: T[], not?: T): T => {
  const pool = list.length > 1 ? list.filter(x => x !== not) : list;
  return pool[Math.floor(Math.random() * pool.length)];
};

function PupActorEngine() {
  const pathname = usePathname();
  const layerRef = useRef<HTMLDivElement>(null);
  const actorRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const memory = useRef({ x: NaN, y: NaN });

  useEffect(() => {
    const layer = layerRef.current!;
    const actor = actorRef.current!;
    const body = bodyRef.current!;
    const bubble = bubbleRef.current!;
    const pupils = body.querySelector<SVGGElement>('[data-p="pupil"]');
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      layer.hidden = true;
      return;
    }
    layer.hidden = false;
    document.documentElement.dataset.pup = 'on';

    let raf = 0;
    let last = performance.now();
    let x = memory.current.x;
    let y = memory.current.y;
    let facing = 1;
    let still = 0;
    let said = false;
    let lastAction: Action | undefined;
    let clicks: number[] = [];
    let bubbleTimer = 0;
    let busy = 0;
    let pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    let hovered = false;
    let stopKey = '';

    const say = (text: string, ms = 1700) => {
      bubble.textContent = text;
      bubble.dataset.show = 'true';
      clearTimeout(bubbleTimer);
      bubbleTimer = window.setTimeout(() => (bubble.dataset.show = 'false'), ms);
    };
    const hearts = () => {
      for (let i = 0; i < 3; i++) {
        const h = document.createElement('span');
        h.className = 'pup-heart';
        h.textContent = '❤';
        h.style.marginLeft = `${(i - 1) * 22 - 6}px`;
        h.style.animationDelay = `${i * 140}ms`;
        h.style.color = i === 1 ? '#c2622b' : '#e0607e';
        actor.appendChild(h);
        setTimeout(() => h.remove(), 1500 + i * 140);
      }
    };
    const anim = (frames: Keyframe[], duration: number, easing = 'ease-out') => {
      busy = performance.now() + duration;
      body.animate(frames, { duration, easing });
    };
    const run = (action: Action) => {
      lastAction = action;
      if (action === 'jump') {
        say(pick(JUMP_WORDS));
        anim([{ translate: '0 0' }, { translate: '0 -34px', offset: 0.45 }, { translate: '0 0' }], 620, 'cubic-bezier(.34,1.56,.64,1)');
      } else if (action === 'woof') {
        say('woof!');
        anim([{ scale: '1' }, { scale: '1.18 0.9', offset: 0.25 }, { scale: '0.95 1.06', offset: 0.5 }, { scale: '1' }], 480);
      } else if (action === 'love') {
        say('I like you!', 2000);
        hearts();
        anim([{ rotate: '0deg' }, { rotate: '-10deg' }, { rotate: '10deg' }, { rotate: '-6deg' }, { rotate: '0deg' }], 900, 'ease-in-out');
      } else if (action === 'sneeze') {
        anim([{ rotate: '-8deg' }, { rotate: '-8deg', offset: 0.35 }, { rotate: '10deg', translate: '0 -8px', offset: 0.55 }, { rotate: '0deg' }], 760);
        setTimeout(() => say('achoo!'), 260);
      } else {
        say('hm?');
        anim([{ rotate: '0deg' }, { rotate: '-14deg', offset: 0.3 }, { rotate: '12deg', offset: 0.65 }, { rotate: '0deg' }], 1400, 'ease-in-out');
      }
    };
    const zoomies = () => {
      say('zoomies!', 2000);
      anim([{ translate: '0 0', rotate: '0deg' }, { translate: '-50px 0', rotate: '-12deg', offset: 0.25 }, { translate: '50px -6px', rotate: '12deg', offset: 0.6 }, { translate: '0 0', rotate: '0deg' }], 1100, 'ease-in-out');
    };

    const onClick = () => {
      const now = performance.now();
      clicks = clicks.filter(t => now - t < 700);
      clicks.push(now);
      if (clicks.length >= 4) {
        clicks = [];
        zoomies();
        return;
      }
      run(pick(POOL, lastAction));
    };
    const onEnter = () => {
      hovered = true;
      body.dataset.petting = 'true';
    };
    const onLeave = () => {
      hovered = false;
      body.dataset.petting = 'false';
    };
    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
    };
    const onCue = (e: Event) => {
      const d = (e as CustomEvent<{ say?: string; action?: Action }>).detail ?? {};
      if (d.action) run(d.action);
      else if (d.say) say(d.say);
    };

    let stops = Array.from(document.querySelectorAll<HTMLElement>('[data-pup-stop]'));
    const refreshStops = () => (stops = Array.from(document.querySelectorAll<HTMLElement>('[data-pup-stop]')));

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const W = innerWidth;
      const H = innerHeight;

      // choose the stop closest to the lower-middle of the viewport
      let tx = W - 70;
      let ty = H - 24;
      let best = Infinity;
      let key = '';
      for (const el of stops) {
        const r = el.getBoundingClientRect();
        const ax = r.left + r.width / 2;
        const ay = r.bottom;
        const d = Math.abs(ay - H * 0.62);
        if (d < best) {
          best = d;
          tx = ax;
          ty = ay;
          key = el.dataset.pupStop || el.id || String(stops.indexOf(el));
        }
      }
      tx = Math.min(W - 56, Math.max(56, tx));
      ty = Math.min(H - 14, Math.max(130, ty));
      if (Number.isNaN(x)) {
        x = tx;
        y = ty;
      }
      const k = 1 - Math.exp(-dt * 4.2);
      const nx = x + (tx - x) * k;
      const ny = y + (ty - y) * k;
      const vx = (nx - x) / Math.max(dt, 0.001);
      const speed = Math.hypot(nx - x, ny - y) / Math.max(dt, 0.001);
      x = nx;
      y = ny;
      memory.current = { x, y };

      if (Math.abs(vx) > 24) facing = vx > 0 ? 1 : -1;
      else {
        const dx = pointer.x - x;
        if (Math.abs(dx) > 160) facing = dx > 0 ? 1 : -1;
      }

      if (speed < 10) {
        still += dt;
        if (still > 2.6 && !said && key === stopKey) {
          said = true;
          say('coming?');
        }
      } else {
        still = 0;
        said = false;
      }
      stopKey = key;

      const t = now / 1000;
      const walking = speed > 28;
      const bob = walking ? Math.abs(Math.sin(t * 13)) * 5 : Math.sin(t * 2.2) * 0.8;
      const lean = walking ? Math.sin(t * 13) * 3.5 : hovered ? Math.sin(t * 18) * 4 : 0;
      actor.style.transform = `translate3d(${x.toFixed(1)}px, ${(y - bob).toFixed(1)}px, 0)`;
      if (now > busy) body.style.transform = `scaleX(${facing}) rotate(${lean.toFixed(2)}deg)`;
      else body.style.transform = `scaleX(${facing})`;

      if (pupils) {
        const dx = pointer.x - x;
        const dy = pointer.y - (y - 50);
        const m = Math.hypot(dx, dy) || 1;
        const px = (dx / m) * Math.min(3, m / 60) * facing;
        const py = (dy / m) * Math.min(3, m / 60);
        pupils.style.transform = `translate(${px.toFixed(2)}px, ${py.toFixed(2)}px)`;
      }
      raf = requestAnimationFrame(frame);
    };

    const onMq = () => {
      if (mq.matches) {
        cancelAnimationFrame(raf);
        layer.hidden = true;
        delete document.documentElement.dataset.pup;
      }
    };
    mq.addEventListener('change', onMq);
    body.addEventListener('click', onClick);
    body.addEventListener('pointerenter', onEnter);
    body.addEventListener('pointerleave', onLeave);
    addEventListener('pointermove', onMove, { passive: true });
    addEventListener('pup:cue', onCue);
    addEventListener('resize', refreshStops);
    const mo = new MutationObserver(refreshStops);
    mo.observe(document.body, { childList: true, subtree: true });

    raf = requestAnimationFrame(frame);
    const hello = window.setTimeout(() => say('peekaboo!', 1800), 700);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hello);
      clearTimeout(bubbleTimer);
      mo.disconnect();
      mq.removeEventListener('change', onMq);
      body.removeEventListener('click', onClick);
      body.removeEventListener('pointerenter', onEnter);
      body.removeEventListener('pointerleave', onLeave);
      removeEventListener('pointermove', onMove);
      removeEventListener('pup:cue', onCue);
      removeEventListener('resize', refreshStops);
      delete document.documentElement.dataset.pup;
    };
  }, [pathname]);

  return (
    <div ref={layerRef} className="pup-layer" aria-hidden="true" hidden>
      <div ref={actorRef} className="pup-actor">
        <span ref={bubbleRef} className="pup-bubble" data-show="false" />
        <div ref={bodyRef} className="pup-body" data-testid="pup-body">
          <PupBuddy />
        </div>
      </div>
    </div>
  );
}

/**
 * Walking Teddy is the touch / small-screen companion. On desktop the PupCursor takes over, so the two never overlap.
 */
export function PupActor() {
  const [on, setOn] = useState(false);
  useEffect(() => watchMode(walkerEnabled, setOn), []);
  return on ? <PupActorEngine /> : null;
}

export function cuePup(detail: { say?: string; action?: Action }) {
  window.dispatchEvent(new CustomEvent('pup:cue', { detail }));
}
