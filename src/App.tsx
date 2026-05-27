import { useEffect, useMemo, useState } from 'react';
import { useNavigationState } from './hooks/useNavigationState';
import { Sidebar } from './layout/Sidebar';
import { TopBar } from './layout/TopBar';
import { MobileNav } from './layout/MobileNav';
import { SpatialStage } from './components/spatial/SpatialStage';
import { SectionFrame } from './components/SectionFrame';

import { Identity } from './sections/Identity';
import { Leadership } from './sections/Leadership';
import { Systems } from './sections/Systems';
import { Teaching } from './sections/Teaching';
import { Strategy } from './sections/Strategy';
import { Community } from './sections/Community';

import './App.css';

export default function App() {
  const {
    items,
    activeSection,
    setActiveSection,
    activeItem,
    previewSection,
    setPreviewSection,
    previewItem,
  } = useNavigationState();

  const [moveLabel, setMoveLabel] = useState(`Move to ${activeItem.position}`);
  const [hoverLabel, setHoverLabel] = useState('');
  const [moveKey, setMoveKey] = useState(0);

  useEffect(() => {
    setMoveLabel(`Move to ${activeItem.position}`);
    setMoveKey((k) => k + 1);
  }, [activeItem.position]);

 const miniMapSquares = useMemo(
  () =>
    items.map((item) => ({
      id: item.id,
      square: item.position,
      active: item.id === activeSection,
    })),
  [items, activeSection]
);

  return (
    <div className="app-shell">
      <SpatialStage
        activeItem={activeItem}
        previewItem={previewItem}
        previewSection={previewSection}
      />

      <Sidebar
        items={items}
        activeSection={activeSection}
        previewSection={previewSection}
        onSelect={setActiveSection}
        onPreview={(id) => {
          setPreviewSection(id);
          const item = items.find((entry) => entry.id === id);
          if (item) {
  setHoverLabel(
    `${item.position} — ${item.label} · ${item.focus}`
  );
}
        }}
        onPreviewEnd={() => {
          setPreviewSection(null);
          setHoverLabel('');
        }}
      />

      <div className="app-main">
        <TopBar
          activePiece={activeItem.piece}
          activeLabel={activeItem.label}
          position={activeItem.position}
          focus={activeItem.focus}
        />

        <div className="hud">
          <div className="hud__move" data-key={moveKey}>{moveLabel}</div>
          <div className="hud__hover">{hoverLabel || activeItem.description}</div>

         <div className="mini-map" aria-label="Strategic mini map">
  {miniMapSquares.map((item) => (
    <button
      key={item.id}
      type="button"
      className={`mini-map__cell ${
        item.active ? 'is-active' : ''
      } ${item.preview ? 'is-preview' : ''}`}
      title={item.square}
      onClick={() => setActiveSection(item.id)}
      onMouseEnter={() => setPreviewSection(item.id)}
      onMouseLeave={() => setPreviewSection(null)}
    >
      {item.square}
    </button>
  ))}
</div>
        </div>

        <main className="app-content">
          <SectionFrame item={activeItem}>
            {activeSection === 'identity' && <Identity id="identity" />}
            {activeSection === 'leadership' && <Leadership id="leadership" />}
            {activeSection === 'systems' && <Systems id="systems" />}
            {activeSection === 'teaching' && <Teaching id="teaching" />}
            {activeSection === 'strategy' && <Strategy id="strategy" />}
            {activeSection === 'community' && <Community id="community" />}
          </SectionFrame>
        </main>
      </div>

      <MobileNav
        items={items}
        activeSection={activeSection}
        onSelect={setActiveSection}
      />
    </div>
  );
}