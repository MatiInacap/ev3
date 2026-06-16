import { getToken } from "./authservice";

const API_URL = "http://localhost:3000/api/sports";

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

export async function getSports() {
  const res = await fetch(API_URL, { headers: getHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al obtener deportes");
  return data.data;
}

export async function createSport(sport) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(sport),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al crear deporte");
  return data.data;
}

export async function updateSport(id, sport) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(sport),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al actualizar deporte");
  return data.data;
}

export async function deleteSport(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al eliminar deporte");
  return data;
}

export async function updateSportStatus(id, status) {
  const res = await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al cambiar estado");
  return data.data;
}