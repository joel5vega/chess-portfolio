import type { NavItem } from '../data/navigation';

type TopBarProps = {
  item: NavItem;
};

export function TopBar({ item }: TopBarProps) {
  return (
    <header className="top-bar" aria-label="Current section context">
      <span className="top-bar-brand">JOEL VEGA</span>
      <span>{item.piece} {item.position}</span>
      <span>{item.focus}</span>
    </header>
  );
}