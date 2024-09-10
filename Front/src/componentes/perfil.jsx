import React from "react";
import CampoTexto from "./FormPacientes/CampoTexto";
import Checkbox from "@mui/icons-material/CheckBox"
import { useState } from "react";

export default function Perfil() {




  return (
    <>
      <div className="pefil ">
        <div className="foto flex flex-col items-center">
          <img
            src="/foto-avatar.webp"
            alt="foto de perfil"
            className="w-1/6 rounded-full  "
          />
          <button className="my-2 underline">Cambiar foto de perfil</button>
        </div>

        <div className="datos grid grid-cols-1 mx-2 justify-items-center">
        <div className="datos w-1/2 mb-6">
        <form className="border p-4">
          <CampoTexto
            textoEtiqueta="Nombre"
            propsLabel={{ labelFor: "name" }}
            propsInput={{
              type: "text",
              name: "nombre",
              id: "inputNombre",
            }}
          />
          <CampoTexto
            textoEtiqueta="Apellido"
            propsLabel={{ labelFor: "lastName" }}
            propsInput={{
              type: "text",
              name: "apellido",
              id: "inputApellido",
            }}
          />

<CampoTexto
            textoEtiqueta="Correo electronico"
            propsLabel={{ labelFor: "email" }}
            propsInput={{
              type: "text",
              name: "email",
              id: "inputeEmail",
            }}
          />

<CampoTexto
            textoEtiqueta="Numero de telefono"
            propsLabel={{ labelFor: "phone" }}
            propsInput={{
              type: "number",
              name: "phone",
              id: "inputeTelefono",
            }}
          />
          <CampoTexto
            textoEtiqueta="Direccion"
            propsLabel={{ labelFor: "address" }}
            propsInput={{
              type: "text",
              name: "address",
              id: "inputeDireccion",
            }}
          />
          </form>
          <div className="tipoUsuario p-4 my-2 border">
            <span className=""><strong>Tipo de usuario</strong></span>
            <br />
            <span className="text-gray-400">admin</span>
          </div>

          <div className="idioma my-4 p-4 border" >
            <span><strong>Idioma preferido</strong></span>
            <br />
          <select name="paciente" id="select-paciente" className="bg-gray-200 rounded-lg my-2 py-2 w-2/5">
          <option value={"español"}>Español</option>
          <option value={"english"}>English</option>
          </select>
          </div>

          
          </div>
        </div>
      </div>
    </>
  );
}
