import React, { useEffect,useState, forwardRef } from "react";
import { traerStockApi } from "../../api";

const TablaStock =forwardRef(({dni}, ref) => {
  const [rows, setRows] = useState([{ medicacion: '', cantidad: '', cantidadMinima: '', added: false }]);
  const [nuevoStock, setNuevoStock] = useState({ medicacion: '', cantidad: '', cantidadMinima: '', added: false });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Actualiza el valor del stock nuevo (la última fila para agregar)
    setNuevoStock({
      ...nuevoStock,
      [name]: value,
    });
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

  function transformarStock(stockBackend) {
    return stockBackend.map(stock => ({
      medicacion: stock.medicacion,
      cantidad : stock.cantidad,
      cantidadMinima : stock.cant_minima,
      added: true  
    }));
  }

  useEffect(()=>{
    traerStock(dni);
  },[])
  
  

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
              <td className="px-4 py-2 border border-[#181818] ">
                <div className="flex place-content-center">
                  <input
                    className={`rounded-lg flex text-center w-32 ${row.added ? 'bg-neutral-300' : 'bg-white'} border `}
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
                    className={`rounded-lg flex text-center w-32 ${row.added ? 'bg-neutral-300' : 'bg-white'} border`}
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
                    className={`rounded-lg flex text-center w-32 ${row.added ? 'bg-neutral-300' : 'bg-white'} border`}
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

                  {row.added && (
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
                    
                    {row.added && (
                  <button className="flex text- text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>

                    Modificar
                  </button>
                    )}
                    {row.added && (
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
                    )}
                </div>
                    
              </td>
            </tr>
          ))}

<tr>
            <td className="px-4 py-2 border border-[#181818]">
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
            <td className="px-4 py-2 border border-[#181818]">
              <div className="flex place-content-center">
                <input
                  className="rounded-lg w-32 flex text-center bg-white border"
                  type="number"
                  name="cantidad"
                  value={nuevoStock.cantidad}
                  onChange={handleInputChange}
                />
              </div>
            </td>
            <td className="px-4 py-2 border border-[#181818]">
              <div className="flex place-content-center">
                <input
                  className="rounded-lg w-32 flex text-center bg-white border"
                  type="number"
                  name="cantidadMinima"
                  value={nuevoStock.cantidadMinima}
                  onChange={handleInputChange}
                />
              </div>
            </td>
            <td className="px-4 py-2 border border-[#181818]">
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