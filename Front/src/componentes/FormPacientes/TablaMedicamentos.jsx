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
      <table className="min-w-full mb-10" ref={ref}>
        <thead>
          <tr>
            <th className="px-4 py-2 border border-[#181818]">Medicamento</th>
            {horasDelDia.map((hora, index) => (
              <th key={index} className="px-4 py-2 border border-[#181818]">
                {hora}
              </th>
            ))}
            <th className="px-4 py-2 border border-[#181818]">Observaciones</th>
            <th className="px-4 py-2 border border-[#181818]">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map(
            (medicamento, index) =>
              medicamento.medicamento && (
                <tr key={index}>
                  <td className="px-4 py-4 border border-[#181818]">
                    {medicamento.medicamento}
                  </td>
                  {horasDelDia.map((hora, idx) => (
                    <td key={idx} className="px-4 py-2 border border-[#181818]">
                      {medicamento.horario[hora] !== undefined &&
                      medicamento.horario[hora] !== null ? (
                        <input
                          className={`rounded-lg ${
                            medicamento.editable ? "bg-white" : "bg-neutral-300"
                          } border`}
                          type="number"
                          value={medicamento.horario[hora]}
                          onChange={(event) =>
                            manejarCambio(index, hora, event)
                          } 
                          disabled={!medicamento.editable}
                        />
                      ) : (
                        <input
                          className={`rounded-lg ${
                            medicamento.editable ? "bg-white" : "bg-neutral-300"
                          } border`}
                          type="number"
                          value={""}
                          onChange={(event) =>
                            manejarCambio(index, hora, event)
                          } 
                          disabled={!medicamento.editable}
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2 border border-[#181818]">
                  <input
                          className={`rounded-lg ${
                            medicamento.editable ? "bg-white" : "bg-neutral-300"
                          } border`}
                          type="text"
                          value={medicamento.observaciones}
                         
                          disabled={!medicamento.editable}
                        />
                    
                  </td>
                  <td className="px-4 py-2 border border-[#181818]">
                    <button
                      className="flex m-2 text-gray-600 rounded-md border border-gray-600 p-2 mx-4 hover:bg-gray-600 hover:text-white"
                      onClick={() => handleEditRow(index)} 
                    >
                      {medicamento.editable ? "Guardar" : "Modificar"}
                    </button>
                    <button
                      className="flex m-2 text-red-600 rounded-md border border-red-600 p-2 mx-4 hover:bg-red-600 hover:text-white"     
                    onClick={() => handleRemoveRow(index)}
                    >
                     Eliminar
                    </button>
                  </td>
                  
                </tr>
              )
          )}
          <tr>
            <td className="px-4 py-2 border border-[#181818]">
              <select
                className="p-4"
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
              <td key={idx} className="px-4 py-2 border border-[#181818]">
                <input
                  type="number"
                  name={hora}
                  value={nuevoMedicamento.horario[hora]}
                  onChange={manejarCambioNuevoMedicamento}
                  className="w-full p-2"
                  placeholder={hora}
                />
              </td>
            ))}
            <td className="px-4 py-2 border border-[#181818]">
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
            <td className="px-4 py-1 border border-[#181818]">
              <button
                className="text-green-600 border border-green-600 p-2 rounded-md flex hover:bg-green-600 hover:text-white"
                onClick={handleAddRow}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
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
