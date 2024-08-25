import React from "react";

export default function Boton({textoBoton = '', onClick, propsBoton = {}}) {
  return (
    <button onClick={onClick} 
    className="bg-[rgb(1,122,152)] w-40 p-3 rounded-lg text-white hover:opacity-75 disabled:bg-gray-400" 
    {...propsBoton}>
      {textoBoton}
    </button>
  );
}
