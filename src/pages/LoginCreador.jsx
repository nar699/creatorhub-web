import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { loginCreador } from "../services/api"

export default function LoginCreador() {
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
      const datos = await loginCreador(form)
      localStorage.setItem("creadorToken", datos.token)
      localStorage.setItem("creadorCuenta", JSON.stringify({
        cuentaId: datos.cuentaId,
        email: datos.email
      }))
      navigate("/dashboard")
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
        maxWidth: "420px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "700",
            marginBottom: "0.5rem",
            background: "var(--gradient-button)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Bienvenido de vuelta
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
            Accede a tu perfil de creador
          </p>
        </div>

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

          {error && (
            <div style={{
              background: "#fee2e2",
              border: "1px solid #fca5a5",
              borderRadius: "var(--radius)",
              padding: "0.75rem 1rem",
              color: "#991b1b",
              fontSize: "var(--font-size-sm)"
            }}>
              {error}
            </div>
          )}

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
              opacity: cargando ? 0.7 : 1,
              boxShadow: "var(--shadow-md)"
            }}
          >
            {cargando ? "Entrando..." : "Entrar"}
          </button>

          <p style={{
            textAlign: "center",
            fontSize: "var(--font-size-sm)",
            color: "var(--color-text-secondary)"
          }}>
            ¿No tienes cuenta?{" "}
            <Link to="/registro" style={{ color: "var(--color-primary)", fontWeight: "500" }}>
              Regístrate gratis
            </Link>
          </p>
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
  outline: "none",
  fontFamily: "var(--font-family)"
}