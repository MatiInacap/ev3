import { Link } from "react-router-dom";
import { getUser } from "../../services/authservice";

function AdminDashboard() {
  const user = getUser();

  return (
    <div>
      <div
        style={{
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          borderRadius: "16px",
          padding: "2rem",
          color: "white",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: "bold" }}>
          ¡Bienvenido, {user?.name || "Administrador"}! 👋
        </h2>
        <p style={{ margin: "0.5rem 0 0", opacity: 0.8 }}>
          Panel de administración — SportClub
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        <Link to="/admin/usuarios" style={{ textDecoration: "none" }}>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              borderLeft: "4px solid #7c3aed",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            <div style={{ fontSize: "2rem" }}>👥</div>
            <h5 style={{ color: "#7c3aed", margin: "0.5rem 0 0.25rem" }}>Usuarios</h5>
            <p style={{ color: "#6b7280", margin: 0, fontSize: "0.9rem" }}>Gestionar usuarios del sistema</p>
          </div>
        </Link>

        <Link to="/admin/deportes" style={{ textDecoration: "none" }}>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              borderLeft: "4px solid #a855f7",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            <div style={{ fontSize: "2rem" }}>🏅</div>
            <h5 style={{ color: "#a855f7", margin: "0.5rem 0 0.25rem" }}>Deportes</h5>
            <p style={{ color: "#6b7280", margin: 0, fontSize: "0.9rem" }}>Gestionar deportes ofrecidos</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;