import React, { useEffect, useState, forwardRef } from "react";
import { traerMedicamentosApi, traerStockApi } from "../../api";
import CartelAviso from "./../Modal/CartelAviso";

const TablaMedicamentos = forwardRef(
  (
    {
      dni,
      menuMedicaionpaciente = false,
      medicacionDiaria = false,
      onClickRestaMedicacionDiaria,
      onclicksumarMedicacionDiaria,
    },
    ref
  ) => {

    const [mensajeModalAviso, setMensajeModalAviso] = useState("");
    const [mostrarModalAviso, setMostrarModalAviso] = useState(false);
    const [estadoModalAviso, setEstadoModalAviso] = useState(1);
    const [accionConfimModalAviso, setAccionConfimModalAviso] = useState(null);
    const toggleModalAviso = () => setMostrarModalAviso(!mostrarModalAviso);

    const [stock, setStock] = useState([
      {
        medicacion: "",
        cantidad: "",
        cantidadMinima: "",
      },
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
        horario: horasDelDia.reduce(
          (acc, hora) => ({ ...acc, [hora]: "" }),
          {}
        ),
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
      setMedicamentos([
        {
          medicamento: "",
          horario: horasDelDia.reduce(
            (acc, hora) => ({ ...acc, [hora]: "" }),
            {}
          ),
          observaciones: "",
          editable: false,
        },
      ]);
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
              horario: horasDelDia.reduce(
                (acc, hora) => ({ ...acc, [hora]: "" }),
                {}
              ),
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
          console.error(
            `Error: respuesta inesperada con código ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error al traer los medicamentos:", error);
      }
    }

    function transformarMedicamentos(medicamentosBackend) {
      return medicamentosBackend.map((medicamento) => ({
        medicamento: medicamento.medicamento,
        horario: {
          "6:00": medicamento.horario_1,
          Desayuno: medicamento.desayuno,
          Almuerzo: medicamento.almuerzo,
          Merienda: medicamento.merienda,
          Cena: medicamento.cena,
          "22:30": medicamento.horario_2,
        },
        observaciones: medicamento.observaciones || "",
        editable: false,
      }));
    }

    async function traerStock(dni) {
      try {
        const response = await traerStockApi(dni);
        if (response.status == 404) {
          setStock([
            {
              medicacion: "",
              cantidad: "",
              cantidadMinima: "",
            },
          ]);
          return; // Salimos de la función porque ya manejamos el 404
        }

        if (response.status == 200) {
          const data = await response.json();
          setStock(transformarStock(data.medicamentos));
        } else {
          console.error(
            `Error: respuesta inesperada con código ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error al traer el stock:", error);
      }
    }

    function transformarStock(stockBackend) {
      return stockBackend.map((stock) => ({
        medicacion: stock.medicacion,
        cantidad: stock.cantidad,
        cantidadMinima: stock.cant_minima,
        added: true,
      }));
    }

    useEffect(() => {
      traerStock(dni);
      traerMedicamentos(dni);
    }, [dni]);

    // Función para mostrar el modal de restar medicamento
    const handleRestaMedicacion = (medicamento) => {
      setMensajeModalAviso(`¿Estás seguro que deseas restar ${medicamento}?`);
      setEstadoModalAviso(11);
      setAccionConfimModalAviso(() => () => {
        onClickRestaMedicacionDiaria(medicamento);
        setMostrarModalAviso(false);
      });
      toggleModalAviso();
    };

    // Función para mostrar el modal de sumar medicamento
    const handleSumaMedicacion = (medicamento) => {
      setMensajeModalAviso(`¿Estás seguro que deseas sumar ${medicamento}?`);
      setEstadoModalAviso(11);
      setAccionConfimModalAviso(() => () => {
        onclicksumarMedicacionDiaria(medicamento);
        setMostrarModalAviso(false);
      });
      toggleModalAviso();
    };

    return (
      <div className="">
        <table
          className=" hidden lg:table min-w-full table-auto text-xs sm:text-xs bg-white"
          ref={ref}
        >
          <thead>
            <tr className="bg-gray-400 text-white">
              <th className="p-3 border border-gray-300 text-white">
                Medicamento
              </th>
              {horasDelDia.map((hora, index) => (
                <th
                  key={index}
                  className="p-3 border border-gray-300 text-white"
                >
                  {hora}
                </th>
              ))}
              <th className="p-3 border border-gray-300 text-white">
                Observaciones
              </th>
              <th className="p-3 border border-gray-300 text-white">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map(
              (medicamento, index) =>
                medicamento.medicamento && (
                  <tr key={index}>
                    <td className="border border-gray-300 p-0 h-full text-center align-middle">
                      {medicamento.medicamento}
                    </td>
                    {horasDelDia.map((hora, idx) => (
                      <td
                        key={idx}
                        className="border border-gray-300 p-0 h-full text-center align-middle"
                      >
                        <input
                          className={`w-full h-full p-3 box-border text-center text-gray-500 font-bold ${
                            !medicamento.editable ? "bg-gray-200" : "bg-white"
                          }`}
                          type="number"
                          value={medicamento.horario[hora] || ""}
                          onChange={(event) =>
                            manejarCambio(index, hora, event)
                          }
                          disabled={!medicamento.editable}
                        />
                      </td>
                    ))}
                    <td className="border border-gray-300 p-0 h-full text-center align-middle">
                      <input
                        className={`w-full h-full p-3 box-border text-gray-500 font-bold ${
                          !medicamento.editable ? "bg-gray-200" : "bg-white"
                        }`}
                        type="text"
                        value={medicamento.observaciones}
                        onChange={(event) =>
                          manejarCambioObservaciones(index, event)
                        }
                        disabled={!medicamento.editable}
                      />
                    </td>
                    <td className="w-full flex border border-gray-300 p-0 h-full text-center align-middle">
                      {medicacionDiaria && (
                        <>
                          <button
                            className="min-w-[50px] bg-gray-200 border-r border-gray-300 w-full h-full py-3 text-center text-gray-500 font-bold hover:bg-red-500 hover:text-white"
                            onClick={() => handleRestaMedicacion(medicamento.medicamento)}
                          >
                            -
                          </button>
                          <button
                            className="min-w-[50px] bg-gray-200 w-full h-full py-3 text-center text-gray-500 font-bold hover:bg-green-500 hover:text-white"
                            onClick={() => handleSumaMedicacion(medicamento.medicamento)}
                          >
                            +
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                )
            )}

            {!menuMedicaionpaciente && (
              <tr>
                <td className="px-2 py-1 border border-[#181818]">
                  <select
                    className="lg:p-2 w-full md:w-auto"
                    name="medicamento"
                    value={nuevoMedicamento.medicamento}
                    onChange={manejarCambioSelect}
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
                  <td
                    key={idx}
                    className="lg:px-2 lg:py-1 border border-[#181818]"
                  >
                    <input
                      type="number"
                      name={hora}
                      min={0}
                      value={nuevoMedicamento.horario[hora]}
                      onChange={manejarCambioNuevoMedicamento}
                      className={`rounded-lg sm:w-12 xl:w-20  border`}
                      placeholder={hora}
                    />
                  </td>
                ))}
                <td className="lg:px-2 lg:py-1 border border-[#181818]">
                  <input
                    type="text"
                    name="observaciones"
                    value={nuevoMedicamento.observaciones}
                    onChange={(e) =>
                      setNuevoMedicamento((prev) => ({
                        ...prev,
                        observaciones: e.target.value,
                      }))
                    }
                    className="md:w-full p-2"
                    placeholder="Observaciones"
                  />
                </td>
                <td className="lg:px-2 lg:py-1 border border-[#181818]">
                  <button
                    className="text-green-600 border border-green-600 m-2 p-2 rounded-md flex hover:bg-green-600 hover:text-white text-xs md:text-sm"
                    onClick={handleAddRow}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Agregar
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Vista móvil o tablet */}
        <div className="lg:hidden grid grid-cols-1 gap-4">
          {medicamentos.map(
            (medicamento, index) =>
              medicamento.medicamento && (
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
                      <span className="text-gray-500 uppercase">
                        {" "}
                        {medicamento.medicamento}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {horasDelDia.map((hora, idx) => (
                      <div key={idx} className="flex flex-col">
                        <label className="text-xs font-bold">
                          {hora.toUpperCase()}
                        </label>
                        <input
                          className={`p-3 box-border text-center text-gray-500 font-bold ${
                            !medicamento.editable ? "bg-gray-200" : "bg-white"
                          }`}
                          type="number"
                          value={medicamento.horario[hora] || ""}
                          onChange={(event) =>
                            manejarCambio(index, hora, event)
                          }
                          disabled={!medicamento.editable}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    <label className="text-xs font-bold">OBSERVACIONES</label>
                    <input
                      className={`w-full p-3 box-border text-gray-500 font-bold ${
                        !medicamento.editable ? "bg-gray-200" : "bg-white"
                      }`}
                      type="text"
                      value={medicamento.observaciones}
                      onChange={(event) =>
                        manejarCambioObservaciones(index, event)
                      }
                      disabled={!medicamento.editable}
                    />
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      className="min-w-[50px] bg-gray-200 border-r border-gray-300 w-full h-full py-3 text-center text-gray-500 font-bold hover:bg-red-500 hover:text-white"
                      onClick={() => handleRestaMedicacion(medicamento.medicamento)}
                    >
                      -
                    </button>
                    <button
                      className="min-w-[50px] bg-gray-200 w-full h-full py-3 text-center text-gray-500 font-bold hover:bg-green-500 hover:text-white"
                      onClick={() => handleSumaMedicacion(medicamento.medicamento)}
                    >
                      +
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
        <CartelAviso
          abrirModal={mostrarModalAviso}
          cerrarModal={toggleModalAviso}
          mensaje={mensajeModalAviso}
          estado={estadoModalAviso}
          onConfirm={accionConfimModalAviso}
        />
        
      </div>
    );
  }
);

export default TablaMedicamentos;
