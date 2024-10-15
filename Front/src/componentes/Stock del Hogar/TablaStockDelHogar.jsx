import React from "react";


export default function TablaStockDelHogar({stocks}){
    return (
        <div>
            <table className="table-auto w-full bg-white text-xl">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-[#181818]">Medicacion</th>
              <th className="px-4 py-2 border border-[#181818]">Cantidad</th>
              <th className="px-4 py-2 border border-[#181818]">Cantidad minima</th>
            
            </tr>
          </thead>
          <tbody>
            {stocks.map((medicamento,index)=> (
                <tr key={index}>
                    <td className="border border-[#181818]">
                    <input
                    className={`w-full h-full text-center border-none rounded-none`}
                    type="text"
                    name="medicacion"
                    value={medicamento.medicacion}
                    
                    
                    style={{ boxSizing: 'border-box', margin: '0', padding: '0' }} 
                  />
                    </td>
                    <td className="border border-[#181818]">
                    <input
                     className={`w-full h-full text-center border-none rounded-none`}
                    type="text"
                    name="cantidad"
                    value={medicamento.cantidad}
                    
                    
                    style={{ boxSizing: 'border-box', margin: '0', padding: '0' }} 
                  />
                    </td>

                    <td className="border border-[#181818]">
                    <input
                    className={`w-full h-full text-center border-none rounded-none`}
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