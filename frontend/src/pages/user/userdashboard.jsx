import { getUser } from "../../services/authservice";

function UserDashboard() {
  const user = getUser();

  return (
    <div>
      <div
        style={{
          background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
          borderRadius: "16px",
          padding: "2rem",
          color: "white",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: "bold" }}>
          ¡Bienvenido, {user?.name || "Usuario"}! 👋
        </h2>
        <p style={{ margin: "0.5rem 0 0", opacity: 0.8 }}>
          Panel de usuario — SportClub
        </p>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h5 style={{ color: "#1d4ed8" }}>📋 Mis actividades</h5>
        <p style={{ color: "#6b7280" }}>Aquí podrás ver tus clases, reservas y perfil.</p>
      </div>
    </div>
  );
}

export default UserDashboard;