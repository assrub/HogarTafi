import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BarraNavegacion from './PaginaPrincipal/BarraNavegacion'
import FormularioDatosPacientes from './PaginaPrincipal/FormularioDatosPacientes'


function App() {
  return (
    <>
    <div className="App h-100 d-flex flex-column">
      <BarraNavegacion></BarraNavegacion>
      <FormularioDatosPacientes></FormularioDatosPacientes>
      </div>
    </>
  )
}

export default App
