import { PuppyMascot } from '@/components/mascot/PuppyMascot';

export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <PuppyMascot name="teddy" wag className="mx-auto w-32" lookAt={false} />
        <p className="eyebrow mt-4 text-xl">Fetching the cutest pups…</p>
      </div>
    </div>
  );
}
