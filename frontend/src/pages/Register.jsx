import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [errores, setErrores] = useState({});
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [cargando, setCargando] = useState(false);

  const registrar = async (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!correo.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo))
      nuevosErrores.correo = "Ingresa un email válido.";
    if (!contrasena || contrasena.length < 8)
      nuevosErrores.contrasena = "Mínimo 8 caracteres.";
    if (contrasena !== confirmar)
      nuevosErrores.confirmar = "Las contraseñas no coinciden.";

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    setCargando(true);
    setMensajeError("");
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nombre, email: correo, password: contrasena }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al registrar");
      setMensajeExito("¡Cuenta creada! Redirigiendo...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMensajeError(error.message);
      setCargando(false);
    }
  };

  const inputStyle = (tieneError) => ({
    width: "100%",
    padding: "0.75rem 1rem",
    border: `2px solid ${tieneError ? "#fca5a5" : "#e5e7eb"}`,
    borderRadius: "10px",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
    background: tieneError ? "#fef2f2" : "white",
  });

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
        maxWidth: "440px",
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
            Crea tu cuenta gratis
          </p>
        </div>

        {mensajeExito && (
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1rem", fontSize: "0.9rem" }}>
            ✅ {mensajeExito}
          </div>
        )}
        {mensajeError && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1rem", fontSize: "0.9rem" }}>
            ⚠️ {mensajeError}
          </div>
        )}

        <form onSubmit={registrar}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "600", marginBottom: "0.4rem", fontSize: "0.9rem" }}>
              Nombre completo *
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={inputStyle(errores.nombre)}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = errores.nombre ? "#fca5a5" : "#e5e7eb")}
            />
            {errores.nombre && <small style={{ color: "#dc2626" }}>{errores.nombre}</small>}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "600", marginBottom: "0.4rem", fontSize: "0.9rem" }}>
              Correo electrónico *
            </label>
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              style={inputStyle(errores.correo)}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = errores.correo ? "#fca5a5" : "#e5e7eb")}
            />
            {errores.correo && <small style={{ color: "#dc2626" }}>{errores.correo}</small>}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "600", marginBottom: "0.4rem", fontSize: "0.9rem" }}>
              Contraseña *
            </label>
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              style={inputStyle(errores.contrasena)}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = errores.contrasena ? "#fca5a5" : "#e5e7eb")}
            />
            {errores.contrasena && <small style={{ color: "#dc2626" }}>{errores.contrasena}</small>}
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "600", marginBottom: "0.4rem", fontSize: "0.9rem" }}>
              Confirmar contraseña *
            </label>
            <input
              type="password"
              placeholder="Repite tu contraseña"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              style={inputStyle(errores.confirmar)}
              onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
              onBlur={(e) => (e.target.style.borderColor = errores.confirmar ? "#fca5a5" : "#e5e7eb")}
            />
            {errores.confirmar && <small style={{ color: "#dc2626" }}>{errores.confirmar}</small>}
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
            {cargando ? "Registrando..." : "Crear cuenta"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "#6b7280" }}>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" style={{ color: "#7c3aed", fontWeight: "600", textDecoration: "none" }}>
            Inicia sesión
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

export default Register;