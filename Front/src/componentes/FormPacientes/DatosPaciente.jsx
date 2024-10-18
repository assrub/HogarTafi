import React, { useState, useEffect } from "react";
import CampoTexto from "./CampoTexto";
import { modificarPaciente } from "../../api"; 
import CartelAviso from "../CartelAviso";

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

    return (<div className="formulario grid grid-cols-1 mx-auto justify-items-center max-w-xl">
        <div className="datos w-full mb-6">
            <form onSubmit={(e) => { e.preventDefault(); modificar(); }} className="p-4 bg-white shadow-md rounded-lg">
                <CampoTexto
                    textoEtiqueta="Nombre"
                    error={false} // Cambia según tu lógica de error
                    obligatorio={true}
                    propsLabel={{ labelFor: "inputNombre" }}
                    propsInput={{
                        type: "text",
                        name: "nombre",
                        id: "inputNombre",
                        value: pacienteState.nombre,
                        onChange: handleInputChange,
                        className: "w-full rounded-lg border border-neutral-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" // Ajuste de estilo
                    }}
                />
                <CampoTexto
                    textoEtiqueta="Apellido"
                    error={false}
                    obligatorio={true}
                    propsLabel={{ labelFor: "inputApellido" }}
                    propsInput={{
                        type: "text",
                        name: "apellido",
                        id: "inputApellido",
                        value: pacienteState.apellido,
                        onChange: handleInputChange,
                        className: "w-full rounded-lg border border-neutral-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" // Ajuste de estilo
                    }}
                />
                <CampoTexto
                    textoEtiqueta="DNI"
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
                        className: "w-full rounded-lg bg-gray-200 border border-neutral-300 p-2 focus:outline-none" // Estilo de fondo gris
                    }}
                />
                <CampoTexto
                    textoEtiqueta="Obra social"
                    propsLabel={{ labelFor: "inputObraSocial" }}
                    propsInput={{
                        type: "text",
                        name: "obraSocial",
                        id: "inputObraSocial",
                        value: pacienteState.obraSocial,
                        onChange: handleInputChange,
                        className: "w-full rounded-lg border border-neutral-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" // Ajuste de estilo
                    }}
                />
                <div className="observaciones mt-4">
                    <label htmlFor="observaciones" className="text-xl font-medium">
                        Observaciones
                    </label>
                    <textarea
                        id="observaciones"
                        name="observaciones"
                        className="w-full rounded-lg h-32 bg-transparent border-neutral-300 border-2 p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={pacienteState.observaciones}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                {/* Botón para modificar datos del paciente */}
                <div className="grid justify-items-center mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-700 transition duration-200 ease-in-out"
                    >
                        Modificar Datos
                    </button>
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
