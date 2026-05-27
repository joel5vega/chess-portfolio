import type { NavItem, SectionId } from '../data/navigation';

type SidebarProps = {
  items: NavItem[];
  activeId: SectionId;
  onNavigate: (id: SectionId) => void;
  onPreview: (id: SectionId | null) => void;
};

export function Sidebar({
  items,
  activeId,
  onNavigate,
  onPreview,
}: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar-brand">
        <span className="sidebar-kicker">JOEL VEGA</span>
        <h1 className="sidebar-title">Strategic Engineer</h1>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-link ${isActive ? 'is-active' : ''}`}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => onPreview(item.id)}
              onMouseLeave={() => onPreview(null)}
              onFocus={() => onPreview(item.id)}
              onBlur={() => onPreview(null)}
            >
              <span className="sidebar-link-row">
                <span className="sidebar-link-icon" aria-hidden="true">
                  {item.piece}
                </span>

                <span className="sidebar-link-content">
                  <span className="sidebar-link-title">{item.label}</span>
                  <span className="sidebar-link-copy">{item.focus}</span>
                </span>
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}