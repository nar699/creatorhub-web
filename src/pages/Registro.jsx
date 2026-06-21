import { useState } from "react"
import { registrarCreador } from "../services/api"

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

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    nichos: [],
    redesSociales: [{ plataforma: "Instagram", url: "" }]
  })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const toggleNicho = (nicho) => {
    setForm(prev => ({
      ...prev,
      nichos: prev.nichos.includes(nicho)
        ? prev.nichos.filter(n => n !== nicho)
        : [...prev.nichos, nicho]
    }))
  }

  const addRedSocial = () => {
    setForm(prev => ({
      ...prev,
      redesSociales: [...prev.redesSociales, { plataforma: "Instagram", url: "" }]
    }))
  }

  const removeRedSocial = (index) => {
    setForm(prev => ({
      ...prev,
      redesSociales: prev.redesSociales.filter((_, i) => i !== index)
    }))
  }

  const updateRedSocial = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      redesSociales: prev.redesSociales.map((r, i) =>
        i === index ? { ...r, [field]: value } : r
      )
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (form.nichos.length === 0) {
      setError("Selecciona al menos un nicho")
      return
    }
    setEnviando(true)
    try {
      await registrarCreador(form)
      setEnviado(true)
    } catch {
      setError("Hubo un problema al enviar. Inténtalo de nuevo.")
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <div style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        background: "var(--gradient-section)"
      }}>
        <div style={{
          width: "80px", height: "80px",
          background: "var(--gradient-button)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2.5rem", color: "#fff",
          marginBottom: "1.5rem",
          boxShadow: "var(--shadow-lg)"
        }}>✓</div>
        <h2 style={{
          fontSize: "var(--font-size-2xl)",
          fontWeight: "700",
          marginBottom: "0.75rem",
          background: "var(--gradient-button)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          ¡Bienvenido a CreatorHub!
        </h2>
        <p style={{ color: "var(--color-text-secondary)", maxWidth: "400px", lineHeight: "1.7" }}>
          Tu perfil está en revisión. Pronto nos pondremos en contacto contigo con propuestas de colaboración.
        </p>
      </div>
    )
  }

  return (
    <main style={{
      minHeight: "calc(100vh - 64px)",
      background: "var(--gradient-section)",
      padding: "4rem 2rem"
    }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Cabecera */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            display: "inline-block",
            background: "rgba(124, 58, 237, 0.1)",
            color: "var(--color-primary)",
            padding: "0.35rem 1rem",
            borderRadius: "999px",
            fontSize: "var(--font-size-sm)",
            marginBottom: "1rem",
            border: "1px solid rgba(124, 58, 237, 0.2)",
            fontWeight: "500"
          }}>
            Únete gratis
          </span>
          <h1 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: "800",
            marginBottom: "0.75rem",
            background: "var(--gradient-button)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Crea tu perfil de creador
          </h1>
          <p style={{ color: "var(--color-text-secondary)", lineHeight: "1.7" }}>
            Rellena tu información y empieza a recibir propuestas de marcas
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>

          {/* Sección 1 — Datos personales */}
          <div style={seccionStyle}>
            <div style={seccionHeaderStyle}>
              <div style={numeroBadgeStyle}>1</div>
              <div>
                <h2 style={seccionTituloStyle}>Datos personales</h2>
                <p style={seccionDescStyle}>Tu información de contacto básica</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { name: "nombre", label: "Nombre", placeholder: "Ana" },
                { name: "apellido", label: "Apellido", placeholder: "García" }
              ].map(field => (
                <div key={field.name}>
                  <label style={labelStyle}>{field.label}</label>
                  <input
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    placeholder={field.placeholder}
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginTop: "1rem" }}>
              <label style={labelStyle}>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="ana@ejemplo.com"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Sección 2 — Nichos */}
          <div style={seccionStyle}>
            <div style={seccionHeaderStyle}>
              <div style={numeroBadgeStyle}>2</div>
              <div>
                <h2 style={seccionTituloStyle}>Nichos de contenido</h2>
                <p style={seccionDescStyle}>Selecciona todos los que apliquen</p>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {NICHOS.map((nicho) => (
                <button
                  key={nicho}
                  type="button"
                  onClick={() => toggleNicho(nicho)}
                  style={{
                    padding: "0.5rem 1.25rem",
                    borderRadius: "999px",
                    border: "1.5px solid",
                    fontSize: "var(--font-size-sm)",
                    cursor: "pointer",
                    transition: "var(--transition)",
                    fontWeight: form.nichos.includes(nicho) ? "600" : "400",
                    background: form.nichos.includes(nicho)
                      ? "var(--gradient-button)" : "var(--color-bg)",
                    color: form.nichos.includes(nicho) ? "#fff" : "var(--color-text-secondary)",
                    borderColor: form.nichos.includes(nicho)
                      ? "transparent" : "var(--color-border)",
                    boxShadow: form.nichos.includes(nicho) ? "var(--shadow-md)" : "none"
                  }}
                >
                  {nicho}
                </button>
              ))}
            </div>

            {form.nichos.length > 0 && (
              <p style={{
                marginTop: "0.75rem",
                fontSize: "var(--font-size-sm)",
                color: "var(--color-primary)",
                fontWeight: "500"
              }}>
                ✓ {form.nichos.length} nicho{form.nichos.length > 1 ? "s" : ""} seleccionado{form.nichos.length > 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Sección 3 — Redes sociales */}
          <div style={seccionStyle}>
            <div style={seccionHeaderStyle}>
              <div style={numeroBadgeStyle}>3</div>
              <div>
                <h2 style={seccionTituloStyle}>Redes sociales</h2>
                <p style={seccionDescStyle}>Añade todas las plataformas donde creas contenido</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {form.redesSociales.map((red, index) => (
                <div key={index} style={{
                  display: "flex", gap: "0.75rem", alignItems: "center",
                  background: "var(--color-bg-secondary)",
                  padding: "0.75rem",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--color-border)"
                }}>
                  <select
                    value={red.plataforma}
                    onChange={(e) => updateRedSocial(index, "plataforma", e.target.value)}
                    style={{ ...inputStyle, width: "150px", flex: "none", background: "var(--color-bg)" }}
                  >
                    {PLATAFORMAS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <input
                    value={red.url}
                    onChange={(e) => updateRedSocial(index, "url", e.target.value)}
                    placeholder="https://..."
                    style={{ ...inputStyle, flex: 1, background: "var(--color-bg)" }}
                  />
                  {form.redesSociales.length > 1 && (
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
                        fontSize: "1rem",
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
                  fontWeight: "500",
                  transition: "var(--transition)"
                }}
              >
                + Añadir red social
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              background: "#fee2e2",
              border: "1px solid #fca5a5",
              borderRadius: "var(--radius)",
              padding: "0.875rem 1rem",
              color: "#991b1b",
              fontSize: "var(--font-size-sm)",
              marginBottom: "1.5rem"
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={enviando}
            style={{
              width: "100%",
              background: enviando ? "var(--color-border)" : "var(--gradient-button)",
              color: "#fff",
              padding: "1rem",
              borderRadius: "var(--radius)",
              border: "none",
              fontWeight: "700",
              fontSize: "var(--font-size-lg)",
              cursor: enviando ? "not-allowed" : "pointer",
              transition: "var(--transition)",
              boxShadow: enviando ? "none" : "var(--shadow-lg)"
            }}
          >
            {enviando ? "Enviando..." : "Crear mi perfil →"}
          </button>
        </form>
      </div>
    </main>
  )
}

const seccionStyle = {
  background: "var(--color-bg)",
  borderRadius: "var(--radius-lg)",
  padding: "2rem",
  marginBottom: "1.5rem",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-md)"
}

const seccionHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "1.5rem"
}

const numeroBadgeStyle = {
  width: "36px", height: "36px",
  borderRadius: "50%",
  background: "var(--gradient-button)",
  display: "flex", alignItems: "center", justifyContent: "center",
  color: "#fff", fontWeight: "700", fontSize: "var(--font-size-sm)",
  flexShrink: 0,
  boxShadow: "var(--shadow-md)"
}

const seccionTituloStyle = {
  fontSize: "var(--font-size-lg)",
  fontWeight: "700",
  marginBottom: "0.2rem"
}

const seccionDescStyle = {
  fontSize: "var(--font-size-sm)",
  color: "var(--color-text-secondary)"
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