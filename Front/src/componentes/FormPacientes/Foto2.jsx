import React, { useState, useEffect } from "react";
import { modificarPaciente } from "../../api";

function MostrarFotosPaciente({ paciente }) {
  // Estado para almacenar el objeto paciente localmente
  const [pacienteActual, setPacienteActual] = useState(paciente);

  // Nuevas variables para almacenar las imágenes cargadas
  const [nuevaFotoFrenteDni, setNuevaFotoFrenteDni] = useState(null);
  const [nuevaFotoAtrasDni, setNuevaFotoAtrasDni] = useState(null);
  const [nuevaFotoFrenteCarnet, setNuevaFotoFrenteCarnet] = useState(null);
  const [nuevaFotoAtrasCarnet, setNuevaFotoAtrasCarnet] = useState(null);

  // Efecto para actualizar el estado cuando cambie el objeto paciente
  useEffect(() => {
    if (paciente) {
      setPacienteActual(paciente);
      // Reiniciar las fotos cargadas al cambiar el paciente
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
        // Almacenar la imagen cargada en el estado correspondiente
        setter(file);
      }
    };
    fileInput.click();
  };

  const actualizarImagenes = () => {
    const formData = new FormData();
    formData.append("dni", parseInt(paciente.dni));

    // Agregar las nuevas imágenes al FormData si existen
    if (nuevaFotoFrenteDni) {
      formData.append("fotoFrenteDni", nuevaFotoFrenteDni); // archivo
    }
    if (nuevaFotoAtrasDni) {
      formData.append("fotoAtrasDni", nuevaFotoAtrasDni); // archivo
    }
    if (nuevaFotoFrenteCarnet) {
      formData.append("fotoFrenteCarnet", nuevaFotoFrenteCarnet); // archivo
    }
    if (nuevaFotoAtrasCarnet) {
      formData.append("fotoAtrasCarnet", nuevaFotoAtrasCarnet); // archivo
    }

    // Enviar los datos al backend
    modificarPaciente(parseInt(paciente.dni), formData);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* Foto frente DNI */}
      <div className="border p-2">
        <h3 className="text-center font-bold mb-2">Frente DNI</h3>
        <div className="flex justify-center items-center border-2 p-2">
          {nuevaFotoFrenteDni ? (
            <img
              src={URL.createObjectURL(nuevaFotoFrenteDni)} // Muestra la imagen cargada localmente
              alt="Frente DNI"
              className="object-cover h-48 w-full rounded"
            />
          ) : pacienteActual.fotoFrenteDni ? (
            <img
              src={`data:image/jpeg;base64,${pacienteActual.fotoFrenteDni}`} // Muestra la imagen almacenada en base64
              alt="Frente DNI"
              className="object-cover h-48 w-full rounded"
            />
          ) : (
            <p>No hay imagen disponible</p>
          )}
        </div>
        <button
          onClick={() => cargarImagen(setNuevaFotoFrenteDni)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Cargar nueva Frente DNI
        </button>
      </div>

      {/* Foto atrás DNI */}
      <div className="border p-2">
        <h3 className="text-center font-bold mb-2">Atrás DNI</h3>
        <div className="flex justify-center items-center border-2 p-2">
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
            <p>No hay imagen disponible</p>
          )}
        </div>
        <button
          onClick={() => cargarImagen(setNuevaFotoAtrasDni)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Cargar nueva Atrás DNI
        </button>
      </div>

      {/* Foto frente Carnet */}
      <div className="border p-2">
        <h3 className="text-center font-bold mb-2">Frente Carnet</h3>
        <div className="flex justify-center items-center border-2 p-2">
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
            <p>No hay imagen disponible</p>
          )}
        </div>
        <button
          onClick={() => cargarImagen(setNuevaFotoFrenteCarnet)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Cargar nueva Frente Carnet
        </button>
      </div>

      {/* Foto atrás Carnet */}
      <div className="border p-2">
        <h3 className="text-center font-bold mb-2">Atrás Carnet</h3>
        <div className="flex justify-center items-center border-2 p-2">
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
            <p>No hay imagen disponible</p>
          )}
        </div>
        <button
          onClick={() => cargarImagen(setNuevaFotoAtrasCarnet)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Cargar nueva Atrás Carnet
        </button>
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
