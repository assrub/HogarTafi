import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { todosLosPacientes, desactivarPAcientes } from "../api";
import BotonEditar from './Botones/BotonEditar';
import BotonEliminar from './Botones/BotonEliminar';

function ListadoPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pacienteAEliminar, setPacienteAEliminar] = useState(null);

  async function traerPacientes() {
    try {
      const datos = await todosLosPacientes();
      const datosFiltrados = datos.filter((paciente) => paciente !== null);
      setPacientes(datosFiltrados);
    } catch (error) {
      console.error("Error al obtener pacientes:", error);
    }
  }

  useEffect(() => {
    traerPacientes();
  }, []);

  async function desactivar(dni) {
    try {
      await desactivarPAcientes(parseInt(dni));
      setPacientes(pacientes.filter((paciente) => paciente.dni !== dni));
    } catch (error) {
      console.error(error);
    }
  }

  const handleEliminar = (paciente) => {
    setPacienteAEliminar(paciente);
    setModalVisible(true);
  };

  const confirmarEliminacion = () => {
    if (pacienteAEliminar) {
      desactivar(pacienteAEliminar.dni);
      setModalVisible(false);
    }
  };

  return (
    <div className="registrar-pacientes w-full px-4">
      <div className="titulo flex justify-center text-lg lg:text-2xl lg:mt-5 mb-5">
        <h2 className="font-bold text-gray-800">
          <strong>Registrar pacientes</strong>
        </h2>
      </div>

      <div className="tabla border rounded-lg p-3 shadow-md overflow-x-auto">
        <table className="hidden lg:table min-w-full table-auto text-xs sm:text-xs bg-white">
          <thead className="bg-gray-400">
            <tr>
              <th className="p-3 border border-gray-300 text-white">NOMBRE</th>
              <th className="p-3 border border-gray-300 text-white">APELLIDO</th>
              <th className="p-3 border border-gray-300 text-white">DNI</th>
              <th className="p-3 border border-gray-300 text-white">OBRA SOCIAL</th>
              <th className="p-3 border border-gray-300 text-white">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-200 transition duration-100 ease-in-out ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="border border-gray-300 p-0 h-full text-center align-middle">{paciente.nombre}</td>
                <td className="border border-gray-300 p-0 h-full text-center align-middle">{paciente.apellido}</td>
                <td className="border border-gray-300 p-0 h-full text-center align-middle">{paciente.dni}</td>
                <td className="border border-gray-300 p-0 h-full text-center align-middle">{paciente.obraSocial}</td>
                <td className={`w-full flex bg-gray-200 border border-gray-300 p-0 h-full align-middle}`}>
                  <Link
                    className="min-w-[100px] w-full h-full py-3 text-center text-gray-500 font-bold hover:bg-blue-500 hover:text-white"
                    to={"/UserPanel/paciente/modificar"}
                    state={{ paciente: paciente }}
                  >
                    <span>Modificar</span>
                  </Link>

                    <BotonEliminar onClick={() => handleEliminar(paciente)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 mx-4">
            <h3 className="text-lg font-bold text-center">Confirmar Eliminación</h3>
            <p className="text-center mt-2">
              ¿Está seguro de que desea eliminar al paciente {pacienteAEliminar?.nombre} {pacienteAEliminar?.apellido}?
            </p>
            <div className="flex justify-center mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmarEliminacion}
              >
                Eliminar
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                onClick={() => setModalVisible(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListadoPacientes;
