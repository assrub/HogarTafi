import React from "react";
import CampoTexto from "./FormPacientes/CampoTexto";
import Foto from "./FormPacientes/Foto";
import Boton from "./Boton";
import { registrarPaciente } from "../api";



function RegistrarPacientes(){


async function registrar(){

  const nuevoPaciente = {
    nombre: document.getElementById("inputNombre").value,
    apellido: document.getElementById("inputApellido").value,
    dni: document.getElementById("inputDni").value.toString(),
    obraSocial: document.getElementById("inputObraSocial").value,
  };

  let response =  await registrarPaciente(nuevoPaciente);

  console.log(response)

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
                  <textarea className=" w-full rounded-lg h-56 bg-transparent border-neutral-300 border-2 p-2 resize-none focus:outline-none md:w-9/12 "></textarea>
                </div>
              </form>
            </div>
  
            <div className="fotos grid grid-cols-1 mx-10 justify-items-center gap-x-3 2xl:grid-cols-2 xl:mr-10 xl:justify-items-end">
              <Foto textoFoto={"Frente del DNI"} />
              <Foto textoFoto={"Dorso del DNI"} />
              <Foto textoFoto={"Frente del carnet"} />
              <Foto textoFoto={"Dorso del Carnet"} />
            </div>
          </div>
                  <hr />
         <div className="grid justify-items-center m-4">
            <Boton textoBoton="Guardar datos del paciente" onClick={registrar}></Boton>
         </div>
  
          
        </div>
      </>
    )
}

export default RegistrarPacientes