import type { SectionId } from './hooks/useActiveSection';
import { useActiveSection } from './hooks/useActiveSection';
import { Sidebar } from './layout/Sidebar';
import { TopBar } from './layout/TopBar';
import { MobileNav } from './layout/MobileNav';

import { Identity } from './sections/Identity';
import { Leadership } from './sections/Leadership';
import { Systems } from './sections/Systems';
import { Teaching } from './sections/Teaching';
import { Strategy } from './sections/Strategy';
import { Community } from './sections/Community';

import './App.css';

const SECTION_META: Record<
  SectionId,
  { piece: string; label: string; position: string; focus: string }
> = {
  identity:   { piece: '♔', label: 'Identity',   position: 'A1', focus: 'Mission & Philosophy' },
  leadership: { piece: '♕', label: 'Leadership', position: 'B2', focus: 'Experience & Impact' },
  systems:    { piece: '♖', label: 'Systems',    position: 'C3', focus: 'Projects & Infrastructure' },
  teaching:   { piece: '♗', label: 'Teaching',   position: 'D4', focus: 'Education & Mentorship' },
  strategy:   { piece: '♘', label: 'Strategy',   position: 'E4', focus: 'Analytics & Thinking' },
  community:  { piece: '♙', label: 'Community',  position: 'F5', focus: 'Contact & Connection' },
};

function scrollToSection(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function App() {
  const { activeSection } = useActiveSection();
  const meta = SECTION_META[activeSection];

  return (
    <div className="app">
      <Sidebar
        activeSection={activeSection}
        sections={SECTION_META}
        onSelect={scrollToSection}
      />

      <div className="app__main">
        <TopBar
          activePiece={meta.piece}
          activeLabel={meta.label}
          position={meta.position}
          focus={meta.focus}
        />

        <main className="app__content">
          <Identity id="identity" />
          <Leadership id="leadership" />
          <Systems id="systems" />
          <Teaching id="teaching" />
          <Strategy id="strategy" />
          <Community id="community" />
        </main>
      </div>

      <MobileNav
        activeSection={activeSection}
        sections={SECTION_META}
        onSelect={scrollToSection}
      />
    </div>
  );
}