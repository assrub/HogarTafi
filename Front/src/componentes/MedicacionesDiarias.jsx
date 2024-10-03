import React, {useState, useEffect, useRef} from "react";
import Boton from "./Boton";
import { todosLosPacientes } from "../api";
import TablaMedicamentos from "./FormPacientes/TablaMedicamentos";

export default function MedicacionesDiarias(){
    const [pacientes,setPacientes] = useState([])
    const [paciente, setPaciente] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        obraSocial: "",
        observaciones: "",
        fotoFrenteDni: "",
        fotoAtrasDni: "",
        fotoFrenteCarnet: "",
        fotoAtrasCarnet: ""
      });

      const medicamentosRef = useRef(null);

      async function traerPacientes() {
        const datos = await todosLosPacientes();
        const datosFiltrados = datos.filter((paciente) => paciente !== null);
        setPacientes(datosFiltrados);
      
      }
      
      //Cada vez que se cargue la pagina trae los pacientes guardados
      useEffect(() => { 
        traerPacientes();
        
      }, [paciente]);

      function buscarClick(){
        let dniPacientes = document.getElementById("select-paciente").value;
        //esto es para el ejemplo. Hay que hacer que busque en la base de datos
        pacientes.forEach(element => {
          if (element.dni == dniPacientes){
            setPaciente(element);
           
          }
        })
      
        if (dniPacientes != "null"){
          setcamposDeshabilitados(false);
        }
      
        }

    return (
        <>
          <div className="titulo flex justify-center text-xl lg:text-3xl lg:mt-5 mb-10 ">
            <h2 className="font-bold">Medicaiones diarias</h2>
        </div>

        <div>
        <div className="elegir-paciente flex  justify-center ">
          <select name="paciente" id="select-paciente" className="bg-gray-200 rounded-lg w-2/5">
          <option selected disabled value="null">Selecciona un paciente</option>
          {pacientes.map((paciente,index) =>(
            <option key={index} value={paciente.dni}>{paciente.nombre + ' ' + paciente.apellido}</option>
          ))}  
          </select>
          <div className="Boton mx-4">
              <Boton textoBoton="Buscar" onClick={buscarClick}></Boton>
          </div>
        </div>

          {paciente.dni && (
            <div className="tabla-medicamentos">
            <TablaMedicamentos dni={paciente.dni} ref={medicamentosRef}/>
            </div>
          )}
        
        </div>
        </>
    )
}