"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff } from "react-feather"
import axios from "axios"
import "../styles.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('https://sw1node-production.up.railway.app/api/auth/login', {
        correo: email,
        password: password,
      });

      const { token } = response.data;

      // Guardar el token en localStorage
      localStorage.setItem('token', token);
      
      

      // Redirigir al dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error('Error en login:', err);
      setError("Correo o contraseña incorrectos");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <h1 className="auth-title">Iniciar Sesión</h1>
        <p className="auth-subtitle">Bienvenido de nuevo</p>

        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
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

          

          <button type="submit" className="submit-button">
            Iniciar Sesión
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="auth-link">
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
