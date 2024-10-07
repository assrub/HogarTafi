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




      function convertirTablaAJson(refTabla) {
        if (!refTabla.current) {
          console.error("El refTabla no está asignado a ningún elemento.");
          return [];
        }
      
        const table = refTabla.current;
        const headers = Array.from(table.querySelectorAll('thead th')).slice(0, -1).map(th => th.textContent.trim());
      
        const rows = Array.from(table.querySelectorAll('tbody tr')).map(tr => {
          const cells = Array.from(tr.querySelectorAll('td')).slice(0, -1);
          const rowData = {};
      
          cells.forEach((cell, i) => {
            let cellValue = '';
    
            // Si hay un select, obtenemos el valor seleccionado
            const select = cell.querySelector('select');
            if (select) {
              cellValue = select.value.trim();
            } else if (cell.querySelector('input')) {
              // Si hay un input, obtenemos el valor del input
              cellValue = cell.querySelector('input').value.trim();
            } else {
              // Si no hay input ni select, obtenemos el contenido de texto de la celda
              cellValue = cell.textContent.trim();
            }
      
            // Si el valor está vacío, lo asignamos como null
            rowData[headers[i]] = cellValue !== "" ? cellValue : null;
          });
      
          return rowData;
        });
      
        // No filtramos las filas, ya que ahora todas deben tener todas las propiedades, aunque algunas sean null
        return rows;
      }
      
      


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
        });}

        async function restarMedicacion(){
            try{
                let tablaMedicamentos = convertirTablaAJson(medicamentosRef);
        
            let arregloMedicacion = [];
            tablaMedicamentos.forEach((item, index) => {
            if (item.Medicamento != null) {
                const objetoMedicamento = {
                Medicamento: item.Medicamento,
                "6:00": item["6:00"],
                Desayuno: item.Desayuno,
                Almuerzo: item.Almuerzo,
                Merienda: item.Merienda,
                Cena: item.Cena,
                "22:30": item["22:30"],
                Observaciones: item.Observaciones
                };
                arregloMedicacion.push(objetoMedicamento);
            }
            });
      
        const response = restarMedicaionApi(arregloMedicacion, parseInt(paciente.dni));

            }catch(error)
            {console.error(error)

            }
        }

    return (
        <>
          <div className="titulo flex justify-center text-xl lg:text-3xl lg:mt-5 mb-10 ">
            <h2 className="font-bold">Medicaiones diarias</h2>
        </div>

        <div className="bg-gray-100 p-2">
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
            <div className="grid place-content-center">
            <div className="tabla-medicamentos mx-4 my-6 ">
            <TablaMedicamentos dni={paciente.dni} ref={medicamentosRef} menuMedicaionpaciente={true}/>
            </div>

            <div className="restar-medicacion mx-4 my-6 ">
                <Boton textoBoton="Restar medicaion" onClick={restarMedicacion}/>
            </div>
            </div>
          )}
        
        </div>
        </>
    )
}