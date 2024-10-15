import React, { useEffect, useState, forwardRef } from "react";
import { traerStockApi } from "../../api";

const TablaStock = forwardRef(({ dni, stockHogar = false }, ref) => {
  const [rows, setRows] = useState([{ medicacion: '', cantidad: '', cantidadMinima: '', added: false, isEditing: true }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [currentAction, setCurrentAction] = useState(null); // 'add' o 'delete'
  const [rowToDelete, setRowToDelete] = useState(null); // Índice de la fila a eliminar

  const handleInputChange = (index, event) => {
    const { target } = event;

    if (target && target.name) {
      const { name, value } = target;

      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[index] = {
          ...updatedRows[index],
          [name]: value,
        };
        return updatedRows;
      });
    } else {
      console.error("El target o name no existen.");
    }
  };

  const handleAddRow = (index) => {
    const currentRow = rows[index];
    // Verifica si todos los campos de la fila actual están completos
    if (currentRow.medicacion && currentRow.cantidad && currentRow.cantidadMinima) {
      setRows((prevRows) => [
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
    setRows((prevRows) => {
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
      prevRows.map((row, i) => 
        i === index ? { ...row, isEditing: true } : row
      )
    );
  };

  const handleSaveEdit = (index) => {
    setRows(prevRows => 
      prevRows.map((row, i) => 
        i === index ? { ...row, isEditing: false, added: true } : row
      )
    );
  };

  async function traerStock(dni) {
    try {
      const response = await traerStockApi(dni);
      if (response) {
        const transformedRows = transformarStock(response.medicamentos);
        setRows([...transformedRows, { medicacion: "", cantidad: "", cantidadMinima: "", added: false, isEditing: true }]);
      } else {
        setRows([{ medicacion: "", cantidad: "", cantidadMinima: "", added: false, isEditing: true }]);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    traerStock(dni);
  }, [dni]);

  function transformarStock(stockBackend) {
    return stockBackend.map(stock => ({
      medicacion: stock.medicacion,
      cantidad: stock.cantidad,
      cantidadMinima: stock.cant_minima,
      added: true,
      isEditing: false
    }));
  }

  const handleClearContent = (index) => {
    const newRows = [...rows];
    newRows[index] = { medicacion: '', cantidad: '', cantidadMinima: '', added: false, isEditing: true };
    setRows(newRows);
  };

  return (
    <>
      <div className="max-w-[400px] mx-auto p-2 bg-transparent rounded-lg">
        <table className="table-auto w-full" ref={ref}>
          <thead>
            <tr>
              <th className="px-4 py-2 border border-[#181818]">Medicacion</th>
              <th className="px-4 py-2 border border-[#181818]">Cantidad</th>
              <th className="px-4 py-2 border border-[#181818]">Cantidad minima</th>
              <th className="px-4 py-2 border border-[#181818]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className={`border border-[#181818] ${row.isEditing ? 'bg-white' : 'bg-gray-300'} ${row.added ? 'bg-gray-200' : ''}`}>
                <td className="border border-[#181818]">
                  <input
                    className={`w-full h-full text-center ${row.isEditing ? 'bg-white' : 'bg-gray-300'} border-none rounded-none`}
                    type="text"
                    name="medicacion"
                    value={row.medicacion}
                    onChange={(event) => handleInputChange(index, event)}
                    disabled={!row.isEditing}
                    style={{ boxSizing: 'border-box', margin: '0', padding: '0' }} 
                  />
                </td>
                <td className="border border-[#181818]">
                  <input
                    className={`w-full h-full text-center ${row.isEditing ? 'bg-white' : 'bg-gray-300'} border-none rounded-none`}
                    type="number"
                    name="cantidad"
                    value={row.cantidad}
                    onChange={(event) => handleInputChange(index, event)}
                    disabled={!row.isEditing}
                    style={{ boxSizing: 'border-box', margin: '0', padding: '0' }} 
                  />
                </td>
                <td className="border border-[#181818]">
                  <input
                    className={`w-full h-full text-center ${row.isEditing ? 'bg-white' : 'bg-gray-300'} border-none rounded-none`}
                    type="number"
                    name="cantidadMinima"
                    value={row.cantidadMinima}
                    onChange={(event) => handleInputChange(index, event)}
                    disabled={!row.isEditing}
                    style={{ boxSizing: 'border-box', margin: '0', padding: '0' }} 
                  />
                </td>
                <td className="border border-[#181818]">
                  <div className="flex justify-center gap-2">
                    {index === rows.length - 1 ? (
                      <button 
                        className="text-green-500"
                        onClick={() => handleAddRow(index)} // Cambia aquí para pasar el índice actual
                      >
                        Agregar
                      </button>
                    ) : row.isEditing ? (
                      <button className="text-blue-600" onClick={() => { handleSaveEdit(index); }}>Guardar</button>
                    ) : (
                      <button className="text-gray-600" onClick={() => handleEditRow(index)}>Modificar</button>
                    )}
                    {index < rows.length - 1 && (
                      <button className="text-red-600" onClick={() => handleRemoveRow(index)}>Eliminar</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Advertencia */}
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
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={closeModal}>Aceptar</button>
              )}
            </div>
          </div>
        </div>
      )}

    </>
  );
});

export default TablaStock;
