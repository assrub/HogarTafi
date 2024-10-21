import React from "react";


export default function TablaStockDelHogar({stocks}){
    return (
        <div>
            <table className="border rounded-lg p-3 shadow-md overflow-x-auto">
          <thead>
            <tr>
              <th className="bg-gray-400 text-white">Medicacion</th>
              <th className="bg-gray-400 text-white">Cantidad</th>
              <th className="bg-gray-400 text-white">Cantidad minima</th>
            
            </tr>
          </thead>
          <tbody>
            {stocks.map((medicamento,index)=> (
                <tr key={index}>
                    <td className="border border-gray-300 p-0 h-full align-middle">
                    <input
                    className={`p-3 box-border text-center text-gray-500 font-bold bg-white`}
                    type="text"
                    name="medicacion"
                    value={medicamento.medicacion}
                    
                    
                    style={{ boxSizing: 'border-box', margin: '0', padding: '0' }} 
                  />
                    </td>
                    <td className="border border-gray-300 p-0 h-full align-middle">
                    <input
                     className={`p-3 box-border text-center text-gray-500 font-bold bg-white`}
                    type="text"
                    name="cantidad"
                    value={medicamento.cantidad}
                    
                    
                    style={{ boxSizing: 'border-box', margin: '0', padding: '0' }} 
                  />
                    </td>

                    <td className="border border-gray-300 p-0 h-full align-middle">
                    <input
                    className={`p-3 box-border text-center text-gray-500 font-bold bg-white`}
                    type="text"
                    name="medicacion"
                    value={medicamento.cant_minima}
                    
                    
                    style={{ boxSizing: 'border-box', margin: '0', padding: '0' }} 
                  />
                    </td>
                </tr>
            ))}
          </tbody>
          </table>
        </div>

    );
}