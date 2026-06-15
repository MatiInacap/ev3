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

  const registrar = async () => {
    const nuevosErrores = {};

    if (!nombre.trim()) nuevosErrores.nombre = true;

    if (
      !correo.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
    ) {
      nuevosErrores.correo = true;
    }

    if (!contrasena || contrasena.length < 8) {
      nuevosErrores.contrasena = true;
    }

    if (contrasena !== confirmar) {
      nuevosErrores.confirmar = true;
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    setCargando(true);
    setMensajeError("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nombre,
            email: correo,
            password: contrasena,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Error al registrar usuario"
        );
      }

      setMensajeExito(
        "¡Cuenta creada exitosamente! Redirigiendo..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setMensajeError(error.message);
      setCargando(false);
    }
  };

  return (
    <div className="pagina-auth">
      <div className="card-auth">

        <div className="logo-auth">
          <img
            src="/blobid0.png"
            alt="SportClub"
            width="56"
            height="56"
          />
          <h2>SportClub</h2>
          <p>Crea tu cuenta gratis</p>
        </div>

        {mensajeExito && (
          <div className="alert alert-success">
            {mensajeExito}
          </div>
        )}

        {mensajeError && (
          <div className="alert alert-danger">
            {mensajeError}
          </div>
        )}

        <div className="form-group">
          <label>Nombre completo *</label>

          <input
            type="text"
            className={`form-control ${
              errores.nombre ? "is-invalid" : ""
            }`}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          {errores.nombre && (
            <small className="text-danger">
              El nombre es obligatorio.
            </small>
          )}
        </div>

        <div className="form-group mt-3">
          <label>Correo electrónico *</label>

          <input
            type="email"
            className={`form-control ${
              errores.correo ? "is-invalid" : ""
            }`}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          {errores.correo && (
            <small className="text-danger">
              Ingresa un email válido.
            </small>
          )}
        </div>

        <div className="form-group mt-3">
          <label>Contraseña *</label>

          <input
            type="password"
            className={`form-control ${
              errores.contrasena ? "is-invalid" : ""
            }`}
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />

          {errores.contrasena && (
            <small className="text-danger">
              Mínimo 8 caracteres.
            </small>
          )}
        </div>

        <div className="form-group mt-3">
          <label>Confirmar contraseña *</label>

          <input
            type="password"
            className={`form-control ${
              errores.confirmar ? "is-invalid" : ""
            }`}
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
          />

          {errores.confirmar && (
            <small className="text-danger">
              Las contraseñas no coinciden.
            </small>
          )}
        </div>

        <button
          className="btn btn-primary w-100 mt-4"
          onClick={registrar}
          disabled={cargando}
        >
          {cargando ? "Registrando..." : "Registrarse"}
        </button>

        <div className="mt-3">
          ¿Ya tienes cuenta?
          {" "}
          <Link to="/login">
            Inicia sesión
          </Link>
        </div>

        <div className="mt-2">
          <Link to="/">
            ← Volver al inicio
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Register;