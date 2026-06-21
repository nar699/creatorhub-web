import { Link } from "react-router-dom"

export default function Landing() {
  return (
    <main>

      {/* Hero */}
      <section style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "4rem 2rem",
        background: "var(--color-bg)"
      }}>
        <span style={{
          display: "inline-block",
          background: "var(--color-bg-secondary)",
          color: "var(--color-text-secondary)",
          padding: "0.35rem 1rem",
          borderRadius: "999px",
          fontSize: "var(--font-size-sm)",
          marginBottom: "1.5rem",
          border: "1px solid var(--color-border)"
        }}>
          La plataforma para creadores de contenido
        </span>

        <h1 style={{
          fontSize: "clamp(2.5rem, 6vw, 4rem)",
          fontWeight: "700",
          lineHeight: "1.1",
          color: "var(--color-text-primary)",
          maxWidth: "700px",
          marginBottom: "1.5rem"
        }}>
          Conectamos marcas con los mejores creadores
        </h1>

        <p style={{
          fontSize: "var(--font-size-lg)",
          color: "var(--color-text-secondary)",
          maxWidth: "500px",
          marginBottom: "2.5rem",
          lineHeight: "1.7"
        }}>
          Únete a nuestra plataforma y empieza a colaborar con las mejores marcas del mercado.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/registro" style={{
            background: "var(--color-accent)",
            color: "#fff",
            padding: "0.875rem 2rem",
            borderRadius: "var(--radius)",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "var(--font-size-md)",
            transition: "var(--transition)"
          }}>
            Únete como creador
          </Link>
          <a href="#como-funciona" style={{
            background: "var(--color-bg-secondary)",
            color: "var(--color-text-primary)",
            padding: "0.875rem 2rem",
            borderRadius: "var(--radius)",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "var(--font-size-md)",
            border: "1px solid var(--color-border)"
          }}>
            Cómo funciona
          </a>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" style={{
        padding: "6rem 2rem",
        background: "var(--color-bg-secondary)"
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "0.75rem"
          }}>
            Cómo funciona
          </h2>
          <p style={{
            textAlign: "center",
            color: "var(--color-text-secondary)",
            marginBottom: "3.5rem"
          }}>
            Tres pasos para empezar a colaborar con marcas
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem"
          }}>
            {[
              { num: "01", titulo: "Regístrate", desc: "Crea tu perfil con tus redes sociales y nichos de contenido." },
              { num: "02", titulo: "Te contactamos", desc: "Nuestro equipo revisa tu perfil y te propone colaboraciones." },
              { num: "03", titulo: "Colabora y cobra", desc: "Acepta las campañas que te interesen y empieza a ganar." }
            ].map((paso) => (
              <div key={paso.num} style={{
                background: "var(--color-bg)",
                padding: "2rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow)"
              }}>
                <span style={{
                  fontSize: "var(--font-size-sm)",
                  fontWeight: "700",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.1em"
                }}>
                  {paso.num}
                </span>
                <h3 style={{
                  fontSize: "var(--font-size-lg)",
                  fontWeight: "600",
                  margin: "0.75rem 0 0.5rem"
                }}>
                  {paso.titulo}
                </h3>
                <p style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "1.7"
                }}>
                  {paso.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{
        padding: "6rem 2rem",
        textAlign: "center",
        background: "var(--color-bg)"
      }}>
        <h2 style={{
          fontSize: "var(--font-size-2xl)",
          fontWeight: "700",
          marginBottom: "1rem"
        }}>
          ¿Listo para empezar?
        </h2>
        <p style={{
          color: "var(--color-text-secondary)",
          marginBottom: "2rem"
        }}>
          Regístrate gratis y empieza a recibir propuestas de colaboración.
        </p>
        <Link to="/registro" style={{
          background: "var(--color-accent)",
          color: "#fff",
          padding: "0.875rem 2rem",
          borderRadius: "var(--radius)",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "var(--font-size-md)"
        }}>
          Crear mi perfil
        </Link>
      </section>

    </main>
  )
}