import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { obtenerPerfilCreador, actualizarPerfilCreador, actualizarDatosBasicosCreador } from "../services/api"

const NICHOS = [
  "Moda", "Belleza", "Gaming", "Cocina", "Viajes",
  "Fitness", "Tecnología", "Música", "Arte", "Lifestyle",
  "Humor", "Educación", "Deportes", "Mascotas", "Negocios"
]

const PLATAFORMAS = [
  "Instagram", "TikTok", "YouTube", "Twitter/X",
  "Twitch", "LinkedIn", "Pinterest", "Snapchat",
  "Portfolio/Web", "Canva", "Otro"
]

const TIPOS_CONTENIDO = [
  "Unboxing", "Review de producto", "Lifestyle", "Tutorial",
  "Testimonio", "Antes y después", "Día a día", "Humor",
  "Receta", "Fitness", "Viaje", "Moda y outfit"
]

const IDIOMAS = [
  "Español", "Inglés", "Catalán", "Portugués",
  "Francés", "Italiano", "Alemán", "Otro"
]

export default function Dashboard() {
  const [perfil, setPerfil] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [pestana, setPestana] = useState("basicos")
  const navigate = useNavigate()

  // Datos básicos
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [nichos, setNichos] = useState([])
  const [redesSociales, setRedesSociales] = useState([{ plataforma: "Instagram", url: "" }])

  // Datos UGC
  const [tiposContenido, setTiposContenido] = useState([])
  const [idiomas, setIdiomas] = useState([])

  const cuenta = JSON.parse(localStorage.getItem("creadorCuenta") || "null")

  useEffect(() => {
    if (!localStorage.getItem("creadorToken")) {
      navigate("/login")
      return
    }
    cargarPerfil()
  }, [])

  const cargarPerfil = async () => {
    try {
      const datos = await obtenerPerfilCreador()
      setPerfil(datos)
      setNombre(datos.nombre)
      setApellido(datos.apellido)
      setNichos(datos.nichos || [])
      setRedesSociales(datos.redesSociales?.length > 0
        ? datos.redesSociales
        : [{ plataforma: "Instagram", url: "" }])
      setTiposContenido(datos.tiposContenido || [])
      setIdiomas(datos.idiomas || [])
    } catch {
      navigate("/login-creador")
    } finally {
      setCargando(false)
    }
  }

  const toggleItem = (item, lista, setLista) => {
    setLista(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    )
    setGuardado(false)
  }

  const addRedSocial = () => {
    setRedesSociales(prev => [...prev, { plataforma: "Instagram", url: "" }])
  }

  const removeRedSocial = (index) => {
    setRedesSociales(prev => prev.filter((_, i) => i !== index))
  }

  const updateRedSocial = (index, field, value) => {
    setRedesSociales(prev =>
      prev.map((r, i) => i === index ? { ...r, [field]: value } : r)
    )
  }

  const handleGuardarBasicos = async () => {
    setGuardando(true)
    try {
      const actualizado = await actualizarDatosBasicosCreador({
        nombre, apellido, nichos, redesSociales
      })
      setPerfil(actualizado)
      setGuardado(true)
    } catch {
      alert("Error al guardar")
    } finally {
      setGuardando(false)
    }
  }

  const handleGuardarUGC = async () => {
    setGuardando(true)
    try {
      const actualizado = await actualizarPerfilCreador({ tiposContenido, idiomas })
      setPerfil(actualizado)
      setGuardado(true)
    } catch {
      alert("Error al guardar")
    } finally {
      setGuardando(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("creadorToken")
    localStorage.removeItem("creadorCuenta")
    navigate("/")
  }

  if (cargando) {
    return (
      <div style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--color-text-secondary)"
      }}>
        Cargando tu perfil...
      </div>
    )
  }

  return (
    <main style={{
      minHeight: "calc(100vh - 64px)",
      background: "var(--gradient-section)",
      padding: "3rem 2rem"
    }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Cabecera */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "2rem"
        }}>
          <div>
            <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "700", marginBottom: "0.25rem" }}>
              Hola, {perfil?.nombre} 👋
            </h1>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
              {cuenta?.email}
            </p>
          </div>
          <button onClick={handleLogout} style={{
            background: "none",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-sm)"
          }}>
            Cerrar sesión
          </button>
        </div>

        {/* Estado perfil */}
        <div style={{
          background: perfil?.perfilCompleto ? "#dcfce7" : "#fef3c7",
          border: `1px solid ${perfil?.perfilCompleto ? "#86efac" : "#fcd34d"}`,
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem 1.5rem",
          marginBottom: "2rem",
          display: "flex", alignItems: "center", gap: "1rem"
        }}>
          <span style={{ fontSize: "1.5rem" }}>
            {perfil?.perfilCompleto ? "✅" : "⚠️"}
          </span>
          <div>
            <p style={{
              fontWeight: "600",
              color: perfil?.perfilCompleto ? "#166534" : "#92400e"
            }}>
              {perfil?.perfilCompleto ? "Perfil completo" : "Perfil incompleto"}
            </p>
            <p style={{
              fontSize: "var(--font-size-sm)",
              color: perfil?.perfilCompleto ? "#166534" : "#92400e",
              opacity: 0.8
            }}>
              {perfil?.perfilCompleto
                ? "Tu perfil está visible para las marcas"
                : "Añade tipos de contenido e idiomas para completar tu perfil"}
            </p>
          </div>
        </div>

        {/* Pestañas */}
        <div style={{
          display: "flex", gap: "0.5rem",
          marginBottom: "2rem",
          borderBottom: "1px solid var(--color-border)"
        }}>
          {[
            { key: "basicos", label: "Datos básicos" },
            { key: "ugc", label: "Contenido UGC" }
          ].map(p => (
            <button
              key={p.key}
              onClick={() => { setPestana(p.key); setGuardado(false) }}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontWeight: pestana === p.key ? "600" : "400",
                color: pestana === p.key ? "var(--color-primary)" : "var(--color-text-secondary)",
                borderBottom: pestana === p.key ? "2px solid var(--color-primary)" : "2px solid transparent",
                fontSize: "var(--font-size-sm)",
                transition: "var(--transition)"
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Pestaña datos básicos */}
        {pestana === "basicos" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Nombre y apellido */}
            <div style={seccionStyle}>
              <h2 style={seccionTituloStyle}>Información personal</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Nombre</label>
                  <input
                    value={nombre}
                    onChange={(e) => { setNombre(e.target.value); setGuardado(false) }}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Apellido</label>
                  <input
                    value={apellido}
                    onChange={(e) => { setApellido(e.target.value); setGuardado(false) }}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Nichos */}
            <div style={seccionStyle}>
              <h2 style={seccionTituloStyle}>Nichos de contenido</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {NICHOS.map(nicho => (
                  <button
                    key={nicho}
                    type="button"
                    onClick={() => toggleItem(nicho, nichos, setNichos)}
                    style={{
                      padding: "0.5rem 1.25rem",
                      borderRadius: "999px",
                      border: "1.5px solid",
                      fontSize: "var(--font-size-sm)",
                      cursor: "pointer",
                      transition: "var(--transition)",
                      fontWeight: nichos.includes(nicho) ? "600" : "400",
                      background: nichos.includes(nicho) ? "var(--gradient-button)" : "var(--color-bg)",
                      color: nichos.includes(nicho) ? "#fff" : "var(--color-text-secondary)",
                      borderColor: nichos.includes(nicho) ? "transparent" : "var(--color-border)"
                    }}
                  >
                    {nicho}
                  </button>
                ))}
              </div>
            </div>

            {/* Redes sociales */}
            <div style={seccionStyle}>
              <h2 style={seccionTituloStyle}>Redes sociales</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {redesSociales.map((red, index) => (
                  <div key={index} style={{
                    display: "flex", gap: "0.75rem", alignItems: "center",
                    background: "var(--color-bg-secondary)",
                    padding: "0.75rem",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--color-border)"
                  }}>
                    <select
                      value={red.plataforma}
                      onChange={(e) => { updateRedSocial(index, "plataforma", e.target.value); setGuardado(false) }}
                      style={{ ...inputStyle, width: "150px", flex: "none", background: "var(--color-bg)" }}
                    >
                      {PLATAFORMAS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <input
                      value={red.url}
                      onChange={(e) => { updateRedSocial(index, "url", e.target.value); setGuardado(false) }}
                      placeholder="https://..."
                      style={{ ...inputStyle, flex: 1, background: "var(--color-bg)" }}
                    />
                    {redesSociales.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRedSocial(index)}
                        style={{
                          background: "none",
                          border: "1px solid #fca5a5",
                          borderRadius: "var(--radius)",
                          padding: "0.5rem 0.75rem",
                          cursor: "pointer",
                          color: "#ef4444",
                          flexShrink: 0
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRedSocial}
                  style={{
                    background: "none",
                    border: "1.5px dashed var(--color-primary)",
                    borderRadius: "var(--radius)",
                    padding: "0.75rem",
                    cursor: "pointer",
                    color: "var(--color-primary)",
                    fontSize: "var(--font-size-sm)",
                    fontWeight: "500"
                  }}
                >
                  + Añadir red social
                </button>
              </div>
            </div>

            <button
              onClick={handleGuardarBasicos}
              disabled={guardando}
              style={botonGuardarStyle(guardado, guardando)}
            >
              {guardando ? "Guardando..." : guardado ? "✓ Cambios guardados" : "Guardar cambios"}
            </button>
          </div>
        )}

        {/* Pestaña UGC */}
        {pestana === "ugc" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            <div style={seccionStyle}>
              <h2 style={seccionTituloStyle}>Tipos de contenido UGC</h2>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)", marginBottom: "1rem" }}>
                ¿Qué tipo de vídeos sabes hacer?
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {TIPOS_CONTENIDO.map(tipo => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => toggleItem(tipo, tiposContenido, setTiposContenido)}
                    style={{
                      padding: "0.5rem 1.25rem",
                      borderRadius: "999px",
                      border: "1.5px solid",
                      fontSize: "var(--font-size-sm)",
                      cursor: "pointer",
                      transition: "var(--transition)",
                      fontWeight: tiposContenido.includes(tipo) ? "600" : "400",
                      background: tiposContenido.includes(tipo) ? "var(--gradient-button)" : "var(--color-bg)",
                      color: tiposContenido.includes(tipo) ? "#fff" : "var(--color-text-secondary)",
                      borderColor: tiposContenido.includes(tipo) ? "transparent" : "var(--color-border)"
                    }}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            </div>

            <div style={seccionStyle}>
              <h2 style={seccionTituloStyle}>Idiomas</h2>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)", marginBottom: "1rem" }}>
                ¿En qué idiomas puedes crear contenido?
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {IDIOMAS.map(idioma => (
                  <button
                    key={idioma}
                    type="button"
                    onClick={() => toggleItem(idioma, idiomas, setIdiomas)}
                    style={{
                      padding: "0.5rem 1.25rem",
                      borderRadius: "999px",
                      border: "1.5px solid",
                      fontSize: "var(--font-size-sm)",
                      cursor: "pointer",
                      transition: "var(--transition)",
                      fontWeight: idiomas.includes(idioma) ? "600" : "400",
                      background: idiomas.includes(idioma) ? "var(--gradient-button)" : "var(--color-bg)",
                      color: idiomas.includes(idioma) ? "#fff" : "var(--color-text-secondary)",
                      borderColor: idiomas.includes(idioma) ? "transparent" : "var(--color-border)"
                    }}
                  >
                    {idioma}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGuardarUGC}
              disabled={guardando}
              style={botonGuardarStyle(guardado, guardando)}
            >
              {guardando ? "Guardando..." : guardado ? "✓ Cambios guardados" : "Guardar cambios"}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

const seccionStyle = {
  background: "var(--color-bg)",
  borderRadius: "var(--radius-lg)",
  padding: "2rem",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-md)"
}

const seccionTituloStyle = {
  fontSize: "var(--font-size-lg)",
  fontWeight: "700",
  marginBottom: "1.25rem"
}

const labelStyle = {
  display: "block",
  fontSize: "var(--font-size-sm)",
  fontWeight: "500",
  marginBottom: "0.5rem",
  color: "var(--color-text-primary)"
}

const inputStyle = {
  width: "100%",
  padding: "0.625rem 0.875rem",
  borderRadius: "var(--radius)",
  border: "1px solid var(--color-border)",
  fontSize: "var(--font-size-md)",
  color: "var(--color-text-primary)",
  background: "var(--color-bg)",
  outline: "none",
  transition: "var(--transition)",
  fontFamily: "var(--font-family)"
}

const botonGuardarStyle = (guardado, guardando) => ({
  width: "100%",
  background: guardado ? "#dcfce7" : "var(--gradient-button)",
  color: guardado ? "#166534" : "#fff",
  padding: "1rem",
  borderRadius: "var(--radius)",
  border: guardado ? "1px solid #86efac" : "none",
  fontWeight: "700",
  fontSize: "var(--font-size-lg)",
  cursor: guardando ? "not-allowed" : "pointer",
  opacity: guardando ? 0.7 : 1,
  transition: "var(--transition)",
  boxShadow: guardado ? "none" : "var(--shadow-lg)"
})