import React from "react";


export default function FotoFamiliar({objFoto,tipoUsuario}) {
  return (
    <>
    <div className="ring ring-[#017a98] rounded-xl pb-6">
      <div className="foto flex justify-center">
        <img
        className="w-5/4 rounded-xl"
          src={`data:image/png;base64,${objFoto.foto}`}
          alt="Foto del familiar"
        />
      </div>
      <div className="descripcion flex justify-center">
        <span name="descripcion">{objFoto.descripcion}</span>
      </div>

    {tipoUsuario === "admin" && (
        <div className="eliminar flex justify-center">
            <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Eliminar
      </button>
        </div>
        
    )}
</div>
    </>
  );
}