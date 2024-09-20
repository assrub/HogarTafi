import React, { useEffect, useState, forwardRef } from "react";

const TablaMedicamentos = forwardRef(({}, ref) => {
  const stock = [
    {
      Medicacion: "Paracetamol",
      Cantidad: 20,
      cantidadMinima: 5,
    },
    {
      Medicacion: "Ibuprofeno",
      Cantidad: 15,
      cantidadMinima: 3,
    },
    {
      Medicacion: "Amoxicilina",
      Cantidad: 10,
      cantidadMinima: 2,
    },
    {
      Medicacion: "Loratadina",
      Cantidad: 25,
      cantidadMinima: 5,
    },
    {
      Medicacion: "Omeprazol",
      Cantidad: 30,
      cantidadMinima: 10,
    },
    {
      Medicacion: "Metformina",
      Cantidad: 40,
      cantidadMinima: 8,
    },
  ];
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

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full table-auto mb-10">
        <thead>
          <tr>
            <th className="px-2 py-1 border border-[#181818] text-sm md:text-base">
              Medicamento
            </th>
            {horasDelDia.map((hora, index) => (
              <th
                key={index}
                className="px-2 py-1 border border-[#181818] text-sm md:text-base"
              >
                {hora}
              </th>
            ))}
            <th className="px-2 py-1 border border-[#181818] text-sm md:text-base">
              Observaciones
            </th>
            <th className="px-2 py-1 border border-[#181818] text-sm md:text-base">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map(
            (medicamento, index) =>
              medicamento.medicamento && (
                <tr key={index} className="text-sm md:text-base">
                  <td className="px-2 py-1 border border-[#181818] break-words truncate">
                    {medicamento.medicamento}
                  </td>
                  {horasDelDia.map((hora, idx) => (
                    <td
                      key={idx}
                      className="px-2 py-1 border border-[#181818] break-words"
                    >
                      <input
                        className={`rounded-lg  md:w-auto ${
                          medicamento.editable ? "bg-white" : "bg-neutral-300"
                        } border`}
                        type="number"
                        value={medicamento.horario[hora] || ""}
                        onChange={(event) => manejarCambio(index, hora, event)}
                        disabled={!medicamento.editable}
                      />
                    </td>
                  ))}
                  <td className="px-2 py-1 border border-[#181818] break-all">
                    <input
                      className={`rounded-lg w-full ${
                        medicamento.editable ? "bg-white" : "bg-neutral-300"
                      } border`}
                      type="text"
                      value={medicamento.observaciones}
                      disabled={!medicamento.editable}
                    />
                  </td>
                  <td className="px-2 py-1 border border-[#181818] text-center">
                    <button
                      className="m-2 flex text-gray-600 rounded-md border border-gray-600 p-2 mx-4 hover:bg-gray-600 hover:text-white text-xs md:text-sm"
                      onClick={() => handleEditRow(index)}
                    >
                      <svg
                        data-slot="icon"
                        fill="none"
                        stroke-width="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                         className="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        ></path>
                      </svg>
                      {medicamento.editable ? "Guardar" : "Modificar"}
                    </button>
                    <button
                      className="m-2 flex text-red-600 rounded-md border border-red-600 p-2 mx-4 hover:bg-red-600 hover:text-white text-xs md:text-sm"
                      onClick={() => handleRemoveRow(index)}
                    >
                      <svg
                        data-slot="icon"
                        fill="none"
                        stroke-width="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        ></path>
                      </svg>
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
          )}
          <tr>
            <td className="px-2 py-1 border border-[#181818]">
              <select
                className="p-2 w-full md:w-auto"
                name="medicamento"
                value={nuevoMedicamento.medicamento}
                onChange={manejarCambioSelect}
              >
                <option value="">Seleccione</option>
                {stock.map((remedio, i) => (
                  <option key={i} value={remedio.Medicacion}>
                    {remedio.Medicacion}
                  </option>
                ))}
              </select>
            </td>
            {horasDelDia.map((hora, idx) => (
              <td key={idx} className="px-2 py-1 border border-[#181818]">
                <input
                  type="number"
                  name={hora}
                  value={nuevoMedicamento.horario[hora]}
                  onChange={manejarCambioNuevoMedicamento}
                  className={`rounded-lg  md:w-auto  border`}
                  placeholder={hora}
                />
              </td>
            ))}
            <td className="px-2 py-1 border border-[#181818]">
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
                className="w-full p-2"
                placeholder="Observaciones"
              />
            </td>
            <td className="px-2 py-1 border border-[#181818]">
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
        </tbody>
      </table>
    </div>
  );
});

export default TablaMedicamentos;
