import React from 'react';

const TablaDinamica = ({ headers, rows, actions }) => {
  return (
    <table className="min-w-full table-auto text-xs sm:text-xs bg-white">
      <thead>
        <tr className="bg-gray-400 text-white">
          {headers.map((header, index) => (
            <th key={index} className="p-2 border border-gray-300 text-white">
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border border-gray-300 p-2 text-center">
                {cell}
              </td>
            ))}
            {actions && (
              <td className="border border-gray-300 p-2 text-center">
                {actions(rowIndex)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaDinamica;
