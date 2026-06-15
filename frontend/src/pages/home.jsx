import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación interna de React

function Home() {
  return (
    <>
      {/* HEADER */}
      <header>
        <img 
          src="blobid0.png" 
          alt="SportClub" 
          style={{ width: '150px', height: '42px', objectFit: 'contain', borderRadius: '50%' }} 
        />
        <div>
          <h1>SportClub</h1>
          <span className="subtitulo">Tu mejor versión comienza hoy</span>
        </div>
        <nav style={{ background: 'transparent', padding: 0, gap: '1rem', display: 'flex', alignItems: 'center' }}>
          {/* Navegación interna con React Router */}
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/registro" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>
            Registrarse
          </Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Tu mejor versión comienza hoy</h1>
        <p>
          En SportClub creemos que el deporte no solo transforma el cuerpo, sino también la mente y el estilo de vida. 
          Acompañamos a cada persona en su proceso, sin importar su nivel o experiencia.
        </p>
        <Link to="/registro" className="btn btn-primary">Únete ahora</Link>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="seccion">
        <h2>¿Quiénes somos?</h2>
        <p>
          Somos una comunidad enfocada en el bienestar, el compromiso y la superación personal. 
          Contamos con entrenadores especializados, programas personalizados y un ambiente que motiva a dar lo mejor en cada entrenamiento.
        </p>
        <p>
          En SportClub no solo vienes a entrenar… <strong>vienes a crecer, a superarte y a construir tu mejor versión.</strong>
        </p>
      </section>

      {/* ¿POR QUÉ ELEGIRNOS? */}
      <section className="seccion" style={{ background: '#FFFFFF', maxWidth: '100%', padding: '3rem 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          <h2>¿Por qué elegirnos?</h2>
          <div className="beneficios-grid">
            <div className="beneficio-item">
              <h3>Entrenadores especializados</h3>
              <p>Profesionales certificados que diseñan tu programa a medida.</p>
            </div>
            <div className="beneficio-item">
              <h3>Programas personalizados</h3>
              <p>Planes adaptados a tus metas, ritmo y nivel de condición física.</p>
            </div>
            <div className="beneficio-item">
              <h3>Ambiente motivador</h3>
              <p>Una comunidad que te impulsa a superar tus límites cada día.</p>
            </div>
            <div className="beneficio-item">
              <h3>Tecnología moderna</h3>
              <p>Gestión de reservas y seguimiento de progreso desde cualquier dispositivo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NUESTRA VISIÓN */}
      <section className="seccion">
        <h2>Nuestra visión</h2>
        <p>
          Queremos ser el club deportivo referente en la formación integral de personas, combinando tecnología, 
          entrenamiento y comunidad para mejorar la calidad de vida de nuestros usuarios.</p>
        <Link to="/registro" className="btn btn-outline" style={{ marginTop: '0.75rem', display: 'inline-block' }}>
          Comienza hoy
        </Link>
      </section>

      {/* FOOTER */}
      <footer>
        <p>&copy; {new Date().getFullYear()} <span>SportClub</span> – Todos los derechos reservados</p>
      </footer>
    </>
  );
}

export default Home;