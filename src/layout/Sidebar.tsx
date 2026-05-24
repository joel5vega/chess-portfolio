import type { SectionId } from '../hooks/useActiveSection';

type SectionMeta = {
  piece: string;
  label: string;
  position: string;
  focus: string;
};

type SidebarProps = {
  activeSection: SectionId;
  sections: Record<SectionId, SectionMeta>;
  onSelect: (id: SectionId) => void;
};

export function Sidebar({ activeSection, sections, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__name">JOEL VEGA</div>
        <div className="sidebar__role">Strategic Engineer</div>
      </div>

      <div className="sidebar__divider" />

      <nav className="sidebar__nav">
        {(Object.keys(sections) as SectionId[]).map(id => {
          const { piece, label, focus } = sections[id];
          const isActive = id === activeSection;

          return (
            <button
              key={id}
              className={`sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}
              onClick={() => onSelect(id)}
              type="button"
            >
              <div className="sidebar__item-left">
                <span className="sidebar__piece">{piece}</span>
              </div>
              <div className="sidebar__item-main">
                <span className="sidebar__label">{label}</span>
                <span className="sidebar__sub">{focus}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}