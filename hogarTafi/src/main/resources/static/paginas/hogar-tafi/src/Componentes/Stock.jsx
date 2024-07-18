import React from 'react'
import TablaStock from './Stock/TablaStock'
import Boton from './FromDatosPacientes/Boton'


export default function Stock() {
  return (
    <div>
        <div className="titulo flex text-neutral-300 text-4xl justify-center m-10">
            <h2>Stock de pepee </h2>    
        </div>
        <div className="tabla">
          <TablaStock></TablaStock>
        </div>
        <div className="botones space-x-4 flex justify-end m-5">
          <Boton textoBoton={"Canelar"}/>
          <Boton textoBoton={"Guardar"}/>
        </div>
    </div>
  )
}