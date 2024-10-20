import React from 'react';

const BotonEliminar = ({ onClick }) => {
  return (
    <button
      className={`min-w-[100px] w-full h-full py-3 text-center text-gray-500 font-bold hover:bg-red-500 hover:text-white`}  // Fijamos el mismo ancho mínimo que en BotonEditar
      onClick={onClick}
    >
      Eliminar
    </button>
  );
};

export default BotonEliminar;
