import { SectionFrame } from '../components/SectionFrame';

export function Community() {
  return (
    <SectionFrame
      eyebrow="Community"
      title="Let’s talk"
      subtitle="Contact & Connection"
      summary="If you are building systems, products, or teams and think I can help, send a short message with context and a clear next step."
    >
      <div className="section-body">
        <div className="section-block">
          <h3>Best fit</h3>
          <p>Early conversations around infrastructure, product direction, mentoring, and collaboration.</p>
        </div>

        <div className="section-links">
          <a href="mailto:hello@example.com">Email</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </SectionFrame>
  );
}