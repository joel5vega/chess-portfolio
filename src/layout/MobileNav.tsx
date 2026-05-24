import type { SectionId } from '../hooks/useActiveSection';

type SectionMeta = {
  piece: string;
  label: string;
  position: string;
  focus: string;
};

type MobileNavProps = {
  activeSection: SectionId;
  sections: Record<SectionId, SectionMeta>;
  onSelect: (id: SectionId) => void;
};

export function MobileNav({ activeSection, sections, onSelect }: MobileNavProps) {
  return (
    <nav className="mobile-nav">
      {(Object.keys(sections) as SectionId[]).map(id => {
        const { piece, label } = sections[id];
        const isActive = id === activeSection;
        return (
          <button
            key={id}
            className={`mobile-nav__item ${isActive ? 'mobile-nav__item--active' : ''}`}
            onClick={() => onSelect(id)}
            type="button"
          >
            <span className="mobile-nav__piece">{piece}</span>
            {isActive && <span className="mobile-nav__label">{label}</span>}
          </button>
        );
      })}
    </nav>
  );
}