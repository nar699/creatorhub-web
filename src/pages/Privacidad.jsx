export default function Privacidad() {
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
        Política de Privacidad
      </h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", marginBottom: "3rem" }}>
        Última actualización: junio 2026
      </p>

      {[
        {
          titulo: "1. Responsable del tratamiento",
          contenido: "CreatorHub es el responsable del tratamiento de los datos personales recogidos a través de esta plataforma, con domicilio en España y sujeto a la legislación española y europea en materia de protección de datos."
        },
        {
          titulo: "2. Datos que recopilamos",
          contenido: "Recopilamos los datos que nos proporcionas al registrarte como creador o al contactarnos como empresa: nombre, apellidos, dirección de email, contraseña cifrada, redes sociales, nichos de contenido, tipos de contenido e idiomas. No recopilamos datos sensibles."
        },
        {
          titulo: "3. Finalidad del tratamiento",
          contenido: "Los datos se utilizan para gestionar tu cuenta en la plataforma, ponerte en contacto con marcas y empresas relevantes para tu perfil, enviarte comunicaciones relacionadas con oportunidades de colaboración y mejorar nuestros servicios."
        },
        {
          titulo: "4. Base legal",
          contenido: "El tratamiento de tus datos se basa en el consentimiento que nos otorgas al registrarte y en la ejecución del contrato de prestación de servicios entre tú y CreatorHub."
        },
        {
          titulo: "5. Conservación de datos",
          contenido: "Conservamos tus datos mientras mantengas tu cuenta activa. Si solicitas la baja, eliminaremos tus datos en un plazo máximo de 30 días, salvo obligación legal de conservarlos."
        },
        {
          titulo: "6. Tus derechos",
          contenido: "Tienes derecho a acceder, rectificar, suprimir, oponerte y limitar el tratamiento de tus datos, así como el derecho a la portabilidad. Puedes ejercer estos derechos contactándonos por email. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD)."
        },
        {
          titulo: "7. Transferencias internacionales",
          contenido: "Utilizamos servicios de terceros como Supabase (base de datos) y Railway (servidor) que pueden procesar datos fuera del Espacio Económico Europeo. Estos proveedores cumplen con las garantías adecuadas según el RGPD."
        },
        {
          titulo: "8. Contacto",
          contenido: "Para cualquier consulta sobre privacidad puedes contactarnos a través del formulario de contacto de nuestra plataforma."
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