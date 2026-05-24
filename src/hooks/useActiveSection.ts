import { useEffect, useState } from 'react';

const SECTION_IDS = [
  'identity',
  'leadership',
  'systems',
  'teaching',
  'strategy',
  'community',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('identity');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            setActive(id);
          }
        });
      },
      {
        threshold: 0.35, // ~35% visible
      }
    );

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return { activeSection: active, sectionIds: SECTION_IDS };
}