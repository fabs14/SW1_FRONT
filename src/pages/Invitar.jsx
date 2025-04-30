import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export default function Invitar() {
  const { id } = useParams(); // ID del proyecto
  const navigate = useNavigate();

  useEffect(() => {
    const unirseAlProyecto = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          alert('⚠️ Necesitas iniciar sesión primero');
          navigate('/');
          return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.id; // <- Esto depende de cómo generaste el token en el backend
        console.log('ID del usuario:', userId);
        await axios.post(`https://sw1node-production.up.railway.app/api/proyectos/${id}/invitar`, 
            { usuario_id: userId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            }
          );
          

        alert('✅ ¡Te has unido al proyecto exitosamente!');
        navigate('/dashboard');
      } catch (error) {
        console.error('❌ Error al unirse al proyecto:', error);
        alert('Error al unirse al proyecto');
        navigate('/dashboard');
      }
    };

    unirseAlProyecto();
  }, [id, navigate]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Poppins, sans-serif',
      background: 'linear-gradient(135deg, #ffd1dc, #e0c3fc)',
      color: '#5e548e',
      fontSize: '1.5rem'
    }}>
      🎉 Uniéndote al proyecto...
    </div>
  );
}
