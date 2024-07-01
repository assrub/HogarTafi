import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navegacion from "./Componentes/Navegacion.jsx";
import { FromDatosPacientes } from "./Componentes/FormDatosPaciente.jsx";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App bg-gray-800 min-h-screen overflow-auto">
      <div className="nav">
      <Navegacion></Navegacion>
      </div>
    </div>
  );
}

export default App;
