import React, { forwardRef, useEffect } from "react";
import Boton from "../Boton";
import { useRef, useState} from "react";


const Foto = forwardRef(({ textoFoto, propsBoton, src = "" }, ref) => {
  const [imagenSrc, setImagenSrc] = useState("/carnetEjemplo.png");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  useEffect(() => {
    if (src) {
      setImagenSrc(`data:image/jpeg;base64,${src}`);
    }
  }, [src]);

  const cargarImagen = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
<div ref={ref} className="tarjeta flex flex-col items-center w-full max-w-xs mx-auto">
  <img
    src={imagenSrc}
    id={`imagen-${textoFoto}`}
    alt=""
    className="max-h-[400px] h-40 object-cover" // Altura fija para evitar desplazamiento
  />
  <h3 className="text-sm md:text-lg text-center">
    <strong>{textoFoto}</strong>
  </h3>
  <div className="mb-3"> {/* Contenedor para el botón para mantener el espaciado */}
    <Boton onClick={cargarImagen} textoBoton={"Cargar imagen"} propsBoton={propsBoton} />
  </div>
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
          const base64String = reader.result.replace(/^data:image\/(png|jpeg);base64,/, '');
          setImagenSrc(`data:image/jpeg;base64,${base64String}`);
        };
        reader.readAsDataURL(file);
      }
    }}
  />
</div>

  );
});

export default Foto;
