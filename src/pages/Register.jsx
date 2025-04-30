"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { User, Mail, Lock, Eye, EyeOff } from "react-feather"
import "../styles.css"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    

    try {
      const response = await axios.post("https://sw1node-production.up.railway.app/api/auth/register", {
        nombre: name,
        correo: email,
        password
      })

      // Si el backend responde con éxito, redirigir a login
      console.log("✅ Registro exitoso:", response.data)
      alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.")
      navigate("/login")
    } catch (err) {
      console.error("❌ Error al registrar:", err)
      setError(err.response?.data?.message || "Error al registrar. Intenta nuevamente.")
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <h1 className="auth-title">Crear Cuenta</h1>
        <p className="auth-subtitle">Únete a nuestra comunidad</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <label htmlFor="name">Nombre completo</label>
            <div className="input-container">
              <User className="field-icon" size={18} />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="María García"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-container">
              <Mail className="field-icon" size={18} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="password">Contraseña</label>
            <div className="input-container">
              <Lock className="field-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          
          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button">
            Crear Cuenta
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="auth-link">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
