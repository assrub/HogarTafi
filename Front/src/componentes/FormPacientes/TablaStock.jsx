import React, { useEffect,useState, forwardRef } from "react";
import { traerStockApi } from "../../api";

const TablaStock =forwardRef(({dni}, ref) => {
  const [rows, setRows] = useState([{ medicacion: '', cantidad: '', cantidadMinima: '', added: false }]);
  const [nuevoStock, setNuevoStock] = useState({ medicacion: '', cantidad: '', cantidadMinima: '', added: false });



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
    
    if (nuevoStock.medicacion && nuevoStock.cantidad && nuevoStock.cantidadMinima) {
     
      setRows((prevRows) => [
        ...prevRows,
        { 
          medicacion: nuevoStock.medicacion, 
          cantidad: nuevoStock.cantidad, 
          cantidadMinima: nuevoStock.cantidadMinima, 
          added: true 
        }
      ]);
  
      
      setNuevoStock({
        medicacion: '',
        cantidad: '',
        cantidadMinima: '',
        added: false
      });
    } else {
      
      alert('Llena todos los campos');
    }
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
    if (rows.length > 1) {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    } else {
      handleClearContent(index);
    }
  };

  async function traerStock(dni){
    try{
      const response  = await traerStockApi(dni);
      if(response){
        setRows(transformarStock(response.medicamentos));
      }else{
        setRows([
          {
            medicacion : "",
            cantidad : "",
            cantidadMinima: "",
            added: false
          }
        ])
      }
      
    
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    traerStock(dni);
  }, []);

  
  function transformarStock(stockBackend) {
    return stockBackend.map(stock => ({
      medicacion: stock.medicacion,
      cantidad : stock.cantidad,
      cantidadMinima : stock.cant_minima,
      added: true  
    }));
  }


  

  const handleClearContent = (index) => {
    const newRows = [...rows];
    newRows[index] = { medicacion: '', cantidad: '', cantidadMinima: '', added: false };
    setRows(newRows);
  };

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className=" w-full bg-transparent mb-10" ref={ref}>
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
            <tr key={index}>
              <td className="lg:px-4 lg:py-2 border border-[#181818] ">
                <input
                  className={`rounded-lg text-center w-32 ${row.isEditing ? 'bg-white' : 'bg-neutral-300'}`}
                  type="text"
                  name="medicacion"
                  value={row.medicacion}
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={!row.isEditing}
                />
              </td>
              <td className="lg:px-4 lg:py-2 border border-[#181818] ">
                <input
                  className={`rounded-lg text-center w-32 ${row.isEditing ? 'bg-white' : 'bg-neutral-300'}`}
                  type="number"
                  name="cantidad"
                  value={row.cantidad}
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={!row.isEditing}
                />
              </td>
              <td className="lg:px-4 lg:py-2 border border-[#181818] ">
                <input
                  className={`rounded-lg text-center w-32 ${row.isEditing ? 'bg-white' : 'bg-neutral-300'}`}
                  type="number"
                  name="cantidadMinima"
                  value={row.cantidadMinima}
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={!row.isEditing}
                />
              </td>
              <td className="lg:px-4 lg:py-2 border border-[#181818]">
                <div className="flex place-content-center gap-4">
                  {row.isEditing ? (
                    <button className="text-blue-600" onClick={() => handleSaveEdit(index)}>Guardar</button>
                  ) : (
                    <button className="text-gray-600" onClick={() => handleEditRow(index)}>Modificar</button>
                  )}
                  <button className="text-red-600" onClick={() => handleRemoveRow(index)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}

<tr>
            <td className="lg:px-4 lg:py-2 border border-[#181818]">
              <div className="flex place-content-center">
                <input
                  className="rounded-lg w-32 flex text-center bg-white border"
                  type="text"
                  name="medicacion"
                  value={nuevoStock.medicacion}
                  onChange={handleInputChange}
                />
              </div>
            </td>
            <td className="lg:px-4 lg:py-2 border border-[#181818]">
              <div className="flex place-content-center">
                <input
                  className="rounded-lg w-32 flex text-center bg-white border"
                  type="number"
                  name="cantidad"
                  min={0}
                  value={nuevoStock.cantidad}
                  onChange={handleInputChange}
                />
              </div>
            </td>
            <td className="lg:px-4 lg:py-2 border border-[#181818]">
              <div className="flex place-content-center">
                <input
                  className="rounded-lg w-32 flex text-center bg-white border"
                  type="number"
                  name="cantidadMinima"
                  min={0}
                  value={nuevoStock.cantidadMinima}
                  onChange={handleInputChange}
                />
              </div>
            </td>
            <td className="lg:px-4 lg:py-2 border border-[#181818]">
              <div className="gap-10 flex place-content-center">
                <button className="text-green-600 flex" onClick={handleAddRow}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Agregar
                </button>
              </div>
            </td>
          </tr>


        </tbody>
      </table>
    </div>
  );
});

export default TablaStock;