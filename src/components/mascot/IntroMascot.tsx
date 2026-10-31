import { PuppyMascot, type PuppyMascotProps } from './PuppyMascot';
import { MascotSpeechBubble } from './MascotSpeechBubble';

/** A mascot with a speech bubble, sized to sit above a page heading (used via PageIntro's `mascot` slot). */
export function IntroMascot({ say, label, ...props }: { say: string; label: string } & PuppyMascotProps) {
  return (
    <>
      <PuppyMascot {...props} label={label} className="absolute bottom-0 left-1/2 w-28 -translate-x-1/2" />
      <MascotSpeechBubble side="left" className="top-0 left-[58%]" delay={0.9}>
        {say}
      </MascotSpeechBubble>
    </>
  );
}
