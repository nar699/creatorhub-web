const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5153"

const getToken = () => localStorage.getItem("token")

const authHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${getToken()}`
})

export const registrarCreador = async (datos) => {
  const respuesta = await fetch(`${BASE_URL}/api/creador`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
  if (!respuesta.ok) throw new Error("Error al registrar")
  return await respuesta.json()
}

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

export const login = async (datos) => {
  const respuesta = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
  if (!respuesta.ok) throw new Error("Credenciales incorrectas")
  return await respuesta.json()
}