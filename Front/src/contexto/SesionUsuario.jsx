import React, {createContext, useState, useContext} from "react";

export const contextoSesionUsuario = createContext();


export function useSesionUsuario() {
  return useContext(contextoSesionUsuario);
}


export function ProveedorSesion({ children }) {

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    dni: "",
    telefono: "",
    direccion: "",
    tipo: "",
    asociado: ""
  });

 
  const iniciarSesionContexto = (datosUsuario) => {
    setUsuario(datosUsuario);
  };


  const cerrarSesionContexto = () => {
    setUsuario({
      nombre: "",
      apellido: "",
      email: "",
      dni: "",
      telefono: "",
      direccion: "",
      tipo: "",
      asociado: ""
    });
  };

  return (
    <contextoSesionUsuario.Provider value={{ usuario, iniciarSesionContexto, cerrarSesionContexto }}>
      {children}
    </contextoSesionUsuario.Provider>
  );
}