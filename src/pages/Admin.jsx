import { useState, useEffect } from "react"
import { obtenerCreadores } from "../services/api"

export default function Admin() {
  const [creadores, setCreadores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [busqueda, setBusqueda] = useState("")
  const [filtroNicho, setFiltroNicho] = useState("")

  useEffect(() => {
    cargarCreadores()
  }, [])

  const cargarCreadores = async () => {
    try {
      const datos = await obtenerCreadores()
      setCreadores(datos)
    } catch (err) {
      setError("Error al cargar los creadores")
    } finally {
      setCargando(false)
    }
  }

  const creadoresFiltrados = creadores.filter(c => {
    const coincideBusqueda =
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.email.toLowerCase().includes(busqueda.toLowerCase())

    const coincideNicho = filtroNicho
      ? c.nichos.includes(filtroNicho)
      : true

    return coincideBusqueda && coincideNicho
  })

  const todosLosNichos = [...new Set(creadores.flatMap(c => c.nichos))]

  if (cargando) {
    return (
      <div style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-text-secondary)"
      }}>
        Cargando creadores...
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
          {creadores.length} creadores registrados
        </p>
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <input
          placeholder="Buscar por nombre o email..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "0.625rem 0.875rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--color-border)",
            fontSize: "var(--font-size-sm)",
            outline: "none"
          }}
        />
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
      </div>

      {error && (
        <p style={{ color: "var(--color-error)", marginBottom: "1rem" }}>{error}</p>
      )}

      {/* Tabla */}
      {creadoresFiltrados.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "4rem",
          color: "var(--color-text-muted)",
          background: "var(--color-bg-secondary)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)"
        }}>
          {creadores.length === 0 ? "Aún no hay creadores registrados" : "No hay resultados para tu búsqueda"}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {creadoresFiltrados.map((creador) => (
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
                  <h3 style={{ fontWeight: "600", fontSize: "var(--font-size-md)" }}>
                    {creador.nombre} {creador.apellido}
                  </h3>
                  <span style={{
                    fontSize: "0.7rem",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    background: creador.estado === "Activo" ? "#dcfce7" : "#f3f4f6",
                    color: creador.estado === "Activo" ? "#166534" : "var(--color-text-muted)",
                    fontWeight: "500"
                  }}>
                    {creador.estado}
                  </span>
                </div>

                <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)", marginBottom: "0.75rem" }}>
                  {creador.email}
                </p>

                {/* Nichos */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
                  {creador.nichos.map(n => (
                    <span key={n} style={{
                      padding: "0.2rem 0.75rem",
                      borderRadius: "999px",
                      background: "var(--color-bg-secondary)",
                      border: "1px solid var(--color-border)",
                      fontSize: "0.75rem",
                      color: "var(--color-text-secondary)"
                    }}>
                      {n}
                    </span>
                  ))}
                </div>

                {/* Redes sociales */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {creador.redesSociales.map((red, i) => (
                    <a key={i} href={red.url} target="_blank" rel="noreferrer" style={{
                      fontSize: "0.75rem",
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      padding: "0.2rem 0.75rem",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius)",
                      transition: "var(--transition)"
                    }}>
                      {red.plataforma}
                    </a>
                  ))}
                </div>
              </div>

              <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
                {new Date(creador.fechaRegistro).toLocaleDateString("es-ES")}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}