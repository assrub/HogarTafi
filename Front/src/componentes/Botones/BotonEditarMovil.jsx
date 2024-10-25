import React from 'react';

const BotonEditar = ({ onGuardar, onModificar, editable }) => {
  return (
    <button
      className={`w-full h-full m-1 p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-xs md:text-sm`}
      onClick={editable ? onGuardar : onModificar}  
    >
      {editable ? "Guardar" : "Modificar"}
    </button>
  );
};

export default BotonEditar;
