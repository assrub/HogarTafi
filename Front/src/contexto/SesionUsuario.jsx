import React, {createContext, useState, useContext, useEffect} from "react";

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


  useEffect(() => {
    
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error("Error al parsear los datos del usuario desde localStorage:", error);
      }
    }
  }, []);
 
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
    localStorage.removeItem('usuario');
  };

  return (
    <contextoSesionUsuario.Provider value={{ usuario, iniciarSesionContexto, cerrarSesionContexto }}>
      {children}
    </contextoSesionUsuario.Provider>
  );
}