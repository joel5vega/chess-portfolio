import { AnimatePresence, motion } from 'motion/react';
import type { NavItem } from '../../data/navigation';
import type { ReactNode } from 'react';

type SectionFrameProps = {
  item: NavItem;
  children: ReactNode;
};

export function SectionFrame({ item, children }: SectionFrameProps) {
  return (
    <section className="section-frame" aria-labelledby={`section-${item.id}`}>
      <div className="section-frame__meta">
        <span className="section-frame__position">Position {item.position}</span>
        <span className="section-frame__piece">
          {item.piece} {item.pieceName}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="section-frame__content"
        >
          <header className="section-frame__header">
            <h1 id={`section-${item.id}`} className="section-frame__title">
              {item.label}
            </h1>
            <p className="section-frame__subtitle">{item.focus}</p>
            <p className="section-frame__description">{item.description}</p>
          </header>

          <div className="section-frame__body">{children}</div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}