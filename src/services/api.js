const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5153"

const getToken = () => localStorage.getItem("token")
const getCreadorToken = () => localStorage.getItem("creadorToken")

const authHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${getToken()}`
})

const creadorAuthHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${getCreadorToken()}`
})

// Auth admin
export const login = async (datos) => {
  const respuesta = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
  if (!respuesta.ok) throw new Error("Credenciales incorrectas")
  return await respuesta.json()
}

// Creadores
export const registrarCreador = async (datos) => {
  const respuesta = await fetch(`${BASE_URL}/api/creador/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
  if (!respuesta.ok) {
    const error = await respuesta.json()
    throw new Error(error.mensaje || "Error al registrar")
  }
  return await respuesta.json()
}

export const loginCreador = async (datos) => {
  const respuesta = await fetch(`${BASE_URL}/api/creador/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
  if (!respuesta.ok) throw new Error("Credenciales incorrectas")
  return await respuesta.json()
}

export const obtenerPerfilCreador = async () => {
  const respuesta = await fetch(`${BASE_URL}/api/creador/perfil`, {
    headers: creadorAuthHeaders()
  })
  if (!respuesta.ok) throw new Error("Error al obtener perfil")
  return await respuesta.json()
}

export const actualizarPerfilCreador = async (datos) => {
  const respuesta = await fetch(`${BASE_URL}/api/creador/perfil`, {
    method: "PUT",
    headers: creadorAuthHeaders(),
    body: JSON.stringify(datos)
  })
  if (!respuesta.ok) throw new Error("Error al actualizar perfil")
  return await respuesta.json()
}

// Admin
export const obtenerCreadores = async () => {
  const respuesta = await fetch(`${BASE_URL}/api/creador`, {
    headers: authHeaders()
  })
  if (!respuesta.ok) throw new Error("Error al obtener creadores")
  return await respuesta.json()
}

export const cambiarEstadoCreador = async (id, estado) => {
  const respuesta = await fetch(`${BASE_URL}/api/creador/${id}/estado`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ estado })
  })
  if (!respuesta.ok) throw new Error("Error al cambiar estado")
  return await respuesta.json()
}

export const eliminarCreador = async (id) => {
  const respuesta = await fetch(`${BASE_URL}/api/creador/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  })
  if (!respuesta.ok) throw new Error("Error al eliminar")
}

export const crearSolicitudEmpresa = async (datos) => {
  const respuesta = await fetch(`${BASE_URL}/api/empresa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
  if (!respuesta.ok) throw new Error("Error al enviar solicitud")
  return await respuesta.json()
}

export const obtenerEmpresas = async () => {
  const respuesta = await fetch(`${BASE_URL}/api/empresa`, {
    headers: authHeaders()
  })
  if (!respuesta.ok) throw new Error("Error al obtener empresas")
  return await respuesta.json()
}

export const cambiarEstadoEmpresa = async (id, estado) => {
  const respuesta = await fetch(`${BASE_URL}/api/empresa/${id}/estado`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ estado })
  })
  if (!respuesta.ok) throw new Error("Error al cambiar estado")
  return await respuesta.json()
}

export const eliminarEmpresa = async (id) => {
  const respuesta = await fetch(`${BASE_URL}/api/empresa/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  })
  if (!respuesta.ok) throw new Error("Error al eliminar")
}

export const actualizarDatosBasicosCreador = async (datos) => {
  const respuesta = await fetch(`${BASE_URL}/api/creador/perfil/basicos`, {
    method: "PUT",
    headers: creadorAuthHeaders(),
    body: JSON.stringify(datos)
  })
  if (!respuesta.ok) throw new Error("Error al actualizar datos")
  return await respuesta.json()
}