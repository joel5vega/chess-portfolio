import { usePortfolio } from '../context/PortfolioContext';

type Props = { id: string };

export function Leadership({ id }: Props) {
  const { data, loading, error } = usePortfolio();

  if (loading) {
    return (
      <section id={id} className="section">
        <p>Cargando experiencia...</p>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section id={id} className="section">
        <p>No se pudo cargar la experiencia.</p>
      </section>
    );
  }

  const experience = data.experience || [];

  return (
    <section id={id} className="section">
      <header className="section__header">
        <div className="section__eyebrow">
          <span className="section__position">Position B2</span>
          <span className="section__piece">♕</span>
        </div>
        <h2 className="section__title">Leadership</h2>
        <p className="section__subtitle">Experience &amp; Impact</p>
      </header>

      <div className="section__body leadership">
        <div className="leadership__list">
          {experience.map((item: any) => (
            <article key={item.id || item.company + item.role} className="leadership__item">
              <header className="leadership__item-header">
                <div>
                  <h3 className="leadership__company">{item.company}</h3>
                  <p className="leadership__role">{item.role}</p>
                </div>
                <div className="leadership__meta">
                  <span>{item.period}</span>
                  {item.location && <span> · {item.location}</span>}
                </div>
              </header>
              <p className="leadership__summary">{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}