import React from 'react';

const BotonEditar = ({ onGuardar, onModificar, editable }) => {
  return (
    <button
      className={`min-w-[100px] w-full h-full py-3 text-center text-gray-500 font-bold hover:bg-blue-500 hover:text-white`}  // Se asigna un ancho mínimo
      onClick={editable ? onGuardar : onModificar}  
    >
      {editable ? "Guardar" : "Modificar"}
    </button>
  );
};

export default BotonEditar;
