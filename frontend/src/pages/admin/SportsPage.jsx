import { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Badge, Spinner, FormCheck } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  getSports,
  createSport,
  updateSport,
  deleteSport,
  updateSportStatus,
} from "../../services/Sportservice";

// Formatea fecha: "15 de Julio de 2026"
function formatDate(dateStr) {
  if (!dateStr) return "-";
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  const date = new Date(dateStr);
  const dia = String(date.getUTCDate()).padStart(2, "0");
  const mes = meses[date.getUTCMonth()];
  const año = date.getUTCFullYear();
  return `${dia} de ${mes} de ${año}`;
}

const INITIAL_FORM = { name: "", objective: "", duration: "", status: true };

function SportsPage() {
  const [sports, setSports] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null); // null = crear, objeto = editar
  const [form, setForm] = useState(INITIAL_FORM);
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);

  const cargarDeportes = async () => {
    setCargando(true);
    try {
      const data = await getSports();
      setSports(data);
    } catch (err) {
      Swal.fire("Error", err.message || "No se pudieron cargar los deportes", "error");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDeportes();
  }, []);

  // Abrir modal crear
  const abrirCrear = () => {
    setEditando(null);
    setForm(INITIAL_FORM);
    setErrores({});
    setShowModal(true);
  };

  // Abrir modal editar
  const abrirEditar = (sport) => {
    setEditando(sport);
    setForm({
      name: sport.name,
      objective: sport.objective,
      duration: sport.duration,
      status: sport.status,
    });
    setErrores({});
    setShowModal(true);
  };

  // Validar formulario
  const validar = () => {
    const e = {};
    if (!form.name.trim()) e.name = "El nombre es obligatorio.";
    if (!form.objective.trim()) e.objective = "El objetivo es obligatorio.";
    if (!form.duration || isNaN(form.duration) || Number(form.duration) <= 0)
      e.duration = "La duración es obligatoria y debe ser un número positivo.";
    return e;
  };

  // Guardar (crear o editar)
  const handleGuardar = async () => {
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length > 0) return;

    setGuardando(true);
    try {
      const payload = {
        name: form.name.trim(),
        objective: form.objective.trim(),
        duration: Number(form.duration),
        status: form.status,
      };

      if (editando) {
        const actualizado = await updateSport(editando.id, payload);
        setSports((prev) =>
          prev.map((s) => (s.id === editando.id ? actualizado : s))
        );
        Swal.fire("¡Actualizado!", "El deporte fue actualizado correctamente.", "success");
      } else {
        const nuevo = await createSport(payload);
        setSports((prev) => [...prev, nuevo]);
        Swal.fire("¡Creado!", "El deporte fue creado correctamente.", "success");
      }
      setShowModal(false);
    } catch (err) {
      Swal.fire("Error", err.message || "Ocurrió un error al guardar.", "error");
    } finally {
      setGuardando(false);
    }
  };

  // Eliminar con confirmación SweetAlert2
  const handleEliminar = async (sport) => {
    const result = await Swal.fire({
      title: "¿Está seguro de eliminar este deporte?",
      text: `"${sport.name}" será eliminado permanentemente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteSport(sport.id);
      setSports((prev) => prev.filter((s) => s.id !== sport.id));
      Swal.fire("Eliminado", "El deporte fue eliminado correctamente.", "success");
    } catch (err) {
      Swal.fire("Error", err.message || "No se pudo eliminar.", "error");
    }
  };

  // Cambio de estado con Switch
  const handleCambiarEstado = async (sport) => {
    try {
      const actualizado = await updateSportStatus(sport.id, !sport.status);
      setSports((prev) =>
        prev.map((s) => (s.id === sport.id ? actualizado : s))
      );
    } catch (err) {
      Swal.fire("Error", err.message || "No se pudo cambiar el estado.", "error");
    }
  };

  return (
    <div>
      {/* Encabezado */}
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
          <h2 style={{ margin: 0, fontWeight: "bold" }}>🏅 Gestión de Deportes</h2>
          <small style={{ opacity: 0.8 }}>
            {sports.length} deporte{sports.length !== 1 ? "s" : ""} registrado{sports.length !== 1 ? "s" : ""}
          </small>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Button
            variant="light"
            size="sm"
            onClick={cargarDeportes}
            disabled={cargando}
            style={{ color: "#7c3aed", fontWeight: "600" }}
          >
            🔄 Refrescar
          </Button>
          <Button
            variant="warning"
            size="sm"
            onClick={abrirCrear}
            style={{ fontWeight: "600" }}
          >
            + Nuevo Deporte
          </Button>
        </div>
      </div>

      {/* Tabla */}
      {cargando ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Cargando deportes...</p>
        </div>
      ) : sports.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <p>No hay deportes registrados. ¡Crea el primero!</p>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <Table hover responsive style={{ margin: 0 }}>
            <thead style={{ background: "#f3f4f6" }}>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Objetivo</th>
                <th>Duración</th>
                <th>Estado</th>
                <th>Fecha de creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sports.map((sport) => (
                <tr key={sport.id}>
                  <td style={{ color: "#6b7280", fontSize: "0.85rem" }}>{sport.id}</td>
                  <td style={{ fontWeight: "600" }}>{sport.name}</td>
                  <td style={{ maxWidth: "220px", fontSize: "0.9rem", color: "#4b5563" }}>
                    {sport.objective}
                  </td>
                  <td>
                    <Badge bg="secondary">{sport.duration} min</Badge>
                  </td>
                  <td>
                    <FormCheck
                      type="switch"
                      id={`switch-${sport.id}`}
                      checked={sport.status}
                      onChange={() => handleCambiarEstado(sport)}
                      label={sport.status ? "Activo" : "Inactivo"}
                    />
                  </td>
                  <td style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                    {formatDate(sport.created_at)}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => abrirEditar(sport)}
                      >
                        ✏️ Editar
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleEliminar(sport)}
                      >
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

      {/* Modal crear / editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
        >
          <Modal.Title>
            {editando ? "✏️ Editar Deporte" : "➕ Nuevo Deporte"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: CrossFit"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                isInvalid={!!errores.name}
              />
              <Form.Control.Feedback type="invalid">
                {errores.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Objetivo *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ej: Mejorar fuerza y resistencia física general."
                value={form.objective}
                onChange={(e) => setForm({ ...form, objective: e.target.value })}
                isInvalid={!!errores.objective}
              />
              <Form.Control.Feedback type="invalid">
                {errores.objective}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duración (minutos) *</Form.Label>
              <Form.Control
                type="number"
                min={1}
                placeholder="Ej: 60"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                isInvalid={!!errores.duration}
              />
              <Form.Control.Feedback type="invalid">
                {errores.duration}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <FormCheck
                type="switch"
                id="switch-estado-modal"
                label={form.status ? "Activo" : "Inactivo"}
                checked={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            style={{ background: "#7c3aed", border: "none" }}
            onClick={handleGuardar}
            disabled={guardando}
          >
            {guardando ? "Guardando..." : editando ? "Actualizar" : "Crear Deporte"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SportsPage;