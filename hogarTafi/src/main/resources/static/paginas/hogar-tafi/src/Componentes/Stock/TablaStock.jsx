import React, { useState } from "react";


const TablaStock = () => {
  const [rows, setRows] = useState([{ medicacion: '', cantidad: '',cantidadMinima: '', added: false }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const handleAddRow = (index) => {
    const newRows = [...rows];
    newRows[index].added = true;
    setRows([...newRows, { medicacion: '', cantidad: '',cantidadMinima: '', added: false }]);
  };

  const handleRemoveRow = (index) => {
    if (rows.length > 1) {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    } else {
      handleClearContent(index);
    }
  };

  const handleClearContent = (index) => {
    const newRows = [...rows];
    newRows[index] = { medicacion: '', cantidad: '',cantidadMinima: '', added: false };
    setRows(newRows);
  };

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full bg-neutral-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-[#181818]">Droga/Medicacion</th>
            <th className="px-4 py-2 border border-[#181818]">Cantidad</th>
            <th className="px-4 py-2 border border-[#181818]">Cantidad minima</th>
            <th className="px-4 py-2 border border-[#181818]">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border border-[#181818] ">
                <div className="flex place-content-center">
                <input
                  className={`rounded-lg ${row.added ? 'bg-neutral-300':'bg-white'}`}
                  type="text"
                  name="medicacion"
                  value={row.medicacion}
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={row.added}
                />
                </div>
              </td>
              <td className="px-4 py-2 border border-[#181818] ">
                <div className="flex place-content-center">
                <input
                  className={`rounded-lg ${row.added ? 'bg-neutral-300':'bg-white'}`}
                  type="number"
                  name="cantidad"
                  value={row.cantidad}
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={row.added}
                />
                </div>
              </td>

              <td className="px-4 py-2 border border-[#181818] ">
                <div className="flex place-content-center">
                <input
                  className={`rounded-lg ${row.added ? 'bg-neutral-300':'bg-white'}`}
                  type="number"
                  name="cantidadMinima"
                  value={row.cantidadMinima}
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={row.added}
                />
                </div>
              </td>

              <td className="px-4 py-2 border border-[#181818]">
                <div className="gap-10 flex place-content-center">
                  {!row.added && (
                    <button
                      className="text-green-600 flex"
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
                  )}

                  {row.added &&(
                  <button
                    className="text-red-600 flex"
                    onClick={() => handleRemoveRow(index)}
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
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                    Eliminar
                  </button>)}

                  <button className="flex text- text-gray-600">
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
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    Agregar receta.
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaStock;