import { SectionFrame } from '../components/SectionFrame';

export function Identity() {
  return (
    <SectionFrame
      eyebrow="Identity"
      title="Strategic engineer"
      subtitle="Mission & Philosophy"
      summary="I work at the intersection of systems thinking, product execution, and long-term clarity."
    >
      <div className="section-body">
        <div className="section-block">
          <h3>How I work</h3>
          <p>I prefer calm execution, simple systems, and decisions that stay useful as complexity grows.</p>
        </div>
      </div>
    </SectionFrame>
  );
}