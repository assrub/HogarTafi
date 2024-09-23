import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Listado(){

    //Ejemplo
    const usuarios = [
        {
          nombre: "Juan",
          apellido: "Pérez",
          email: "juan.perez@example.com",
          pacienteAsociado: "Paciente A",
          tipoDeUsuario: "admin"
        },
        {
          nombre: "María",
          apellido: "Gómez",
          email: "maria.gomez@example.com",
          pacienteAsociado: "Paciente B",
          tipoDeUsuario: "familiar"
        },
        {
          nombre: "Carlos",
          apellido: "López",
          email: "carlos.lopez@example.com",
          pacienteAsociado: "No",
          tipoDeUsuario: "empleado"
        },
        {
          nombre: "Ana",
          apellido: "Martínez",
          email: "ana.martinez@example.com",
          pacienteAsociado: "Paciente D",
          tipoDeUsuario: "familiar"
        }
      ];



    return (
        <>
        <div className="tabla">
          <table className="min-w-full mb-10">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-[#181818]">Nombre</th>
                <th className="px-4 py-2 border border-[#181818]">Apellido</th>
                <th className="px-4 py-2 border border-[#181818]">Email</th>
                <th className="px-4 py-2 border border-[#181818]">Paciente asociado</th>
                <th className="px-4 py-2 border border-[#181818]">Tipo</th>
                <th className="px-4 py-2 border border-[#181818]">Acciones</th>
              </tr>
            </thead>
            <tbody>
            {usuarios.map((usuario, index) => (
                 <tr
                 key={index}
                 className={`hover:bg-[#017a98]/50 text-lg ${
                   index % 2 == 0 ? "bg-gray-100" : "bg-gray-300"
                 }`}
               >
                <td className="px-4 py-2 border border-[#181818] items-center">
                  {usuario.nombre}
                </td>
                <td className="px-4 py-2 border border-[#181818] items-center">
                  {usuario.apellido}
                </td>
                <td className="px-4 py-2 border border-[#181818] items-center">
                  {usuario.email}
                </td>
                <td className="px-4 py-2 border border-[#181818] items-center">
                  {usuario.pacienteAsociado}
                </td>
                <td className="px-4 py-2 border border-[#181818] items-center">
                  {usuario.tipoDeUsuario}
                </td>
                <div
                    className="eliminar py-2 flex justify-center
                     text-red-600 font-bold border-b text-lg hover:bg-red-200
                      border-black"
                  >
                    <button
                      className="px-5"
                      onClick={() => desactivar(paciente.dni)}
                    >
                      <DeleteForeverIcon /> Desactivar usuario
                    </button>
                  </div>
                
            </tr>
            ))}
            </tbody>
          </table>
        </div>
      </>
    )
}