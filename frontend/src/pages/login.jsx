import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="pagina-auth">
      <div className="card-auth">

        <div className="logo-auth">
          <img
            src="/blobid0.png"
            alt="SportClub"
            style={{
              width: "150px",
              height: "56px",
              objectFit: "contain",
              borderRadius: "50%"
            }}
          />

          <p>Ingresa a tu cuenta</p>
        </div>

        <form id="loginForm">

          <div className="form-group">
            <label htmlFor="correo">
              Correo electrónico
            </label>

            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contrasena">
              Contraseña
            </label>

            <input
              type="password"
              id="contrasena"
              name="contrasena"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Ingresar
          </button>

          <p
            id="error"
            className="text-danger mt-3"
          ></p>

        </form>

        <div className="enlaces-auth mt-3">
          <Link to="/recuperar">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <div className="enlaces-auth mt-2">
          ¿No tienes cuenta?
          {" "}
          <Link to="/registro">
            Regístrate aquí
          </Link>
        </div>

        <div className="enlaces-auth mt-3">
          <Link to="/">
            ← Volver al inicio
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;