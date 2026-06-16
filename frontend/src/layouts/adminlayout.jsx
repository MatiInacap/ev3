import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout, getUser } from "../services/authservice";

function AdminLayout() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <nav
        style={{
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(124,58,237,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span style={{ color: "white", fontWeight: "bold", fontSize: "1.2rem" }}>
            ⚡ SportClub Admin
          </span>
          <Link
            to="/admin/dashboard"
            style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "0.9rem" }}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/usuarios"
            style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "0.9rem" }}
          >
            Usuarios
          </Link>
          <Link
            to="/admin/deportes"
            style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "0.9rem" }}
          >
            Deportes
          </Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>
            👤 {user?.name || "Administrador"}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.4)",
              color: "white",
              padding: "0.35rem 0.85rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
      <main style={{ padding: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;