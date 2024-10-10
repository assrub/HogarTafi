import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { todosLosPacientes, desactivarPAcientes } from "../api";

function ListadoPacientes() {
  const [pacientes, setPacientes] = useState([]);
  //datos para probar cuando no hay api
  const datosEjemplo = [
    {
      nombre: "Lucía",
      apellido: "Pérez",
      dni: "37654821",
      obraSocial: "OSDE",
    },
    {
      nombre: "Martín",
      apellido: "Gómez",
      dni: "39561234",
      obraSocial: "Swiss Medical",
    },
    {
      nombre: "Mariana",
      apellido: "Fernández",
      dni: "41234567",
      obraSocial: "Galeno",
    },
    {
      nombre: "Carlos",
      apellido: "Ramírez",
      dni: "40231678",
      obraSocial: "Medifé",
    },
    {
      nombre: "Sofía",
      apellido: "López",
      dni: "38456789",
      obraSocial: "OSDE",
    },
    {
      nombre: "Javier",
      apellido: "Sánchez",
      dni: "42123456",
      obraSocial: "OMINT",
    },
    {
      nombre: "Valeria",
      apellido: "Gutiérrez",
      dni: "39874561",
      obraSocial: "Osecac",
    },
  ];

  async function traerPacientes() {
    const datos = await todosLosPacientes();
    const datosFiltrados = datos.filter((paciente) => paciente !== null);
    setPacientes(datosFiltrados);

  
  }
  //Cada vez que se cargue la pagina trae los pacientes guardados
  useEffect(() => {
    traerPacientes();
    
  }, []);

  async function desactivar(dni) {
    try {
      const datos = await desactivarPAcientes(parseInt(dni));
      //Actualiza el estado de pacientes, asi desaparece de la lista.
      setPacientes(pacientes.filter(paciente => paciente.dni !== dni));
    } catch (error){
      console.error(error);
    }
  }

  return (
    <>
      <div className="titulo flex justify-center text-xl lg:text-3xl lg:mt-5 mb-10 ">
        <h2 className="font-bold">Listado de pacientes</h2>
      </div>

      <div className="tabla mx-2">
        <table className="min-w-full mb-10">
          <thead>
            <tr>
              <th className="lg:px-4 lg:py-2 border border-[#181818]">Nombre</th>
              <th className="lg:px-4 lg:py-2 border border-[#181818]">Apellido</th>
              <th className="lg:px-4 lg:py-2 border border-[#181818]">DNI</th>
              <th className="lg:px-4 lg:py-2 border border-[#181818]">Obra social</th>
              <th className="lg:px-4 lg:py-2 border border-[#181818]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente, index) => (
              <tr
                key={index}
                className={`hover:bg-[#017a98]/50 text-lg ${
                  index % 2 == 0 ? "bg-gray-100" : "bg-gray-300"
                }`}
              >
                <td className="px-2 lg:px-4 lg:py-2 border border-[#181818] items-center">
                  {paciente.nombre}
                </td>
                <td className="px-2 lg:px-4 lg:py-2 border border-[#181818]">
                  {paciente.apellido}
                </td>
                <td className="px-2 lg:px-4 lg:py-2 border border-[#181818]">
                  {paciente.dni}
                </td>
                <td className="px-2 lg:px-4 lg:py-2 border border-[#181818]">
                  {paciente.obraSocial}
                </td>
                <td className="px-2 lg:px-4 lg:py-2 border border-[#181818]">
                  <div
                    className="eliminar px-2 lg:py-2 flex justify-center
                     text-red-600 font-bold border-b rounded-lg hover:bg-red-200
                      border-black"
                  >
                    <button
                      className="lg:px-5"
                      onClick={() => desactivar(paciente.dni)}
                    >
                      <DeleteForeverIcon /> Eliminar
                    </button>
                  </div>
                  <div
                    className="modificar px-2 lg:py-2 flex justify-center 
                     text-blue-600 font-bold rounded-lg hover:bg-blue-200"
                  >
                    <Link
                      className="lg:px-5 "
                      to={"/UserPanel/paciente/modificar"}
                      state={{ paciente: paciente }}
                    >
                      <EditIcon />
                      Modificar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListadoPacientes;
