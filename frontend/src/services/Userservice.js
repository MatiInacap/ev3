import { getToken } from "./authservice";

const API_URL = "http://localhost:3000/api/users";

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

export async function getUsers() {
  const res = await fetch(API_URL, { headers: getHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al obtener usuarios");
  return data.data;
}

export async function createUser(user) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al crear usuario");
  return data.data;
}

export async function updateUser(id, user) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al actualizar usuario");
  return data.data;
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al eliminar usuario");
  return data;
}