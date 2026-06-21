import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 2rem",
      height: "64px",
      borderBottom: "1px solid var(--color-border)",
      background: "var(--color-bg)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{
        fontSize: "var(--font-size-lg)",
        fontWeight: "600",
        color: "var(--color-text-primary)",
        textDecoration: "none"
      }}>
        CreatorHub
      </Link>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <Link to="/" style={{
          color: "var(--color-text-secondary)",
          textDecoration: "none",
          fontSize: "var(--font-size-sm)"
        }}>
          Inicio
        </Link>
        <Link to="/registro" style={{
          background: "var(--color-accent)",
          color: "#fff",
          padding: "0.5rem 1.25rem",
          borderRadius: "var(--radius)",
          textDecoration: "none",
          fontSize: "var(--font-size-sm)",
          fontWeight: "500"
        }}>
          Únete
        </Link>
      </div>
    </nav>
  )
}

export default Navbar