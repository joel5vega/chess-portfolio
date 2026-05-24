import { usePortfolio } from '../context/PortfolioContext';

type Props = { id: string };

export function Systems({ id }: Props) {
  const { data, loading, error } = usePortfolio();

  if (loading) {
    return (
      <section id={id} className="section">
        <p>Cargando proyectos...</p>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section id={id} className="section">
        <p>No se pudieron cargar los proyectos.</p>
      </section>
    );
  }

  const projects = data.projects || [];

  return (
    <section id={id} className="section">
      <header className="section__header">
        <div className="section__eyebrow">
          <span className="section__position">Position C3</span>
          <span className="section__piece">♖</span>
        </div>
        <h2 className="section__title">Systems</h2>
        <p className="section__subtitle">Projects &amp; Infrastructure</p>
      </header>

      <div className="section__body systems">
        <div className="systems__grid">
          {projects.map((p: any) => (
            <article key={p.id || p.name} className="systems__item">
              <header className="systems__item-header">
                <h3 className="systems__name">{p.name}</h3>
                {p.role && <span className="systems__role">{p.role}</span>}
              </header>
              {p.stack && <p className="systems__stack">{p.stack}</p>}
              {p.summary && (
                <p className="systems__summary">{p.summary}</p>
              )}
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="systems__link"
                >
                  Ver proyecto →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}