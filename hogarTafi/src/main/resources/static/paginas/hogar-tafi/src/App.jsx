import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navegacion  from './Componentes/Navegacion.jsx'
import { FromDatosPacientes } from './Componentes/FormDatosPaciente.jsx'

function App() {

  return (
    <>
    <div className="App bg-[#181818] overflow-auto">
      <Navegacion></Navegacion>
      <FromDatosPacientes></FromDatosPacientes>
      </div>
    </>
  )
}

export default App
