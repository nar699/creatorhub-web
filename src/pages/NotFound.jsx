import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main style={{
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
        fontSize: "8rem",
        fontWeight: "800",
        lineHeight: "1",
        background: "var(--gradient-button)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "1rem"
      }}>
        404
      </div>

      <h1 style={{
        fontSize: "var(--font-size-2xl)",
        fontWeight: "700",
        marginBottom: "1rem"
      }}>
        Página no encontrada
      </h1>

      <p style={{
        color: "var(--color-text-secondary)",
        maxWidth: "400px",
        marginBottom: "2.5rem",
        lineHeight: "1.7"
      }}>
        La página que buscas no existe o ha sido movida.
      </p>

      <Link to="/" style={{
        background: "var(--gradient-button)",
        color: "#fff",
        padding: "0.875rem 2rem",
        borderRadius: "var(--radius)",
        textDecoration: "none",
        fontWeight: "700",
        fontSize: "var(--font-size-md)",
        boxShadow: "var(--shadow-md)"
      }}>
        Volver al inicio
      </Link>
    </main>
  )
}