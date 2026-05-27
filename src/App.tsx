import './App.css';
import { NAV_ITEMS } from './data/navigation';
import { useNavigationState } from './hooks/useNavigationState';
import { Sidebar } from './layout/Sidebar';
import { TopBar } from './layout/TopBar';
import { MobileNav } from './layout/MobileNav';
import { ContentSheet } from './layout/ContentSheet';
import { SpatialStage } from './components/spatial/SpatialStage';

import { Identity } from './sections/Identity';
import { Leadership } from './sections/Leadership';
import { Systems } from './sections/Systems';
import { Teaching } from './sections/Teaching';
import { Strategy } from './sections/Strategy';
import { Community } from './sections/Community';

function App() {
  const {
    activeItem,
    previewItem,
    previewSection,
    setActiveSection,
    setPreviewSection,
  } = useNavigationState();

  const visibleItem = previewItem ?? activeItem;

  const renderSection = () => {
    switch (activeItem.id) {
      case 'identity':
        return <Identity />;
      case 'leadership':
        return <Leadership />;
      case 'systems':
        return <Systems />;
      case 'teaching':
        return <Teaching />;
      case 'strategy':
        return <Strategy />;
      case 'community':
        return <Community />;
      default:
        return <Identity />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar
        items={NAV_ITEMS}
        activeId={activeItem.id}
        onNavigate={setActiveSection}
        onPreview={setPreviewSection}
      />

      <main className="stage-layout">
        <TopBar item={visibleItem} />

        <div className="stage-pane">
          <SpatialStage
            activeItem={activeItem}
            previewItem={previewItem}
            previewSection={previewSection}
          />
        </div>

        <ContentSheet item={activeItem}>
          {renderSection()}
        </ContentSheet>

        <MobileNav
          items={NAV_ITEMS}
          activeId={activeItem.id}
          onNavigate={setActiveSection}
          onPreview={setPreviewSection}
        />
      </main>
    </div>
  );
}

export default App;