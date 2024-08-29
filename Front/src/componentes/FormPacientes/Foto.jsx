import React, { forwardRef, useEffect } from "react";
import Boton from "../Boton";
import { useRef, useState} from "react";


const Foto = forwardRef(({ textoFoto, propsBoton }, ref) => {
  const [imagenSrc, setImagenSrc] = useState("/carnetEjemplo.png");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  const cargarImagen = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div ref={ref} className="mb-6 tarjeta flex flex-col items-center border rounded-lg md:w-full">
      <img src={imagenSrc} id={`imagen-${textoFoto}`} alt="" className="rounded-lg w-full lg:max-w-72 lg:max-h-72 lg:min-w-40 lg:min-h-40" />
      <h3 className="text-xl m-4">
        <strong>{textoFoto}</strong>
      </h3>
      <Boton onClick={cargarImagen} textoBoton={"Cargar imagen"} propsBoton={propsBoton} />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        id={`input-${textoFoto}`}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              setImagenSrc(reader.result);
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>
  );
});

export default Foto;