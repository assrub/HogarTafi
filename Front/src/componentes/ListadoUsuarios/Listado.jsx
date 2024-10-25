import React, { useState, useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import traerUsuariosApi, { desactivarUsuarioApi, activarUsuarioApi, todosLosPacientes } from "../../api";

const Modal = ({ isOpen, onClose, onConfirm, dni, action }) => {
  if (!isOpen) return null;

  const actionText = action === "desactivar" ? "desactivar" : "reactivar";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg">Confirmar acción</h2>
        <p>¿Estás seguro de que quieres {actionText} este usuario?</p>
        <div className="flex justify-end mt-4">
          <button className="mr-2 bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancelar</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => { onConfirm(); onClose(); }}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Listado() {
  const [pacientes, setPacientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioDni, setUsuarioDni] = useState(null);
  const [actionType, setActionType] = useState("");


  async function traerPacientes() {
    const datos = await todosLosPacientes();
    const datosFiltrados = datos.filter((paciente) => paciente !== null);
    setPacientes(datosFiltrados);
    return datosFiltrados; 
  }


  async function traerUsuarios(pacientesCargados) {
    const response = await traerUsuariosApi();
    if (response && pacientesCargados.length > 0) {
      const usuariosActualizados = response.map((user) => {
        if (user.tipo === "familiar") {
          
          const pacienteAsociado = pacientesCargados.find(
            (paciente) => parseInt(paciente.dni) === parseInt(user.asociado)
          );
          if (pacienteAsociado) {
            return {
              ...user,
              nombreAsociado: `${pacienteAsociado.nombre} ${pacienteAsociado.apellido}`,
            };
          }
        }
        console.log(user.nombreAsociado)
        return user;

      });
      setUsuarios(usuariosActualizados);
    }
  }

  
  useEffect(() => {
    async function cargarDatos() {
      const pacientesBackend = await traerPacientes(); 
      await traerUsuarios(pacientesBackend);
    }
    cargarDatos();
  }, []);

  async function desactivar(dni) {
    try {
      await desactivarUsuarioApi(parseInt(dni));
      traerUsuarios(pacientes);
    } catch (error) {
      console.error(error);
    }
  }

  async function activar(dni) {
    try {
      await activarUsuarioApi(parseInt(dni));
      traerUsuarios(pacientes); 
    } catch (error) {
      console.error(error);
    }
  }

  const handleActionClick = (dni, action) => {
    setUsuarioDni(dni);
    setActionType(action);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if (actionType === "desactivar" && usuarioDni) {
      desactivar(usuarioDni);
    } else if (actionType === "reactivar" && usuarioDni) {
      activar(usuarioDni);
    }
  };

  return (<>
    <Modal 
      isOpen={modalOpen} 
      onClose={() => setModalOpen(false)} 
      onConfirm={handleConfirm} 
      dni={usuarioDni} 
      action={actionType} 
    />
    <div className="listadoUsuarios border rounded-lg p-2 shadow-md overflow-x-auto">
      {/* Vista en pantallas grandes */}
      <table className="hidden lg:table min-w-full table-auto text-xs sm:text-xs bg-white">
        <thead>
          <tr className="bg-gray-400">
            <th className="p-3 border border-gray-300 text-white">Nombre</th>
            <th className="p-3 border border-gray-300 text-white">Apellido</th>
            <th className="p-3 border border-gray-300 text-white">Email</th>
            <th className="p-3 border border-gray-300 text-white">DNI</th>
            <th className="p-3 border border-gray-300 text-white">Teléfono</th>
            <th className="p-3 border border-gray-300 text-white">Dirección</th>
            <th className="p-3 border border-gray-300 text-white">Paciente asociado</th>
            <th className="p-3 border border-gray-300 text-white">Tipo</th>
            <th className="p-3 border border-gray-300 text-white">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={index} className={`sm:text-xs hover:bg-gray-200 transition duration-100 ease-in-out ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"}`}>
              <td className="border border-gray-300 p-1 break-words text-center align-middle">{usuario.nombre}</td>
              <td className="border border-gray-300 p-1 break-words text-center align-middle">{usuario.apellido}</td>
              <td className="border border-gray-300 p-1 break-words text-center align-middle">{usuario.email}</td>
              <td className="border border-gray-300 p-1 break-words text-center align-middle">{usuario.dni}</td>
              <td className="border border-gray-300 p-1 break-words text-center align-middle">{usuario.telefono}</td>
              <td className="border border-gray-300 p-1 break-words text-center align-middle">{usuario.direccion}</td>
              <td className="border border-gray-300 p-1 break-words text-center align-middle">{usuario.tipo === "familiar" ? usuario.nombreAsociado : ""}</td>
              <td className="border border-gray-300 p-1 break-words text-center align-middle">{usuario.tipo}</td>
              <td className="border border-gray-300 p-1 break-words text-center align-middle">
                {usuario.activo ? (
                  <button className="w-full text-red-600 font-bold hover:bg-red-200 text-xs" onClick={() => handleActionClick(usuario.dni, "desactivar")}>
                    <DeleteForeverIcon /> Desactivar
                  </button>
                ) : (
                  <button className="w-full text-green-600 font-bold hover:bg-green-200 sm:text-xs" onClick={() => handleActionClick(usuario.dni, "reactivar")}>
                    <CheckCircleOutlineIcon /> Reactivar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* Vista en dispositivos móviles y tabletas */}
      <div className="lg:hidden grid grid-cols-1 gap-6">
        {usuarios.map((usuario, index) => (
          <div key={index} className="border border-gray-300 p-3 rounded-lg bg-white shadow-sm">
            <div className="grid grid-cols-2 gap-x-2 text-xs sm:text-sm">
              <div className="font-bold text-gray-700">Nombre</div>
              <div>{usuario.nombre}</div>
              <div className="font-bold text-gray-700">Apellido</div>
              <div>{usuario.apellido}</div>
              <div className="font-bold text-gray-700">Email</div>
              <div>{usuario.email}</div>
              <div className="font-bold text-gray-700">DNI</div>
              <div>{usuario.dni}</div>
              <div className="font-bold text-gray-700">Teléfono</div>
              <div>{usuario.telefono}</div>
              <div className="font-bold text-gray-700">Dirección</div>
              <div>{usuario.direccion}</div>
              <div className="font-bold text-gray-700">Paciente asociado</div>
              <div>{usuario.tipo === "familiar" ? usuario.nombreAsociado : ""}</div>
              <div className="font-bold text-gray-700">Tipo</div>
              <div>{usuario.tipo}</div>
            </div>
            <div className="mt-4 text-center">
              {usuario.activo ? (
                <button className="w-full text-red-600 font-bold hover:bg-red-200 text-xs" onClick={() => handleActionClick(usuario.dni, "desactivar")}>
                  <DeleteForeverIcon /> Desactivar
                </button>
              ) : (
                <button className="w-full text-green-600 font-bold hover:bg-green-200 text-xs" onClick={() => handleActionClick(usuario.dni, "reactivar")}>
                  <CheckCircleOutlineIcon /> Reactivar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  );
}
