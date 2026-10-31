export type MascotName = 'mochi' | 'biscuit' | 'coco' | 'teddy';
export type Expression = 'neutral' | 'happy' | 'sleepy' | 'surprised' | 'wink' | 'sneeze' | 'curious';

export interface MascotLook {
  name: string;
  personality: string;
  coat: string;
  ear: string;
  muzzle: string;
  nose: string;
  /** fluffy scalloped head vs smooth round head */
  fluffy: boolean;
  /** ear shape: long droopy / medium floppy / short round */
  ears: 'droopy' | 'floppy' | 'round';
  eyeScale: number;
  blush: string;
}

/** One shared drawing style (3px cocoa stroke, same face construction); only colour + silhouette vary. */
export const MASCOTS: Record<MascotName, MascotLook> = {
  mochi: { name: 'Mochi', personality: 'sleepy, fluffy and innocent', coat: '#fff1d6', ear: '#f3d9a8', muzzle: '#fffaf0', nose: '#7a4a2e', fluffy: false, ears: 'droopy', eyeScale: 0.95, blush: '#f7b6a2' },
  biscuit: { name: 'Biscuit', personality: 'curious and a little mischievous', coat: '#e0953f', ear: '#b9712a', muzzle: '#fde6b8', nose: '#2a170e', fluffy: false, ears: 'floppy', eyeScale: 1.15, blush: '#f4a08a' },
  coco: { name: 'Coco', personality: 'cheerful and affectionate', coat: '#8a5535', ear: '#6a3d24', muzzle: '#d9b48a', nose: '#2a170e', fluffy: true, ears: 'floppy', eyeScale: 1, blush: '#e58f7c' },
  teddy: { name: 'Teddy', personality: 'our friendly brand ambassador', coat: '#f2b95f', ear: '#e9a94e', muzzle: '#fde6b8', nose: '#2a170e', fluffy: true, ears: 'round', eyeScale: 1, blush: '#f4a08a' },
};
