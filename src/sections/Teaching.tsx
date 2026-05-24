import { usePortfolio } from '../context/PortfolioContext';

type Props = { id: string };

export function Teaching({ id }: Props) {
  const { data, loading, error } = usePortfolio();

  if (loading) {
    return (
      <section id={id} className="section">
        <p>Cargando formación...</p>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section id={id} className="section">
        <p>No se pudo cargar la sección de Teaching.</p>
      </section>
    );
  }

  const education = data.education || [];
  const certifications = data.certifications || [];
  const skills = data.skills || {};

  return (
    <section id={id} className="section">
      <header className="section__header">
        <div className="section__eyebrow">
          <span className="section__position">Position D4</span>
          <span className="section__piece">♗</span>
        </div>
        <h2 className="section__title">Teaching</h2>
        <p className="section__subtitle">Education &amp; Mentorship</p>
      </header>

      <div className="section__body teaching">
        <div className="teaching__grid">
          <div className="teaching__column">
            <h3 className="teaching__heading">Education</h3>
            <div className="teaching__list">
              {education.map((item: any) => (
                <article
                  key={item.id || item.institution + item.title}
                  className="teaching__item"
                >
                  <h4 className="teaching__title">{item.title}</h4>
                  <p className="teaching__meta">
                    {item.institution}
                    {item.period ? ` · ${item.period}` : ''}
                  </p>
                  {item.summary && (
                    <p className="teaching__text">{item.summary}</p>
                  )}
                </article>
              ))}
            </div>
          </div>

          <div className="teaching__column">
            <h3 className="teaching__heading">Certifications</h3>
            <div className="teaching__list">
              {certifications.map((c: any) => (
                <article
                  key={c.id || c.name}
                  className="teaching__item teaching__item--compact"
                >
                  <h4 className="teaching__title">{c.name}</h4>
                  <p className="teaching__meta">
                    {c.issuer}
                    {c.year ? ` · ${c.year}` : ''}
                  </p>
                </article>
              ))}
            </div>

            <h3 className="teaching__heading teaching__heading--secondary">
              Focus Areas
            </h3>
            <div className="teaching__tags">
              {/* Ajusta según cómo guardes skills; aquí asumo arrays tipo skills.main, skills.tools, etc. */}
              {(skills.main || []).map((s: string) => (
                <span key={s} className="teaching__tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}