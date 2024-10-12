import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaPrincipal from "./Pages/Main/Index";
import UserPanel from "./Pages/UserPanel/UserPanel";
import Login from "./Pages/Login/Login";
import RecuperarContraseña from "./Pages/Recuperar contraseña/RecuperarContraseña";
import RutaPrivada from "./rutaPrivada";
import Recupera from "./Pages/Recuperar contraseña/Recupera";

 async function botonClick(){
  
  const datos  = await desactivarPAcientes(12345678);
  console.log(datos)
 }

function App() {

  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<PaginaPrincipal/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/recuperarContra" element={<RecuperarContraseña/>}/>
            <Route path="/recupera/*" element={<Recupera/>}/>
            <Route path="/userPanel/*" element={<RutaPrivada><UserPanel/></RutaPrivada>} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
