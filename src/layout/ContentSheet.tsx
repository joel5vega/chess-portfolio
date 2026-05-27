import type { ReactNode } from 'react';
import type { NavItem } from '../data/navigation';

type ContentSheetProps = {
  item: NavItem;
  children: ReactNode;
};

export function ContentSheet({ item, children }: ContentSheetProps) {
  return (
    <section className="content-sheet" aria-labelledby="section-title">
      <div className="content-sheet-meta">
        <span>{item.label}</span>
        <span>{item.description}</span>
      </div>

      <div className="content-sheet-body">
        {children}
      </div>
    </section>
  );
}