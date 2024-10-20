import React, { useState, useEffect } from "react";
import {
  todosLosPacientes,
  modificarPaciente,
  guardarStockApi,
  guardarMedicamentosApi,
} from "../api";
import Boton from "./Botones/Boton"; // Ajusta la ruta si es necesario
import DatosPaciente from "./FormPacientes/DatosPaciente";
import TablaStock from "./FormPacientes/TablaStock2";
import TablaMedicamentos from "./FormPacientes/TablaMedicamentos2";
import Foto from "./FormPacientes/Foto2";
import CartelAviso from "./Modal/CartelAviso";

function FormPaciente2() {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    obraSocial: "",
    observaciones: "",
    fotoFrenteDni: "",
    fotoAtrasDni: "",
    fotoFrenteCarnet: "",
    fotoAtrasCarnet: "",
  });

  const [camposDeshabilitados, setcamposDeshabilitados] = useState(true);
  const [campoIncompleto, setCampoIncompleto] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("Datos");
  const [mostrarCartel, setMostrarCartel] = useState(false);
  const [modificado, setModificado] = useState(false);

  const toggleModal = () => setMostrarCartel(!mostrarCartel);

  async function traerPacientes() {
    const datos = await todosLosPacientes();
    const datosFiltrados = datos.filter((paciente) => paciente !== null);
    setPacientes(datosFiltrados);
  }

  useEffect(() => {
    traerPacientes();
  }, []);

  function buscarClick() {
    let dniPacientes = document.getElementById("select-paciente").value;

    pacientes.forEach((element) => {
      if (element.dni == dniPacientes) {
        setPaciente(element);
      }
    });

    if (dniPacientes !== "null") {
      setcamposDeshabilitados(false);
    }
  }

  async function modificar(paciente) {
    //Modificacion de los datos del paciente.
    const formData = new FormData();
    formData.append("nombre", paciente.nombre);
    formData.append("apellido", paciente.apellido);
    formData.append("dni", parseInt(paciente.dni));
    formData.append("obraSocial", paciente.obraSocial);
    formData.append("observaciones", paciente.observaciones);

    // Asegúrate de enviar las imágenes como base64
    formData.append("fotoFrenteDni", paciente.fotoFrenteDni);
    formData.append("fotoAtrasDni", paciente.fotoAtrasDni);
    formData.append("fotoFrenteCarnet", paciente.fotoFrenteCarnet);
    formData.append("fotoAtrasCarnet", paciente.fotoAtrasCarnet);

    const response = modificarPaciente(parseInt(paciente.dni), formData);

    setModificado(response);
    toggleModal();
  }

  // Componente de botones de navegación
  const BotonNavegacion = ({ texto, seccion }) => (
    <button
      onClick={() => setSeccionActiva(seccion)}
      className={`flex-1 px-4 py-2
        ${
          seccionActiva === seccion
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }
        hover:bg-blue-300 hover:text-white`}
    >
      {texto}
    </button>
  );

  const actualizarPaciente = (nuevosDatos) => {
    setPaciente((prevPaciente) => ({
      ...prevPaciente,
      ...nuevosDatos,
    }));
  };

  return (
    <>
      <div className="registrar-pacientes w-full max-w-screen-xl">
        <div className="datos-pacientes">
          <div className="titulo flex justify-center text-xl lg:text-3xl lg:mt-5 mb-10">
            <h2 className="text-bold">
              <strong>Datos del paciente</strong>
            </h2>
          </div>

          <div className="elegir-paciente flex justify-center">
            <select
              name="paciente"
              id="select-paciente"
              className="bg-gray-200 rounded-lg w-2/5"
            >
              <option selected disabled value="null">
                Selecciona un paciente
              </option>
              {pacientes.map((paciente, index) => (
                <option key={index} value={paciente.dni}>
                  {paciente.nombre + " " + paciente.apellido}
                </option>
              ))}
            </select>
            <div className="Boton mx-4">
              <Boton textoBoton="Buscar" onClick={buscarClick}></Boton>
            </div>
          </div>

          <div className="flex justify-center my-5">
            <BotonNavegacion texto="Datos" seccion="Datos" />
            <BotonNavegacion texto="Stock" seccion="Stock" />
            <BotonNavegacion texto="Medicamentos" seccion="Medicamentos" />
            <BotonNavegacion texto="Fotos" seccion="Fotos" />
          </div>

          <div className="contenido-seccion w-full bg-gray-100 rounded-lg">
            {seccionActiva === "Datos" && <DatosPaciente paciente={paciente} />}
            {seccionActiva === "Stock" && <TablaStock paciente={paciente} />}
            {seccionActiva === "Medicamentos" && (<TablaMedicamentos paciente={paciente} />)}
            {seccionActiva === "Fotos" && (<Foto textoFoto="fotoFrenteDni" paciente={paciente} />)}

            <div className="modal">
              <CartelAviso
                abrirModal={mostrarCartel}
                cerrarModal={toggleModal}
                mensaje={
                  modificado
                    ? "Paciente modificado correctamente"
                    : "Error al modificar el paciente"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPaciente2;
