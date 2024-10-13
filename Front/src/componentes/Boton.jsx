import React from "react";

export default function Boton({textoBoton = '', onClick, propsBoton = {}, apretado}) {
  return (
    <button onClick={onClick} 
    className={`bg-[rgb(1,122,152)] w-40 p-2 rounded-lg text-white hover:opacity-75
     disabled:bg-gray-400 mx-2
     ${apretado ? "opacity-75 bg-gray-900 ring-4" :""}`}
    {...propsBoton}>
      {textoBoton}
    </button>
  );
}
