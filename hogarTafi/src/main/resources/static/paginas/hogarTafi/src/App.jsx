import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BarraNavegacion from './PaginaPrincipal/BarraNavegacion'
import FormularioDatosPacientes from './PaginaPrincipal/Pacientes/FormularioDatosPacientes'
import Imagenes from './PaginaPrincipal/Pacientes/Imagenes'



function App() {

  const [habilitarCampos, setHabilitarCampos] = useState(false);

  const opcionElegida = (opcion) => {
    if (opcion === 'mostrar') {
      setHabilitarCampos(false);
    } else {
      setHabilitarCampos(true);
    }
  };
  return (
    <>
    <div className="h-100 w-100">
      <BarraNavegacion opcionElegida={opcionElegida}></BarraNavegacion>
      <FormularioDatosPacientes habilitarCampos={habilitarCampos}></FormularioDatosPacientes>
     
      </div>
    </>
  )
}

export default App
