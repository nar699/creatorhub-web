import { Link } from "react-router-dom"

export default function Landing() {
  return (
    <main>

      {/* Hero con video */}
      <section style={{
        position: "relative",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "4rem 2rem",
        overflow: "hidden"
      }}>
        {/* Video de fondo */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            zIndex: 0
          }}
        >
<source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay degradado */}
        <div style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          background: "var(--gradient-hero)",
          zIndex: 1
        }} />

        {/* Contenido */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "700px" }}>
          <span style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.2)",
            color: "#fff",
            padding: "0.35rem 1rem",
            borderRadius: "999px",
            fontSize: "var(--font-size-sm)",
            marginBottom: "1.5rem",
            border: "1px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(8px)"
          }}>
            La plataforma para creadores de contenido
          </span>

          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: "800",
            lineHeight: "1.1",
            color: "#ffffff",
            marginBottom: "1.5rem",
            textShadow: "0 2px 20px rgba(0,0,0,0.3)"
          }}>
            Conectamos marcas con los mejores creadores
          </h1>

          <p style={{
            fontSize: "var(--font-size-lg)",
            color: "rgba(255,255,255,0.9)",
            maxWidth: "500px",
            margin: "0 auto 2.5rem",
            lineHeight: "1.7"
          }}>
            Únete a nuestra plataforma y empieza a colaborar con las mejores marcas del mercado.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link to="/registro" style={{
              background: "#ffffff",
              color: "var(--color-primary)",
              padding: "0.875rem 2rem",
              borderRadius: "var(--radius)",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "var(--font-size-md)",
              boxShadow: "var(--shadow-lg)",
              transition: "var(--transition)"
            }}>
              Únete como creador
            </Link>
            <a href="#como-funciona" style={{
              background: "rgba(255,255,255,0.15)",
              color: "#ffffff",
              padding: "0.875rem 2rem",
              borderRadius: "var(--radius)",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "var(--font-size-md)",
              border: "1px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
              transition: "var(--transition)"
            }}>
              Cómo funciona
            </a>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" style={{
        padding: "6rem 2rem",
        background: "var(--gradient-section)"
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "0.75rem",
            background: "var(--gradient-button)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
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
              { num: "01", titulo: "Regístrate", desc: "Crea tu perfil con tus redes sociales y nichos de contenido.", emoji: "✍️" },
              { num: "02", titulo: "Te contactamos", desc: "Nuestro equipo revisa tu perfil y te propone colaboraciones.", emoji: "📩" },
              { num: "03", titulo: "Colabora y cobra", desc: "Acepta las campañas que te interesen y empieza a ganar.", emoji: "💸" }
            ].map((paso) => (
              <div key={paso.num} style={{
                background: "var(--color-bg-card)",
                padding: "2rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)",
                transition: "var(--transition)"
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{paso.emoji}</div>
                <span style={{
                  fontSize: "var(--font-size-sm)",
                  fontWeight: "700",
                  color: "var(--color-primary)",
                  letterSpacing: "0.1em",
                  opacity: 0.5
                }}>
                  {paso.num}
                </span>
                <h3 style={{
                  fontSize: "var(--font-size-lg)",
                  fontWeight: "600",
                  margin: "0.5rem 0"
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

      {/* Stats */}
      <section style={{
        padding: "4rem 2rem",
        background: "var(--gradient-button)"
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "2rem",
          textAlign: "center"
        }}>
          {[
            { num: "500+", label: "Creadores" },
            { num: "50+", label: "Marcas" },
            { num: "1000+", label: "Campañas" }
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#fff" }}>{stat.num}</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "var(--font-size-sm)" }}>{stat.label}</div>
            </div>
          ))}
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
          marginBottom: "1rem",
          background: "var(--gradient-button)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
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
          background: "var(--gradient-button)",
          color: "#fff",
          padding: "0.875rem 2rem",
          borderRadius: "var(--radius)",
          textDecoration: "none",
          fontWeight: "700",
          fontSize: "var(--font-size-md)",
          boxShadow: "var(--shadow-lg)"
        }}>
          Crear mi perfil
        </Link>
      </section>

    </main>
  )
}