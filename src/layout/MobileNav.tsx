import type { NavItem, SectionId } from '../data/navigation';

type MobileNavProps = {
  items: NavItem[];
  activeId: SectionId;
  onNavigate: (id: SectionId) => void;
  onPreview: (id: SectionId | null) => void;
};

export function MobileNav({
  items,
  activeId,
  onNavigate,
  onPreview,
}: MobileNavProps) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            className={`mobile-nav-link ${isActive ? 'is-active' : ''}`}
            onClick={() => onNavigate(item.id)}
            onMouseEnter={() => onPreview(item.id)}
            onMouseLeave={() => onPreview(null)}
            onFocus={() => onPreview(item.id)}
            onBlur={() => onPreview(null)}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="mobile-nav-icon" aria-hidden="true">
              {item.piece}
            </span>
            <span className="mobile-nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}