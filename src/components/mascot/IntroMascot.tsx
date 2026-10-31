import { PuppyMascot, type PuppyMascotProps } from './PuppyMascot';
import { MascotSpeechBubble } from './MascotSpeechBubble';

/** A mascot with a speech bubble, sized to sit above a page heading (used via PageIntro's `mascot` slot). */
export function IntroMascot({ say, label, ...props }: { say: string; label: string } & PuppyMascotProps) {
  return (
    <>
      <PuppyMascot {...props} label={label} className="absolute bottom-0 left-0 w-28" />
      <MascotSpeechBubble side="left" className="top-0 left-[6.5rem]" delay={0.9}>
        {say}
      </MascotSpeechBubble>
    </>
  );
}
