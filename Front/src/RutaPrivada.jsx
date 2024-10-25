import { useSesionUsuario } from './contexto/sesionUsuario.jsx'; 
import { Navigate } from 'react-router-dom';

//ruta privada para todo el sistema
function RutaPrivada({ children }) {
  const { usuario } = useSesionUsuario(); 

  return usuario.nombre ? children : <Navigate to="/login" />; 
}

export default RutaPrivada;