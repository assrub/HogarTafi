import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaPrincipal from "./Pages/Main/Index";
import UserPanel from "./Pages/UserPanel/UserPanel";
import Login from "./componentes/Login";

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
            <Route path="/userPanel/*" element={<UserPanel/>} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
