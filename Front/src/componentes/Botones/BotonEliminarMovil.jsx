import React from 'react';

const BotonEliminar = ({ onClick }) => {
    return (
        <button
            className={`w-full h-full m-1 p-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 text-xs md:text-sm`}
            onClick={onClick}
        >
            Eliminar
        </button>
    );
};

export default BotonEliminar;
