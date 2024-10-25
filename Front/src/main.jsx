import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProveedorSesion } from './contexto/sesionUsuario.jsx'

createRoot(document.getElementById('root')).render(
  <ProveedorSesion>
    <App />
  </ProveedorSesion>
)
