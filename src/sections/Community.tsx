import { usePortfolio } from '../context/PortfolioContext';

type Props = { id: string };

export function Community({ id }: Props) {
  const { data, loading, error } = usePortfolio();

  if (loading) {
    return (
      <section id={id} className="section">
        <p>Cargando información de contacto...</p>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section id={id} className="section">
        <p>No se pudo cargar la sección de Community.</p>
      </section>
    );
  }

  const { personal, extras } = data;
  const email = personal?.email || '';
  const github = extras?.github || '';
  const linkedin = extras?.linkedin || '';
  const twitter = extras?.twitter || '';

  return (
    <section id={id} className="section">
      <header className="section__header">
        <div className="section__eyebrow">
          <span className="section__position">Position F5</span>
          <span className="section__piece">♙</span>
        </div>
        <h2 className="section__title">Community</h2>
        <p className="section__subtitle">Contact &amp; Connection</p>
      </header>

      <div className="section__body community">
        <div className="community__grid">
          <div className="community__column">
            <h3 className="community__heading">Let&apos;s talk</h3>
            <p className="community__text">
              Si estás construyendo sistemas, productos o equipos y crees que puedo aportar,
              envíame un mensaje corto con contexto y un siguiente paso claro.
            </p>

            {email && (
              <a href={`mailto:${email}`} className="community__primary-link">
                Escribir un correo →
              </a>
            )}
          </div>

          <div className="community__column">
            <h3 className="community__heading">Elsewhere</h3>
            <ul className="community__links">
              {github && (
                <li>
                  <a href={github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </li>
              )}
              {linkedin && (
                <li>
                  <a href={linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </li>
              )}
              {twitter && (
                <li>
                  <a href={twitter} target="_blank" rel="noreferrer">
                    X / Twitter
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}