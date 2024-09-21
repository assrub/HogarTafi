import React from "react";
import CampoTexto from "./FormPacientes/CampoTexto";
import Foto from "./FormPacientes/Foto";
import Boton from "./Boton";
import { useState, useEffect, useRef } from "react";
import TablaStock from "./FormPacientes/TablaStock";
import TablaMedicamentos from "./FormPacientes/TablaMedicamentos";
import { useLocation } from 'react-router-dom';
import {todosLosPacientes, modificarPaciente, guardarStockApi, guardarMedicamentosApi} from "../api"
import CartelAviso from "./CartelAviso";

function FormPacientes() {



  const [modificado,setModificado] = useState(false);
  const [mostrarCartel, setMostrarCartel] = useState(false)
  const [campoIncompleto, setCampoIncompleto] = useState(false);

  const toggleModal = () => setMostrarCartel(!mostrarCartel);

  const [mostrarStock, setMostrarStock] = useState(false);
  const [mostrarMedicamentos, SetMostrarMedicamentos] = useState(false);
  const [mostrarFotos, setMostrarFotos] = useState(false);
  const [camposDeshabilitados,setcamposDeshabilitados] = useState(true); 
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

  const fotoFrenteDniRef = useRef(null);
  const fotoDorsoDniRef = useRef(null);
  const fotoFrenteCarnetRef = useRef(null);
  const fotoDorsoCarnetRef = useRef(null);
  
  const [pacientes, setPacientes] = useState([]);//array de todos los pacientes
  const location = useLocation();
  const [botonApretado, setBotonApretado] = useState({
    stock: false,
    medicamentos: false,
    fotos: false,
  });
  
  const [stock, setStock] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);

  const stockRef = useRef(null);
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
  
  
  
  useEffect(() => {

  },[paciente])


  //si el location.state cambia, cambia el objeto paciente y si no no.
  useEffect(() => {
    if (location.state) {
      setPaciente(location.state.paciente); 
      setcamposDeshabilitados(false)
    }
  }, [location.state]); 


  //Funciones que muestran una de las secciones y esconden las demas, si estaban abiertas
function funcionMostrarTablaStock(boton) {
  clickBoton(boton);
    setMostrarFotos(false);
    SetMostrarMedicamentos(false);
    setMostrarStock(!mostrarStock);

}
function funcionMostrarFotos(boton) { 
  clickBoton(boton);
    setMostrarStock(false);
    SetMostrarMedicamentos(false);
    setMostrarFotos(!mostrarFotos);
    
}
function funcionMostrarTablaMedicamentos(boton){
  clickBoton(boton);
  setMostrarFotos(false);
  setMostrarStock(false);
  SetMostrarMedicamentos(!mostrarMedicamentos)
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

function guardarStock(stockRef){
  let tablaStock = convertirTablaAJson(stockRef);
  setStock(tablaStock);
  setMostrarStock(!mostrarStock);
  const formDataStock = new FormData();
  stock.forEach((item, index) => {
    formDataStock.append(`stock[${index}][medicacion]`, item.medicacion);
    formDataStock.append(`stock[${index}][cantidad]`, item.cantidad);
    formDataStock.append(`stock[${index}][cantidadMinima]`, item.cantidadMinima);
  });
  guardarStockApi(formDataStock,parseInt(paciente.dni));
}
function guardarMedicamentos(medicamentosRef){
  let tablaMedicamentos = convertirTablaAJson(medicamentosRef);
<<<<<<< HEAD
  setMedicamentos(tablaMedicamentos);
  //SetMostrarMedicamentos(!mostrarMedicamentos);
  console.log(tablaMedicamentos);
=======

  setMedicamentos(medicamentosRef);
  //SetMostrarMedicamentos(!mostrarMedicamentos);
  console.log(medicamentos);
>>>>>>> 3d43d624e3bb0a254ba59a7545dc6face4d130ce
  const formDataMedicamentos = new FormData();
  medicamentos.forEach((item,index) => {
    if (item.Medicamento != null) {
      formDataMedicamentos.append(`medicamentos[${index}][Medicamento]`, item.Medicamento);
      formDataMedicamentos.append(`medicamentos[${index}][6:00]`, item["6:00"]); 
      formDataMedicamentos.append(`medicamentos[${index}][Desayuno]`, item.Desayuno);
      formDataMedicamentos.append(`medicamentos[${index}][Almuerzo]`, item.Almuerzo);
      formDataMedicamentos.append(`medicamentos[${index}][Merienda]`, item.Merienda);
      formDataMedicamentos.append(`medicamentos[${index}][Cena]`, item.Cena);
      formDataMedicamentos.append(`medicamentos[${index}][22:30]`, item["22:30"]);
      formDataMedicamentos.append(`medicamentos[${index}][observaciones]`, item.Observaciones);
    }
   
  });
  //const response  = guardarMedicamentosApi(formDataMedicamentos,parseInt(paciente.dni));
  //console.log(response);
 
}


function buscarClick(){
  let dniPacientes = document.getElementById("select-paciente").value;
  //esto es para el ejemplo. Hay que hacer que busque en la base de datos
  pacientes.forEach(element => {
    if (element.dni == dniPacientes){
      setPaciente(element);
     
    }
  })
  setcamposDeshabilitados(false)

  }

  const datosEjemplo = [
    {
      nombre: "Lucía",
      apellido: "Pérez",
      dni: "37654821",
      obraSocial: "OSDE",
      observaciones: "Paciente con alergias estacionales",
    },
    {
      nombre: "Martín",
      apellido: "Gómez",
      dni: "39561234",
      obraSocial: "Swiss Medical",
      observaciones: "Requiere chequeo anual",
    },
    {
      nombre: "Mariana",
      apellido: "Fernández",
      dni: "41234567",
      obraSocial: "Galeno",
      observaciones: "Historial de hipertensión",
    },
    {
      nombre: "Carlos",
      apellido: "Ramírez",
      dni: "40231678",
      obraSocial: "Medifé",
      observaciones: "Paciente diabético",
    },
    {
      nombre: "Sofía",
      apellido: "López",
      dni: "38456789",
      obraSocial: "OSDE",
      observaciones: "Requiere seguimiento por asma",
    },
    {
      nombre: "Javier",
      apellido: "Sánchez",
      dni: "42123456",
      obraSocial: "OMINT",
      observaciones: "Paciente con colesterol alto",
    },
    {
      nombre: "Valeria",
      apellido: "Gutiérrez",
      dni: "39874561",
      obraSocial: "Osecac",
      observaciones: "Historial de migrañas",
    },
  ];
  
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaciente((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  

  async function modificar(paciente){
    
    //datos del paciente
    const nombrePaciente = document.getElementById("inputNombre").value;
    const apellidoPaciente = document.getElementById("inputApellido").value;
    const dniPaciente = paciente.dni.toString()
    const obraSocialPaciente = document.getElementById("inputObraSocial").value;
    const observacionesPaciente = document.getElementById("observaciones").value;

    let imagenFrenteDni = null;
      let imagenDorsoDni = null;
      let imagenFrenteCarnet = null;
      let imagenDorsoCarnet = null;


    //Encuentra las nuevas imagenes
    try{
       imagenFrenteDni = fotoFrenteDniRef.current.querySelector('input[type="file"]').files[0];
       imagenDorsoDni = fotoDorsoDniRef.current.querySelector('input[type="file"]').files[0];
       imagenFrenteCarnet = fotoFrenteCarnetRef.current.querySelector('input[type="file"]').files[0];
       imagenDorsoCarnet = fotoDorsoCarnetRef.current.querySelector('input[type="file"]').files[0];
  
    }catch {
    }
    

    if (nombrePaciente === "" || apellidoPaciente === "" || dniPaciente === "") {
      setCampoIncompleto(true);
      return;
    } else {
      setCampoIncompleto(false);
    }
    
    //Modificacion de los datos del paciente.
    const formData = new FormData();
    formData.append("nombre", nombrePaciente);
    formData.append("apellido", apellidoPaciente);
    formData.append("dni", parseInt(dniPaciente));
    formData.append("obraSocial", obraSocialPaciente);
    formData.append("observaciones", observacionesPaciente);
    formData.append("fotoFrenteDni", imagenFrenteDni ? imagenFrenteDni : paciente.fotoFrenteDni);
    formData.append("fotoAtrasDni", imagenDorsoDni ? imagenDorsoDni : paciente.fotoAtrasDni);
    formData.append("fotoFrenteCarnet", imagenFrenteCarnet ? imagenFrenteCarnet : paciente.fotoFrenteCarnet);
    formData.append("fotoAtrasCarnet", imagenDorsoCarnet ? imagenDorsoCarnet : paciente.fotoAtrasCarnet);
    
    const response = modificarPaciente(parseInt(paciente.dni), formData);


    setModificado(response);
    toggleModal();
  }

  const clickBoton = (boton) => {
    // Cambia el boton apretado a true y los demás a false
    setBotonApretado((prevState) => {
      const isActive = prevState[boton];
      return {
        stock: boton === 'stock' ? !isActive : false,
        medicamentos: boton === 'medicamentos' ? !isActive : false,
        fotos: boton === 'fotos' ? !isActive : false,
      };
    });
  };

  return (
    <>
      <div className="datos-pacientes">
        <div className="titulo flex justify-center text-xl lg:text-3xl lg:mt-5 mb-10">
          <h2 className="text-bold">
            <strong>Datos del pacientes</strong>
          </h2>
        </div>

        <div className="elegir-paciente flex  justify-center ">
          <select name="paciente" id="select-paciente" className="bg-gray-200 rounded-lg w-2/5">
          <option selected disabled value="seleccionar-un-paciente">Selecciona un paciente</option>
          {pacientes.map((paciente,index) =>(
            <option key={index} value={paciente.dni}>{paciente.nombre + ' ' + paciente.apellido}</option>
          ))}  
          </select>
          <div className="Boton mx-4">
              <Boton textoBoton="Buscar" onClick={buscarClick}></Boton>
          </div>
        </div>

        <div className="formulario  grid grid-cols-1 mx-2 justify-items-center ">
          <div className="datos w-full mb-6 ">
          <form>
      <CampoTexto
        textoEtiqueta="Nombre"
        error={campoIncompleto}
                obligatorio={true}
        propsLabel={{ labelFor: "name" }}
        propsInput={{
          type: "text",
          name: "nombre",
          id: "inputNombre",
          value: paciente.nombre,
          onChange: handleInputChange
        }}
      />

      <CampoTexto
        textoEtiqueta="Apellido"
        error={campoIncompleto}
                obligatorio={true}
        propsLabel={{ labelFor: "lastName" }}
        propsInput={{
          type: "text",
          name: "apellido",
          id: "inputApellido",
          value: paciente.apellido,
          onChange: handleInputChange
        }}
      />

      <CampoTexto
        textoEtiqueta="DNI"
        error={campoIncompleto}
                obligatorio={true}
        propsLabel={{ labelFor: "dni" }}
        propsInput={{
          type: "number",
          name: "dni",
          id: "inputDni",
          value: paciente.dni,
          readOnly: true,
          onChange: handleInputChange
        }}
      />

      <CampoTexto
        textoEtiqueta="Obra social"
        propsLabel={{ labelFor: "obraSocial" }}
        propsInput={{
          type: "text",
          name: "obraSocial",
          id: "inputObraSocial",
          value: paciente.obraSocial,
          onChange: handleInputChange
        }}
      />


<div className="observaciones mt-4">
                <label htmlFor="observaciones" className="text-xl font-medium ">Observaciones</label>
                <textarea id="observaciones" name="observaciones" className=" w-full rounded-lg h-56 bg-transparent
                 border-neutral-300 border-2 
                 p-2 resize-none focus:outline-none  
                 disabled:bg-gray-300
                enabled:bg-transparent" value={paciente.observaciones}
                onChange={handleInputChange}></textarea>
              </div>
  
    </form>
          </div>

          
        </div>

        <div className="botones flex justify-center my-6 mx-2 gap-4">
      <Boton 
        textoBoton="Stock" 
        onClick={() => funcionMostrarTablaStock('stock')} 
        propsBoton={{ disabled: camposDeshabilitados }} 
        apretado={botonApretado.stock} 
      />
      <Boton 
        textoBoton="Tabla de medicamentos" 
        onClick={ () => funcionMostrarTablaMedicamentos('medicamentos')} 
        propsBoton={{ disabled: camposDeshabilitados }} 
        apretado={botonApretado.medicamentos} 
      />
      <Boton 
        textoBoton="Fotos" 
        onClick={() => funcionMostrarFotos('fotos')} 
        propsBoton={{ disabled: camposDeshabilitados }} 
        apretado={botonApretado.fotos} 
      />
    </div>
<hr />
        <div className="menuEscondido mx-6 my-2">
          <div className="stock">
          {mostrarStock && (
            <div className="">
              <TablaStock ref={stockRef}/>
              <div className="boton m-4">
              <Boton textoBoton="Guardar stock" onClick={() => guardarStock(stockRef)}></Boton>
              </div>
            </div>
          )}
        </div>
        <div className="fotos ">
          {mostrarFotos && (
            <div>
              <div className="fotos grid grid-cols-1 md:grid-cols-2  justify-items-center gap-x-3 xl:mr-10 ">
            <Foto textoFoto={"Frente del DNI"} src={paciente.fotoFrenteDni} ref={fotoFrenteDniRef}/>
            <Foto textoFoto={"Dorso del DNI"} src={paciente.fotoAtrasDni} ref={fotoDorsoDniRef}/>
            <Foto textoFoto={"Frente del carnet"} src={paciente.fotoFrenteCarnet} ref={fotoFrenteCarnetRef}/>
            <Foto textoFoto={"Dorso del carnet"} src={paciente.fotoAtrasCarnet} ref={fotoDorsoCarnetRef}/>
          </div>
            </div>
          )}
        </div>
        <div className="tablaMedicamentos ">
          {mostrarMedicamentos && (
            <div>
              <TablaMedicamentos ref={medicamentosRef}/>
              <div className="boton m-4">
              <Boton textoBoton="Guardar medicamentos" onClick={() => guardarMedicamentos(medicamentosRef)}></Boton>
              </div>
            </div>
          )}
        </div>
        </div>

        <div className="grid justify-items-center m-4">
          <Boton textoBoton="Modificar datos del paciente" onClick={()=> modificar(paciente)} ></Boton>
        </div>
          <div className="modal">
          <CartelAviso
        abrirModal={mostrarCartel}
        cerrarModal={toggleModal}
        mensaje={modificado ? 'Paciente modificado correctamente' : 'Error al modificar el paciente'}
      />
          </div>
      </div>
    </>
  );
}
export default FormPacientes;
