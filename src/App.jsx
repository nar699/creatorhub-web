import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Registro from "./pages/Registro"
import Admin from "./pages/Admin"
import Empresas from "./pages/Empresas"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import RutaProtegida from "./components/RutaProtegida"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <RutaProtegida>
            <Admin />
          </RutaProtegida>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App