import type { NavItem, SectionId } from '../data/navigation';

type MobileNavProps = {
  items: NavItem[];
  activeSection: SectionId;
  onSelect: (id: SectionId) => void;
};

export function MobileNav({
  items,
  activeSection,
  onSelect,
}: MobileNavProps) {
  return (
    <nav className="mobile-nav" aria-label="Mobile strategic navigation">
      {items.map((item) => {
        const isActive = item.id === activeSection;

        return (
          <button
            key={item.id}
            type="button"
            className={`mobile-nav__item ${isActive ? 'is-active' : ''}`}
            onClick={() => onSelect(item.id)}
          >
            <span className="mobile-nav__piece">{item.piece}</span>
            {isActive && <span className="mobile-nav__label">{item.label}</span>}
          </button>
        );
      })}
    </nav>
  );
}