import { usePortfolio } from '../context/PortfolioContext';

type Props = { id: string };

export function Identity({ id }: Props) {
  const { data, loading, error } = usePortfolio();

  if (loading) {
    return (
      <section id={id} className="section">
        <p>Cargando perfil...</p>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section id={id} className="section">
        <p>No se pudo cargar la información.</p>
      </section>
    );
  }

  const { personal, about } = data;
  // Ajusta estas propiedades a la estructura real de tus docs
  const headline = about?.headline || '';
  const intro = about?.intro || '';
  const currentRole = personal?.currentRole || '';
  const currentCompany = personal?.company || '';
  const location = personal?.location || '';

  return (
    <section id={id} className="section">
      <header className="section__header">
        <div className="section__eyebrow">
          <span className="section__position">Position A1</span>
          <span className="section__piece">♔</span>
        </div>
        <h1 className="section__title">Identity</h1>
        <p className="section__subtitle">Mission &amp; Philosophy</p>
      </header>

      <div className="section__body identity">
        <div className="identity__intro">
          <p className="identity__headline">{headline}</p>
          <p className="identity__text">{intro}</p>
        </div>

        <div className="identity__grid">
          <div className="identity__card">
            <h3 className="identity__card-title">Actualmente</h3>
            <p className="identity__text">
              {currentRole && currentCompany
                ? `${currentRole} en ${currentCompany}.`
                : null}
              {location ? ` Basado en ${location}.` : null}
            </p>
          </div>

          <div className="identity__card">
            <h3 className="identity__card-title">Principios de trabajo</h3>
            <ul className="identity__list">
              {/* Puedes mapear un array en about.principles si lo tienes en Firestore */}
              <li>Claridad en sistemas y comunicación.</li>
              <li>Diseño orientado a impacto y mantenimiento.</li>
              <li>Iteración con rigor técnico.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}