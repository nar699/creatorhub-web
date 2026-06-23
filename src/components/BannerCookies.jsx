import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function BannerCookies() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const aceptado = localStorage.getItem("cookiesAceptadas")
    if (!aceptado) setVisible(true)
  }, [])

  const aceptar = () => {
    localStorage.setItem("cookiesAceptadas", "true")
    setVisible(false)
  }

  const rechazar = () => {
    localStorage.setItem("cookiesAceptadas", "false")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
  position: "fixed",
  bottom: "1.5rem",
  left: "50%",
  transform: "translateX(-50%)",
  width: "90%",
  maxWidth: "600px",
  background: "var(--color-bg)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  padding: "1.5rem",
  boxShadow: "var(--shadow-lg)",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
}}>
      <div>
        <p style={{ fontWeight: "600", marginBottom: "0.4rem" }}>🍪 Usamos cookies</p>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
          Utilizamos cookies propias y de terceros para mejorar tu experiencia. Puedes aceptarlas todas o configurarlas.{" "}
          <Link to="/cookies" style={{ color: "var(--color-primary)", fontWeight: "500" }}>
            Más información
          </Link>
        </p>
      </div>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
        <button
          onClick={rechazar}
          style={{
            background: "none",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
            padding: "0.5rem 1.25rem",
            cursor: "pointer",
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-sm)"
          }}
        >
          Rechazar
        </button>
        <button
          onClick={aceptar}
          style={{
            background: "var(--gradient-button)",
            border: "none",
            borderRadius: "var(--radius)",
            padding: "0.5rem 1.25rem",
            cursor: "pointer",
            color: "#fff",
            fontSize: "var(--font-size-sm)",
            fontWeight: "600",
            boxShadow: "var(--shadow-md)"
          }}
        >
          Aceptar todas
        </button>
      </div>
    </div>
  )
}