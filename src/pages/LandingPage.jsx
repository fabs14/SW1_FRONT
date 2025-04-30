import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css"; // Asegúrate de tener este archivo CSS
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="hero">
        <h1>Bienvenida a <span className="highlight">DreamCanvas</span> ✨</h1>
        <p>
          Diseña, colabora y exporta tu proyecto web sin escribir una sola línea de código.
          Una plataforma visual pensada para creadores con estilo.
        </p>
        <div className="button-group">
          <button onClick={() => navigate("/login")} className="btn btn-primary">Iniciar Sesión</button>
          <button onClick={() => navigate("/register")} className="btn btn-outline">Registrarse</button>
        </div>
      </header>

      <section className="features">
        <h2>¿Qué puedes hacer con DreamCanvas?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Editor Visual</h3>
            <p>Arrastra y suelta bloques para crear páginas sin programar.</p>
          </div>
          <div className="feature-card">
            <h3>Colaboración en Tiempo Real</h3>
            <p>Edita con tus colegas o clientes y ve los cambios al instante.</p>
          </div>
          <div className="feature-card">
            <h3>Exportación Angular</h3>
            <p>Descarga tu proyecto listo para Angular con un solo clic.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} DreamCanvas · Todos los derechos reservados
      </footer>
    </div>
  );
}
