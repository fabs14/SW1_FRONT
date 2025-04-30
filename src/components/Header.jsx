"use client"
import { memo } from "react"

// Memoize the entire Header component
const Header = memo(({ toggleSidebar, guardarCambios, exportAllPages }) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%)",
        color: "var(--text-light)",
        padding: "0.75rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        zIndex: 10000,
        position: "relative",
        height: "64px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={toggleSidebar}
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            border: "none",
            color: "var(--text-light)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            transition: "all 0.2s",
            backdropFilter: "blur(4px)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)")}
        >
          <i className="fas fa-bars"></i>
        </button>
        <h1
          style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: 700,
            background: "linear-gradient(to right, #ffffff, #f0f0f0)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.5px",
          }}
        >
          Design Studio
        </h1>
      </div>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        {/* Botón Guardar cambios */}
        <button
          onClick={guardarCambios}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "var(--primary-color)",
            border: "none",
            borderRadius: "20px",
            color: "white",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary-hover)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary-color)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <i className="fas fa-save"></i>
          <span>Guardar cambios</span>
        </button>

        {/* Botón Exportar */}
        <button
          onClick={exportAllPages}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "var(--accent-color)",
            border: "1px solid #25b5e9",
            borderRadius: "20px",
            color: "white",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#25b5e9";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(76, 201, 240, 0.3)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent-color)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <i className="fas fa-file-export"></i>
          <span>Exportar</span>
        </button>
      </div>
    </div>
  )
})

Header.displayName = "Header";
export default Header;
