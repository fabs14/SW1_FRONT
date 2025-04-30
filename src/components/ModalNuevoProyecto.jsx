"use client";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function ModalNuevoProyecto({ isOpen, onClose, onCreate }) {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [tiposProyecto, setTiposProyecto] = useState([]);

  useEffect(() => {
    if (isOpen) {
      cargarTipos();
    }
  }, [isOpen]);

  const cargarTipos = async () => {
    try {
      const response = await axios.get('https://sw1node-production.up.railway.app/api/tipos-proyecto');
      setTiposProyecto(response.data);
    } catch (error) {
      console.error('Error cargando tipos de proyecto:', error);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(nombre, tipo);
    setNombre('');
    setTipo('');
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 9999
    }}>
      <div style={{
        background: 'white', borderRadius: '12px', padding: '2rem',
        width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem'
      }}>
        <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Nuevo Proyecto</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Nombre del proyecto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
          >
            <option value="">Selecciona tipo</option>
            {tiposProyecto.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#ccc', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Cancelar
            </button>
            <button type="submit" style={{ flex: 1, padding: '0.75rem', backgroundColor: '#4cc9f0', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
