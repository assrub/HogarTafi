import React from 'react'

export  function Boton( {textoBoton} ) {
  return (
    <>
        <button
      
      className="bg-[#252525] text-neutral-300 mt-5 px-10 py-4 text-lg rounded-md hover:bg-[#3a3a3a] transition duration-300 lg:max-w-md"
    >
      {textoBoton}
    </button>
    </>
  )
}
export default Boton