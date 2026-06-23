import { Link, useNavigate, useLocation } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
  const creadorCuenta = JSON.parse(localStorage.getItem("creadorCuenta") || "null")

  const handleLogoutAdmin = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    navigate("/login")
  }

  const handleLogoutCreador = () => {
    localStorage.removeItem("creadorToken")
    localStorage.removeItem("creadorCuenta")
    navigate("/")
  }

  const isCreadorLogueado = !!creadorCuenta && !!localStorage.getItem("creadorToken")
  const isAdminLogueado = !!usuario && !!localStorage.getItem("token")

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
        fontWeight: "700",
        background: "var(--gradient-button)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textDecoration: "none"
      }}>
        CreatorHub
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>

        {/* Sin login */}
        {!isCreadorLogueado && !isAdminLogueado && (
          <>
            <Link to="/" style={linkStyle(location.pathname === "/")}>Inicio</Link>
            <Link to="/empresas" style={linkStyle(location.pathname === "/empresas")}>Para empresas</Link>
            <Link to="/registro" style={botonPrimaryStyle}>Únete</Link>
          </>
        )}

        {/* Creador logueado */}
        {isCreadorLogueado && (
          <>
            <Link to="/dashboard" style={linkStyle(location.pathname === "/dashboard")}>Mi perfil</Link>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={avatarStyle}>
                {creadorCuenta.email.charAt(0).toUpperCase()}
              </div>
              <button onClick={handleLogoutCreador} style={botonSecundarioStyle}>Salir</button>
            </div>
          </>
        )}

        {/* Admin logueado */}
        {isAdminLogueado && (
          <>
            <Link to="/" style={linkStyle(location.pathname === "/")}>Inicio</Link>
            <Link to="/admin" style={linkStyle(location.pathname === "/admin")}>Admin</Link>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={avatarStyle}>
                {usuario.nombre.charAt(0).toUpperCase()}
              </div>
              <button onClick={handleLogoutAdmin} style={botonSecundarioStyle}>Salir</button>
            </div>
          </>
        )}

      </div>
    </nav>
  )
}

const linkStyle = (activo) => ({
  color: activo ? "var(--color-primary)" : "var(--color-text-secondary)",
  textDecoration: "none",
  fontSize: "var(--font-size-sm)",
  fontWeight: activo ? "600" : "400",
  transition: "var(--transition)"
})

const botonPrimaryStyle = {
  background: "var(--gradient-button)",
  color: "#fff",
  padding: "0.5rem 1.25rem",
  borderRadius: "var(--radius)",
  textDecoration: "none",
  fontSize: "var(--font-size-sm)",
  fontWeight: "600",
  boxShadow: "var(--shadow-md)"
}

const botonSecundarioStyle = {
  background: "none",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius)",
  padding: "0.4rem 1rem",
  cursor: "pointer",
  color: "var(--color-text-secondary)",
  fontSize: "var(--font-size-sm)",
  transition: "var(--transition)"
}

const avatarStyle = {
  width: "32px", height: "32px",
  borderRadius: "50%",
  background: "var(--gradient-button)",
  display: "flex", alignItems: "center", justifyContent: "center",
  color: "#fff", fontWeight: "700", fontSize: "0.75rem"
}