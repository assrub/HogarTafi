import React, { useState, useEffect } from "react";
import { modificarPaciente } from "../../api";

function MostrarFotosPaciente({ paciente }) {
  const [pacienteActual, setPacienteActual] = useState(paciente);

  const [nuevaFotoFrenteDni, setNuevaFotoFrenteDni] = useState(null);
  const [nuevaFotoAtrasDni, setNuevaFotoAtrasDni] = useState(null);
  const [nuevaFotoFrenteCarnet, setNuevaFotoFrenteCarnet] = useState(null);
  const [nuevaFotoAtrasCarnet, setNuevaFotoAtrasCarnet] = useState(null);

  useEffect(() => {
    if (paciente) {
      setPacienteActual(paciente);
      setNuevaFotoFrenteDni(null);
      setNuevaFotoAtrasDni(null);
      setNuevaFotoFrenteCarnet(null);
      setNuevaFotoAtrasCarnet(null);
    }
  }, [paciente]);

  const cargarImagen = (setter) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setter(file);
      }
    };
    fileInput.click();
  };

  const actualizarImagenes = () => {
    const formData = new FormData();
    formData.append("dni", parseInt(paciente.dni));

    if (nuevaFotoFrenteDni) {
      formData.append("fotoFrenteDni", nuevaFotoFrenteDni);
    }
    if (nuevaFotoAtrasDni) {
      formData.append("fotoAtrasDni", nuevaFotoAtrasDni);
    }
    if (nuevaFotoFrenteCarnet) {
      formData.append("fotoFrenteCarnet", nuevaFotoFrenteCarnet);
    }
    if (nuevaFotoAtrasCarnet) {
      formData.append("fotoAtrasCarnet", nuevaFotoAtrasCarnet);
    }

    modificarPaciente(parseInt(paciente.dni), formData);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* Foto frente DNI */}
      <div className="border p-2">
        <h3 className="text-center font-bold mb-2">Frente DNI</h3>
        <div className="flex justify-center items-center border-2 p-2 h-48 w-full bg-gray-100">
          {nuevaFotoFrenteDni ? (
            <img
              src={URL.createObjectURL(nuevaFotoFrenteDni)}
              alt="Frente DNI"
              className="object-cover h-48 w-full rounded"
            />
          ) : pacienteActual.fotoFrenteDni ? (
            <img
              src={`data:image/jpeg;base64,${pacienteActual.fotoFrenteDni}`}
              alt="Frente DNI"
              className="object-cover h-48 w-full rounded"
            />
          ) : (
            <p className="text-center">No hay imagen disponible</p>
          )}
        </div>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => cargarImagen(setNuevaFotoFrenteDni)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Cargar nueva Frente DNI
          </button>
        </div>
      </div>

      {/* Foto atrás DNI */}
      <div className="border p-2">
        <h3 className="text-center font-bold mb-2">Atrás DNI</h3>
        <div className="flex justify-center items-center border-2 p-2 h-48 w-full bg-gray-100">
          {nuevaFotoAtrasDni ? (
            <img
              src={URL.createObjectURL(nuevaFotoAtrasDni)}
              alt="Atrás DNI"
              className="object-cover h-48 w-full rounded"
            />
          ) : pacienteActual.fotoAtrasDni ? (
            <img
              src={`data:image/jpeg;base64,${pacienteActual.fotoAtrasDni}`}
              alt="Atrás DNI"
              className="object-cover h-48 w-full rounded"
            />
          ) : (
            <p className="text-center">No hay imagen disponible</p>
          )}
        </div>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => cargarImagen(setNuevaFotoAtrasDni)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Cargar nueva Atrás DNI
          </button>
        </div>
      </div>

      {/* Foto frente Carnet */}
      <div className="border p-2">
        <h3 className="text-center font-bold mb-2">Frente Carnet</h3>
        <div className="flex justify-center items-center border-2 p-2 h-48 w-full bg-gray-100">
          {nuevaFotoFrenteCarnet ? (
            <img
              src={URL.createObjectURL(nuevaFotoFrenteCarnet)}
              alt="Frente Carnet"
              className="object-cover h-48 w-full rounded"
            />
          ) : pacienteActual.fotoFrenteCarnet ? (
            <img
              src={`data:image/jpeg;base64,${pacienteActual.fotoFrenteCarnet}`}
              alt="Frente Carnet"
              className="object-cover h-48 w-full rounded"
            />
          ) : (
            <p className="text-center">No hay imagen disponible</p>
          )}
        </div>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => cargarImagen(setNuevaFotoFrenteCarnet)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Cargar nueva Frente Carnet
          </button>
        </div>
      </div>

      {/* Foto atrás Carnet */}
      <div className="border p-2">
        <h3 className="text-center font-bold mb-2">Atrás Carnet</h3>
        <div className="flex justify-center items-center border-2 p-2 h-48 w-full bg-gray-100">
          {nuevaFotoAtrasCarnet ? (
            <img
              src={URL.createObjectURL(nuevaFotoAtrasCarnet)}
              alt="Atrás Carnet"
              className="object-cover h-48 w-full rounded"
            />
          ) : pacienteActual.fotoAtrasCarnet ? (
            <img
              src={`data:image/jpeg;base64,${pacienteActual.fotoAtrasCarnet}`}
              alt="Atrás Carnet"
              className="object-cover h-48 w-full rounded"
            />
          ) : (
            <p className="text-center">No hay imagen disponible</p>
          )}
        </div>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => cargarImagen(setNuevaFotoAtrasCarnet)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Cargar nueva Atrás Carnet
          </button>
        </div>
      </div>

      {/* Botón para actualizar imágenes */}
      <div className="col-span-2 flex justify-center mt-4">
        <button
          onClick={actualizarImagenes}
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          Actualizar Imágenes
        </button>
      </div>
    </div>
  );
}

export default MostrarFotosPaciente;
