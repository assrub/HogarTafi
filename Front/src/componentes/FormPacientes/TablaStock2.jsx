import React, {useEffect, useState} from "react";
import {traerStockApi, guardarStockApi} from "../../api";
import BotonEditar from '../Botones/BotonEditar';
import BotonEliminar from '../Botones/BotonEliminar';
import BotonEditarMovil from '../Botones/BotonEditarMovil';
import BotonEliminarMovil from '../Botones/BotonEliminarMovil';
import BotonActualizar from './../Botones/BotonActualizar';
import BotonAgregar from './../Botones/BotonAgregar';
import EliminacionModal from './../Modal/EliminacionModal';
import CartelAviso from "./../Modal/CartelAviso";


const TablaStock = ({ paciente }) => {
  const [rows, setRows] = useState([{ medicacion: '', cantidad: '', cantidadMinima: '', added: false, isEditing: true }]);
  
  
  const [mensajeModalDelete, setmensajeModalDelete] = useState("");
  const [mostrarModalDelete, setModalDeleteOpen] = useState(false);
  const toggleModalDelete = () => setModalDeleteOpen(!mostrarModalDelete);


  const [mensajeModalAviso, setMensajeModalAviso] = useState("");
  const [mostrarModalAviso, setMostrarModalAviso] = useState(false);
  const [estadoModalAviso, setEstadoModalAviso] = useState("");
  const toggleModalAviso = () => setMostrarModalAviso(!mostrarModalAviso);
  

 
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
      setMensajeModalAviso("Stocks del paciente modificado correctamente.");
      setEstadoModalAviso(2);
    } else {
      setMensajeModalAviso("Error al guardar el Stock");
      setEstadoModalAviso(3);
    }
    toggleModalAviso();
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
      setMensajeModalAviso('Por favor, completa todos los campos antes de agregar una nueva fila.');
      setEstadoModalAviso(4)
      setCurrentAction('add');
      toggleModalAviso();
    }
  };

  const handleRemoveRow = (index) => {
    setRowToDelete(index);
    setmensajeModalDelete('¿Estás seguro de que deseas eliminar esta fila?');
    setCurrentAction('delete');
    toggleModalDelete();
  };

  const confirmDeleteRow = () => {
    setRows(prevRows => {
      const newRows = prevRows.filter((_, i) => i !== rowToDelete);
      if (newRows.length === 0) {
        newRows.push({ medicacion: '', cantidad: '', cantidadMinima: '', added: false, isEditing: true });
      }
      return newRows;
    });
    toggleModalDelete();
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
    <div className="border rounded-lg p-2 shadow-md overflow-x-auto">
      <table className="hidden lg:table min-w-full table-auto text-xs sm:text-xs bg-white">
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
                  className={`w-full py-3 text-center ${row.isEditing ? 'bg-white' : 'bg-gray-200'} rounded-none`}
                  type="text"
                  name="medicacion"
                  value={row.medicacion}
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={!row.isEditing}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  className={`w-full py-3 text-center ${row.isEditing ? 'bg-white' : 'bg-gray-200'} rounded-none`}
                  type="number"
                  name="cantidad"
                  value={row.cantidad}
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={!row.isEditing}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  className={`w-full py-3 text-center ${row.isEditing ? 'bg-white' : 'bg-gray-200'} rounded-none`}
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
                      <BotonAgregar funcionUno={() => handleAddRow(index)} funcionDos={handleAddRow} /> 
                  ) : (
                    <>
                      <BotonEditar editable={row.isEditing} onGuardar={() => handleSaveEdit(index)} onModificar={() => handleEditRow(index)}/>
                      <BotonEliminar onClick={() => handleRemoveRow(index)} />
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Estructura alternativa para móviles */}
      <div className="lg:hidden">
        {rows.map((row, index) => (
        <div key={index} className={`border border-gray-300 rounded p-4 mb-4 ${row.isEditing ? 'bg-white' : 'bg-gray-100'}`}>
          <div className="flex items-center mb-4">
        <span className="font-bold w-1/2 text-center">MEDICACION</span>
        <input
          className={`w-1/2 m-1 py-2 text-center border border-gray-400 ${row.isEditing ? 'bg-white' : 'bg-gray-200'} rounded`}
          type="text"
          name="medicacion"
          value={row.medicacion}
          onChange={(event) => handleInputChange(index, event)}
          disabled={!row.isEditing}/>
        </div>

        <div className="flex items-center mb-4">
          <span className="font-bold w-1/2 text-center">CANTIDAD</span>
          <input
            className={`w-1/2 m-1 py-2 text-center border border-gray-400 ${row.isEditing ? 'bg-white' : 'bg-gray-200'} rounded`}
            type="number"
            name="cantidad"
            value={row.cantidad}
            onChange={(event) => handleInputChange(index, event)}
            disabled={!row.isEditing}
          />
        </div>

        <div className="flex items-center mb-4">
          <span className="font-bold w-1/2 text-center">CANTIDAD MINIMA</span>
          <input
            className={`w-1/2 m-1 py-2 text-center border border-gray-400 ${row.isEditing ? 'bg-white' : 'bg-gray-200'} rounded`}
            type="number"
            name="cantidadMinima"
            value={row.cantidadMinima}
            onChange={(event) => handleInputChange(index, event)}
            disabled={!row.isEditing}/>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          {index === rows.length - 1 && !row.added ? (
            <BotonAgregar  funcionUno={() => handleAddRow(index)} funcionDos={handleAddRow} /> 
          ) : (
          <>
            <BotonEditarMovil editable={row.isEditing} onGuardar={() => handleSaveEdit(index)} onModificar={() => handleEditRow(index)} />
            <BotonEliminarMovil onClick={() => handleRemoveRow(index)} />
          </>
          )}
        </div>
      </div>
    ))}
  </div>

  <div className="flex justify-end mt-4 p-0">
    <BotonActualizar onClick={guardarStock} texto="Actualizar Stock" />
  </div>
  

          {/* Modal de confirmación */}
       <EliminacionModal
        isOpen={mostrarModalDelete}
        mensaje={mensajeModalDelete}
        onClose={toggleModalDelete}
        onConfirm={confirmDeleteRow}
      />

      
      <CartelAviso
        abrirModal={mostrarModalAviso}
        cerrarModal={toggleModalAviso}
        mensaje={mensajeModalAviso}
        estado = {estadoModalAviso}
      />

          
    </div>
    
  </>
  
  );
};

export default TablaStock;
