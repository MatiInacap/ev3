import { getUser } from "../../services/authservice";

function CoachDashboard() {
  const user = getUser();

  return (
    <div>
      <div
        style={{
          background: "linear-gradient(135deg, #15803d, #22c55e)",
          borderRadius: "16px",
          padding: "2rem",
          color: "white",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: "bold" }}>
          ¡Bienvenido, {user?.name || "Coach"}! 💪
        </h2>
        <p style={{ margin: "0.5rem 0 0", opacity: 0.8 }}>
          Panel de coach — SportClub
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
        <h5 style={{ color: "#15803d" }}>📅 Mis clases</h5>
        <p style={{ color: "#6b7280" }}>Aquí verás tus clases asignadas, alumnos y horarios.</p>
      </div>
    </div>
  );
}

export default CoachDashboard;