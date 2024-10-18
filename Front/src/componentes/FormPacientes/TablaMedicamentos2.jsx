import React, { useEffect, useState, forwardRef } from "react";
import { traerMedicamentosApi, traerStockApi, guardarMedicamentosApi} from "../../api";
import { useRef } from 'react';



const TablaMedicamentos = forwardRef(({ paciente, menuMedicaionpaciente = false, medicacionDiaria = false, onClickRestaMedicacionDiaria, onclicksumarMedicacionDiaria }) => {

// Función para capitalizar la primera letra de una cadena
function capitalizeFirstLetter(input) {
  if (!input) return input; // Retorna null o cadena vacía sin cambios
  input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  console.log("PROBANDO: " + input);
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
    
    const response = await guardarMedicamentosApi(arregloMedicacion, parseInt(paciente.dni)); // Asegúrate de que esto sea await

    console.log(await response);
    if (response === true) {
        setMensaje("Medicamentos guardados correctamente");
    } else {
        setMensaje("Error al guardar los medicamentos");
    }
}



  const [stock, setStock] = useState([
    {
      medicacion: "",
      cantidad: "",
      cantidadMinima: ""
    }
  ]);

  const horasDelDia = [
    "6:00",
    "Desayuno",
    "Almuerzo",
    "Merienda",
    "Cena",
    "22:30",
  ];
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

  const handleAddRow = () => {
    const datosFila = { ...nuevoMedicamento };
    if (datosFila.medicamento) {
      setMedicamentos((prev) => [...prev, datosFila]);

      setNuevoMedicamento({
        medicamento: "",
        horario: horasDelDia.reduce(
          (acc, hora) => ({ ...acc, [hora]: "" }),
          {}
        ),
        observaciones: "",
      });
    } else {
      alert("Elegi un medicamento");
    }
  };

  const manejarCambioSelect = (e) => {
    const { name, value } = e.target;
    setNuevoMedicamento((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleEditRow = (index) => {
    const newMedicamentos = [...medicamentos];
    newMedicamentos[index].editable = !newMedicamentos[index].editable;
    setMedicamentos(newMedicamentos);
  };

  const handleClearContent = () => {
    setMedicamentos([{
      medicamento: "",
      horario: horasDelDia.reduce((acc, hora) => ({ ...acc, [hora]: "" }), {}),
      observaciones: "",
      editable: false,
    }]);
  };

  const handleRemoveRow = (index) => {
    if (medicamentos.length > 1) {
      const newMedicamentos = [...medicamentos];
      newMedicamentos.splice(index, 1);
      setMedicamentos(newMedicamentos);
    } else {
      handleClearContent(index);
    }
  };

  const manejarCambio = (index, hora, event) => {
    const { value } = event.target;
    const newMedicamentos = [...medicamentos];
    newMedicamentos[index].horario[hora] = value; // Actualiza el valor del horario
    setMedicamentos(newMedicamentos);
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

  useEffect(() => {
    
    traerStock(paciente.dni);
    traerMedicamentos(paciente.dni);
  }, [paciente])

  return (<div className="border rounded-lg p-2 shadow-md overflow-x-auto">
    <table className="hidden lg:table min-w-full table-auto text-xs sm:text-xs bg-white" ref={refTabla}>
      <thead>
        <tr className="bg-gray-400 text-white">
          <th className="p-2 border border-gray-300 text-white">MEDICAMENTO</th>
          {horasDelDia.map((hora, index) => (
            <th key={index} className="p-2 border border-gray-300 text-white">{hora.toUpperCase()}</th>
          ))}
          <th className="p-2 border border-gray-300 text-white">OBSERVACIONES</th>
          <th className="p-2 border border-gray-300 text-white">ACCIONES</th>
        </tr>
      </thead>
  
      <tbody>
        {medicamentos.map((medicamento, index) => (
          medicamento.medicamento && (
            <tr key={index}>
              <td className="border border-gray-300 p-0 h-full align-middle pl-3 text-gray-500 font-bold">
                {medicamento.medicamento}
              </td>
              {horasDelDia.map((hora, idx) => (
                <td key={idx} className="border border-gray-300 p-0 h-full align-middle">
                  <input
                    className={`w-full h-full p-2 box-border text-center text-gray-500 font-bold ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}
                    type="number"
                    value={medicamento.horario[hora] || ""}
                    onChange={(event) => manejarCambio(index, hora, event)}
                    disabled={!medicamento.editable}
                  />
                </td>
              ))}
              <td className="border border-gray-300 p-0 h-full align-middle">
                <input
                  className={`w-full h-full p-2 box-border text-gray-500 font-bold ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}
                  type="text"
                  value={medicamento.observaciones}
                  disabled={!medicamento.editable}
                />
              </td>
              <td className="border border-gray-300 p-0 h-full align-middle bg-gray-200">
              <div className="flex justify-between">
                <button
                  className={`ml-2 px-3 py-1 text-black border border-gray-400 shadow-md  hover:bg-gray-400 hover:text-white transition duration-300 text-xs md:text-sm`}
                  onClick={() => handleEditRow(index)}
                >
                    {medicamento.editable ? "Guardar" : "Modificar"}
                </button>

                  {!medicacionDiaria && (
                <button
                  className={`ml-1 mr-3 px-3 py-1 text-black border border-gray-400 shadow-md hover:bg-gray-400 hover:text-white transition duration-300 text-xs md:text-sm`}
                  onClick={() => handleRemoveRow(index)}
                >
                  Eliminar            
                </button>
                 )}
              </div>
              </td>
            </tr>
          )
        ))}
  
        {!menuMedicaionpaciente && (
          <tr>
            <td className="border border-gray-300 p-0 h-full align-middle">
              <select className="w-full h-full p-2 bg-white rounded-none" name="medicamento" value={nuevoMedicamento.medicamento} onChange={manejarCambioSelect}>
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
                  className={`w-full h-full p-2 box-border bg-white text-center`}
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
                className="w-full h-full p-2 box-border bg-white"
                placeholder="Observaciones"
              />
            </td>
            <td className="border border-gray-300 p-0 h-full align-middle">
              <button className="text-white border bg-gray-400 w-full p-2 hover:bg-gray-300 hover:text-white text-xs md:text-sm" 
                onClick={() => {handleAddRow(); guardarMedicamentos(); }}>
                AGREGAR
              </button>
            </td>
          </tr>
        )}
        <tr>
          <td colSpan={horasDelDia.length + 3}>
            <div className="flex justify-end items-end m-2">
              <button 
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                onClick={guardarMedicamentos}
              >
                Guardar Medicamentos
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  
    {/* Vista móvil o tablet */}
    <div className="lg:hidden grid grid-cols-1 gap-4">
      {medicamentos.map((medicamento, index) => (
        <div key={index} className="bg-white shadow-md p-4 rounded-lg">
          <div className="mb-4">
              <span className="font-bold">MEDICAMENTO:</span>
              <span className="text-gray-500 uppercase"> {medicamento.medicamento}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {horasDelDia.map((hora, idx) => (
              <div key={idx} className="flex flex-col">
                <label className="text-xs font-bold">{hora.toUpperCase()}</label>
                <input
                  className={`p-2 box-border text-center text-gray-500 font-bold ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}
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
              className={`w-full p-2 box-border text-gray-500 font-bold ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}
              type="text"
              value={medicamento.observaciones}
              disabled={!medicamento.editable}
            />
          </div>
          <div className="flex justify-between mt-4">
          <button
    className={`w-full m-1 px-4 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-xs md:text-sm`}
    onClick={() => handleEditRow(index)}
  >
    {medicamento.editable ? "Guardar" : "Modificar"}
  </button>
  
  {!medicacionDiaria && (
    <button
      className={`w-full m-1 px-4 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 text-xs md:text-sm`}
      onClick={() => handleRemoveRow(index)}
    >
      Eliminar
    </button>
  )}
          </div>
        </div>
      ))}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={guardarMedicamentos}> Guardar Medicamentos</button>
    </div>
  </div> );
});

export default TablaMedicamentos;
