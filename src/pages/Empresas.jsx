import { useState } from "react"
import { crearSolicitudEmpresa } from "../services/api"

export default function Empresas() {
  const [form, setForm] = useState({
    nombreEmpresa: "",
    nombreContacto: "",
    email: "",
    telefono: "",
    descripcion: ""
  })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setEnviando(true)
    try {
      await crearSolicitudEmpresa(form)
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
        padding: "2rem"
      }}>
        <div style={{
          width: "64px", height: "64px",
          background: "var(--gradient-button)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2rem", color: "#fff",
          marginBottom: "1.5rem"
        }}>✓</div>
        <h2 style={{ fontSize: "var(--font-size-xl)", fontWeight: "700", marginBottom: "0.75rem" }}>
          ¡Solicitud recibida!
        </h2>
        <p style={{ color: "var(--color-text-secondary)" }}>
          Nuestro equipo se pondrá en contacto contigo en menos de 24 horas.
        </p>
      </div>
    )
  }

  return (
    <main>

      {/* Hero */}
      <section style={{
        padding: "5rem 2rem",
        background: "var(--gradient-section)",
        textAlign: "center"
      }}>
        <span style={{
          display: "inline-block",
          background: "rgba(124, 58, 237, 0.1)",
          color: "var(--color-primary)",
          padding: "0.35rem 1rem",
          borderRadius: "999px",
          fontSize: "var(--font-size-sm)",
          marginBottom: "1.5rem",
          border: "1px solid rgba(124, 58, 237, 0.2)",
          fontWeight: "500"
        }}>
          Para empresas y marcas
        </span>

        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: "800",
          lineHeight: "1.1",
          marginBottom: "1.5rem",
          background: "var(--gradient-button)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Encuentra el creador perfecto para tu marca
        </h1>

        <p style={{
          fontSize: "var(--font-size-lg)",
          color: "var(--color-text-secondary)",
          maxWidth: "550px",
          margin: "0 auto",
          lineHeight: "1.7"
        }}>
          Accede a nuestra red de creadores verificados y lanza campañas que conectan de verdad con tu audiencia.
        </p>
      </section>

      {/* Beneficios */}
      <section style={{ padding: "5rem 2rem", background: "var(--color-bg)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "3rem"
          }}>
            ¿Por qué trabajar con nosotros?
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem"
          }}>
            {[
              { emoji: "🎯", titulo: "Creadores verificados", desc: "Todos nuestros creadores pasan por un proceso de selección." },
              { emoji: "⚡", titulo: "Rápido y sencillo", desc: "En menos de 24 horas te proponemos los mejores perfiles para tu campaña." },
              { emoji: "📊", titulo: "Resultados reales", desc: "Trabajamos con creadores con audiencias reales y engagement alto." },
              { emoji: "🤝", titulo: "Gestión completa", desc: "Nos encargamos de todo el proceso, desde la selección hasta el pago." }
            ].map((item) => (
              <div key={item.titulo} style={{
                padding: "2rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)",
                background: "var(--color-bg-card)"
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{item.emoji}</div>
                <h3 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>{item.titulo}</h3>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)", lineHeight: "1.7" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section style={{
        padding: "5rem 2rem",
        background: "var(--gradient-section)"
      }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "700",
            marginBottom: "0.5rem",
            textAlign: "center"
          }}>
            Cuéntanos tu proyecto
          </h2>
          <p style={{
            color: "var(--color-text-secondary)",
            marginBottom: "2.5rem",
            textAlign: "center"
          }}>
            Rellena el formulario y te contactamos en menos de 24 horas
          </p>

          <form onSubmit={handleSubmit} style={{
            background: "var(--color-bg)",
            padding: "2.5rem",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-md)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Nombre de la empresa</label>
                <input
                  name="nombreEmpresa"
                  value={form.nombreEmpresa}
                  onChange={handleChange}
                  required
                  placeholder="Nike España"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Persona de contacto</label>
                <input
                  name="nombreContacto"
                  value={form.nombreContacto}
                  onChange={handleChange}
                  required
                  placeholder="Ana García"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="ana@empresa.com"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Teléfono</label>
                <input
                  name="telefono"
                  type="tel"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="+34 600 000 000"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Cuéntanos tu proyecto</label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                required
                placeholder="¿Qué tipo de campaña buscas? ¿Con qué tipo de creadores? ¿Cuál es tu presupuesto aproximado?"
                rows={5}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            {error && <p style={{ color: "var(--color-error)", fontSize: "var(--font-size-sm)" }}>{error}</p>}

            <button
              type="submit"
              disabled={enviando}
              style={{
                background: "var(--gradient-button)",
                color: "#fff",
                padding: "0.875rem",
                borderRadius: "var(--radius)",
                border: "none",
                fontWeight: "700",
                fontSize: "var(--font-size-md)",
                cursor: enviando ? "not-allowed" : "pointer",
                opacity: enviando ? 0.7 : 1,
                transition: "var(--transition)",
                boxShadow: "var(--shadow-md)"
              }}
            >
              {enviando ? "Enviando..." : "Enviar solicitud"}
            </button>
          </form>
        </div>
      </section>

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
  transition: "var(--transition)",
  fontFamily: "var(--font-family)"
}