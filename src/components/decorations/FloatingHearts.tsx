import { Decor, type DecorItem } from './Decor';

const DEFAULT: DecorItem[] = [
  { kind: 'heart', at: { left: '10%', top: '18%' }, size: 1.8, rotate: -10 },
  { kind: 'heart', at: { right: '12%', top: '30%' }, size: 1.3, rotate: 12, hideBelow: 'md' },
];
export const FloatingHearts = ({ items = DEFAULT }: { items?: DecorItem[] }) => <Decor items={items} />;
