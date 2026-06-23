import { useState } from "react"

export default function Cookies() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 2rem" }}>
      <h1 style={{
        fontSize: "var(--font-size-2xl)",
        fontWeight: "700",
        marginBottom: "0.5rem",
        background: "var(--gradient-button)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
        Política de Cookies
      </h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", marginBottom: "3rem" }}>
        Última actualización: junio 2026
      </p>

      {[
        {
          titulo: "1. ¿Qué son las cookies?",
          contenido: "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten recordar tus preferencias y mejorar tu experiencia de navegación."
        },
        {
          titulo: "2. Cookies que utilizamos",
          contenido: "Utilizamos cookies técnicas necesarias para el funcionamiento de la plataforma (como mantener tu sesión iniciada), cookies de análisis para entender cómo se usa la plataforma y mejorarla, y cookies de preferencias para recordar tus ajustes."
        },
        {
          titulo: "3. Cookies de terceros",
          contenido: "Podemos utilizar servicios de terceros que instalan sus propias cookies, como herramientas de análisis. Estos terceros tienen sus propias políticas de privacidad."
        },
        {
          titulo: "4. Cómo gestionar las cookies",
          contenido: "Puedes configurar tu navegador para rechazar todas las cookies o para que te avise cuando se envía una cookie. Ten en cuenta que si rechazas las cookies técnicas, algunas partes de la plataforma pueden no funcionar correctamente."
        },
        {
          titulo: "5. Consentimiento",
          contenido: "Al continuar navegando por nuestra plataforma, aceptas el uso de cookies según esta política. Puedes retirar tu consentimiento en cualquier momento modificando la configuración de tu navegador."
        }
      ].map(seccion => (
        <div key={seccion.titulo} style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "var(--font-size-lg)", fontWeight: "600", marginBottom: "0.75rem" }}>
            {seccion.titulo}
          </h2>
          <p style={{ color: "var(--color-text-secondary)", lineHeight: "1.8" }}>
            {seccion.contenido}
          </p>
        </div>
      ))}
    </main>
  )
}