import { PuppyMascot } from '@/components/mascot/PuppyMascot';
import type { Expression } from '@/components/mascot/mascotData';

export type CursorState = 'idle' | 'happy' | 'coming' | 'sneeze' | 'hidden';

const FACE: Record<CursorState, Expression> = { idle: 'neutral', happy: 'happy', coming: 'happy', sneeze: 'sneeze', hidden: 'neutral' };

/**
 * The little chasing puppy + its speech bubble. Purely presentational; PupCursor drives it.
 * Layers: `tilt` (JS: hop, lean, flip every frame) → `face` (CSS: state scale, skid/settle keyframes) → SVG.
 * The bubble sits outside the tilt layer so it never flips or leans with the puppy.
 */
export function CursorReaction({ state, say, tiltRef, bubbleRef }: { state: CursorState; say: string; tiltRef: React.Ref<HTMLDivElement>; bubbleRef: React.Ref<HTMLSpanElement> }) {
  return (
    <>
      <div ref={tiltRef} className="pup-cursor__tilt">
        <div className="pup-cursor__face">
          <PuppyMascot name="biscuit" expression={FACE[state]} lookAt={false} alive={false} reactive={false} />
        </div>
      </div>
      <span ref={bubbleRef} className="pup-cursor__bubble" data-show={say ? 'true' : 'false'} role="presentation">
        {say}
      </span>
    </>
  );
}
