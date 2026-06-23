import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/api"

export default function LoginAdmin() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setCargando(true)
    try {
      const datos = await login(form)
      localStorage.setItem("token", datos.token)
      localStorage.setItem("usuario", JSON.stringify({ nombre: datos.nombre, email: datos.email, rol: datos.rol }))
      navigate("/admin")
    } catch {
      setError("Email o contraseña incorrectos")
    } finally {
      setCargando(false)
    }
  }

  return (
    <main style={{
      minHeight: "calc(100vh - 64px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "var(--gradient-section)"
    }}>
      <div style={{
        background: "var(--color-bg)",
        padding: "2.5rem",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-lg)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{ fontSize: "var(--font-size-xl)", fontWeight: "700", marginBottom: "0.5rem" }}>
          Acceso admin
        </h1>
        <p style={{ color: "var(--color-text-secondary)", marginBottom: "2rem", fontSize: "var(--font-size-sm)" }}>
          Solo para el equipo de CreatorHub
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Contraseña</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          {error && <p style={{ color: "var(--color-error)", fontSize: "var(--font-size-sm)" }}>{error}</p>}

          <button
            type="submit"
            disabled={cargando}
            style={{
              background: "var(--gradient-button)",
              color: "#fff",
              padding: "0.875rem",
              borderRadius: "var(--radius)",
              border: "none",
              fontWeight: "700",
              fontSize: "var(--font-size-md)",
              cursor: cargando ? "not-allowed" : "pointer",
              opacity: cargando ? 0.7 : 1
            }}
          >
            {cargando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
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
  outline: "none"
}