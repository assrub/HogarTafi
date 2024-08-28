import React, { forwardRef } from "react";

// Componente Foto que acepta refs
const Foto = forwardRef(({ textoFoto, propsInput }, ref) => (
  <div>
    <label>{textoFoto}</label>
    <input ref={ref} {...propsInput} />
  </div>
));

export default Foto;
