import { useMemo, useState } from 'react';
import { NAV_ITEMS, NAV_MAP, type SectionId } from '../data/navigation';

export function useNavigationState() {
  const [activeSection, setActiveSection] = useState<SectionId>('identity');
  const [previewSection, setPreviewSection] = useState<SectionId | null>(null);

  const activeItem = useMemo(() => NAV_MAP[activeSection], [activeSection]);
  const previewItem = useMemo(
    () => (previewSection ? NAV_MAP[previewSection] : null),
    [previewSection]
  );

  return {
    items: NAV_ITEMS,
    activeSection,
    setActiveSection,
    activeItem,
    previewSection,
    setPreviewSection,
    previewItem,
  };
}