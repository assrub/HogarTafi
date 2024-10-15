import React from "react";


export default function FotoFamiliar({ objFoto, tipoUsuario, onClickEliminar }) {
    return (
      <div className="mx-auto p-4 bg-[#f3f4f6] rounded-lg shadow-md ring ring-[#017a98] h-full">
        <div className="foto flex justify-center mb-4">
          <img
            className="object-cover rounded-lg"
            src={`data:image/png;base64,${objFoto.foto}`}
            alt="Foto del familiar"
          />
        </div>
        <div className="descripcion text-center mb-4">
          <span className="text-lg">{objFoto.descripcion}</span>
        </div>
  
        {tipoUsuario === "admin" && (
          <div className="eliminar flex justify-center">
            <button
            onClick={() => onClickEliminar(objFoto)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 flex align-end">
              Eliminar
            </button>
          </div>
        )}
      </div>
    );
  }