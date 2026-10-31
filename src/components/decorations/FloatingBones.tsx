import { Decor, type DecorItem } from './Decor';

const DEFAULT: DecorItem[] = [
  { kind: 'bone', at: { right: '8%', top: '14%' }, size: 3, rotate: 16 },
  { kind: 'bone', at: { left: '10%', bottom: '12%' }, size: 2.2, rotate: -20, hideBelow: 'md' },
];
export const FloatingBones = ({ items = DEFAULT }: { items?: DecorItem[] }) => <Decor items={items} />;
