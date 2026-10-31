import { cn } from '@/lib/cn';
import { PuppyMascot } from './PuppyMascot';

/** Teddy, the walking scroll companion (touch / small screens). Thin wrapper over the shared mascot drawing. */
export function PupBuddy({ className, label = 'Teddy, the TeddyPups puppy' }: { className?: string; label?: string }) {
  return <PuppyMascot name="teddy" className={cn(className)} label={label || undefined} lookAt={false} alive={false} reactive={false} />;
}
