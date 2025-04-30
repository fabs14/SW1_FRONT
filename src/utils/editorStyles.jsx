let stylesInitialized = false

export const initializeStyles = () => {
  // Prevent multiple initializations
  if (stylesInitialized) return
  stylesInitialized = true

  // Add custom CSS for the GrapesJS editor - gradient styling
  const styleEl = document.createElement("style")
  styleEl.innerHTML = `
    :root {
      --primary-color: #ff6b9d;
      --primary-hover: #ff4785;
      --secondary-color: #9d8df1;
      --accent-color: #4cc9f0;
      --dark-bg: #2a2a3c;
      --dark-surface: #1f1f2c;
      --text-light: #f8fafc;
      --text-secondary: #c8d6e5;
      --border-color: #3d3d5c;
      --gradient-start: #ff6b9d;
      --gradient-end: #9d8df1;
      --success-color: #10b981;
      --error-color: #ef4444;
    }
    
    /* Main colors */
    .gjs-one-bg { background-color: var(--dark-surface) !important; }
    .gjs-two-color { color: var(--primary-color) !important; }
    .gjs-three-bg { background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%) !important; }
    .gjs-four-color, .gjs-four-color-h:hover { color: var(--text-light) !important; }
    
    /* Panel styles */
    .gjs-pn-commands { background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%) !important; }
    .gjs-pn-views-container { background-color: var(--dark-surface) !important; }
    .gjs-pn-views { background-color: var(--dark-surface) !important; border-bottom: 1px solid var(--border-color) !important; }
    .gjs-pn-panel.gjs-pn-devices-c { background-color: var(--dark-surface) !important; }
    .gjs-pn-options { background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%) !important; }
    
    /* Buttons */
    .gjs-pn-btn.gjs-pn-active { background-color: rgba(255, 255, 255, 0.2) !important; color: var(--text-light) !important; }
    .gjs-pn-btn:hover { background-color: rgba(255, 255, 255, 0.2) !important; }
    
    /* Blocks */
    .gjs-block { border-radius: 8px !important; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important; border: 1px solid var(--border-color) !important; background-color: var(--dark-surface) !important; }
    .gjs-block:hover { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important; }
    .gjs-block-label { color: var(--text-light) !important; }
    
    /* Canvas */
    .gjs-cv-canvas { background-color: var(--dark-bg) !important; border-radius: 8px !important; }
    
    /* Category tabs */
    .gjs-block-category.gjs-open { border-bottom: 2px solid var(--primary-color) !important; }
    .gjs-block-category .gjs-title { background-color: var(--dark-surface) !important; color: var(--primary-color) !important; border-bottom: 1px solid var(--border-color) !important; }
    
    /* Modal */
    .gjs-mdl-dialog { border-radius: 8px !important; border: 1px solid var(--border-color) !important; background-color: var(--dark-surface) !important; }
    .gjs-mdl-header { background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%) !important; color: var(--text-light) !important; border-radius: 8px 8px 0 0 !important; }
    
    /* Inputs */
    .gjs-field { border-radius: 6px !important; border: 1px solid var(--border-color) !important; background-color: rgba(255, 255, 255, 0.05) !important; color: var(--text-light) !important; }
    .gjs-field:focus-within { border-color: var(--primary-color) !important; }
    .gjs-sm-sector-title { color: var(--primary-color) !important; }
    
    /* Buttons in style manager */
    .gjs-clm-tags .gjs-sm-title, .gjs-sm-sector .gjs-sm-title { color: var(--primary-color) !important; }
    .gjs-clm-tags .gjs-sm-label, .gjs-sm-sector .gjs-sm-label { color: var(--text-secondary) !important; }
    
    /* Layer manager */
    .gjs-layer-title { color: var(--text-secondary) !important; }
    .gjs-layer.gjs-selected .gjs-layer-title { background-color: rgba(255, 107, 157, 0.2) !important; }
    .gjs-layer.gjs-hovered .gjs-layer-title { background-color: rgba(255, 107, 157, 0.1) !important; }
    
    /* Traits manager */
    .gjs-trt-trait .gjs-label { color: var(--text-secondary) !important; }
    .gjs-trt-trait .gjs-field { border-color: var(--border-color) !important; }
    
    /* Command buttons */
    .gjs-pn-btn { color: var(--text-light) !important; }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: var(--dark-surface);
    }
    
    ::-webkit-scrollbar-thumb {
      background: var(--secondary-color);
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: var(--primary-color);
    }

    /* Animations - REDUCED to prevent flickering */
    @keyframes slideIn {
      from {
        transform: translateX(-100%);
        opacity: 0.8;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    /* Reduced animation for sidebar */
    .app-sidebar {
      animation: slideIn 0.2s ease-out;
    }
  `
  document.head.appendChild(styleEl)

  // Import Google Fonts
  if (!document.getElementById("google-fonts")) {
    const fontLink = document.createElement("link")
    fontLink.id = "google-fonts"
    fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
    fontLink.rel = "stylesheet"
    document.head.appendChild(fontLink)
  }

  // Import Font Awesome for icons
  if (!document.getElementById("font-awesome")) {
    const fontAwesomeLink = document.createElement("link")
    fontAwesomeLink.id = "font-awesome"
    fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    fontAwesomeLink.rel = "stylesheet"
    document.head.appendChild(fontAwesomeLink)
  }
}
