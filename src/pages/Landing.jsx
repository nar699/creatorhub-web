import { Link } from "react-router-dom"

const Shape = ({ style }) => (
  <div style={{
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(80px)",
    opacity: 0.12,
    ...style
  }} />
)

export default function Landing() {
  return (
    <main style={{ background: "var(--color-bg)" }}>

      {/* Hero */}
      <section style={{
        position: "relative",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "4rem 2rem",
        overflow: "hidden",
        background: "var(--gradient-hero)"
      }}>
        {/* Video fondo */}
        <video autoPlay muted loop playsInline style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          zIndex: 0,
          opacity: 0.06
        }}>
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Formas */}
        <Shape style={{ width: "700px", height: "700px", background: "#7c3aed", top: "-300px", left: "-200px" }} />
        <Shape style={{ width: "500px", height: "500px", background: "#db2777", top: "-100px", right: "-150px" }} />
        <Shape style={{ width: "400px", height: "400px", background: "#3b82f6", bottom: "-100px", left: "40%" }} />

        {/* Grid overlay */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          zIndex: 1
        }} />

        {/* Contenido */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "800px" }}>
          <span style={{
            display: "inline-block",
            background: "rgba(124, 58, 237, 0.1)",
            color: "var(--color-primary)",
            padding: "0.4rem 1.25rem",
            borderRadius: "999px",
            fontSize: "var(--font-size-sm)",
            marginBottom: "2rem",
            border: "1px solid rgba(124, 58, 237, 0.2)",
            fontWeight: "600"
          }}>
            ✦ La plataforma UGC líder en España
          </span>

          <h1 style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: "800",
            lineHeight: "1.05",
            color: "var(--color-text-primary)",
            marginBottom: "1.5rem",
            letterSpacing: "-0.03em"
          }}>
            Contenido que{" "}
            <span style={{
              background: "var(--gradient-button)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              convierte
            </span>
          </h1>

          <p style={{
            fontSize: "var(--font-size-lg)",
            color: "var(--color-text-secondary)",
            maxWidth: "550px",
            margin: "0 auto 3rem",
            lineHeight: "1.7"
          }}>
            Conectamos marcas con creadores UGC verificados para producir contenido auténtico que impulsa ventas reales.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
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
              Únete como creador →
            </Link>
            <Link to="/empresas" style={{
              background: "#fff",
              color: "var(--color-text-primary)",
              padding: "0.875rem 2rem",
              borderRadius: "var(--radius)",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "var(--font-size-md)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow)"
            }}>
              Soy una marca
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        padding: "4rem 2rem",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        background: "#fff"
      }}>
        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "2rem", textAlign: "center"
        }}>
          {[
            { num: "500+", label: "Creadores UGC", icon: "🎬" },
            { num: "50+", label: "Marcas activas", icon: "🏢" },
            { num: "1.000+", label: "Vídeos entregados", icon: "📦" },
            { num: "98%", label: "Satisfacción", icon: "⭐" }
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
              <div style={{
                fontSize: "2rem", fontWeight: "800",
                background: "var(--gradient-button)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "0.25rem"
              }}>
                {stat.num}
              </div>
              <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" style={{
        padding: "7rem 2rem",
        background: "var(--gradient-section)",
        position: "relative",
        overflow: "hidden"
      }}>
        <Shape style={{ width: "400px", height: "400px", background: "#7c3aed", top: "-100px", right: "-100px" }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{
              display: "inline-block",
              background: "rgba(124, 58, 237, 0.1)",
              color: "var(--color-primary)",
              padding: "0.35rem 1rem",
              borderRadius: "999px",
              fontSize: "var(--font-size-sm)",
              marginBottom: "1rem",
              border: "1px solid rgba(124, 58, 237, 0.2)",
              fontWeight: "600"
            }}>
              El proceso
            </span>
            <h2 style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: "700", marginBottom: "1rem"
            }}>
              Cómo funciona
            </h2>
            <p style={{ color: "var(--color-text-secondary)", maxWidth: "500px", margin: "0 auto" }}>
              Tres pasos para tener contenido UGC de calidad
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem"
          }}>
            {[
              { num: "01", titulo: "Regístrate", desc: "Crea tu perfil como creador UGC con tus nichos y tipos de contenido.", emoji: "✍️" },
              { num: "02", titulo: "Te contactamos", desc: "Nuestro equipo revisa tu perfil y te propone campañas que encajan contigo.", emoji: "📩" },
              { num: "03", titulo: "Crea y cobra", desc: "Graba el contenido acordado y recibe tu pago al entregarlo.", emoji: "💸" }
            ].map(paso => (
              <div key={paso.num} style={{
                background: "#fff",
                padding: "2rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  height: "3px",
                  background: "var(--gradient-button)"
                }} />
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{paso.emoji}</div>
                <span style={{
                  fontSize: "0.75rem", fontWeight: "700",
                  color: "var(--color-primary)", letterSpacing: "0.1em"
                }}>
                  {paso.num}
                </span>
                <h3 style={{
                  fontSize: "var(--font-size-lg)", fontWeight: "600",
                  margin: "0.5rem 0"
                }}>
                  {paso.titulo}
                </h3>
                <p style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "var(--font-size-sm)", lineHeight: "1.7"
                }}>
                  {paso.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para marcas — sección oscura */}
      <section style={{
        padding: "7rem 2rem",
        background: "var(--gradient-dark)",
        position: "relative",
        overflow: "hidden"
      }}>
        <Shape style={{ width: "500px", height: "500px", background: "#7c3aed", bottom: "-200px", left: "-100px", opacity: 0.2 }} />
        <Shape style={{ width: "400px", height: "400px", background: "#db2777", top: "-100px", right: "-100px", opacity: 0.2 }} />

        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "4rem", alignItems: "center",
          position: "relative", zIndex: 1
        }}>
          <div>
            <span style={{
              display: "inline-block",
              background: "rgba(219, 39, 119, 0.2)",
              color: "#f472b6",
              padding: "0.35rem 1rem",
              borderRadius: "999px",
              fontSize: "var(--font-size-sm)",
              marginBottom: "1.5rem",
              border: "1px solid rgba(219, 39, 119, 0.3)",
              fontWeight: "600"
            }}>
              Para marcas
            </span>
            <h2 style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: "700", marginBottom: "1rem",
              color: "#fff"
            }}>
              Contenido que vende, no que solo se ve
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.6)",
              lineHeight: "1.8", marginBottom: "2rem"
            }}>
              El UGC convierte un 29% más que el contenido tradicional. Accede a nuestra red de creadores verificados y empieza a ver resultados reales.
            </p>
            <Link to="/empresas" style={{
              background: "var(--gradient-button)",
              color: "#fff",
              padding: "0.875rem 2rem",
              borderRadius: "var(--radius)",
              textDecoration: "none",
              fontWeight: "700",
              display: "inline-block",
              boxShadow: "var(--shadow-lg)"
            }}>
              Solicitar creadores →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: "🎯", titulo: "Creadores verificados", desc: "Todos pasan por un proceso de selección riguroso." },
              { icon: "⚡", titulo: "Entrega en 7 días", desc: "Contenido listo para publicar en tiempo récord." },
              { icon: "📊", titulo: "Resultados medibles", desc: "Seguimiento de métricas y ROI de cada campaña." },
              { icon: "🤝", titulo: "Gestión completa", desc: "Nos encargamos de todo el proceso de principio a fin." }
            ].map(item => (
              <div key={item.titulo} style={{
                display: "flex", gap: "1rem", alignItems: "flex-start",
                background: "rgba(255,255,255,0.05)",
                padding: "1.25rem",
                borderRadius: "var(--radius)",
                border: "1px solid rgba(255,255,255,0.08)"
              }}>
                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontWeight: "600", marginBottom: "0.2rem", color: "#fff" }}>{item.titulo}</p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "var(--font-size-sm)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{
        padding: "7rem 2rem",
        textAlign: "center",
        background: "var(--gradient-section)",
        position: "relative",
        overflow: "hidden"
      }}>
        <Shape style={{ width: "600px", height: "600px", background: "#7c3aed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "800",
            marginBottom: "1rem",
            letterSpacing: "-0.02em"
          }}>
            ¿Listo para empezar?
          </h2>
          <p style={{
            color: "var(--color-text-secondary)",
            marginBottom: "2.5rem",
            fontSize: "var(--font-size-lg)"
          }}>
            Únete a la red de creadores UGC más grande de España.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
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
              Crear mi perfil gratis
            </Link>
            <Link to="/empresas" style={{
              background: "#fff",
              color: "var(--color-text-primary)",
              padding: "0.875rem 2rem",
              borderRadius: "var(--radius)",
              textDecoration: "none",
              fontWeight: "600",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow)"
            }}>
              Soy una marca
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}