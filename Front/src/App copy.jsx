import { useState } from "react";
import BarraNavegacion from "./componentes/BarraNavegacion";
import FormPacientes from "./componentes/FormPacientes";
import RegistrarPacientes from "./componentes/RegistrarPacientes";
import ListadoPacientes from "./componentes/ListadoPacientes";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {todosLosPacientes, registrarPaciente, desactivarPAcientes} from "./api.js"

 async function botonClick(){
  
  const datos  = await desactivarPAcientes(12345678);
  console.log(datos)
 }

function App() {

  return (
    <BrowserRouter>
      <div className="lg:grid lg:grid-cols-5">
        <div className={`bg-white shadow-lg  h-16
                       lg:block lg:col-span-1 lg:sticky lg:top-0 lg:h-screen
                       lg:rounded-lg lg:shadow-[#017a98]/50
                       `}>
          <BarraNavegacion />
        </div>

        <div className="bg-white shadow-lg lg:shadow-[#017a98]/50  md:col-span-4 lg:mx-12 lg:my-6 lg:rounded-lg">
          <Routes>
            <Route path="/todosLospacientes" element={<ListadoPacientes/>} />
            <Route path="/paciente/registrar" element={<RegistrarPacientes />} />
            <Route path="/paciente/modificar" element={<FormPacientes />} />
            <Route path="/stockDelHogar" />
            <Route path="/pedidos" />
            <Route path="/listaDeUsuarios" />
          </Routes>
        </div>
      </div>

          <div className="botonDePrueba hidden">
            <button onClick={botonClick} className="p-8 text-xl bg-red-500 text-white rounded-lg">Boton de prueba</button>
          </div>

    </BrowserRouter>
  );
}

export default App;
