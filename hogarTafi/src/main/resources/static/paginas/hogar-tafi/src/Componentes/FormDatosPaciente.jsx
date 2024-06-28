import React from "react";
import CampoTexto from "./FromDatosPacientes/CampoTexto";
import Boton from "./FromDatosPacientes/Boton";
import Tarjeta from "./FromDatosPacientes/Tarjeta";

export function FromDatosPacientes() {
  return (
    <div className=" bg-gray-800 p-5">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 ">
        <div className="text-white p-10 flex justify-center">
          <form className="w-full max-w-md">
            <CampoTexto
              textoEtiqueta="Nombre"
              etiqueta="etiquetaNombre"
              tipo="text"
            />
            <CampoTexto
              textoEtiqueta="Apellido"
              etiqueta="etiquetaApellido"
              tipo="text"
            />
            <CampoTexto
              textoEtiqueta="DNI"
              etiqueta="etiquetaDni"
              tipo="number"
            />
            <CampoTexto
              textoEtiqueta="Obra social"
              etiqueta="etiquetaObraSocial"
              tipo="text"
            />
            <div className="flex flex-col space-y-4 mt-4">
              <Boton textoBoton="Stock" />
              <Boton textoBoton="Recetas" />
              <Boton textoBoton="Historial medico" />
            </div>
          </form>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10 mx-auto">
            
          <Tarjeta textoTarjeta={"Foto del frente del Dni"} />
          <Tarjeta textoTarjeta={"Foto de atras del Dni"} />
          <Tarjeta
            textoTarjeta={"Foto del frente del carnet de la obra social"}
          />
          <Tarjeta
            textoTarjeta={"Foto de atras del carnet de la obra social"}
          />
          </div>
        </div>

    </div>
  );
}

export default FromDatosPacientes;
