import React from 'react';

const BotonActualizar = ({ onClick, texto }) => {
  return (
    <button 
      className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors duration-300"
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default BotonActualizar;
