import React from "react";
import CampoTexto from "./FormPacientes/CampoTexto";
import Checkbox from "@mui/icons-material/CheckBox"
import { useState, useContext } from "react";
import { contextoSesionUsuario } from '../contexto/sesionUsuario';

export default function Perfil() {

  const { usuario } = useContext(contextoSesionUsuario);
 

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
        <form className="border p-4 min-w-64">
          <CampoTexto
            textoEtiqueta="Nombre"
            propsLabel={{ labelFor: "name" }}
            propsInput={{
              type: "text",
              name: "nombre",
              id: "inputNombre",
              disabled:true,
              value: usuario.nombre
            }}
          />
          <CampoTexto
            textoEtiqueta="Apellido"
            propsLabel={{ labelFor: "lastName" }}
            propsInput={{
              type: "text",
              name: "apellido",
              id: "inputApellido",
              disabled:true,
              value: usuario.apellido
            }}
          />

<CampoTexto
            textoEtiqueta="Correo electronico"
            propsLabel={{ labelFor: "email" }}
            propsInput={{
              type: "text",
              name: "email",
              id: "inputeEmail",
              disabled:true,
              value: usuario.email   
            }}
          />

<CampoTexto
            textoEtiqueta="Numero de telefono"
            propsLabel={{ labelFor: "phone" }}
            propsInput={{
              type: "number",
              name: "phone",
              id: "inputeTelefono",
              disabled:true,
              value: usuario.telefono
            }}
          />
          <CampoTexto
            textoEtiqueta="Direccion"
            propsLabel={{ labelFor: "address" }}
            propsInput={{
              type: "text",
              name: "address",
              id: "inputeDireccion",
              disabled:true,
              value: usuario.direccion
            }}
          />
          </form>
          <div className="tipoUsuario p-4 my-2 border">
            <span className=""><strong>Tipo de usuario</strong></span>
            <br />
            <span className="text-gray-400">{usuario.tipo}</span>
          </div>

          
          </div>
        </div>
      </div>
    </>
  );
}
