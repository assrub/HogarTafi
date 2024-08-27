import React from "react";
import CampoTexto from "./FormPacientes/CampoTexto";
import Foto from "./FormPacientes/Foto";
import Boton from "./Boton";
import { registrarPaciente } from "../api";

function RegistrarPacientes() {

  async function registrar() {
    const nuevoPaciente = {
      dni: document.getElementById("inputDni").value.toString(),
      nombre: document.getElementById("inputNombre").value,
      apellido: document.getElementById("inputApellido").value,
      obraSocial: document.getElementById("inputObraSocial").value,
      observaciones: document.querySelector("textarea").value,
      fotoFrenteDni: await obtenerImagenBase64("fotoFrenteDni"),
      fotoAtrasDni: await obtenerImagenBase64("fotoAtrasDni"),
      fotoFrenteCarnet: await obtenerImagenBase64("fotoFrenteCarnet"),
      fotoAtrasCarnet: await obtenerImagenBase64("fotoAtrasCarnet"),
    };

    let response = await registrarPaciente(nuevoPaciente);
    console.log(response);
  }

  async function obtenerImagenBase64(idInput) {
    const input = document.getElementById(idInput);
    console.log(`Buscando elemento con ID: ${idInput}`, input); // Log para depurar

    if (!input) {
        console.error(`Elemento con ID ${idInput} no encontrado.`);
        return ""; // Retorna una cadena vacía si el input no existe
    }

    if (input.files && input.files[0]) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(input.files[0]);
      });
    }
    return ""; // Si no se seleccionó ninguna imagen
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
            <form action="" className="mx-2 lg:mx-10">
              <CampoTexto
                textoEtiqueta="Nombre"
                propsLabel={{ labelFor: "name" }}
                propsInput={{
                  type: "name",
                  name: "name",
                  id: "inputNombre",
                  placeholder: "Ingresa el nombre del paciente",
                }}
              ></CampoTexto>

              <CampoTexto
                textoEtiqueta="Apellido"
                propsLabel={{ labelFor: "lastName" }}
                propsInput={{
                  type: "text",
                  name: "lastName",
                  id: "inputApellido",
                  placeholder: "Ingresa el apellido del paciente",
                }}
              ></CampoTexto>

              <CampoTexto
                textoEtiqueta="DNI"
                propsLabel={{ labelFor: "dni" }}
                propsInput={{
                  type: "number",
                  name: "dni",
                  id: "inputDni",
                  placeholder: "Ingresa el DNI del paciente",
                }}
              ></CampoTexto>

              <CampoTexto
                textoEtiqueta="Obra social"
                propsLabel={{ labelFor: "obraSocial" }}
                propsInput={{
                  type: "text",
                  name: "obraSocial",
                  id: "inputObraSocial",
                  placeholder: "Ingresa la Obra Social del paciente",
                }}
              ></CampoTexto>

              <div className="observaciones mt-4">
                <h3 className="text-xl font-medium">Observaciones</h3>
                <textarea
                  id="inputObservaciones"
                  className="w-full rounded-lg h-56 bg-transparent border-neutral-300 border-2 p-2 resize-none focus:outline-none md:w-9/12"
                ></textarea>
              </div>
            </form>
          </div>

          <div className="fotos grid grid-cols-1 mx-10 justify-items-center gap-x-3 2xl:grid-cols-2 xl:mr-10 xl:justify-items-end">
            <Foto textoFoto={"Frente del DNI"} propsInput={{ id: "fotoFrenteDni", type: "file" }} />
            <Foto textoFoto={"Dorso del DNI"} propsInput={{ id: "fotoAtrasDni", type: "file" }} />
            <Foto textoFoto={"Frente del carnet"} propsInput={{ id: "fotoFrenteCarnet", type: "file" }} />
            <Foto textoFoto={"Dorso del Carnet"} propsInput={{ id: "fotoAtrasCarnet", type: "file" }} />
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
