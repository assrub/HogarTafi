import React, {useEffect, useState} from "react";


const TablaMedicamentos = () => {

  const stock = [
    {
        Medicacion: "Paracetamol",
        Cantidad: 20,
        cantidadMinima: 5
    },
    {
        Medicacion: "Ibuprofeno",
        Cantidad: 15,
        cantidadMinima: 3
    },
    {
        Medicacion: "Amoxicilina",
        Cantidad: 10,
        cantidadMinima: 2
    },
    {
        Medicacion: "Loratadina",
        Cantidad: 25,
        cantidadMinima: 5
    },
    {
        Medicacion: "Omeprazol",
        Cantidad: 30,
        cantidadMinima: 10
    },
    {
        Medicacion: "Metformina",
        Cantidad: 40,
        cantidadMinima: 8
    }
];




  useEffect(() =>{
  console.log()
  },[])

  //datos de ejemplo
  const [medicamentos, setMedicamentos] = useState([
    // Medicamentos iniciales, puedes añadir más si deseas
    {
      medicamento: "Paracetamol",
      horario: {
        "6:00": "500",
        "desayuno": "500",
        "almuerzo": null,
        "merienda": null,
        "cena": "500",
        "22:30": null,
      },
      observaciones: "Tomar con agua",
    },
    {
      medicamento: "Paracetamol",
      horario: {
        "6:00": "500",
        "desayuno": "500",
        "almuerzo": null,
        "merienda": null,
        "cena": "500",
        "22:30": null,
      },
      observaciones: "Tomar con agua",
    },
  ]);


  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (name in nuevoMedicamento.horario) {
      setNuevoMedicamento({
        ...nuevoMedicamento,
        horario: {
          ...nuevoMedicamento.horario,
          [name]: value,
        },
      });
    } else {
      setNuevoMedicamento({
        ...nuevoMedicamento,
        [name]: value,
      });
    }
  };

  const agregarMedicamento = () => {
    setMedicamentos([...medicamentos, nuevoMedicamento]);
    // Limpiar los inputs
    setNuevoMedicamento({
      medicamento: "",
      horario: {
        "6:00": "",
        desayuno: "",
        almuerzo: "",
        merienda: "",
        cena: "",
        "22:30": "",
      },
      observaciones: "",
    });
  };

  const [nuevoMedicamento, setNuevoMedicamento] = useState({
    medicamento: "",
    horario: {
      "6:00": "",
      desayuno: "",
      almuerzo: "",
      merienda: "",
      cena: "",
      "22:30": "",
    },
    observaciones: "",
  });

  const horasDelDia = Object.keys(medicamentos[0].horario);

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full mb-10">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-[#181818]">Medicamento</th>
            {horasDelDia.map((hora, index) => (
              <th key={index} className="px-4 py-2 border border-[#181818]">
                {hora}
              </th>
            ))}
            <th className="px-4 py-2 border border-[#181818]">Observaciones</th>
          </tr>
        </thead>
        <tbody>
        {medicamentos.map((medicamento, index) => (
            <tr key={index}>
              <td className="px-4 py-4 border border-[#181818]">
                
                {medicamento.medicamento}</td>
              {horasDelDia.map((hora, idx) => (
                <td key={idx} className="px-4 py-2 border border-[#181818]">
                  {medicamento.horario[hora] !== undefined && medicamento.horario[hora] !== null ? medicamento.horario[hora] : '-'}
                 
   
                </td>
              ))}
              <td className="px-4 py-2 border border-[#181818]">{medicamento.observaciones}</td>
              <button className="flex text- text-gray-600 rounded-md border border-gray-600 p-2 mx-4 hover:bg-gray-600 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>

                    Modificar
                  </button>
            </tr>
          ))}


<tr>
            <td className="px-4 py-2 border border-[#181818]">
              <select className="p-4" name="medicamento" id="medicamento">
                {stock.map((remedio,i) =>(
                    <option value={remedio.Medicacion}>{remedio.Medicacion}</option>
                ))}
              </select>
            </td>
            {horasDelDia.map((hora, idx) => (
              <td key={idx} className="px-4 py-2 border border-[#181818]">
                <input
                  type={hora === "observaciones" ? "text" : "number"}
                  name={hora}
                  value={nuevoMedicamento.horario[hora]}
                  onChange={manejarCambio}
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
                onChange={manejarCambio}
                className="w-full p-2"
                placeholder="Observaciones"
              />
            </td>
            <td className="px-4 py-1 ">
            <button
                      className="text-green-600 border border-green-600 p-2 rounded-md flex hover:bg-green-600 hover:text-white"
                      onClick={() => handleAddRow(index)}
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
};

export default TablaMedicamentos;
