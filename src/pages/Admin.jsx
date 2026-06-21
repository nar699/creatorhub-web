import { useState, useEffect } from "react"
import { obtenerCreadores, cambiarEstadoCreador, obtenerEmpresas, cambiarEstadoEmpresa } from "../services/api"

export default function Admin() {
  const [pestana, setPestana] = useState("creadores")
  const [creadores, setCreadores] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState("")
  const [filtroNicho, setFiltroNicho] = useState("")

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      const [dataCreadores, dataEmpresas] = await Promise.all([
        obtenerCreadores(),
        obtenerEmpresas()
      ])
      setCreadores(dataCreadores)
      setEmpresas(dataEmpresas)
    } catch (err) {
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  const handleCambiarEstadoCreador = async (id, nuevoEstado) => {
    try {
      const actualizado = await cambiarEstadoCreador(id, nuevoEstado)
      setCreadores(prev => prev.map(c => c.id === actualizado.id ? actualizado : c))
    } catch {
      alert("Error al cambiar el estado")
    }
  }

  const handleCambiarEstadoEmpresa = async (id, nuevoEstado) => {
    try {
      const actualizado = await cambiarEstadoEmpresa(id, nuevoEstado)
      setEmpresas(prev => prev.map(e => e.id === actualizado.id ? actualizado : e))
    } catch {
      alert("Error al cambiar el estado")
    }
  }

  const creadoresFiltrados = creadores.filter(c => {
    const coincideBusqueda =
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.email.toLowerCase().includes(busqueda.toLowerCase())
    const coincideNicho = filtroNicho ? c.nichos.includes(filtroNicho) : true
    return coincideBusqueda && coincideNicho
  })

  const empresasFiltradas = empresas.filter(e =>
    e.nombreEmpresa.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.email.toLowerCase().includes(busqueda.toLowerCase())
  )

  const todosLosNichos = [...new Set(creadores.flatMap(c => c.nichos))]

  if (cargando) {
    return (
      <div style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--color-text-secondary)"
      }}>
        Cargando...
      </div>
    )
  }

  return (
    <main style={{ padding: "2.5rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>

      {/* Cabecera */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "700", marginBottom: "0.25rem" }}>
          Panel de administración
        </h1>
        <p style={{ color: "var(--color-text-secondary)" }}>
          {creadores.length} creadores · {empresas.length} empresas
        </p>
      </div>

      {/* Pestañas */}
      <div style={{
        display: "flex", gap: "0.5rem",
        marginBottom: "2rem",
        borderBottom: "1px solid var(--color-border)",
        paddingBottom: "0"
      }}>
        {["creadores", "empresas"].map(p => (
          <button
            key={p}
            onClick={() => { setPestana(p); setBusqueda(""); setFiltroNicho("") }}
            style={{
              padding: "0.75rem 1.5rem",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontWeight: pestana === p ? "600" : "400",
              color: pestana === p ? "var(--color-primary)" : "var(--color-text-secondary)",
              borderBottom: pestana === p ? "2px solid var(--color-primary)" : "2px solid transparent",
              fontSize: "var(--font-size-sm)",
              transition: "var(--transition)",
              textTransform: "capitalize"
            }}
          >
            {p === "creadores" ? `Creadores (${creadores.length})` : `Empresas (${empresas.length})`}
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <input
          placeholder={pestana === "creadores" ? "Buscar por nombre o email..." : "Buscar empresa o email..."}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            flex: 1, minWidth: "200px",
            padding: "0.625rem 0.875rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--color-border)",
            fontSize: "var(--font-size-sm)",
            outline: "none"
          }}
        />
        {pestana === "creadores" && (
          <select
            value={filtroNicho}
            onChange={(e) => setFiltroNicho(e.target.value)}
            style={{
              padding: "0.625rem 0.875rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--color-border)",
              fontSize: "var(--font-size-sm)",
              background: "var(--color-bg)",
              outline: "none"
            }}
          >
            <option value="">Todos los nichos</option>
            {todosLosNichos.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        )}
      </div>

      {/* Contenido creadores */}
      {pestana === "creadores" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {creadoresFiltrados.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "4rem",
              color: "var(--color-text-muted)",
              background: "var(--color-bg-secondary)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)"
            }}>
              {creadores.length === 0 ? "Aún no hay creadores registrados" : "No hay resultados"}
            </div>
          ) : creadoresFiltrados.map((creador) => (
            <div key={creador.id} style={{
              background: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              boxShadow: "var(--shadow)",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1rem",
              alignItems: "start"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <h3 style={{ fontWeight: "600" }}>{creador.nombre} {creador.apellido}</h3>
                  <select
                    value={creador.estado}
                    onChange={(e) => handleCambiarEstadoCreador(creador.id, e.target.value)}
                    style={{
                      fontSize: "0.7rem", padding: "0.2rem 0.6rem",
                      borderRadius: "999px", border: "1px solid", cursor: "pointer", fontWeight: "500",
                      background: creador.estado === "Activo" ? "#dcfce7" : creador.estado === "Inactivo" ? "#fee2e2" : "#f3f4f6",
                      color: creador.estado === "Activo" ? "#166534" : creador.estado === "Inactivo" ? "#991b1b" : "var(--color-text-muted)",
                      borderColor: creador.estado === "Activo" ? "#86efac" : creador.estado === "Inactivo" ? "#fca5a5" : "var(--color-border)"
                    }}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)", marginBottom: "0.75rem" }}>
                  {creador.email}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
                  {creador.nichos.map(n => (
                    <span key={n} style={{
                      padding: "0.2rem 0.75rem", borderRadius: "999px",
                      background: "var(--color-bg-secondary)",
                      border: "1px solid var(--color-border)",
                      fontSize: "0.75rem", color: "var(--color-text-secondary)"
                    }}>{n}</span>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {creador.redesSociales.map((red, i) => (
                    <a key={i} href={red.url} target="_blank" rel="noreferrer" style={{
                      fontSize: "0.75rem", color: "var(--color-text-secondary)",
                      textDecoration: "none", padding: "0.2rem 0.75rem",
                      border: "1px solid var(--color-border)", borderRadius: "var(--radius)"
                    }}>{red.plataforma}</a>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
                {new Date(creador.fechaRegistro).toLocaleDateString("es-ES", { timeZone: "Europe/Madrid" })}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Contenido empresas */}
      {pestana === "empresas" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {empresasFiltradas.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "4rem",
              color: "var(--color-text-muted)",
              background: "var(--color-bg-secondary)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)"
            }}>
              {empresas.length === 0 ? "Aún no hay solicitudes de empresas" : "No hay resultados"}
            </div>
          ) : empresasFiltradas.map((empresa) => (
            <div key={empresa.id} style={{
              background: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              boxShadow: "var(--shadow)",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1rem",
              alignItems: "start"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <h3 style={{ fontWeight: "600" }}>{empresa.nombreEmpresa}</h3>
                  <select
                    value={empresa.estado}
                    onChange={(e) => handleCambiarEstadoEmpresa(empresa.id, e.target.value)}
                    style={{
                      fontSize: "0.7rem", padding: "0.2rem 0.6rem",
                      borderRadius: "999px", border: "1px solid", cursor: "pointer", fontWeight: "500",
                      background: empresa.estado === "Activa" ? "#dcfce7" : empresa.estado === "Contactada" ? "#dbeafe" : "#f3f4f6",
                      color: empresa.estado === "Activa" ? "#166534" : empresa.estado === "Contactada" ? "#1e40af" : "var(--color-text-muted)",
                      borderColor: empresa.estado === "Activa" ? "#86efac" : empresa.estado === "Contactada" ? "#93c5fd" : "var(--color-border)"
                    }}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Contactada">Contactada</option>
                    <option value="Activa">Activa</option>
                  </select>
                </div>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)", marginBottom: "0.25rem" }}>
                  👤 {empresa.nombreContacto} · {empresa.email}
                  {empresa.telefono && ` · ${empresa.telefono}`}
                </p>
                <p style={{
                  color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)",
                  marginTop: "0.75rem", lineHeight: "1.6",
                  background: "var(--color-bg-secondary)",
                  padding: "0.75rem", borderRadius: "var(--radius)",
                  border: "1px solid var(--color-border)"
                }}>
                  {empresa.descripcion}
                </p>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
                {new Date(empresa.fechaSolicitud).toLocaleDateString("es-ES", { timeZone: "Europe/Madrid" })}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}