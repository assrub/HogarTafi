import React from 'react';

const BotonAgregar = ({ funcionUno, funcionDos }) => {
  return (
    <button
      className="min-w-[100px] w-full h-full py-3 text-center hover:text-white hover:bg-gray-400 border border-gray-300 rounded font-bold bg-white text-gray-400"
      onClick={() => {
        funcionUno();
        funcionDos();
      }}
    >
      AGREGAR
    </button>
  );
};

export default BotonAgregar;
