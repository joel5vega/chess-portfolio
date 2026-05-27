import type { NavItem, SectionId } from '../data/navigation';

type SidebarProps = {
  items: NavItem[];
  activeSection: SectionId;
  previewSection: SectionId | null;
  onSelect: (id: SectionId) => void;
  onPreview: (id: SectionId) => void;
  onPreviewEnd: () => void;
};

export function Sidebar({
  items,
  activeSection,
  previewSection,
  onSelect,
  onPreview,
  onPreviewEnd,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <p className="sidebar__name">JOEL VEGA</p>
        <p className="sidebar__role">Strategic Engineer</p>
      </div>

      <div className="sidebar__divider" />

      <nav className="sidebar__nav" aria-label="Strategic positions">
        {items.map((item) => {
          const isActive = item.id === activeSection;
          const isPreview = item.id === previewSection;

          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar__item ${isActive ? 'is-active' : ''} ${isPreview ? 'is-preview' : ''}`}
              onClick={() => onSelect(item.id)}
              onMouseEnter={() => onPreview(item.id)}
              onMouseLeave={onPreviewEnd}
            >
              <span className="sidebar__rail" />
              <span className="sidebar__piece">{item.piece}</span>

              <span className="sidebar__copy">
                <span className="sidebar__label">{item.label}</span>
                <span className="sidebar__focus">{item.focus}</span>
                {(isPreview || isActive) && (
                  <span className="sidebar__coord">
                    {item.position} — {item.label}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}