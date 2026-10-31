import { Decor, type DecorItem } from './Decor';

const DEFAULT: DecorItem[] = [
  { kind: 'paw', at: { left: '8%', top: '20%' }, size: 1.6, rotate: -18, opacity: 0.3 },
  { kind: 'paw', at: { left: '12%', top: '30%' }, size: 1.3, rotate: 12, opacity: 0.22 },
];
/** A few faint paw prints for section backgrounds. */
export const FloatingPaws = ({ items = DEFAULT }: { items?: DecorItem[] }) => <Decor items={items} />;
