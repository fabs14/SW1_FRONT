"use client"
import { memo } from "react"
import SectionTitle from "./SectionTitle"

const Sidebar = memo(
  ({
    pagesList,
    selectedPageId,
    editingPageName,
    handlePageChange,
    handlePageNameChange,
    savePageName,
    createNewPage,
    exportAllPages,
  }) => {
    return (
      <div
        className="app-sidebar"
        style={{
          width: "260px",
          backgroundColor: "var(--dark-surface)",
          borderRight: "1px solid var(--border-color)",
          padding: "1.5rem 1rem",
          overflowY: "auto",
          boxShadow: "4px 0 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Pages Section */}
        <div style={{ marginBottom: "2rem" }}>
          <SectionTitle title="Páginas" />

          <div style={{ marginBottom: "1rem" }}>
            <select
              value={selectedPageId}
              onChange={handlePageChange}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "var(--text-light)",
                fontSize: "0.9rem",
                outline: "none",
                transition: "all 0.2s",
                marginBottom: "0.75rem",
              }}
            >
              {pagesList.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={editingPageName}
              onChange={handlePageNameChange}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "var(--text-light)",
                fontSize: "0.9rem",
                outline: "none",
                transition: "all 0.2s",
                marginBottom: "0.75rem",
              }}
              placeholder="Nombre de página"
            />

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <SidebarButton text="Guardar" icon="fas fa-save" onClick={savePageName} secondary />
              <SidebarButton text="Nueva" icon="fas fa-plus" onClick={createNewPage} primary />
            </div>
          </div>
        </div>

        {/* Components Section */}
        <div style={{ marginBottom: "2rem" }}>
          <SectionTitle title="Componentes" />

          
        </div>

        
      </div>
    )
  },
)


// Memoize the button component
const SidebarButton = memo(({ text, icon, onClick, primary, secondary, accent, fullWidth }) => {
  let backgroundColor = "rgba(255, 255, 255, 0.1)"
  let hoverBackgroundColor = "rgba(255, 255, 255, 0.15)"
  let color = "var(--text-light)"
  let border = "1px solid var(--border-color)"

  if (primary) {
    backgroundColor = "var(--primary-color)"
    hoverBackgroundColor = "var(--primary-hover)"
    color = "white"
    border = "none"
  } else if (accent) {
    backgroundColor = "var(--accent-color)"
    hoverBackgroundColor = "#25b5e9"
    color = "white"
    border = "none"
  }

  return (
    <button
      onClick={onClick}
      style={{
        flex: fullWidth ? "none" : 1,
        width: fullWidth ? "100%" : "auto",
        padding: "0.75rem",
        backgroundColor,
        color,
        border,
        borderRadius: "8px",
        fontSize: "0.9rem",
        fontWeight: primary || accent ? 600 : 500,
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        marginBottom: fullWidth ? "0.75rem" : 0,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = hoverBackgroundColor
        if (primary || accent) {
          e.currentTarget.style.transform = "translateY(-2px)"
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"
        }
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = backgroundColor
        if (primary || accent) {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = "none"
        }
      }}
    >
      <i className={icon}></i>
      <span>{text}</span>
    </button>
  )
})


export default Sidebar
