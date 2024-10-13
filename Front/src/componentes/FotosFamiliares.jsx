import React, { useContext, useState, useEffect } from "react";
import { contextoSesionUsuario } from "../contexto/sesionUsuario.jsx";
import Chip from "@mui/material/Chip";
import { todosLosPacientes } from "../api.js";
import Boton from "./Boton.jsx";
import { guardarFotoDamiliarApi, traerTodasLasFotosDniApi ,traerTodasLasFotosApi } from "../api.js";
import FotoFamiliar from "./FotosFamiliares/FotoFamiliar.jsx";

export default function FotosFamiliares() {
  const { usuario } = useContext(contextoSesionUsuario);
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

  const [pacientesSeleccionados, setPacientesSeleccionados] = useState([]);
  const [menuCargarFotos, setMenuCargarFotos] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  //Mostrar la foto antes de subirla
  const [foto, setFoto] = useState(null);
  //La misma foto que se muestra, pero sin pasar a base64. Es la que se manda al backend
  const [fotoSinConvertir, setFotoSinConvertir] = useState(null);
  //Fotos que se trae del backend.
  const [fotosBackend, setFotosBackend] = useState([]);

  function abrirMenuCargarFotos() {
    setMenuCargarFotos(true);
  }

  function vaciarCampos() {
    setFoto(null);
    setDescripcion("");
    setPacientesSeleccionados([]);
  }

  const cargarFoto = async () => {
    const arregloDni = [];
    pacientesSeleccionados.forEach((paciente) => {
      arregloDni.push(paciente.dni);
    });

    const formData = new FormData();
    arregloDni.forEach((dni) => {
      formData.append("dni", dni);
    });

    formData.append("descripcion", descripcion);
    formData.append("foto", fotoSinConvertir);

    try {
      const response = await guardarFotoDamiliarApi(formData);
      if (response.status === 200) {
        alert("Fotos guardadas correctamente");
        vaciarCampos();
      } else {
        alert("Error al guardar las fotos");
      }
    } catch (error) {
      console.error("Error al guardar la foto:", error);
    }
  };

  async function traerTodasLasFotos() {
    if(usuario.tipo === "admin" || usuario.tipo==="empleado"){
      const response = await traerTodasLasFotosApi();
    setFotosBackend(await response);
    }else{
      const response = await traerTodasLasFotosDniApi(usuario.asociado);
      setFotosBackend(await response);
      console.log(response)
    }
    
  }

  useEffect(() => {
    traerTodasLasFotos();
  
  }, [,menuCargarFotos]);

  const handleTextAreaChange = (e) => {
    setDescripcion(e.target.value);
  };

  useEffect(() => {
    traerPacientes();
  }, [paciente]);

  async function traerPacientes() {
    const datos = await todosLosPacientes();
    const datosFiltrados = datos.filter((paciente) => paciente !== null);
    setPacientes(datosFiltrados);
  }

  function volver() {
    setMenuCargarFotos(false);
  }

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFoto(reader.result);
        setFotoSinConvertir(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (e) => {
    const dni = parseInt(e.target.value);
    const pacienteSeleccionado = pacientes.find(
      (paciente) => paciente.dni === dni
    );

    if (
      pacienteSeleccionado &&
      !pacientesSeleccionados.some((p) => p.dni === pacienteSeleccionado.dni)
    ) {
      setPacientesSeleccionados([
        ...pacientesSeleccionados,
        pacienteSeleccionado,
      ]);
    }
  };

  const handleDeleteChip = (dni) => {
    setPacientesSeleccionados(
      pacientesSeleccionados.filter((paciente) => paciente.dni !== dni)
    );
  };

  return (
    <>
      <div className="registrar-pacientes w-full">
        <div className="titulo flex justify-center text-xl lg:text-3xl lg:mt-5 mb-10">
          <h2 className="font-bold">Fotos</h2>
        </div>

        {usuario.tipo === "admin" && !menuCargarFotos && (
          <div className="registrarUsuario mb-4 mx-4">
            <button
              onClick={abrirMenuCargarFotos}
              className={`flex text-xl text-green-600 border border-green-600 rounded-lg p-2 
                  hover:bg-green-600 hover:text-white hover:border-[#017a98]}`}
            >
              <svg
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                ></path>
              </svg>
              Cargar fotos
            </button>
          </div>
        )}

        {menuCargarFotos && (
          <div className="p-4 bg-gray-100 rounded-lg grid place-content-center">
            <div className="mb-4">
              <label
                htmlFor="upload-photo"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Cargar Foto
              </label>
              <input
                type="file"
                id="upload-photo"
                accept="image/*"
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                onChange={handleFotoChange}
              />
              <p className="mt-1 text-sm text-gray-500">
                Selecciona una imagen para cargar.
              </p>
            </div>

            {foto && (
              <div className="mb-4">
                <img
                  src={foto}
                  alt="Vista previa"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="descripcion"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Descripción de la Foto
              </label>
              <textarea
                id="descripcion"
                rows="3"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Descripción de la foto..."
                value={descripcion}
                onChange={handleTextAreaChange}
              ></textarea>
            </div>

            <div className="pacientes">
              <h3>¿Quiénes están en la foto?</h3>
              <div className="elegir-paciente">
                <select
                  name="paciente"
                  id="select-paciente"
                  className="bg-gray-200 rounded-lg p-2"
                  onChange={handleSelectChange}
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
              </div>
            </div>

            <div className="mt-4">
              {pacientesSeleccionados.length === 0 ? (
                <p>No hay pacientes seleccionados</p>
              ) : (
                pacientesSeleccionados.map((paciente) => (
                  <Chip
                    key={paciente.dni}
                    label={paciente.nombre + " " + paciente.apellido}
                    onDelete={() => handleDeleteChip(paciente.dni)}
                    color="primary"
                    style={{ margin: "5px" }}
                  />
                ))
              )}
            </div>

            <div className="botones">
              <Boton textoBoton="Volver" onClick={volver} />
              <Boton textoBoton="Cargar foto" onClick={cargarFoto} />
            </div>
          </div>
        )}

        {!menuCargarFotos && (
          <div className="fotos grid grid-cols-1 lg:grid-cols-2 gap-4">
            {
              fotosBackend.map((elemento, index) => (
                <div key={index}>
                  <FotoFamiliar objFoto={elemento} tipoUsuario={usuario.tipo}></FotoFamiliar>
                </div>
              ))}
         

          </div>
        )}
      </div>
    </>
  );
}
