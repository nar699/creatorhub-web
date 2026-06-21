import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    navigate("/login")
  }

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
        <Link to="/empresas" style={{
          color: "var(--color-text-secondary)",
          textDecoration: "none",
          fontSize: "var(--font-size-sm)"
        }}>
          Para empresas
        </Link>

        {usuario ? (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link to="/perfil" style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              fontSize: "var(--font-size-sm)"
            }}>
              <div style={{
                width: "32px", height: "32px",
                borderRadius: "50%",
                background: "var(--gradient-button)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: "700", fontSize: "0.75rem"
              }}>
                {usuario.nombre.charAt(0).toUpperCase()}
              </div>
              {usuario.nombre}
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                padding: "0.4rem 1rem",
                cursor: "pointer",
                color: "var(--color-text-secondary)",
                fontSize: "var(--font-size-sm)",
                transition: "var(--transition)"
              }}
            >
              Salir
            </button>
          </div>
        ) : (
          <Link to="/registro" style={{
            background: "var(--gradient-button)",
            color: "#fff",
            padding: "0.5rem 1.25rem",
            borderRadius: "var(--radius)",
            textDecoration: "none",
            fontSize: "var(--font-size-sm)",
            fontWeight: "500"
          }}>
            Únete
          </Link>
        )}
      </div>
    </nav>
  )
}