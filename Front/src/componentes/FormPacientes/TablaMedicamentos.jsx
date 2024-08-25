import React from 'react';

const TablaMedicamentos = () => {
  const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const horasDelDia = [];
  

  for (let i = 0; i < 24; i += 3) {
    horasDelDia.push(`${i}:00`);
  }

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full mb-10">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-[#181818]">Hora/Día</th>
            {diasDeLaSemana.map((dia, index) => (
              <th key={index} className="px-4 py-2 border border-[#181818]">{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horasDelDia.map((hora, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border border-[#181818]">{hora}</td>
              {diasDeLaSemana.map((dia, index) => (
                <td key={index} className="px-4 py-2 border border-[#181818]"></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaMedicamentos;