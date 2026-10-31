import { Decor, type DecorItem } from './Decor';

/** Restrained, section-specific decoration sets. Keep each small — they are seasoning, not the meal. */
const PRESETS = {
  hero: [
    { kind: 'cloud', at: { left: '5%', top: '22%' }, size: 5, opacity: 0.8, sway: true, hideBelow: 'md', duration: 9 },
    { kind: 'bone', at: { right: '7%', top: '30%' }, size: 3.4, rotate: 18, hideBelow: 'md' },
    { kind: 'star', at: { left: '14%', top: '52%' }, size: 1.6, rotate: -10, hideBelow: 'lg' },
    { kind: 'heart', at: { right: '16%', top: '16%' }, size: 1.7, rotate: 10, hideBelow: 'lg' },
    { kind: 'cloud', at: { right: '4%', top: '60%' }, size: 4, opacity: 0.7, sway: true, hideBelow: 'lg', duration: 11 },
  ],
  showcase: [
    { kind: 'paw', at: { right: '30%', top: '6%' }, size: 1.5, rotate: 20, opacity: 0.35, hideBelow: 'md' },
    { kind: 'paw', at: { right: '26%', top: '14%' }, size: 1.2, rotate: -10, opacity: 0.25, hideBelow: 'md' },
    { kind: 'bone', at: { left: '46%', top: '8%' }, size: 2.8, rotate: -14, hideBelow: 'lg' },
  ],
  families: [
    { kind: 'heart', at: { left: '6%', top: '10%' }, size: 2, rotate: -12, hideBelow: 'sm' },
    { kind: 'star', at: { right: '8%', top: '8%' }, size: 1.8, rotate: 14, hideBelow: 'sm' },
    { kind: 'heart', at: { right: '14%', top: '34%' }, size: 1.3, rotate: 8, hideBelow: 'lg' },
  ],
  cta: [
    { kind: 'ball', at: { left: '9%', top: '16%' }, size: 3, hideBelow: 'md', duration: 4.5 },
    { kind: 'bone', at: { right: '9%', bottom: '14%' }, size: 3.6, rotate: -16, hideBelow: 'md' },
    { kind: 'treat', at: { right: '20%', top: '12%' }, size: 2.2, rotate: 12, hideBelow: 'lg' },
    { kind: 'heart', at: { left: '22%', bottom: '12%' }, size: 1.6, rotate: -8, hideBelow: 'lg' },
  ],
  empty: [
    { kind: 'bone', at: { left: '8%', top: '18%' }, size: 2.6, rotate: -14 },
    { kind: 'ball', at: { right: '10%', bottom: '16%' }, size: 2.2 },
    { kind: 'paw', at: { right: '16%', top: '14%' }, size: 1.3, rotate: 16, opacity: 0.4 },
  ],
} satisfies Record<string, DecorItem[]>;

export type DecorPreset = keyof typeof PRESETS;

export function PuppyDecorations({ preset, className }: { preset: DecorPreset; className?: string }) {
  return <Decor items={PRESETS[preset]} className={className} />;
}
