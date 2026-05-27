import type { ReactNode } from 'react';

type SectionFrameProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  summary?: string;
  children?: ReactNode;
};

export function SectionFrame({
  eyebrow,
  title,
  subtitle,
  summary,
  children,
}: SectionFrameProps) {
  return (
    <section className="section-frame">
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2 id="section-title" className="section-title">
        {title}
      </h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      {summary ? <p className="section-summary">{summary}</p> : null}
      {children ? <div className="section-body">{children}</div> : null}
    </section>
  );
}