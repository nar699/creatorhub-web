export default function Terminos() {
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
        Términos y Condiciones
      </h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", marginBottom: "3rem" }}>
        Última actualización: junio 2026
      </p>

      {[
        {
          titulo: "1. Aceptación de los términos",
          contenido: "Al registrarte en CreatorHub y utilizar nuestros servicios, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguno de ellos, no debes usar la plataforma."
        },
        {
          titulo: "2. Descripción del servicio",
          contenido: "CreatorHub es una plataforma que conecta creadores de contenido UGC con empresas y marcas. Actuamos como intermediarios facilitando la relación entre ambas partes, gestionando las colaboraciones y asegurándonos de que el contenido entregado cumple con los requisitos acordados."
        },
        {
          titulo: "3. Registro y cuenta",
          contenido: "Para usar la plataforma como creador debes registrarte con información verídica. Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades realizadas desde tu cuenta. Debes tener al menos 18 años para registrarte."
        },
        {
          titulo: "4. Obligaciones del creador",
          contenido: "Como creador te comprometes a entregar el contenido acordado en los plazos establecidos, a que el contenido sea original y no infrinja derechos de terceros, a no aceptar directamente colaboraciones con empresas que hayas conocido a través de CreatorHub durante un período de 12 meses sin nuestra mediación."
        },
        {
          titulo: "5. Comisiones y pagos",
          contenido: "CreatorHub se lleva una comisión acordada por cada colaboración gestionada. Los detalles específicos de cada colaboración, incluyendo la remuneración y los plazos, se establecerán en un acuerdo específico para cada campaña."
        },
        {
          titulo: "6. Propiedad intelectual",
          contenido: "El contenido creado para las campañas gestionadas por CreatorHub será propiedad de la marca contratante, salvo acuerdo expreso en contrario. El creador cede los derechos de uso del contenido a la marca para los fines acordados."
        },
        {
          titulo: "7. Limitación de responsabilidad",
          contenido: "CreatorHub no se hace responsable de los daños derivados del incumplimiento de las obligaciones por parte de creadores o empresas, de la calidad del contenido generado más allá de la supervisión razonable, ni de problemas técnicos ajenos a nuestra plataforma."
        },
        {
          titulo: "8. Modificaciones",
          contenido: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos de cambios significativos por email. El uso continuado de la plataforma tras la notificación implica la aceptación de los nuevos términos."
        },
        {
          titulo: "9. Ley aplicable",
          contenido: "Estos términos se rigen por la legislación española. Para cualquier disputa, las partes se someten a los juzgados y tribunales de España."
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