import { useSesionUsuario } from '../../contexto/sesionUsuario'; 
import { Navigate } from 'react-router-dom';

//ruta privada para todo el sistema
function RutaPrivadaInterna({ children, tipoUsuario }) {
  const { usuario } = useSesionUsuario(); 

  //tipoUsuario solo va a tener dos valores: familiar o empleado, porque admin puede ver todo
  return usuario.tipo === tipoUsuario || usuario.tipo === "admin" ? children : <Navigate to="/userPanel/perfil" />; 
}

export default RutaPrivadaInterna;