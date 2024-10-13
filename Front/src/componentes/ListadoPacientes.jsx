import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { todosLosPacientes, desactivarPAcientes } from "../api";

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

      <div className="tabla overflow-x-auto">
        <table className="min-w-full mb-10 border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border-b text-left text-gray-600">Nombre</th>
              <th className="px-4 py-2 border-b text-left text-gray-600">Apellido</th>
              <th className="px-4 py-2 border-b text-left text-gray-600">DNI</th>
              <th className="px-4 py-2 border-b text-left text-gray-600">Obra social</th>
              <th className="px-4 py-2 border-b text-left text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-200 transition duration-300 ease-in-out text-lg ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-4 py-3 ">{paciente.nombre}</td>
                <td className="px-4 py-3 ">{paciente.apellido}</td>
                <td className="px-4 py-3 ">{paciente.dni}</td>
                <td className="px-4 py-3 ">{paciente.obraSocial}</td>
                <td className="px-4 py-3 flex space-x-2">
                  <button
                    className="flex items-center px-2 py-0.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => handleEliminar(paciente)}
                  >
                    <DeleteForeverIcon fontSize="small" />
                    <span className="ml-1 text-sm">Eliminar</span>
                  </button>
                  <Link
                    className="flex items-center px-2 py-0.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    to={"/UserPanel/paciente/modificar"}
                    state={{ paciente: paciente }}
                  >
                    <EditIcon fontSize="small" />
                    <span className="ml-1 text-sm">Modificar</span>
                  </Link>
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
