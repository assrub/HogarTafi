import React, {useEffect, useState} from "react";
import { traerTodosLosSotcksApi,pacientesInactivos } from "../api";
import TablaStockDelHogar from "./Stock del Hogar/TablaStockDelHogar";

export default function StockDelHogar(){

    const [stock,setStock] = useState([]);
    const [pacientes,setPacientes] = useState([]);
    const [stocksInactivos, setStocksInactivos] = useState([])


    async function traertodosLosStocks(){
        const response = await traerTodosLosSotcksApi();
        setStock(response);
    }

    async function traertodosLosPacientesInactivos(){
        const response = await pacientesInactivos();
        setPacientes(response);
    }

    useEffect(()=>{
        traertodosLosStocks();
        traertodosLosPacientesInactivos();
    },[]);

    useEffect(() =>{
        filtrarStocksInactivos();
    },[pacientes]);

    useEffect(() => {},[stocksInactivos])

    function filtrarStocksInactivos(){
        const dniPacientesInactivos = pacientes.map(paciente => paciente.dni);
        const stocksFiltrados  = stock
                .filter(item => dniPacientesInactivos.includes(item.dni))
                .flatMap(item => item.medicamentos);
        setStocksInactivos(stocksFiltrados)
        console.log(stocksFiltrados)
    }


    return (
        <div>
          <div className="titulo flex justify-center text-xl lg:text-3xl lg:mt-5 mb-10">
          <h2 className="font-bold">Stock del hogar</h2>
        </div>

            <div className="tabla">
                <TablaStockDelHogar stocks={stocksInactivos}/>
            </div>

        </div>
    );
}