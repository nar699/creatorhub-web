import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Registro from "./pages/Registro"
import Admin from "./pages/Admin"
import Empresas from "./pages/Empresas"
import LoginAdmin from "./pages/LoginAdmin"
import LoginCreador from "./pages/LoginCreador"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"
import Navbar from "./components/Navbar"
import RutaProtegida from "./components/RutaProtegida"
import Privacidad from "./pages/Privacidad"
import Terminos from "./pages/Terminos"
import Cookies from "./pages/Cookies"
import BannerCookies from "./components/BannerCookies"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/login" element={<LoginCreador />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={
          <RutaProtegida>
            <Admin />
          </RutaProtegida>
        } />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer style={{
        borderTop: "1px solid var(--color-border)",
        padding: "2rem",
        textAlign: "center",
        background: "var(--color-bg)"
      }}>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", marginBottom: "1rem" }}>
          © 2026 CreatorHub. Todos los derechos reservados.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
          {[
            { label: "Privacidad", to: "/privacidad" },
            { label: "Términos", to: "/terminos" },
            { label: "Cookies", to: "/cookies" }
          ].map(link => (
            <a key={link.to} href={link.to} style={{
              color: "var(--color-text-muted)",
              fontSize: "var(--font-size-sm)",
              textDecoration: "none"
            }}>
              {link.label}
            </a>
          ))}
        </div>
      </footer>
      <BannerCookies />
    </BrowserRouter>
  )
}

export default App