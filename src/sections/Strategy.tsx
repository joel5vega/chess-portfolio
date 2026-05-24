import { usePortfolio } from '../context/PortfolioContext';

type Props = { id: string };

export function Strategy({ id }: Props) {
  const { data, loading, error } = usePortfolio();

  if (loading) {
    return (
      <section id={id} className="section">
        <p>Cargando métricas...</p>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section id={id} className="section">
        <p>No se pudo cargar la sección de Strategy.</p>
      </section>
    );
  }

  const extras = data.extras || {};
  // Ejemplo: ajusta a tus campos reales en extras
  const stats = extras.stats || [];
  const focusAreas = extras.focusAreas || [];
  const mindset = extras.mindset || '';

  return (
    <section id={id} className="section">
      <header className="section__header">
        <div className="section__eyebrow">
          <span className="section__position">Position E4</span>
          <span className="section__piece">♘</span>
        </div>
        <h2 className="section__title">Strategy</h2>
        <p className="section__subtitle">Analytics &amp; Thinking</p>
      </header>

      <div className="section__body strategy">
        <div className="strategy__grid">
          <div className="strategy__column">
            <h3 className="strategy__heading">Craft & Focus</h3>
            <p className="strategy__text">
              {mindset ||
                'Cómo distribuyo mi energía, tiempo y concentración entre construir, aprender y apoyar equipos.'}
            </p>

            {focusAreas.length > 0 && (
              <ul className="strategy__list">
                {focusAreas.map((f: string) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="strategy__column">
            <h3 className="strategy__heading">Signals</h3>
            <div className="strategy__stats">
              {stats.map((s: any) => (
                <article key={s.label} className="strategy__stat">
                  <span className="strategy__stat-value">{s.value}</span>
                  <span className="strategy__stat-label">{s.label}</span>
                </article>
              ))}

              {/* Placeholder para futuros datos de RescueTime via Cloud Function */}
              {stats.length === 0 && (
                <article className="strategy__stat">
                  <span className="strategy__stat-value">—</span>
                  <span className="strategy__stat-label">
                    Tiempo de enfoque (RescueTime)
                  </span>
                </article>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}