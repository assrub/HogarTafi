import React, {useState, useEffect} from "react";
import { traerTodosLosSotcksApi, todosLosPacientes } from "../api";


export default function Pedidos(){
    const [stocks, setStocks] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [stockFaltante,setStockFaltante] = useState([]);

    async function traerStocks(){
        const response = await traerTodosLosSotcksApi();
        setStocks(response);
    }

    async function traerPacientes(){
        const response  = await todosLosPacientes();
        setPacientes(response);
    }

    useEffect(() => {
        traerStocks();
        traerPacientes();
    },[]);

    useEffect(()=>{
        buscarStockFaltante();
    },[stocks])

    function buscarStockFaltante() {
        const nuevoStockFaltante = [];
    
        pacientes.forEach(paciente => {
            stocks.forEach(stock => {
                if (paciente.dni === stock.dni) {
                    const medicamentosFaltantes = [];
    
                    stock.medicamentos.forEach(medicamento => {
                        if (parseInt(medicamento.cantidad) < parseInt(medicamento.cant_minima)) {
                            medicamentosFaltantes.push(medicamento);
                        }
                    });
    
                    if (medicamentosFaltantes.length > 0) {
                        nuevoStockFaltante.push({
                            nombre : paciente.nombre +" "+ paciente.apellido,
                            dni: paciente.dni,
                            medicamentosFaltantes: medicamentosFaltantes
                        });
                       
                    }
                }
            });
        });
    
        setStockFaltante(nuevoStockFaltante);
    }

    return (<>
        <div className="registrar-pacientes w-full">
          <div className="titulo flex justify-center text-xl lg:text-3xl lg:mt-5 mb-10">
            <h2 className="font-bold">Pedidos de stock</h2>
          </div>
      
          <div className="pedidos grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center mx-4 gap-4">
            {stockFaltante.map((paciente, index) => (
              <div
                className="stockIndividual border border-[#017a98] ring-2 bg-gray-100 p-4 rounded-xl"
                key={index}
              >
                <h2 className="font-bold text-xl">{paciente.nombre}</h2>
                <h3 className="font-bold">DNI: {paciente.dni}</h3>
                <span>Medicamentos faltantes:</span>
                <ul>
                  {paciente.medicamentosFaltantes.map((medicamento, i) => (
                    <li key={i}>
                      💊{medicamento.medicacion} faltan: {Math.abs(parseInt(medicamento.cantidad) - parseInt(medicamento.cant_minima))}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </>
      )
}