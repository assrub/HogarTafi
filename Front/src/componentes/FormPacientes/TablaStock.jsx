import React, { useEffect, useState, forwardRef } from "react";
import { traerStockApi } from "../../api";

const TablaStock = forwardRef(({ dni }, ref) => {
  // Inicializa con una fila vacía y editable
  const [rows, setRows] = useState([{ medicacion: '', cantidad: '', cantidadMinima: '', added: false, isEditing: true }]);
  
  const handleInputChange = (index, event) => {
    const { target } = event;

    if (target && target.name) {
      const { name, value } = target;

      // Actualiza la fila correspondiente con el valor nuevo
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[index] = {
          ...updatedRows[index],
          [name]: value,  // Usar el 'name' dinámico para actualizar el valor
        };
        return updatedRows;
      });
    } else {
      console.error("El target o name no existen.");
    }
  };

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { medicacion: '', cantidad: '', cantidadMinima: '', added: false, isEditing: true }
    ]);
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

  const handleRemoveRow = (index) => {
    setRows((prevRows) => {
      const newRows = prevRows.filter((_, i) => i !== index);
      // Asegúrate de que quede al menos una fila
      if (newRows.length === 0) {
        newRows.push({ medicacion: '', cantidad: '', cantidadMinima: '', added: false, isEditing: true });
      }
      return newRows;
    });
  };

  async function traerStock(dni) {
    try {
      const response = await traerStockApi(dni);
      if (response) {
        // Transforma el stock recibido y agrega una fila vacía al final
        const transformedRows = transformarStock(response.medicamentos);
        setRows([...transformedRows, { medicacion: "", cantidad: "", cantidadMinima: "", added: false, isEditing: true }]);
      } else {
        // Asegura que haya al menos una fila vacía si no hay datos
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
      isEditing: false  // Al cargar, no deben estar editables
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
              <tr key={index} className={`border border-[#181818] ${row.isEditing ? 'bg-white' : 'bg-gray-300'}`}>
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
                    {row.isEditing ? (
                      <button className="text-blue-600" onClick={() => { handleSaveEdit(index); handleAddRow(); }}>Guardar</button>
                    ) : (
                      <button className="text-gray-600" onClick={() => handleEditRow(index)}>Modificar</button>
                    )}
                    <button className="text-red-600" onClick={() => handleRemoveRow(index)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
});

export default TablaStock;
