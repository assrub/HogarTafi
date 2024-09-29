import React, {useState, useEffect} from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import traerUsuariosApi, {desactivarUsuarioApi, todosLosPacientes} from "../../api";

export default function Listado(){

   /*
    const [usuario, setUsuario] = useState({
      nombre: "",
      apellido: "",
      email: "",
      dni: "",
      telefono: "",
      direccion: "",
      contra: "",
      tipo: "",
      asociado: "",
      nombreAsociado: ""
    }); */

    
  const [pacientes, setPacientes] = useState([]);

    const [usuarios, setUsuarios] = useState([]);

    async function traerPacientes() {
      const datos = await todosLosPacientes();
      const datosFiltrados = datos.filter((paciente) => paciente !== null);
      setPacientes(datosFiltrados);
      return datosFiltrados; // Devolvemos los pacientes
    }
  
    // Función para traer usuarios y asociar con los pacientes
    async function traerUsuarios(pacientesCargados) {
      const response = await traerUsuariosApi();
      console.log("Usuarios traídos:", response); // Verifica la respuesta
  
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
        setUsuarios(usuariosActualizados); // Actualizamos usuarios
      }
    }
  
    // Cargar pacientes y luego usuarios en el orden correcto
    useEffect(() => {
      async function cargarDatos() {
        const pacientesCargados = await traerPacientes();
        await traerUsuarios(pacientesCargados); 
      }
      cargarDatos();
    }, []);
  
    // Función para desactivar un usuario
    async function desactivar(dni) {
      try {
        await desactivarUsuarioApi(parseInt(dni));
        // Actualiza el estado de usuarios, eliminando el usuario desactivado de la lista
        setUsuarios(usuarios.filter((usuario) => usuario.dni !== dni));
      } catch (error) {
        console.error(error);
      }
    }

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
                  {usuario.tipo == "familiar" ? usuario.nombreAsociado : ""}
                </td>
                <td className="px-4 py-2 border border-[#181818] items-center">
                  {usuario.tipo}
                </td>
                {usuario.activo && (
                  <div
                  className="eliminar py-2 flex justify-center
                   text-red-600 font-bold border-r border-b border-[#181818] hover:bg-red-200
                   "
                >
                  <button
                    className="px-5"
                    onClick={() => desactivar(usuario.dni)}
                  >
                    <DeleteForeverIcon /> Desactivar usuario
                  </button>
                </div>
                )}
                {!usuario.activo && (
                   <div
                   className="activar-usuario py-2 flex justify-center
                    text-green-600 font-bold border-r border-b border-[#181818] hover:bg-green-200
                    "
                 >
                   <button
                     className="px-5"
                     onClick={() => desactivar(usuario.dni)}
                   >
                     <CheckCircleOutlineIcon /> Reactivar usuario
                   </button>
                 </div>
                )}
                
                
            </tr>
            ))}
            </tbody>
          </table>
        </div>
      </>
    )
}