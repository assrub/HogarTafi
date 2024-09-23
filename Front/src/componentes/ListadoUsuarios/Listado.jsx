import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


export default function Listado(){

    //Ejemplo
    const usuarios = [
        {
          nombre: "Juan",
          apellido: "Pérez",
          email: "juan.perez@example.com",
          dni: "123",
          telefono: "123-456-7890",
          direccion: "Calle Falsa 123",
          pacienteAsociado: "Paciente A",
          tipoDeUsuario: "admin"
        },
        {
          nombre: "María",
          apellido: "Gómez",
          email: "maria.gomez@example.com",
          dni: "456",
          telefono: "234-567-8901",
          direccion: "Avenida Siempre Viva 456",
          pacienteAsociado: "Paciente B",
          tipoDeUsuario: "familiar"
        },
        {
          nombre: "Carlos",
          apellido: "López",
          email: "carlos.lopez@example.com",
          dni: "789",
          telefono: "345-678-9012",
          direccion: "Boulevard de los Sueños 789",
          pacienteAsociado: "No",
          tipoDeUsuario: "empleado"
        },
        {
          nombre: "Ana",
          apellido: "Martínez",
          email: "ana.martinez@example.com",
          dni: "6757",
          telefono: "456-789-0123",
          direccion: "Plaza Mayor 101",
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
                <th className="px-4 py-2 border border-[#181818]">Dni</th>
                <th className="px-4 py-2 border border-[#181818]">Telefono</th>
                <th className="px-4 py-2 border border-[#181818]">Direccion</th>
                <th className="px-4 py-2 border border-[#181818]">Paciente asociado</th>
                <th className="px-4 py-2 border border-[#181818]">Tipo</th>
                <th className="px-4 py-2 border border-[#181818]">Acciones</th>
              </tr>
            </thead>
            <tbody>
            {usuarios.map((usuario, index) => (
                 <tr
                 key={index}
                 className={`hover:bg-[#017a98]/50 text-xl ${
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
                  {usuario.dni}
                </td>
                <td className="px-4 py-2 border border-[#181818] items-center">
                  {usuario.telefono}
                </td>
                <td className="px-4 py-2 border border-[#181818] items-center">
                  {usuario.direccion}
                </td>
                <td className="px-4 py-2 border border-[#181818] items-center">
                  {usuario.pacienteAsociado}
                </td>
                <td className="px-4 py-2 border border-[#181818] items-center">
                  {usuario.tipoDeUsuario}
                </td>
                <div
                    className="eliminar py-2 flex justify-center
                     text-red-600 font-bold border-r border-b border-[#181818] hover:bg-red-200
                     "
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