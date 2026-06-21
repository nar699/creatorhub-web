const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const registrarCreador = async (datos) => {
  const respuesta = await fetch(`${BASE_URL}/api/creador`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });

  if (!respuesta.ok) throw new Error("Error al registrar");
  return await respuesta.json();
};

export const obtenerCreadores = async () => {
  const respuesta = await fetch(`${BASE_URL}/api/creador`);
  if (!respuesta.ok) throw new Error("Error al obtener creadores");
  return await respuesta.json();
};