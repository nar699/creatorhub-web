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
    } catch (err) {
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
        padding: "2rem"
      }}>
        <div style={{
          width: "64px", height: "64px",
          background: "var(--color-success)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2rem", color: "#fff",
          marginBottom: "1.5rem"
        }}>✓</div>
        <h2 style={{ fontSize: "var(--font-size-xl)", fontWeight: "700", marginBottom: "0.75rem" }}>
          ¡Registro completado!
        </h2>
        <p style={{ color: "var(--color-text-secondary)" }}>
          Pronto nos pondremos en contacto contigo.
        </p>
      </div>
    )
  }

  return (
    <main style={{ padding: "4rem 2rem", maxWidth: "640px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "700", marginBottom: "0.5rem" }}>
        Crea tu perfil
      </h1>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "2.5rem" }}>
        Únete a nuestra red de creadores y empieza a colaborar con marcas.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Nombre y apellido */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {["nombre", "apellido"].map((field) => (
            <div key={field}>
              <label style={labelStyle}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                placeholder={field === "nombre" ? "Ana" : "García"}
                style={inputStyle}
              />
            </div>
          ))}
        </div>

        {/* Email */}
        <div>
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

        {/* Nichos */}
        <div>
          <label style={labelStyle}>Nichos de contenido</label>
          <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>
            Selecciona todos los que apliquen
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {NICHOS.map((nicho) => (
              <button
                key={nicho}
                type="button"
                onClick={() => toggleNicho(nicho)}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "999px",
                  border: "1px solid",
                  fontSize: "var(--font-size-sm)",
                  cursor: "pointer",
                  transition: "var(--transition)",
                  background: form.nichos.includes(nicho) ? "var(--color-accent)" : "var(--color-bg)",
                  color: form.nichos.includes(nicho) ? "#fff" : "var(--color-text-secondary)",
                  borderColor: form.nichos.includes(nicho) ? "var(--color-accent)" : "var(--color-border)"
                }}
              >
                {nicho}
              </button>
            ))}
          </div>
        </div>

        {/* Redes sociales */}
        <div>
          <label style={labelStyle}>Redes sociales</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {form.redesSociales.map((red, index) => (
              <div key={index} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <select
                  value={red.plataforma}
                  onChange={(e) => updateRedSocial(index, "plataforma", e.target.value)}
                  style={{ ...inputStyle, width: "160px", flex: "none" }}
                >
                  {PLATAFORMAS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <input
                  value={red.url}
                  onChange={(e) => updateRedSocial(index, "url", e.target.value)}
                  placeholder="https://..."
                  style={{ ...inputStyle, flex: 1 }}
                />
                {form.redesSociales.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRedSocial(index)}
                    style={{
                      background: "none",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius)",
                      padding: "0.5rem 0.75rem",
                      cursor: "pointer",
                      color: "var(--color-text-muted)",
                      fontSize: "1rem"
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
                border: "1px dashed var(--color-border)",
                borderRadius: "var(--radius)",
                padding: "0.75rem",
                cursor: "pointer",
                color: "var(--color-text-secondary)",
                fontSize: "var(--font-size-sm)",
                transition: "var(--transition)"
              }}
            >
              + Añadir red social
            </button>
          </div>
        </div>

        {error && (
          <p style={{ color: "var(--color-error)", fontSize: "var(--font-size-sm)" }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={enviando}
          style={{
            background: "var(--color-accent)",
            color: "#fff",
            padding: "0.875rem",
            borderRadius: "var(--radius)",
            border: "none",
            fontWeight: "600",
            fontSize: "var(--font-size-md)",
            cursor: enviando ? "not-allowed" : "pointer",
            opacity: enviando ? 0.7 : 1,
            transition: "var(--transition)"
          }}
        >
          {enviando ? "Enviando..." : "Crear mi perfil"}
        </button>

      </form>
    </main>
  )
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
  transition: "var(--transition)"
}