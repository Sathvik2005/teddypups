'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { MASCOTS, type Expression, type MascotName } from './mascotData';
import { MascotExpression } from './MascotExpression';
import { useLookAt } from './useLookAt';

const INK = '#2a170e';
const FLUFF = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2;
  return { cx: 60 + Math.cos(a) * 36, cy: 54 + Math.sin(a) * 33 };
});

export interface PuppyMascotProps {
  name?: MascotName;
  expression?: Expression;
  className?: string;
  /** false → head only (cursor, tiny decorations) */
  bust?: boolean;
  /** pupils glance toward the pointer */
  lookAt?: boolean;
  /** idle life: breathing, blinking, small head tilts */
  alive?: boolean;
  wave?: boolean;
  wag?: boolean;
  sleeping?: boolean;
  /** react (happy face + bounce) on hover */
  reactive?: boolean;
  /** accessible name; omitted → decorative */
  label?: string;
  delay?: number;
}

/** Original SVG puppy used for all four mascots. One construction, four coats — see mascotData.ts. */
export function PuppyMascot({ name = 'teddy', expression = 'neutral', className, bust = true, lookAt = true, alive = true, wave = false, wag = false, sleeping = false, reactive = true, label, delay = 0 }: PuppyMascotProps) {
  const look = MASCOTS[name];
  const ref = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState(false);
  useLookAt(ref, lookAt && !sleeping);
  const exp: Expression = sleeping ? 'sleepy' : hover && reactive ? 'happy' : expression;

  const ears =
    look.ears === 'droopy' ? (
      <>
        <ellipse cx="19" cy="60" rx="12" ry="27" transform="rotate(7 19 60)" />
        <ellipse cx="101" cy="60" rx="12" ry="27" transform="rotate(-7 101 60)" />
      </>
    ) : look.ears === 'floppy' ? (
      <>
        <ellipse cx="21" cy="52" rx="12.5" ry="22" transform="rotate(16 21 52)" />
        <ellipse cx="99" cy="52" rx="12.5" ry="22" transform="rotate(-16 99 52)" />
      </>
    ) : (
      <>
        <circle cx="25" cy="26" r="13" />
        <circle cx="95" cy="26" r="13" />
      </>
    );

  return (
    <svg
      ref={ref}
      viewBox={bust ? '0 0 120 112' : '6 8 108 86'}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      onPointerEnter={reactive ? e => e.pointerType === 'mouse' && setHover(true) : undefined}
      onPointerLeave={reactive ? () => setHover(false) : undefined}
      className={cn('mascot overflow-visible', alive && 'mascot-alive', hover && reactive && 'mascot-hover', className)}
      style={{ ['--mascot-delay' as string]: `${delay}s` } as React.CSSProperties}
    >
      {bust && <ellipse cx="60" cy="108" rx="34" ry="4" fill={INK} opacity=".12" />}
      <g className="mascot-body">
        {bust && (
          <g className={cn('mascot-tail', wag && 'mascot-wag')} stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M92 94 Q112 92 108 70" stroke={INK} strokeWidth="9" />
            <path d="M92 94 Q112 92 108 70" stroke={look.coat} strokeWidth="3.4" />
          </g>
        )}
        <g stroke={INK} strokeWidth="3" fill={look.ear} strokeLinejoin="round">
          {ears}
        </g>
        {look.fluffy ? (
          <>
            <g stroke={INK} strokeWidth="3" fill={look.coat}>
              {FLUFF.map((c, i) => (
                <circle key={i} cx={c.cx} cy={c.cy} r="13" />
              ))}
            </g>
            <ellipse cx="60" cy="54" rx="40" ry="36" fill={look.coat} />
          </>
        ) : (
          <ellipse cx="60" cy="54" rx="44" ry="38" fill={look.coat} stroke={INK} strokeWidth="3" />
        )}
        <ellipse cx="60" cy="67" rx="19" ry="14" fill={look.muzzle} />
        <ellipse cx="33" cy="66" rx="7" ry="5" fill={look.blush} opacity=".7" />
        <ellipse cx="87" cy="66" rx="7" ry="5" fill={look.blush} opacity=".7" />
        <MascotExpression look={look} expression={exp} />
        {bust && (
          <>
            <g stroke={INK} strokeWidth="3" fill={look.coat}>
              <ellipse cx="42" cy="98" rx="13" ry="9" />
              {!wave && <ellipse cx="78" cy="98" rx="13" ry="9" />}
            </g>
            {wave && (
              <g className="mascot-wave" stroke={INK} strokeWidth="3" fill={look.coat}>
                <ellipse cx="96" cy="70" rx="9" ry="13" transform="rotate(-12 96 70)" />
              </g>
            )}
            <g stroke={INK} strokeWidth="2" strokeLinecap="round" opacity=".5">
              <path d="M38 96 V100 M43 95 V100 M48 96 V100" />
              {!wave && <path d="M74 96 V100 M79 95 V100 M84 96 V100" />}
            </g>
          </>
        )}
      </g>
      {sleeping && (
        <g fontFamily="var(--font-shantell), cursive" fontWeight="700" fill={INK} aria-hidden="true">
          <text className="mascot-z" x="92" y="22" fontSize="16" style={{ animationDelay: '0s' }}>
            z
          </text>
          <text className="mascot-z" x="102" y="12" fontSize="12" style={{ animationDelay: '0.9s' }}>
            z
          </text>
        </g>
      )}
      {label && <title>{label}</title>}
    </svg>
  );
}
