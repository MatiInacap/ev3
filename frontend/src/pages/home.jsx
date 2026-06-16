import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "system-ui, sans-serif" }}>

      {/* HEADER */}
      <header style={{
        background: "linear-gradient(135deg, #4c1d95, #7c3aed, #a855f7)",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 12px rgba(124,58,237,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "40px", height: "40px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.3rem",
          }}>⚡</div>
          <span style={{ color: "white", fontWeight: "700", fontSize: "1.2rem" }}>SportClub</span>
        </div>
        <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link to="/login" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontWeight: "500" }}>
            Iniciar sesión
          </Link>
          <Link to="/registro" style={{
            background: "white",
            color: "#7c3aed",
            padding: "0.45rem 1.1rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "0.9rem",
          }}>
            Registrarse
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #4c1d95, #7c3aed, #a855f7)",
        padding: "5rem 2rem",
        textAlign: "center",
        color: "white",
      }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "800", margin: "0 0 1rem", lineHeight: 1.2 }}>
          Tu mejor versión<br />comienza hoy
        </h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.85, maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
          En SportClub creemos que el deporte no solo transforma el cuerpo, sino también la mente y el estilo de vida.
          Acompañamos a cada persona en su proceso, sin importar su nivel o experiencia.
        </p>
        <Link to="/registro" style={{
          background: "white",
          color: "#7c3aed",
          padding: "0.85rem 2rem",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: "700",
          fontSize: "1rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}>
          Únete ahora →
        </Link>
      </section>

      {/* QUIÉNES SOMOS */}
      <section style={{ padding: "4rem 2rem", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ color: "#1f2937", fontWeight: "700", fontSize: "2rem", marginBottom: "1rem" }}>
          ¿Quiénes somos?
        </h2>
        <p style={{ color: "#4b5563", lineHeight: 1.8, fontSize: "1.05rem" }}>
          Somos una comunidad enfocada en el bienestar, el compromiso y la superación personal.
          Contamos con entrenadores especializados, programas personalizados y un ambiente que motiva a dar lo mejor en cada entrenamiento.
        </p>
        <p style={{ color: "#4b5563", lineHeight: 1.8, fontSize: "1.05rem", marginTop: "1rem" }}>
          En SportClub no solo vienes a entrenar…{" "}
          <strong style={{ color: "#7c3aed" }}>vienes a crecer, a superarte y a construir tu mejor versión.</strong>
        </p>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section style={{ background: "white", padding: "4rem 2rem" }}>
        <h2 style={{ textAlign: "center", color: "#1f2937", fontWeight: "700", fontSize: "2rem", marginBottom: "2.5rem" }}>
          ¿Por qué elegirnos?
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          {[
            { icon: "🏋️", title: "Entrenadores especializados", desc: "Profesionales certificados que diseñan tu programa a medida." },
            { icon: "📋", title: "Programas personalizados", desc: "Planes adaptados a tus metas, ritmo y nivel de condición física." },
            { icon: "🔥", title: "Ambiente motivador", desc: "Una comunidad que te impulsa a superar tus límites cada día." },
            { icon: "📱", title: "Tecnología moderna", desc: "Gestión de reservas y seguimiento desde cualquier dispositivo." },
          ].map((item, i) => (
            <div key={i} style={{
              background: "#faf5ff",
              border: "1px solid #e9d5ff",
              borderRadius: "16px",
              padding: "1.75rem",
              textAlign: "center",
              borderTop: "4px solid #a855f7",
            }}>
              <div style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>{item.icon}</div>
              <h3 style={{ color: "#7c3aed", fontWeight: "700", fontSize: "1rem", margin: "0 0 0.5rem" }}>
                {item.title}
              </h3>
              <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NUESTRA VISIÓN */}
      <section style={{ padding: "4rem 2rem", textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
        <h2 style={{ color: "#1f2937", fontWeight: "700", fontSize: "2rem", marginBottom: "1rem" }}>
          Nuestra visión
        </h2>
        <p style={{ color: "#4b5563", lineHeight: 1.8, fontSize: "1.05rem" }}>
          Queremos ser el club deportivo referente en la formación integral de personas, combinando tecnología,
          entrenamiento y comunidad para mejorar la calidad de vida de nuestros usuarios.
        </p>
        <Link to="/registro" style={{
          display: "inline-block",
          marginTop: "1.5rem",
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          color: "white",
          padding: "0.8rem 1.8rem",
          borderRadius: "10px",
          textDecoration: "none",
          fontWeight: "600",
        }}>
          Comienza hoy
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
        color: "rgba(255,255,255,0.8)",
        textAlign: "center",
        padding: "1.5rem",
        fontSize: "0.9rem",
      }}>
        © {new Date().getFullYear()} <strong style={{ color: "white" }}>SportClub</strong> – Todos los derechos reservados
      </footer>
    </div>
  );
}

export default Home;