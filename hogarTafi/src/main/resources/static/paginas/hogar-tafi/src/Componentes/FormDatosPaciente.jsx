import React, {useState} from "react";
import CampoTexto from "./FromDatosPacientes/CampoTexto";
import Boton from "./FromDatosPacientes/Boton";
import Tarjeta from "./FromDatosPacientes/Tarjeta";
import TablaMedicamentos  from "./FromDatosPacientes/TablaMedicamentos";
import { Link } from "react-router-dom";

export function FromDatosPacientes({mostrar = false}) {

  
  return (
    <>
    <div className=" bg-gray-800 p-5">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 ">
        <div className="text-white p-10 flex justify-center">
          <form className="w-full max-w-md">
            <CampoTexto
              textoEtiqueta="Nombre"
              etiqueta="etiquetaNombre"
              tipo="text"
              readOnly={mostrar}
            />
            <CampoTexto
              textoEtiqueta="Apellido"
              etiqueta="etiquetaApellido"
              tipo="text"
              readOnly={mostrar}
            />
            <CampoTexto
              textoEtiqueta="DNI"
              etiqueta="etiquetaDni"
              tipo="number"
              readOnly={mostrar}
            />
            <CampoTexto
              textoEtiqueta="Obra social"
              etiqueta="etiquetaObraSocial"
              tipo="text"
              readOnly={mostrar}
            />

            <div className="observaciones mt-4">
              <h3 className="text-2xl">Observaciones</h3>
              <textarea className="w-full rounded-lg h-56 bg-transparent border-white border-2 p-2 resize-none focus:outline-none"></textarea>
            </div>

            <div className="flex gap-2">
            <Link to="/Pacientes/Stock">
                <Boton textoBoton={"Stock"}/>


              </Link>
              <Link to="/Pacientes/Recetas">
                <Boton textoBoton={"Recetas"}/>
             
              </Link>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 p-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10 mx-auto">
          <Tarjeta textoTarjeta={"Foto del frente del Dni"} readOnly={mostrar} />
          <Tarjeta textoTarjeta={"Foto de atras del Dni"} readOnly={mostrar}/>
          <Tarjeta
            textoTarjeta={"Foto del frente del carnet de la obra social"}
            readOnly={mostrar}
          />
          <Tarjeta
            textoTarjeta={"Foto de atras del carnet de la obra social"}
            readOnly={mostrar}
          />
        </div>
      </div>
      <div className="tabla mt-5">
      <h3 className="text-2xl text-neutral-50 m-2">Medicamentos</h3>
        <TablaMedicamentos></TablaMedicamentos>
      </div>
     

    </div>
    </>
  );
}

export default FromDatosPacientes;
