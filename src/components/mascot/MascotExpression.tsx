import type { Expression, MascotLook } from './mascotData';

const INK = '#2a170e';

/** Eyes + nose + mouth for one expression. Pupil highlights live in `[data-p="pupil"]` so they can look at the cursor. */
export function MascotExpression({ look, expression }: { look: MascotLook; expression: Expression }) {
  const s = look.eyeScale;
  const eyeR = { rx: 7 * s, ry: 8 * s };
  const arcUp = (cx: number) => `M${cx - 7} 54 Q${cx} 44 ${cx + 7} 54`; // happy ^
  const arcDown = (cx: number) => `M${cx - 7} 51 Q${cx} 58 ${cx + 7} 51`; // sleepy ∪
  const lines = (cx: number) => `M${cx - 6} 52 L${cx + 5} 49 M${cx - 6} 56 L${cx + 5} 53`; // squeezed

  const eye = (cx: number, side: 'l' | 'r') => {
    if (expression === 'happy') return <path d={arcUp(cx)} stroke={INK} strokeWidth="3.4" fill="none" strokeLinecap="round" />;
    if (expression === 'sleepy') return <path d={arcDown(cx)} stroke={INK} strokeWidth="3.4" fill="none" strokeLinecap="round" />;
    if (expression === 'sneeze') return <path d={lines(cx)} stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />;
    if (expression === 'wink' && side === 'r') return <path d={arcUp(cx)} stroke={INK} strokeWidth="3.4" fill="none" strokeLinecap="round" />;
    const big = expression === 'surprised' ? 1.18 : 1;
    return (
      <g data-eye="" style={{ transformOrigin: `${cx}px 52px` }}>
        <ellipse cx={cx} cy="52" rx={eyeR.rx * big} ry={eyeR.ry * big} fill={INK} />
        <g data-p="pupil">
          <circle cx={cx + 2} cy={49.5} r={2.6 * s} fill="#fff" />
          {expression === 'curious' && <circle cx={cx - 2.5} cy={55} r={1.3} fill="#fff" opacity=".85" />}
        </g>
      </g>
    );
  };

  const mouth = () => {
    if (expression === 'happy') return <path d="M52 71 Q60 82 68 71 Z" fill="#c2453a" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />;
    if (expression === 'sneeze' || expression === 'surprised') return <ellipse cx="60" cy="74" rx="4.5" ry={expression === 'sneeze' ? 5.5 : 4} fill="#7a2a22" stroke={INK} strokeWidth="2.2" />;
    if (expression === 'sleepy') return <path d="M60 68 V70 M55 72 Q60 75 65 72" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />;
    return <path d="M60 68 V72 M60 72 Q55 77 50 73 M60 72 Q65 77 70 73" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />;
  };

  return (
    <g>
      {expression === 'curious' && <path d="M36 40 Q44 35 52 39" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />}
      {eye(44, 'l')}
      {eye(76, 'r')}
      <path d="M54 62 Q60 58 66 62 Q64 68 60 68 Q56 68 54 62Z" fill={look.nose} />
      {mouth()}
    </g>
  );
}
