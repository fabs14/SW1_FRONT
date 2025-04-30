import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalNuevoProyecto from '../components/ModalNuevoProyecto';
import { Link } from 'react-router-dom';
export default function Dashboard() {
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    fetchProyectos();
  }, []);
  const copiarLink = (proyectoId) => {
    const link = `${window.location.origin}/invitar/${proyectoId}`;
    navigator.clipboard.writeText(link);
    alert('✅ Link de invitación copiado');
  };
  
  const fetchProyectos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://sw1node-production.up.railway.app/api/proyectos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProyectos(response.data);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  };

  const crearProyectoDesdeModal = async (nombre, tipo) => {
    try {
      const token = localStorage.getItem('token');

      const body = {
        nombre_proyecto: nombre,
        data: { pages: [] },
        tipo_proyecto_id: tipo
      };

      const response = await axios.post('https://sw1node-production.up.railway.app/api/proyectos', body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const nuevoProyecto = response.data;

      // Refrescar lista
      fetchProyectos();

      // Ir directo al Workspace del proyecto nuevo
      navigate(`/workspace/${nuevoProyecto.id}`);
    } catch (error) {
      console.error('Error al crear proyecto:', error);
    }
  };

  const irAlProyecto = (id) => {
    navigate(`/workspace/${id}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffd1dc, #e0c3fc)',
      padding: '2rem',
      fontFamily: 'Poppins, sans-serif',
      color: '#5e548e',
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Mis Proyectos</h1>

      <button
        onClick={() => setModalAbierto(true)}
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#ff85a2',
          color: 'white',
          fontSize: '1.2rem',
          fontWeight: '600',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          marginBottom: '2rem',
          transition: 'all 0.3s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#ff6290';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#ff85a2';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        + Crear nuevo proyecto
      </button>
      <Link to="/generar-ui" style={{ textDecoration: 'none' }}>
  <button
    style={{
      padding: '1rem 2rem',
      background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
      border: 'none',
      borderRadius: '30px',
      color: '#5e548e',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '2rem',
      marginLeft: '1rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s ease',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }}
  >
    🎨 Generar UI desde un boceto
  </button>
</Link>

      {/* Modal para crear proyecto */}
      <ModalNuevoProyecto
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onCreate={(nombre, tipo) => {
          crearProyectoDesdeModal(nombre, tipo);
          setModalAbierto(false);
        }}
      />

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
  {proyectos.map((proyecto) => (
    <div
      key={proyecto.id}
      style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        flex: '0 0 calc(25% - 1rem)',
        transition: 'all 0.3s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '220px',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{proyecto.nombre_proyecto}</h2>
        <p style={{ color: '#a29bfe', fontSize: '0.9rem' }}>
          {new Date(proyecto.fechacreacion).toLocaleDateString()}
        </p>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {/* Botón abrir */}
        <button
          onClick={() => irAlProyecto(proyecto.id)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#ff85a2',
            color: 'white',
            fontWeight: '600',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.3s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ff6290')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff85a2')}
        >
          ✏️ Abrir Proyecto
        </button>

        {/* Botón copiar link */}
        <button
          onClick={() => copiarLink(proyecto.id)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#d7bce8',
            color: '#5e548e',
            fontWeight: '600',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.3s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#caa0e5')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#d7bce8')}
        >
          🔗 Copiar Link
        </button>
      </div>
    

    </div>
  ))}
</div>

    </div>
  );
}
