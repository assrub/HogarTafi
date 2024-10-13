import React, { useEffect, useState, useRef } from "react";
import CampoTexto from "./FormPacientes/CampoTexto";
import Foto from "./FormPacientes/Foto";
import Boton from "./Boton";
import { registrarPaciente } from "../api";
import CartelAviso from "./CartelAviso";

function RegistrarPacientes() {
  const fotoFrenteDniRef = useRef(null);
  const fotoDorsoDniRef = useRef(null);
  const fotoFrenteCarnetRef = useRef(null);
  const fotoDorsoCarnetRef = useRef(null);
  const [guardado, setGuardado] = useState(false);
  const [mostrarCartel, setMostrarCartel] = useState(false);
  const [campoIncompleto, setCampoIncompleto] = useState(false);

  const toggleModal = () => setMostrarCartel(!mostrarCartel);

  async function registrar(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const nombrePaciente = document.getElementById("inputNombre").value;
    const apellidoPaciente = document.getElementById("inputApellido").value;
    const dniPaciente = document.getElementById("inputDni").value.toString();
    const obraSocialPaciente = document.getElementById("inputObraSocial").value;
    const observacionesPaciente = document.getElementById("observaciones").value;

    const imagenFrenteDni = fotoFrenteDniRef.current.querySelector('input[type="file"]').files[0];
    const imagenDorsoDni = fotoDorsoDniRef.current.querySelector('input[type="file"]').files[0];
    const imagenFrenteCarnet = fotoFrenteCarnetRef.current.querySelector('input[type="file"]').files[0];
    const imagenDorsoCarnet = fotoDorsoCarnetRef.current.querySelector('input[type="file"]').files[0];

    if (nombrePaciente === "" || apellidoPaciente === "" || dniPaciente === "") {
      setCampoIncompleto(true);
      return;
    } else {
      setCampoIncompleto(false);
    }

    const formData = new FormData();
    formData.append("nombre", nombrePaciente);
    formData.append("apellido", apellidoPaciente);
    formData.append("dni", parseInt(dniPaciente));
    formData.append("obraSocial", obraSocialPaciente);
    formData.append("observaciones", observacionesPaciente);
    formData.append("fotoFrenteDni", imagenFrenteDni);
    formData.append("fotoAtrasDni", imagenDorsoDni);
    formData.append("fotoFrenteCarnet", imagenFrenteCarnet);
    formData.append("fotoAtrasCarnet", imagenDorsoCarnet);

    let response = await registrarPaciente(formData);
    setGuardado(response);
    toggleModal();

    // Limpiar el formulario
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputApellido").value = "";
    document.getElementById("inputDni").value = "";
    document.getElementById("inputObraSocial").value = "";
    document.getElementById("observaciones").value = "";

    // Limpiar las imágenes
    [fotoFrenteDniRef, fotoDorsoDniRef, fotoFrenteCarnetRef, fotoDorsoCarnetRef].forEach(ref => {
      const inputFile = ref.current.querySelector('input[type="file"]');
      if (inputFile) {
        inputFile.value = ""; // Reiniciar el archivo
      }
      ref.current.querySelector("img").src = "/carnetEjemplo.png"; // Reiniciar la imagen
    });
  }

  return (
    <>
  <div className="registrar-pacientes w-full">
    <div className="titulo flex justify-center text-lg lg:text-2xl lg:mt-5 m-5">
      <h2 className="font-bold">
        <strong>Registrar pacientes</strong>
      </h2>
    </div>

    <div className="formulario border rounded-lg p-10 shadow-md grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Sección de Datos */}
      <div className="datos">
        <form onSubmit={registrar} className="mx-2">
          <CampoTexto
            error={campoIncompleto}
            obligatorio={true}
            propsLabel={{ labelFor: "name" }}
            propsInput={{
              type: "name",
              name: "name",
              id: "inputNombre",
              placeholder: "Ingresa el nombre del paciente",
              className: "w-full h-10 p-2 text-sm border border-neutral-300 focus:outline-none focus:ring focus:ring-blue-300"
            }}
          />

          <CampoTexto
            error={campoIncompleto}
            obligatorio={true}
            propsLabel={{ labelFor: "lastName" }}
            propsInput={{
              type: "text",
              name: "lastName",
              id: "inputApellido",
              placeholder: "Ingresa el apellido del paciente",
              className: "w-full h-10 p-2 text-sm border border-neutral-300 focus:outline-none focus:ring focus:ring-blue-300"
            }}
          />

          <CampoTexto
            error={campoIncompleto}
            obligatorio={true}
            propsLabel={{ labelFor: "dni" }}
            propsInput={{
              type: "number",
              name: "dni",
              id: "inputDni",
              placeholder: "Ingresa el DNI del paciente",
              className: "w-full h-10 p-2 text-sm border border-neutral-300 focus:outline-none focus:ring focus:ring-blue-300"
            }}
          />

          <CampoTexto
            error={campoIncompleto}
            propsLabel={{ labelFor: "obraSocial" }}
            propsInput={{
              type: "text",
              name: "obraSocial",
              id: "inputObraSocial",
              placeholder: "Ingresa la Obra Social del paciente",
              className: "w-full h-10 p-2 text-sm border border-neutral-300 focus:outline-none focus:ring focus:ring-blue-300"
            }}
          />

          <div className="observaciones mt-2">
            <textarea
              id="observaciones"
              className="w-full h-24 bg-transparent border border-neutral-300 p-2 resize-none focus:outline-none focus:ring focus:ring-blue-300 text-sm"
              placeholder="Escribe aquí las observaciones..."
            ></textarea>
          </div>
              
          <div className="mt-4">
            <Boton 
              textoBoton="Registrar" 
              type="submit" // Cambia el tipo a "submit"
              propsBoton={{
                className: "bg-[rgb(1,122,152)] w-full p-3 rounded-lg text-white hover:opacity-75 transition"
              }}
            />
          </div>
        </form>
      </div>

      {/* Sección de Fotos */}
      <div className="fotos grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <Foto textoFoto={"Frente del DNI"} ref={fotoFrenteDniRef} />
        <Foto textoFoto={"Dorso del DNI"} ref={fotoDorsoDniRef} />
        <Foto textoFoto={"Frente del carnet"} ref={fotoFrenteCarnetRef} />
        <Foto textoFoto={"Dorso del Carnet"} ref={fotoDorsoCarnetRef} />
      </div>
    </div>

    {/* Modal para Aviso */}
    <div className="modal">
      <CartelAviso
        abrirModal={mostrarCartel}
        cerrarModal={toggleModal}
        mensaje={guardado ? 'Paciente registrado correctamente' : 'Error al registrar el paciente'}
      />
    </div>
  </div>
</>

        );
}

export default RegistrarPacientes;
