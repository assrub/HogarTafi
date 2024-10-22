import React from "react";


export default function TablaStockDelHogar({stocks}){
    return (
      <div className="overflow-x-auto">
        <table className="min-w-[220px] lg:min-w-[700px] border rounded-lg p-3 shadow-md w-full">
          <thead>
            <tr>
              <th className="bg-gray-400 text-white text-left pl-2">Medicacion</th>
              <th className="bg-gray-400 text-white">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((medicamento,index)=> (
                <tr key={index}>
                  <td className="border border-gray-300 h-full">
                    <input
                    className={`w-full pl-2 box-border text-gray-500 font-bold bg-white`}
                    type="text"
                    name="medicacion"
                    value={medicamento.medicacion}
                  />
                    </td>
                    <td className="border border-gray-300 p-0 h-full align-middle">
                    <input
                     className={`w-full p-3 box-border text-center text-gray-500 font-bold bg-white`}
                    type="text"
                    name="cantidad"
                    value={medicamento.cantidad}
                    
                    
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