import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, saveSession } from "../services/authservice";

function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!correo.trim()) return setError("El correo es obligatorio.");
    if (!contrasena.trim()) return setError("La contraseña es obligatoria.");

    setCargando(true);
    try {
      const data = await loginUser({ email: correo, password: contrasena });
      saveSession(data.data.token, data.data.user);
      const rol = data.data.user.role;
      if (rol === "admin") navigate("/admin/dashboard");
      else if (rol === "coach") navigate("/coach/dashboard");
      else navigate("/user/dashboard");
    } catch (err) {
      setError(err.message || "Credenciales incorrectas.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #4c1d95, #7c3aed, #a855f7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    }}>
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "2.5rem",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: "64px",
            height: "64px",
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.8rem",
            margin: "0 auto 1rem",
          }}>⚡</div>
          <h2 style={{ color: "#1f2937", fontWeight: "700", margin: 0 }}>SportClub</h2>
          <p style={{ color: "#6b7280", margin: "0.25rem 0 0", fontSize: "0.9rem" }}>
            Ingresa a tu cuenta
          </p>
        </div>

        {error && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#dc2626",
            borderRadius: "10px",
            padding: "0.75rem 1rem",
            marginBottom: "1rem",
            fontSize: "0.9rem",
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "600", marginBottom: "0.4rem", fontSize: "0.9rem" }}>
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "2px solid #e5e7eb",
                borderRadius: "10px",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "600", marginBottom: "0.4rem", fontSize: "0.9rem" }}>
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: "2px solid #e5e7eb",
                borderRadius: "10px",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            style={{
              width: "100%",
              padding: "0.85rem",
              background: cargando ? "#c4b5fd" : "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: cargando ? "not-allowed" : "pointer",
            }}
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "#6b7280" }}>
          ¿No tienes cuenta?{" "}
          <Link to="/registro" style={{ color: "#7c3aed", fontWeight: "600", textDecoration: "none" }}>
            Regístrate aquí
          </Link>
        </div>
        <div style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.9rem" }}>
          <Link to="/" style={{ color: "#9ca3af", textDecoration: "none" }}>
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;