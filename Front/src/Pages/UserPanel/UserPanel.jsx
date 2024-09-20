import { Routes, Route } from "react-router-dom"; // Asegúrate de importar Routes y Route
import BarraNavegacion from "../../componentes/BarraNavegacion";
import FormPacientes from "../../componentes/FormPacientes";
import RegistrarPacientes from "../../componentes/RegistrarPacientes";
import ListadoPacientes from "../../componentes/ListadoPacientes";
import "../../App.css";
import { desactivarPAcientes } from "../../api.js";
import Perfil from "../../componentes/perfil.jsx";
import ListadoUsuarios from "../../componentes/ListadoUsuarios.jsx";

async function botonClick() {
  const datos = await desactivarPAcientes(12345678);
  console.log(datos);
}

function UserPanel() {
  return (
    <>
      <div className="lg:grid lg:grid-cols-5">
        <div
          className={`bg-white shadow-lg  h-16 lg:block lg:col-span-1 lg:sticky lg:top-0 lg:h-screen lg:rounded-lg lg:shadow-[#017a98]/50`}
        >
          <BarraNavegacion />
        </div>

        <div className="bg-white shadow-lg lg:shadow-[#017a98]/50  md:col-span-4 lg:mx-12 lg:my-6 lg:rounded-lg">
          {/* Definir las rutas anidadas */}
          <Routes>
            <Route path="todosLospacientes" element={<ListadoPacientes />} />
            <Route path="paciente/registrar" element={<RegistrarPacientes />} />
            <Route path="paciente/modificar" element={<FormPacientes />} />
            <Route path="stockDelHogar" />
            <Route path="pedidos" />
            <Route path="listaDeUsuarios" element={<ListadoUsuarios/>}/>
            <Route path="perfil" element={<Perfil/>}/>
          </Routes>
        </div>
      </div>

      <div className="botonDePrueba hidden">
        <button
          onClick={botonClick}
          className="p-8 text-xl bg-red-500 text-white rounded-lg"
        >
          Boton de prueba
        </button>
      </div>
    </>
  );
}

export default UserPanel;
