import { PuppyMascot } from '@/components/mascot/PuppyMascot';
import type { Expression } from '@/components/mascot/mascotData';

export type CursorState = 'idle' | 'happy' | 'coming' | 'sneeze' | 'hidden';

const FACE: Record<CursorState, Expression> = { idle: 'neutral', happy: 'happy', coming: 'happy', sneeze: 'sneeze', hidden: 'neutral' };

/** The puppy face + speech bubble. Purely presentational; PupCursor drives it. */
export function CursorReaction({ state, say, faceRef, bubbleRef }: { state: CursorState; say: string; faceRef: React.Ref<HTMLDivElement>; bubbleRef: React.Ref<HTMLSpanElement> }) {
  return (
    <>
      <div ref={faceRef} className="pup-cursor__face">
        <PuppyMascot name="biscuit" bust={false} expression={FACE[state]} lookAt={false} alive={false} reactive={false} />
      </div>
      <span ref={bubbleRef} className="pup-cursor__bubble" data-show={say ? 'true' : 'false'} role="presentation">
        {say}
      </span>
    </>
  );
}
