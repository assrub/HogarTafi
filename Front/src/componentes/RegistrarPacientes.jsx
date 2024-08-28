import React, { useRef } from "react"; // Importa React y useRef una vez
import CampoTexto from "./FormPacientes/CampoTexto";
import Foto from "./FormPacientes/Foto";
import Boton from "./Boton";
import { registrarPaciente } from "../api";

// Componente principal para registrar pacientes
function RegistrarPacientes() {
  // Refs para los inputs de texto y archivos
  const dniRef = useRef(null);
  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const obraSocialRef = useRef(null);
  const observacionesRef = useRef(null);
  const fotoFrenteDniRef = useRef(null);
  const fotoAtrasDniRef = useRef(null);
  const fotoFrenteCarnetRef = useRef(null);
  const fotoAtrasCarnetRef = useRef(null);

  // Función para registrar al paciente
  async function registrar(e) {
    e.preventDefault();

    // Verificar si los refs de archivos están correctamente asignados
    if (!fotoFrenteDniRef.current || !fotoAtrasDniRef.current || !fotoFrenteCarnetRef.current || !fotoAtrasCarnetRef.current) {
      console.error("Uno o más inputs de archivos no están correctamente referenciados.");
      alert("Por favor, verifica que todas las imágenes han sido cargadas.");
      return;
    }

    const formData = new FormData();
    formData.append("dni", dniRef.current.value);
    formData.append("nombre", nombreRef.current.value);
    formData.append("apellido", apellidoRef.current.value);
    formData.append("obraSocial", obraSocialRef.current.value);
    formData.append("observaciones", observacionesRef.current.value);

    // Agregar archivos al FormData solo si están presentes
    if (fotoFrenteDniRef.current.files[0]) {
      formData.append("fotoFrenteDni", fotoFrenteDniRef.current.files[0]);
    }
    if (fotoAtrasDniRef.current.files[0]) {
      formData.append("fotoAtrasDni", fotoAtrasDniRef.current.files[0]);
    }
    if (fotoFrenteCarnetRef.current.files[0]) {
      formData.append("fotoFrenteCarnet", fotoFrenteCarnetRef.current.files[0]);
    }
    if (fotoAtrasCarnetRef.current.files[0]) {
      formData.append("fotoAtrasCarnet", fotoAtrasCarnetRef.current.files[0]);
    }

    try {
      const response = await fetch("http://localhost:8080/pacientes", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      alert("Paciente registrado con éxito.");
    } catch (error) {
      console.error("Error registrando el paciente:", error);
      alert("Ocurrió un error al registrar el paciente.");
    }
  }

  return (
    <>
      <div className="registrar-pacientes">
        <div className="titulo flex justify-center text-xl lg:text-3xl lg:mt-5 mb-10">
          <h2 className="text-bold">
            <strong>Registrar pacientes</strong>
          </h2>
        </div>

        <div className="formulario grid grid-cols-1 xl:grid-cols-2">
          <div className="datos border-r mb-6">
            <form onSubmit={registrar} className="mx-2 lg:mx-10">
              <CampoTexto
                textoEtiqueta="Nombre"
                propsLabel={{ labelFor: "inputNombre" }}
                propsInput={{
                  type: "text",
                  name: "nombre",
                  id: "inputNombre",
                  placeholder: "Ingresa el nombre del paciente",
                  ref: nombreRef,
                }}
              ></CampoTexto>

              <CampoTexto
                textoEtiqueta="Apellido"
                propsLabel={{ labelFor: "inputApellido" }}
                propsInput={{
                  type: "text",
                  name: "apellido",
                  id: "inputApellido",
                  placeholder: "Ingresa el apellido del paciente",
                  ref: apellidoRef,
                }}
              ></CampoTexto>

              <CampoTexto
                textoEtiqueta="DNI"
                propsLabel={{ labelFor: "inputDni" }}
                propsInput={{
                  type: "number",
                  name: "dni",
                  id: "inputDni",
                  placeholder: "Ingresa el DNI del paciente",
                  ref: dniRef,
                }}
              ></CampoTexto>

              <CampoTexto
                textoEtiqueta="Obra social"
                propsLabel={{ labelFor: "inputObraSocial" }}
                propsInput={{
                  type: "text",
                  name: "obraSocial",
                  id: "inputObraSocial",
                  placeholder: "Ingresa la Obra Social del paciente",
                  ref: obraSocialRef,
                }}
              ></CampoTexto>

              <div className="observaciones mt-4">
                <h3 className="text-xl font-medium">Observaciones</h3>
                <textarea
                  id="inputObservaciones"
                  className="w-full rounded-lg h-56 bg-transparent border-neutral-300 border-2 p-2 resize-none focus:outline-none md:w-9/12"
                  ref={observacionesRef}
                ></textarea>
              </div>
            </form>
          </div>

          <div className="fotos grid grid-cols-1 mx-10 justify-items-center gap-x-3 2xl:grid-cols-2 xl:mr-10 xl:justify-items-end">
            <Foto 
              textoFoto={"Frente del DNI"} 
              propsInput={{ ref: fotoFrenteDniRef, type: "file" }} 
            />
            <Foto 
              textoFoto={"Dorso del DNI"} 
              propsInput={{ ref: fotoAtrasDniRef, type: "file" }} 
            />
            <Foto 
              textoFoto={"Frente del carnet"} 
              propsInput={{ ref: fotoFrenteCarnetRef, type: "file" }} 
            />
            <Foto 
              textoFoto={"Dorso del Carnet"} 
              propsInput={{ ref: fotoAtrasCarnetRef, type: "file" }} 
            />
          </div>
        </div>
        <hr />
        <div className="grid justify-items-center m-4">
          <Boton textoBoton="Guardar datos del paciente" onClick={registrar}></Boton>
        </div>
      </div>
    </>
  );
}

export default RegistrarPacientes;
