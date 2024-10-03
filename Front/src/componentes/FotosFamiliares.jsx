import React, {useContext, useState, useEffect} from "react";
import {contextoSesionUsuario} from "../contexto/SesionUsuario.jsx"
import Chip from '@mui/material/Chip';
import { todosLosPacientes } from "../api.js";

export default function FotosFamiliares(){

    const { usuario } = useContext(contextoSesionUsuario);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        obraSocial: "",
        observaciones: "",
        fotoFrenteDni: "",
        fotoAtrasDni: "",
        fotoFrenteCarnet: "",
        fotoAtrasCarnet: ""
      });
      const [pacientesSeleccionados, setPacientesSeleccionados] = useState([]);
    const [menuCargarFotos, setMenuCargarFotos] = useState(false);

    const [foto, setFoto] = useState(null);

    function abrirMenuCargarFotos(){
        setMenuCargarFotos(true);
    }

    useEffect(() => { 
        traerPacientes();
        
      }, [paciente]);

      async function traerPacientes() {
        const datos = await todosLosPacientes();
        const datosFiltrados = datos.filter((paciente) => paciente !== null);
        setPacientes(datosFiltrados);
      
      }


    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFoto(reader.result); 
            };
            reader.readAsDataURL(file); 
        }
    };

    const handleSelectChange = (e) => {
        const dni = parseInt(e.target.value);
        const pacienteSeleccionado = pacientes.find(paciente => paciente.dni === dni);
    
        if (pacienteSeleccionado && !pacientesSeleccionados.some(p => p.dni === pacienteSeleccionado.dni)) {
            setPacientesSeleccionados([...pacientesSeleccionados, pacienteSeleccionado]);
        }
    
    };

    const handleDeleteChip = (dni) => {
        setPacientesSeleccionados(pacientesSeleccionados.filter(paciente => paciente.dni !== dni));
    };



    return (
        <>
        <div className="titulo flex justify-center text-xl lg:text-3xl lg:mt-5 mb-10 ">
        <h2 className="font-bold">Fotos</h2>
      </div>

        {(usuario.tipo  === "admin" && !menuCargarFotos) && (
            <div className="registrarUsuario mb-4 mx-4 ">
            <button 
            onClick={abrirMenuCargarFotos}
            className={`flex text-xl text-green-600 border border-green-600 rounded-lg p-2 
            hover:bg-green-600 hover:text-white hover:border-[#017a98]}`}>
              <svg
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                ></path>
              </svg>
              Cargar fotos
            </button>
          </div>
        )}
      
        {menuCargarFotos && (
            <div className="p-4 bg-gray-100 rounded-lg grid place-content-center" >
              
         <div className="mb-4 ">
                <label htmlFor="upload-photo" className="block mb-2 text-sm font-medium text-gray-700">Cargar Foto</label>
                <input
                    type="file"
                    id="upload-photo"
                    accept="image/*"
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                    onChange={handleFotoChange}
                />
                <p className="mt-1 text-sm text-gray-500">Selecciona una imagen para cargar.</p>
            </div>

         
            {foto && (
                <div className="mb-4">
                    <img src={foto} alt="Vista previa" className="max-w-full h-auto rounded-lg" />
                </div>
            )}

       
        <div className="mb-4">
            <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-700">Descripción de la Foto</label>
            <textarea id="descripcion" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Descripción de la foto..."></textarea>
        </div>

                <div className="pacientes ">
                    <h3>¿Quienes estan en la foto?</h3>
                    <div className="elegir-paciente">
                    <select
                        name="paciente"
                        id="select-paciente"
                        className="bg-gray-200 rounded-lg p-2"
                        onChange={handleSelectChange}
                    >
                        <option selected disabled value="null">Selecciona un paciente</option>
                        {pacientes.map((paciente, index) => (
                            <option key={index} value={paciente.dni}>
                                {paciente.nombre + ' ' + paciente.apellido}
                            </option>
                        ))}
                    </select>
                </div>
                
                </div>
                <div className="mt-4">
    {pacientesSeleccionados.length === 0 ? (
        <p>No hay pacientes seleccionados</p>
    ) : (
        pacientesSeleccionados.map((paciente) => (
            <Chip
                key={paciente.dni}
                label={paciente.nombre + ' ' + paciente.apellido}
                onDelete={() => handleDeleteChip(paciente.dni)}
                color="primary"
                style={{ margin: '5px' }}
            />
        ))
    )}
</div>


                <div className="botones"></div>
            </div>
        )}

        {!menuCargarFotos && (
            <div className="fotos grid grid-cols-3">
        
            </div>
        )}
      
        </>
    )
}