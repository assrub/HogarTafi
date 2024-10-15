import { Routes, Route, useLocation  } from "react-router-dom"; 
import { useContext } from "react";
import BarraNavegacion from "../../componentes/BarraNavegacion";
import FormPacientes from "../../componentes/FormPacientes";
import RegistrarPacientes from "../../componentes/RegistrarPacientes";
import ListadoPacientes from "../../componentes/ListadoPacientes";
import "../../App.css";
import Perfil from "../../componentes/perfil.jsx";
import ListadoUsuarios from "../../componentes/ListadoUsuarios.jsx";
import MedicacionesDiarias from "../../componentes/MedicacionesDiarias.jsx";
import FotosFamiliares from "../../componentes/FotosFamiliares.jsx";
import Pedidos from "../../componentes/Pedidos.jsx";
import { traerTodosLosSotcksApi } from "../../api.js";
import { contextoSesionUsuario } from "../../contexto/sesionUsuario.jsx";
import StockDelHogar from "../../componentes/StockDelHogar.jsx";


async function botonClick() {
  const datos = await traerTodosLosSotcksApi(
  );
  console.log(datos);
}

function UserPanel() {
  const location = useLocation();
  const { usuario } = useContext(contextoSesionUsuario);
  return (
    <>
  <div className="lg:grid lg:grid-cols-5">
    {/* Barra de Navegación */}
    <div className={`bg-white shadow-lg h-16 lg:block lg:col-span-1 lg:sticky lg:top-0 lg:h-screen lg:rounded-lg lg:shadow-[#017a98]/50`}>
      <BarraNavegacion />
    </div>

    {/* Contenedor Principal */}
    <div className="bg-gray-100 shadow-lg min-h-screen lg:shadow-[#017a98]/50 md:col-span-4 lg:mx-12 lg:my-6 lg:rounded-lg">
      {/* Titulo de Bienvenida */}
      <div className={`titulo flex flex-col justify-center items-center text-xl lg:text-3xl lg:mt-5 mb-10 ${location.pathname !== "/userPanel" ? "hidden" : ""}`}>
        <h2 className="font-bold mb-4">¡Bienvenido {usuario.nombre}!</h2>
        <img src="Logo.jpg" alt="Logo" className="w-64 h-64 lg:w-96 lg:h-96 mt-12" />
      </div>

      {/* Rutas */}
      <div className="rutas overflow-x-auto flex justify-center min-h-screen p-4 shadow-lg">
        <Routes>
          <Route path="todosLospacientes" element={<ListadoPacientes />} />
          <Route path="paciente/registrar" element={<RegistrarPacientes />} />
          <Route path="paciente/modificar" element={<FormPacientes />} />
          <Route path="paciente/medicacionesDiarias" element={<MedicacionesDiarias />} />
          <Route path="stockDelHogar" element={<StockDelHogar/>}/>
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="fotos" element={<FotosFamiliares />} />
          <Route path="listaDeUsuarios" element={<ListadoUsuarios />} />
          <Route path="perfil" element={<Perfil />} />
        </Routes>
      </div>
    </div>
  </div>

  {/* Botón de Prueba */}
  <div className="botonDePrueba hidden">
    <button onClick={botonClick} className="p-8 text-xl bg-red-500 text-white rounded-lg">
      Botón de prueba
    </button>
  </div>
</>

         );
}

export default UserPanel;
