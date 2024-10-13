import React, { useState, useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import traerUsuariosApi, { desactivarUsuarioApi, todosLosPacientes } from "../../api";

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
  const [actionType, setActionType] = useState(""); // Nuevo estado para la acción

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
        return user;
      });
      setUsuarios(usuariosActualizados);
    }
  }
  
  useEffect(() => {
    async function cargarDatos() {
      const pacientesCargados = await traerPacientes();
      await traerUsuarios(pacientesCargados);
    }
    cargarDatos();
  }, []);
  
  async function desactivar(dni) {
    try {
      await desactivarUsuarioApi(parseInt(dni));
      setUsuarios(usuarios.filter((usuario) => usuario.dni !== dni));
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
      // Aquí puedes implementar la lógica para reactivar el usuario si es necesario.
      // Ejemplo: reactivar(usuarioDni);
    }
  };

  return (
    <>
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={handleConfirm} 
        dni={usuarioDni} 
        action={actionType} // Pasar la acción al modal
      />
      <div className="listadoUsuarios border rounded-lg p-2 shadow-md overflow-x-auto">
        <table className="min-w-full table-auto text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-1 py-0.5 border border-[#181818]">Nombre</th>
              <th className="px-1 py-0.5 border border-[#181818]">Apellido</th>
              <th className="px-1 py-0.5 border border-[#181818]">Email</th>
              <th className="px-1 py-0.5 border border-[#181818]">DNI</th>
              <th className="px-1 py-0.5 border border-[#181818]">Teléfono</th>
              <th className="px-1 py-0.5 border border-[#181818]">Dirección</th>
              <th className="px-1 py-0.5 border border-[#181818]">Paciente asociado</th>
              <th className="px-1 py-0.5 border border-[#181818]">Tipo</th>
              <th className="px-1 py-0.5 border border-[#181818]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr
                key={index}
                className={`hover:bg-[#017a98]/50 ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"}`}
              >
                <td className="px-1 py-0.5 border border-[#181818]">{usuario.nombre}</td>
                <td className="px-1 py-0.5 border border-[#181818]">{usuario.apellido}</td>
                <td className="px-1 py-0.5 border border-[#181818]">{usuario.email}</td>
                <td className="px-1 py-0.5 border border-[#181818]">{usuario.dni}</td>
                <td className="px-1 py-0.5 border border-[#181818]">{usuario.telefono}</td>
                <td className="px-1 py-0.5 border border-[#181818]">{usuario.direccion}</td>
                <td className="px-1 py-0.5 border border-[#181818]">{usuario.tipo === "familiar" ? usuario.nombreAsociado : ""}</td>
                <td className="px-1 py-0.5 border border-[#181818]">{usuario.tipo}</td>
                <td className="py-0.5 border border-[#181818]">
                  {usuario.activo ? (
                    <button className="text-red-600 font-bold hover:bg-red-200 text-xs" onClick={() => handleActionClick(usuario.dni, "desactivar")}>
                      <DeleteForeverIcon /> Desactivar
                    </button>
                  ) : (
                    <button className="text-green-600 font-bold hover:bg-green-200 text-xs" onClick={() => handleActionClick(usuario.dni, "reactivar")}>
                      <CheckCircleOutlineIcon /> Reactivar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
