import { useState } from 'react';
import '../styles/generaui.css'; // Asegúrate de tener este CSS o incluir los estilos globalmente

export default function GenerarUI() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("🌸 Por favor, selecciona una imagen.");
    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://sw1node-production.up.railway.app/api/export-angular-from-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Error al generar el proyecto');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'angular_bootstrap_project.zip';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Ocurrió un error al generar el proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ui-generator-container">
      <div className="ui-card">
        <h2 className="ui-title">✨ Generador de UI desde Boceto</h2>
        <p className="ui-description">
          Sube una imagen de tu diseño y obtén un proyecto Angular + Bootstrap generado automáticamente.
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
          className="ui-file-input"
        />

        <button onClick={handleUpload} disabled={loading} className="ui-button">
          {loading ? "⌛ Generando..." : "🚀 Generar Proyecto"}
        </button>
      </div>
    </div>
  );
}
