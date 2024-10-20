import React, { useEffect, useState, forwardRef } from "react";
import { traerMedicamentosApi, traerStockApi, guardarMedicamentosApi} from "../../api";
import BotonActualizar from './../Botones/BotonActualizar';
import BotonEditar from './../Botones/BotonEditar';
import BotonEliminar from './../Botones/BotonEliminar';
import BotonEditarMovil from './../Botones/BotonEditarMovil';
import BotonEliminarMovil from './../Botones/BotonEliminarMovil';
import BotonAgregar from './../Botones/BotonAgregar';
import CartelAviso from "./../Modal/CartelAviso";
import { useRef } from 'react';

const TablaMedicamentos = forwardRef(({ paciente, menuMedicaionpaciente = false, medicacionDiaria = false, onClickRestaMedicacionDiaria, onclicksumarMedicacionDiaria }) => {

   

  const [mensajeModalAviso, setMensajeModalAviso] = useState("");       // Almacena el mensaje que debe mostrar el modal.
  const [mostrarModalAviso, setMostrarModalAviso] = useState(false);    // Controla si el modal se muestra o no (true = mostrar, false = ocultar). 
  const [estadoModalAviso, setEstadoModalAviso] = useState("");        // Almacena el estado del modal (número que representa el tipo de mensaje, 1 = éxito, 2 = error, etc.).
  const [accionConfimModalAviso, setAccionConfimModalAviso] = useState(null);  // Almacena la función que se ejecutará si se confirma la acción en el modal (al presionar "Confirmar").
  const toggleModalAviso = () => setMostrarModalAviso(!mostrarModalAviso);    // Alterna entre mostrar y ocultar el modal (si está oculto lo muestra, y viceversa).


// Función para capitalizar la primera letra de una cadena
function capitalizeFirstLetter(input) {
  if (!input) return input; // Retorna null o cadena vacía sin cambios
  input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  return input;
}

// Función para convertir la tabla a JSON
function convertirTablaAJson(refTabla) {
  if (!refTabla.current) {
    console.error("El refTabla no está asignado a ningún elemento.");
    return [];
  }

  const table = refTabla.current;

  // Obtener los encabezados de la tabla, omitiendo el último que es para "Acciones"
  const headers = Array.from(table.querySelectorAll('thead th'))
    .slice(0, -1)
    .map(th => capitalizeFirstLetter(th.textContent.trim()));  // Aplicar capitalizeFirstLetter

  // Recorrer las filas del cuerpo de la tabla
  const rows = Array.from(table.querySelectorAll('tbody tr')).map(tr => {
    const cells = Array.from(tr.querySelectorAll('td')).slice(0, -1); // Omitimos la última celda (Acciones)
    const rowData = {};

    cells.forEach((cell, i) => {
      let cellValue = '';

      // Si la celda contiene un select, obtenemos su valor
      const select = cell.querySelector('select');
      if (select) {
        cellValue = select.value.trim();
      } else if (cell.querySelector('input')) {
        // Si la celda tiene un input, obtenemos el valor del input
        cellValue = cell.querySelector('input').value.trim();
      } else {
        // Si no hay input ni select, tomamos el contenido textual de la celda
        cellValue = cell.textContent.trim();
      }

      // Asignar el valor al objeto rowData usando el encabezado correspondiente
      rowData[headers[i]] = cellValue !== "" ? cellValue : null;
    });

    return rowData;
  });

  return rows;
}

// Uso de la función con el ref de la tabla
const refTabla = { current: document.querySelector('table') };  // Simula un ref
const datosTabla = convertirTablaAJson(refTabla);

console.log(datosTabla);  // Muestra los datos convertidos de la tabla en consola

  const horasDelDia = [
    "6:00",
    "Desayuno",
    "Almuerzo",
    "Merienda",
    "Cena",
    "22:30",
  ];

  const [stock, setStock] = useState([
    { medicacion: "", cantidad: "", cantidadMinima: "" }
  ]);

  const [medicamentos, setMedicamentos] = useState([
    {
      medicamento: "",
      horario: horasDelDia.reduce((acc, hora) => ({ ...acc, [hora]: "" }), {}),
      observaciones: "",
      editable: false,
    },
  ]);

  const [nuevoMedicamento, setNuevoMedicamento] = useState({
    medicamento: "",
    horario: horasDelDia.reduce((acc, hora) => ({ ...acc, [hora]: "" }), {}),
    observaciones: "",
  });

  useEffect(() => {
    traerStock(paciente.dni);
    traerMedicamentos(paciente.dni);
  }, [paciente]);

  const manejarCambioSelect = (e, index) => {
    const { value } = e.target;
    setMedicamentos((prev) => {
      const nuevosMedicamentos = [...prev];
      nuevosMedicamentos[index] = {
        ...nuevosMedicamentos[index],
        medicamento: value,
      };
      return nuevosMedicamentos;
    });
  };

  const manejarCambioNuevoMedicamento = (event) => {
    const { name, value } = event.target;
    setNuevoMedicamento((prev) => ({
      ...prev,
      horario: {
        ...prev.horario,
        [name]: value,
      },
    }));
  };

  const manejarCambio = (index, hora, event) => {
    const { value } = event.target;
    setMedicamentos((prev) => {
      const nuevosMedicamentos = [...prev];
      nuevosMedicamentos[index].horario[hora] = value;
      return nuevosMedicamentos;
    });
  };

  const handleEditRow = (index) => {
    setMedicamentos((prev) => {
      const nuevosMedicamentos = [...prev];
      nuevosMedicamentos[index].editable = !nuevosMedicamentos[index].editable;
      return nuevosMedicamentos;
    });
  };

  const confirmDelete = (index) => {
    setMensajeModalAviso("¿Estás seguro de que deseas realizar esta acción?");
    setEstadoModalAviso(11);  // Estado que indica confirmación
    setAccionConfimModalAviso(() => () => handleRemoveRow(index));  // Asigna la acción de eliminación
    toggleModalAviso();  // Muestra el modal
  };
  

  const handleRemoveRow = (index) => {
    setMedicamentos((prev) => prev.filter((_, i) => i !== index));
    setMostrarModalAviso(false); //No me funciona el toggleModalAviso() aca.. no sé por qué... lo tuve que forzar.
  };
  

  const handleAddRow = () => {
    if (nuevoMedicamento.medicamento) {
      setMedicamentos((prev) => [...prev, nuevoMedicamento]);
      setNuevoMedicamento({
        medicamento: "",
        horario: horasDelDia.reduce((acc, hora) => ({ ...acc, [hora]: "" }), {}),
        observaciones: "",
      });
    } else {
      setMensajeModalAviso("Por favor, selecciona un medicamento.");
      setEstadoModalAviso(1); 
      toggleModalAviso();
      return;
    }
  };

  const manejarCambioObservaciones = (index, event) => {
    const { value } = event.target;
    setMedicamentos((prev) => {
      const nuevosMedicamentos = [...prev];
      nuevosMedicamentos[index] = {
        ...nuevosMedicamentos[index],
        observaciones: value,  // Actualiza las observaciones del medicamento en el índice correspondiente
      };
      return nuevosMedicamentos;
    });
  };
  

  async function guardarMedicamentos() {
    let tablaMedicamentos = convertirTablaAJson(refTabla);
    let arregloMedicacion = [];
    
    tablaMedicamentos.forEach((item) => {
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
    
    const response = await guardarMedicamentosApi(arregloMedicacion, parseInt(paciente.dni)); 

    if (response === true) {
      setMensajeModalAviso("Medicamentos guardados correctamente.");
      setEstadoModalAviso(2); 
      toggleModalAviso();
      return;
    } else {
      setMensajeModalAviso("Error al guardar los medicamentos.");
      setEstadoModalAviso(3); 
      toggleModalAviso();
    }
}


  const handleClearContent = () => {
    setMedicamentos([{
      medicamento: "",
      horario: horasDelDia.reduce((acc, hora) => ({ ...acc, [hora]: "" }), {}),
      observaciones: "",
      editable: false,
    }]);
  };

  async function traerMedicamentos(dni) {
  try {
    const response = await traerMedicamentosApi(dni);
    if (response.status == 404) {
      setMedicamentos([
        {
          medicamento: "",
          horario: horasDelDia.reduce((acc, hora) => ({ ...acc, [hora]: "" }), {}),
          observaciones: "",
          editable: false,
        },
      ]);
      return;
    }

  
    if (response.status == 200) {
      const data = await response.json();
      setMedicamentos(transformarMedicamentos(data.medicamentos));
    } else {
      console.error(`Error: respuesta inesperada con código ${response.status}`);
    }
  } catch (error) {
    console.error("Error al traer los medicamentos:", error);
  }
}

  //esta funcion es porque el estado de medicamentos en este componente y los medicamentos que estan en la base de datos tienen diferente forma
  function transformarMedicamentos(medicamentosBackend) {
    return medicamentosBackend.map(medicamento => ({
      medicamento: medicamento.medicamento,
      horario: {
        "6:00": medicamento.horario_1,
        Desayuno: medicamento.desayuno,
        Almuerzo: medicamento.almuerzo,
        Merienda: medicamento.merienda,
        Cena: medicamento.cena,
        "22:30": medicamento.horario_2
      },
      observaciones: medicamento.observaciones || "",
      editable: false
    }));
  }


  async function traerStock(dni) {
    try {
      const response = await traerStockApi(dni);
      // Verificamos si el estado es 404 antes de intentar parsear el JSON
      if (response.status == 404) {
        setStock([
          {
            medicacion: "",
            cantidad: "",
            cantidadMinima: ""
          }
        ]);
        return; // Salimos de la función porque ya manejamos el 404
      }
  
      // Si el estado es 200, procesamos la respuesta
      if (response.status == 200) {
        const data = await response.json();
        setStock(transformarStock(data.medicamentos));
      } else {
        console.error(`Error: respuesta inesperada con código ${response.status}`);
      }
  
    } catch (error) {
      console.error("Error al traer el stock:", error);
    }
  }

  function transformarStock(stockBackend) {
    return stockBackend.map(stock => ({
      medicacion: stock.medicacion,
      cantidad: stock.cantidad,
      cantidadMinima: stock.cant_minima,
      added: true
    }));
  }

  return (
    <div className="border rounded-lg p-3 shadow-md overflow-x-auto">
      <table className="hidden lg:table min-w-full table-auto text-xs sm:text-xs bg-white">
        <thead>
          <tr className="bg-gray-400 text-white">
            <th className="p-3 border border-gray-300 text-white">MEDICAMENTO</th>
            {horasDelDia.map((hora, index) => (
              <th key={index} className="p-3 border border-gray-300 text-white">{hora.toUpperCase()}</th>
            ))}
            <th className="p-3 border border-gray-300 text-white">OBSERVACIONES</th>
            <th className="p-3 border border-gray-300 text-white">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((medicamento, index) => (
            medicamento.medicamento &&(
            <tr key={index}>
              <td className="border border-gray-300 p-0 h-full align-middle">
                <select
                  className={`w-full h-full py-3 box-border text-center text-gray-500 font-bold ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}
                  value={medicamento.medicamento}  // Aseguramos que el value sea el correcto
                  onChange={(e) => manejarCambioSelect(e, index)}  // Pasamos el índice
                  disabled={!medicamento.editable}
                >
                  {stock.map((item, idx) => (
                    <option key={idx} value={item.medicacion}>
                      {item.medicacion}
                    </option>
                  ))}
                </select>
              </td>
              {horasDelDia.map((hora, idx) => (
                <td key={idx} className="border border-gray-300 p-0 h-full align-middle">
                  <input
                    className={`w-full h-full p-3 box-border text-center text-gray-500 font-bold ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}
                    type="number"
                    value={medicamento.horario[hora] || ""}
                    onChange={(event) => manejarCambio(index, hora, event)}
                    disabled={!medicamento.editable}
                  />
                </td>
              ))}
              <td className="border border-gray-300 p-0 h-full align-middle">
                <input
                  className={`w-full h-full p-3 box-border text-gray-500 font-bold ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}
                  type="text"
                  value={medicamento.observaciones}
                  onChange={(event) => manejarCambioObservaciones(index, event)}
                  disabled={!medicamento.editable}
                />
              </td>
              <td className={`w-full flex border border-gray-300 p-0 h-full align-middle ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}>
                  <BotonEditar editable={medicamento.editable} onGuardar={() => handleEditRow(index)} onModificar={() => handleEditRow(index)} />
                  <BotonEliminar onClick={() => confirmDelete(index)} />
              </td>
            </tr>)
          ))}
          {!menuMedicaionpaciente && (
            <tr>
              <td className="border border-gray-300 p-0 h-full align-middle">
                <select
                  className="w-full h-full p-3 bg-white rounded-none"
                  name="medicamento"
                  value={nuevoMedicamento.medicamento}
                  onChange={(e) => setNuevoMedicamento((prev) => ({ ...prev, medicamento: e.target.value }))}
                >
                  <option value="">Seleccione</option>
                  {stock.map((item, index) => (
                    <option key={index} value={item.medicacion}>
                      {item.medicacion}
                    </option>
                  ))}
                </select>
              </td>
              {horasDelDia.map((hora, idx) => (
                <td key={idx} className="border border-gray-300 p-0 h-full align-middle">
                  <input
                    type="number"
                    name={hora}
                    min={0}
                    value={nuevoMedicamento.horario[hora]}
                    onChange={manejarCambioNuevoMedicamento}
                    className={`w-full h-full p-3 box-border bg-white text-center`}
                    placeholder={hora}
                  />
                </td>
              ))}
              <td className="border border-gray-300 p-0 h-full align-middle">
                <input
                  type="text"
                  name="observaciones"
                  value={nuevoMedicamento.observaciones}
                  onChange={(e) => setNuevoMedicamento((prev) => ({ ...prev, observaciones: e.target.value }))}
                  className="w-full h-full py-3 px-2 box-border bg-white"
                  placeholder="Observaciones"
                />
              </td>
              <td className="border border-gray-300 flex justify-center">
                   <BotonAgregar funcionUno={handleAddRow} funcionDos={""} /> 
              </td>
            </tr>
          )}
          <tr>
            <td colSpan={horasDelDia.length + 3}>
              <div className="flex justify-end items-end m-2">
                <BotonActualizar type="submit" onClick={guardarMedicamentos} texto="Actualizar Datos" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      {/* Vista móvil o tablet */}
      <div className="lg:hidden grid grid-cols-1 gap-4">
  {medicamentos.map((medicamento, index) => (
     medicamento.medicamento &&(
    <div key={index} className="bg-white shadow-md p-4 rounded-lg">
      <div className="mb-4">
        <span className="font-bold">MEDICAMENTO:</span>
        {medicamento.editable ? (
          <select
            className="w-full p-3 bg-white border border-gray-300"
            value={medicamento.medicamento}
            onChange={(e) => manejarCambioSelect(e, index)}
          >
            <option value="">Seleccione</option>
            {stock.map((item, idx) => (
              <option key={idx} value={item.medicacion}>
                {item.medicacion}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-gray-500 uppercase"> {medicamento.medicamento}</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {horasDelDia.map((hora, idx) => (
          <div key={idx} className="flex flex-col">
            <label className="text-xs font-bold">{hora.toUpperCase()}</label>
            <input
              className={`p-3 box-border text-center text-gray-500 font-bold ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}
              type="number"
              value={medicamento.horario[hora] || ""}
              onChange={(event) => manejarCambio(index, hora, event)}
              disabled={!medicamento.editable}
            />
          </div>
        ))}
      </div>
      <div className="mt-2">
        <label className="text-xs font-bold">OBSERVACIONES</label>
        <input
            className={`w-full p-3 box-border text-gray-500 font-bold ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}
            type="text"
            value={medicamento.observaciones}
            onChange={(event) => manejarCambioObservaciones(index, event)}
            disabled={!medicamento.editable}
        />
      </div>

      <div className="flex justify-between mt-4">
        <BotonEditarMovil editable={medicamento.editable} onGuardar={() => handleEditRow(index)} onModificar={() => handleEditRow(index)} />
        <BotonEliminarMovil onClick={() => confirmDelete(index)} />
      </div>
    </div>)
  ))}

  {/* Fila para agregar nuevo medicamento */}
  <div className="bg-white shadow-md p-4 rounded-lg">
    <div className="mb-4">
      <span className="font-bold">MEDICAMENTO:</span>
      <select
        className="w-full p-3 bg-white border border-gray-300"
        value={nuevoMedicamento.medicamento}
        onChange={(e) => setNuevoMedicamento((prev) => ({ ...prev, medicamento: e.target.value }))}
      >
        <option value="">Seleccione</option>
        {stock.map((item, index) => (
          <option key={index} value={item.medicacion}>
            {item.medicacion}
          </option>
        ))}
      </select>
    </div>

    <div className="grid grid-cols-2 gap-2">
      {horasDelDia.map((hora, idx) => (
        <div key={idx} className="flex flex-col">
          <label className="text-xs font-bold">{hora.toUpperCase()}</label>
          <input
            className="p-3 box-border text-center bg-white border border-gray-300"
            type="number"
            name={hora}
            min={0}
            value={nuevoMedicamento.horario[hora]}
            onChange={manejarCambioNuevoMedicamento}
          />
        </div>
      ))}
    </div>

    <div className="mt-2">
      <label className="text-xs font-bold">OBSERVACIONES</label>
      <input
        className="w-full p-3 box-border bg-white border border-gray-300"
        type="text"
        name="observaciones"
        value={nuevoMedicamento.observaciones}
        onChange={(e) => setNuevoMedicamento((prev) => ({ ...prev, observaciones: e.target.value }))}
        placeholder="Observaciones"
      />
    </div>

    <div className="flex justify-center gap-2 mt-4">
      <BotonAgregar funcionUno={handleAddRow} funcionDos={""} /> 
    </div>
  </div>

  <BotonActualizar type="submit" onClick={guardarMedicamentos} texto="Actualizar Datos" />
  
  <CartelAviso
            abrirModal={mostrarModalAviso}
            cerrarModal={toggleModalAviso}
            mensaje={mensajeModalAviso}
            estado = {estadoModalAviso}
            onConfirm={accionConfimModalAviso}
        />
</div>

    </div>);
});

export default TablaMedicamentos;
