import React, { useState, useEffect } from "react";
import CampoTexto from "./CampoTexto";
import { modificarPaciente } from "../../api"; 
import CartelAviso from "../CartelAviso";
import BotonActualizar from './../Botones/BotonActualizar';

function DatosPaciente({ paciente }) {

    const [mensaje, setMensaje] = useState("");
    const [mostrarCartel, setMostrarCartel] = useState(false);
    const toggleModal = () => setMostrarCartel(!mostrarCartel);

    const [pacienteState, setPacienteState] = useState({
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

    useEffect(() => {
        // Actualiza el estado interno cuando cambie el paciente prop
        if (paciente) {
            setPacienteState({ ...paciente });
        }
    }, [paciente]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPacienteState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    async function modificar() {
        const formData = new FormData();
        formData.append("nombre", pacienteState.nombre);
        formData.append("apellido", pacienteState.apellido);
        formData.append("dni", parseInt(pacienteState.dni));
        formData.append("obraSocial", pacienteState.obraSocial);
        formData.append("observaciones", pacienteState.observaciones);


        formData.append("fotoFrenteDni", null);
        formData.append("fotoAtrasDni", null);
        formData.append("fotoFrenteCarnet", null);
        formData.append("fotoAtrasCarnet", null);
        const response = await modificarPaciente(parseInt(pacienteState.dni), formData);

        if(response.status == 200){
            setMensaje("Paciente modificado correctamente.");
            

          }else if(response.status == 404 ) {
            setMensaje("Error al modificar los datos del paciente.");
           
          }
          toggleModal();

    }

    return (
        <div className="fborder rounded-lg shadow-md max-w-md m-auto">
    <div className="datos w-full">
        <form onSubmit={(e) => { e.preventDefault()}} className="p-4 bg-white shadow-md">

            {/* Campo NOMBRE */}
            <div className="flex flex-col sm:flex-row mb-2">
                <div className="sm:flex-1 min-w-[140px] text-gray-700 pl-2 text-white bg-gray-400 flex items-center">
                    NOMBRE
                </div>
                <div className="w-full">
                    <CampoTexto
                        error={false}
                        obligatorio={true}
                        propsLabel={{ labelFor: "inputNombre" }}
                        propsInput={{
                            type: "text",
                            name: "nombre",
                            id: "inputNombre",
                            value: pacienteState.nombre,
                            onChange: handleInputChange,
                            className: "w-full p-2 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        }}
                    />
                </div>
            </div>

            {/* Campo APELLIDO */}
            <div className="flex flex-col sm:flex-row mb-2">
                <div className="sm:flex-1 min-w-[140px] text-gray-700 pl-2 text-white bg-gray-400 flex items-center">
                    APELLIDO
                </div>
                <div className="w-full">
                    <CampoTexto
                        error={false}
                        obligatorio={true}
                        propsLabel={{ labelFor: "inputApellido" }}
                        propsInput={{
                            type: "text",
                            name: "apellido",
                            id: "inputApellido",
                            value: pacienteState.apellido,
                            onChange: handleInputChange,
                            className: "w-full border border-neutral-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        }}
                    />
                </div>
            </div>

            {/* Campo DNI */}
            <div className="flex flex-col sm:flex-row mb-2">
                <div className="sm:flex-1 min-w-[140px] text-gray-700 pl-2 text-white bg-gray-400 flex items-center">
                    DNI
                </div>
                <div className="w-full">
                    <CampoTexto
                        error={false}
                        obligatorio={true}
                        propsLabel={{ labelFor: "inputDni" }}
                        propsInput={{
                            type: "number",
                            name: "dni",
                            id: "inputDni",
                            value: pacienteState.dni,
                            readOnly: true,
                            onChange: handleInputChange,
                            className: "w-full bg-gray-200 border border-neutral-300 p-2 focus:outline-none"
                        }}
                    />
                </div>
            </div>

            {/* Campo OBRA SOCIAL */}
            <div className="flex flex-col sm:flex-row mb-2">
                <div className="sm:flex-1 min-w-[140px] text-gray-700 pl-2 text-white bg-gray-400 flex items-center">
                    OBRA SOCIAL
                </div>
                <div className="w-full">
                    <CampoTexto
                        propsLabel={{ labelFor: "inputObraSocial" }}
                        propsInput={{
                            type: "text",
                            name: "obraSocial",
                            id: "inputObraSocial",
                            value: pacienteState.obraSocial,
                            onChange: handleInputChange,
                            className: "w-full border border-neutral-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        }}
                    />
                </div>
            </div>

            {/* Campo OBSERVACIONES */}
            <div className="flex flex-col sm:flex-row mb-2">
                <div className="sm:flex-1 min-w-[140px] text-gray-700 pl-2 text-white bg-gray-400 flex items-center">
                    OBSERVACIONES
                </div>
                <div className="w-full">
                    <textarea
                        id="observaciones"
                        name="observaciones"
                        className="w-full h-32 border border-neutral-300 p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={pacienteState.observaciones}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
            </div>

            {/* Botón Actualizar Datos */}
            <div className="grid justify-items-center mt-4">
                <BotonActualizar type="submit" onClick={modificar} texto="Actualizar Datos" />
            </div>
        </form>
    </div>
    <div className="modal">
        <CartelAviso
            abrirModal={mostrarCartel}
            cerrarModal={toggleModal}
            mensaje={mensaje}
        />
    </div>
</div>

    );
}

export default DatosPaciente;
