import { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Badge, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { getUsers, createUser, updateUser, deleteUser } from "../../services/userservice";

const INITIAL_FORM = { name: "", email: "", password: "", role: "user" };

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);

  const cargarUsuarios = async () => {
    setCargando(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      Swal.fire("Error", err.message || "No se pudieron cargar los usuarios", "error");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const abrirCrear = () => {
    setEditando(null);
    setForm(INITIAL_FORM);
    setErrores({});
    setShowModal(true);
  };

  const abrirEditar = (user) => {
    setEditando(user);
    setForm({ name: user.name, email: user.email, password: "", role: user.role });
    setErrores({});
    setShowModal(true);
  };

  const validar = () => {
    const e = {};
    if (!form.name.trim()) e.name = "El nombre es obligatorio.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Ingresa un email válido.";
    if (!editando && (!form.password || form.password.length < 8))
      e.password = "La contraseña debe tener al menos 8 caracteres.";
    return e;
  };

  const handleGuardar = async () => {
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length > 0) return;

    setGuardando(true);
    try {
      const payload = { name: form.name.trim(), email: form.email.trim(), role: form.role };
      if (form.password) payload.password = form.password;

      if (editando) {
        const actualizado = await updateUser(editando.id, payload);
        setUsers((prev) => prev.map((u) => (u.id === editando.id ? actualizado : u)));
        Swal.fire("¡Actualizado!", "El usuario fue actualizado correctamente.", "success");
      } else {
        const nuevo = await createUser(payload);
        setUsers((prev) => [...prev, nuevo]);
        Swal.fire("¡Creado!", "El usuario fue creado correctamente.", "success");
      }
      setShowModal(false);
    } catch (err) {
      Swal.fire("Error", err.message || "Ocurrió un error al guardar.", "error");
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (user) => {
    const result = await Swal.fire({
      title: "¿Está seguro de eliminar este usuario?",
      text: `"${user.name}" será eliminado permanentemente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteUser(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      Swal.fire("Eliminado", "El usuario fue eliminado correctamente.", "success");
    } catch (err) {
      Swal.fire("Error", err.message || "No se pudo eliminar.", "error");
    }
  };

  const rolBadge = (role) => {
    if (role === "admin") return <Badge bg="danger">Admin</Badge>;
    if (role === "coach") return <Badge bg="success">Coach</Badge>;
    return <Badge bg="primary">Usuario</Badge>;
  };

  return (
    <div>
      <div
        style={{
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          borderRadius: "12px",
          padding: "1.5rem 2rem",
          marginBottom: "1.5rem",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontWeight: "bold" }}>👥 Gestión de Usuarios</h2>
          <small style={{ opacity: 0.8 }}>{users.length} usuario{users.length !== 1 ? "s" : ""} registrado{users.length !== 1 ? "s" : ""}</small>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Button variant="light" size="sm" onClick={cargarUsuarios} disabled={cargando} style={{ color: "#7c3aed", fontWeight: "600" }}>
            🔄 Refrescar
          </Button>
          <Button variant="warning" size="sm" onClick={abrirCrear} style={{ fontWeight: "600" }}>
            + Nuevo Usuario
          </Button>
        </div>
      </div>

      {cargando ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Cargando usuarios...</p>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <Table hover responsive style={{ margin: 0 }}>
            <thead style={{ background: "#f3f4f6" }}>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={{ color: "#6b7280", fontSize: "0.85rem" }}>{u.id}</td>
                  <td style={{ fontWeight: "600" }}>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{rolBadge(u.role)}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <Button variant="outline-primary" size="sm" onClick={() => abrirEditar(u)}>
                        ✏️ Editar
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleEliminar(u)}>
                        🗑️ Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}>
          <Modal.Title>{editando ? "✏️ Editar Usuario" : "➕ Nuevo Usuario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                isInvalid={!!errores.name}
              />
              <Form.Control.Feedback type="invalid">{errores.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                isInvalid={!!errores.email}
              />
              <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña {editando ? "(dejar vacío para no cambiar)" : "*"}</Form.Label>
              <Form.Control
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                isInvalid={!!errores.password}
              />
              <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="user">Usuario</option>
                <option value="coach">Coach</option>
                <option value="admin">Administrador</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button style={{ background: "#7c3aed", border: "none" }} onClick={handleGuardar} disabled={guardando}>
            {guardando ? "Guardando..." : editando ? "Actualizar" : "Crear Usuario"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UsersPage;