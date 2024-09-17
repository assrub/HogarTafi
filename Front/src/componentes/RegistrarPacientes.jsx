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
  const [guardado,setGuardado] = useState(false);
  const [mostrarCartel, setMostrarCartel] = useState(false)
  const [campoIncompleto, setCampoIncompleto] = useState(false);

  const toggleModal = () => setMostrarCartel(!mostrarCartel);



  async function registrar() {
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

  }
  return (
    <>
      <div className="registrar-pacientes">
        <div className="titulo flex justify-center text-xl lg:text-3xl lg:mt-5 mb-10">
          <h2 className="text-bold">
            <strong>Registrar pacientes</strong>
          </h2>
        </div>

        <div className="formulario grid grid-cols-1  xl:grid-cols-2">
          <div className="datos  border-r mb-6 ">
            <form action="" className=" mx-2 lg:mx-10">
              <CampoTexto
                textoEtiqueta="Nombre"
                error={campoIncompleto}
                obligatorio={true}
                propsLabel={{ labelFor: "name" }}
                propsInput={{
                  type: "name",
                  name: "name",
                  id: "inputNombre",
                  placeholder: "Ingrea el nombre del paciente",
                }}
              ></CampoTexto>

              <CampoTexto
                textoEtiqueta="Apellido"
                error={campoIncompleto}
                obligatorio={true}
                propsLabel={{ labelFor: "lastName" }}
                propsInput={{
                  type: "text",
                  name: "lastName",
                  id: "inputApellido",
                  placeholder: "Ingrea el apellido del paciente",
                }}
              ></CampoTexto>

              <CampoTexto
                textoEtiqueta="DNI"
                error={campoIncompleto}
                obligatorio={true}
                propsLabel={{ labelFor: "dni" }}
                propsInput={{
                  type: "number",
                  name: "dni",
                  id: "inputDni",
                  placeholder: "Ingrea el DNI del paciente",
                }}
              ></CampoTexto>

              <CampoTexto
                textoEtiqueta="Obra social"
                error={campoIncompleto}
                propsLabel={{ labelFor: "obraSocial" }}
                propsInput={{
                  type: "text",
                  name: "obraSocial",
                  id: "inputObraSocial",
                  placeholder: "Ingrea la Obra Social del paciente",
                }}
              ></CampoTexto>

              <div className="observaciones mt-4">
                <h3 className="text-xl font-medium">Observaciones</h3>
                <textarea
                  id="observaciones"
                  className="w-full rounded-lg h-56 bg-transparent border-neutral-300 border-2 p-2 resize-none focus:outline-none md:w-9/12"
                ></textarea>
              </div>
            </form>
          </div>

          <div className="fotos grid grid-cols-1 mx-2 justify-items-center gap-x-3 lg:mx-10 2xl:grid-cols-2 xl:mr-10 xl:justify-items-end">
            <Foto textoFoto={"Frente del DNI"} ref={fotoFrenteDniRef} />
            <Foto textoFoto={"Dorso del DNI"} ref={fotoDorsoDniRef} />
            <Foto textoFoto={"Frente del carnet"} ref={fotoFrenteCarnetRef} />
            <Foto textoFoto={"Dorso del Carnet"} ref={fotoDorsoCarnetRef} />
          </div>
        </div>
        <hr />
        <div className="grid justify-items-center m-4">
          <Boton textoBoton="Guardar datos del paciente" onClick={registrar}></Boton>
        </div>
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