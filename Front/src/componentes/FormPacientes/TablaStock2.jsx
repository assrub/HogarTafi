import React, { useEffect, useState } from "react";
import { traerStockApi, guardarStockApi} from "../../api";

const TablaStock = ({ paciente }) => {
  const [rows, setRows] = useState([{ medicacion: '', cantidad: '', cantidadMinima: '', added: false, isEditing: true }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [currentAction, setCurrentAction] = useState(null); // 'add' o 'delete'
  const [rowToDelete, setRowToDelete] = useState(null); // Índice de la fila a eliminar

  function convertirTablaAJson() {
    return rows.map(row => ({
      medicacion: row.medicacion !== "" ? row.medicacion : null,
      cantidad: row.cantidad !== "" ? row.cantidad : null,
      cant_minima: row.cantidadMinima !== "" ? row.cantidadMinima : null,
    })).filter(row => row.medicacion !== null); // Filtrar filas con medicación válida
  }

  async function guardarStock() {
    const arregloStock = convertirTablaAJson();
    const response = await guardarStockApi(arregloStock, parseInt(paciente.dni));

    if (response === true) {
      setModalMessage("Medicamentos guardados correctamente");
    } else {
      setModalMessage("Error al guardar los medicamentos");
    }
    toggleModal();
  }

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;

    setRows(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        [name]: value,
      };
      return updatedRows;
    });
  };

  const handleAddRow = (index) => {
    const currentRow = rows[index];
    if (currentRow.medicacion && currentRow.cantidad && currentRow.cantidadMinima) {
      setRows(prevRows => [
        ...prevRows,
        { medicacion: '', cantidad: '', cantidadMinima: '', added: false, isEditing: true },
      ]);
    } else {
      setModalMessage('Por favor, completa todos los campos antes de agregar una nueva fila.');
      setCurrentAction('add');
      setIsModalOpen(true);
    }
  };

  const handleRemoveRow = (index) => {
    setRowToDelete(index);
    setModalMessage('¿Estás seguro de que deseas eliminar esta fila?');
    setCurrentAction('delete');
    setIsModalOpen(true);
  };

  const confirmDeleteRow = () => {
    setRows(prevRows => {
      const newRows = prevRows.filter((_, i) => i !== rowToDelete);
      if (newRows.length === 0) {
        newRows.push({ medicacion: '', cantidad: '', cantidadMinima: '', added: false, isEditing: true });
      }
      return newRows;
    });
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRowToDelete(null);
  };

  const handleEditRow = (index) => {
    setRows(prevRows =>
      prevRows.map((row, i) => i === index ? { ...row, isEditing: true } : row)
    );
  };

  const handleSaveEdit = (index) => {
    setRows(prevRows =>
      prevRows.map((row, i) => i === index ? { ...row, isEditing: false, added: true } : row)
    );
  };

  async function traerStock(dni) {
    try {
      const response = await traerStockApi(dni);

      if (response.status === 404) {
        setRows([{ medicacion: "", cantidad: "", cantidadMinima: "", added: false, isEditing: true }]);
        return;
      }

      if (response.status === 200) {
        const data = await response.json();
        const stockCargado = transformarStock(data.medicamentos);

        setRows([...stockCargado, { medicacion: "", cantidad: "", cantidadMinima: "", added: false, isEditing: true }]);
      } else {
        console.error(`Error: respuesta inesperada con código ${response.status}`);
      }

    } catch (error) {
      console.error("Error al traer el stock:", error);
    }
  }

  useEffect(() => {
    traerStock(paciente.dni);
  }, [paciente]);

  function transformarStock(stockBackend) {
    return stockBackend.map(stock => ({
      medicacion: stock.medicacion,
      cantidad: stock.cantidad,
      cantidadMinima: stock.cant_minima,
      added: true,
      isEditing: false
    }));
  }

  return (
    <>
      <div className="max-w-[400px] mx-auto bg-transparent rounded-lg">
        <table className="lg:table min-w-full table-auto text-xs sm:text-xs bg-white">
          <thead>
            <tr className="bg-gray-400 text-white">
              <th className="px-4 py-2 border border-gray-300">MEDICACION</th>
              <th className="px-4 py-2 border border-gray-300">CANTIDAD</th>
              <th className="px-4 py-2 border border-gray-300">CANTIDAD MINIMA</th>
              <th className="px-4 py-2 border border-gray-300">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className={`border border-gray-300 ${row.isEditing ? 'bg-white' : 'bg-gray-200'} ${row.added ? 'bg-gray-200' : ''}`}>
                <td className="border border-gray-300">
                  <input
                    className={`w-full py-3 text-center ${row.isEditing ? 'bg-white' : 'bg-gray-200'} border-none rounded-none`}
                    type="text"
                    name="medicacion"
                    value={row.medicacion}
                    onChange={(event) => handleInputChange(index, event)}
                    disabled={!row.isEditing}
                  />
                </td>
                <td className="border border-gray-300">
                  <input
                    className={`w-full py-3 text-center ${row.isEditing ? 'bg-white' : 'bg-gray-200'} border-none rounded-none`}
                    type="number"
                    name="cantidad"
                    value={row.cantidad}
                    onChange={(event) => handleInputChange(index, event)}
                    disabled={!row.isEditing}
                  />
                </td>
                <td className="border border-gray-300">
                  <input
                    className={`w-full py-3 text-center ${row.isEditing ? 'bg-white' : 'bg-gray-200'} border-none rounded-none`}
                    type="number"
                    name="cantidadMinima"
                    value={row.cantidadMinima}
                    onChange={(event) => handleInputChange(index, event)}
                    disabled={!row.isEditing}
                  />
                </td>
                <td className="border border-gray-300">
                  <div className="flex justify-center gap-2">
                    {index === rows.length - 1 && !row.added ? (
                      <button className="text-white py-1 border bg-gray-400 w-full hover:bg-gray-300 hover:text-white text-xs md:text-sm" onClick={() => handleAddRow(index)}>Agregar</button>
                    ) : row.isEditing ? (<>
                      <button className="ml-2 px-3 py-1 text-black border border-gray-400 shadow-md  hover:bg-gray-400 hover:text-white transition duration-300 text-xs md:text-sm" onClick={() => handleSaveEdit(index)}>Guardar</button>
                      <button className="ml-2 px-3 py-1 text-black border border-gray-400 shadow-md  hover:bg-gray-400 hover:text-white transition duration-300 text-xs md:text-sm" onClick={() => handleRemoveRow(index)}>Eliminar</button></>
                    ) : (
                      <>
                        <button className="ml-2 px-3 py-1 text-black border border-gray-400 shadow-md  hover:bg-gray-400 hover:text-white transition duration-300 text-xs md:text-sm" onClick={() => handleEditRow(index)}>Modificar</button>
                        <button className="ml-2 px-3 py-1 text-black border border-gray-400 shadow-md  hover:bg-gray-400 hover:text-white transition duration-300 text-xs md:text-sm" onClick={() => handleRemoveRow(index)}>Eliminar</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-2 p-0"> {/* Alineación a la derecha */}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded "
            onClick={guardarStock}>
            Guardar stock
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{currentAction === 'delete' ? 'Confirmar eliminación' : 'Atención'}</h2>
            <p>{modalMessage}</p>
            <div className="flex justify-end mt-4">
              <button className="bg-gray-300 text-black px-4 py-2 rounded mr-2" onClick={closeModal}>Cancelar</button>
              {currentAction === 'delete' ? (
                <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={confirmDeleteRow}>Confirmar</button>
              ) : (
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={closeModal}>Cerrar</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TablaStock;
