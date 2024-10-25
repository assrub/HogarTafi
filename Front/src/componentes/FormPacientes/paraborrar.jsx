<div className="border rounded-lg p-2 shadow-md overflow-x-auto">
  <table className="min-w-full table-auto text-xs sm:text-xs bg-white hidden lg:table" ref={refTabla}>
    <thead>
      <tr className="bg-gray-200">
        <th className="border border-gray-600">Medicamento</th>
        {horasDelDia.map(hora => (
          <th key={hora} className="border border-gray-600">{hora}</th>
        ))}
        <th className="border border-gray-600">Observaciones</th>
        <th className="border border-gray-600">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {medicamentos.map((medicamento, index) => (
        <tr key={index}>
          <td className="border border-gray-600 p-0 h-full align-middle">
            <input
              className={`w-full h-full p-2 box-border ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}
              type="text"
              value={medicamento.medicamento}
              disabled={!medicamento.editable}
              style={{ boxSizing: 'border-box' }}
            />
          </td>
          {horasDelDia.map(hora => (
            <td key={hora} className="border border-gray-600 p-0 h-full align-middle">
              <input
                className={`w-full h-full p-2 box-border ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}
                type="number"
                value={medicamento.horario[hora]}
                onChange={(e) => manejarCambio(index, hora, e.target.value)}
                disabled={!medicamento.editable}
                style={{ boxSizing: 'border-box' }}
              />
            </td>
          ))}
          <td className="border border-gray-600 p-0 h-full align-middle">
            <input
              className={`w-full h-full p-2 box-border ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}
              type="text"
              value={medicamento.observaciones}
              disabled={!medicamento.editable}
              style={{ boxSizing: 'border-box' }}
            />
          </td>
          <td className="border border-gray-600 p-0 h-full align-middle">
            <div className="flex justify-between space-x-2">
              <button className="flex-1 bg-blue-500 text-white py-2 px-3 hover:bg-blue-600 transition duration-200" onClick={() => handleEditRow(index)}>
                {medicamento.editable ? "Guardar" : "Editar"}
              </button>
              <button className="flex-1 bg-red-500 text-white py-2 px-3 hover:bg-red-600 transition duration-200" onClick={() => handleRemoveRow(index)}>
                Eliminar
              </button>
            </div>
          </td>
        </tr>
      ))}

      {/* Fila para agregar un nuevo medicamento */}
      <tr>
        <td className="border border-gray-600 p-0 h-full align-middle">
          <input
            className="w-full h-full p-2 box-border bg-white"
            type="text"
            placeholder="Nuevo medicamento"
            // Aquí podrías manejar el estado para agregar un nuevo medicamento
          />
        </td>
        {horasDelDia.map(hora => (
          <td key={hora} className="border border-gray-600 p-0 h-full align-middle">
            <input
              className="w-full h-full p-2 box-border bg-white"
              type="number"
              placeholder={`Horario ${hora}`}
              // Aquí podrías manejar el estado para agregar un nuevo medicamento
            />
          </td>
        ))}
        <td className="border border-gray-600 p-0 h-full align-middle">
          <input
            className="w-full h-full p-2 box-border bg-white"
            type="text"
            placeholder="Observaciones"
            // Aquí podrías manejar el estado para agregar un nuevo medicamento
          />
        </td>
        <td className="border border-gray-600 p-0 h-full align-middle">
          <button className="bg-green-500 text-white py-2 px-3 hover:bg-green-600 transition duration-200" onClick={handleAddRow}>
            Agregar
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  {/* Versión móvil */}
  <div className="lg:hidden grid grid-cols-1 gap-4">
    {medicamentos.map((medicamento, index) => (
      <div key={index} className="border border-gray-600 p-2 rounded-md shadow-md">
        <div className="grid grid-cols-2 gap-2">
          <div className="font-bold">Medicamento:</div>
          <div>{medicamento.medicamento}</div>

          {horasDelDia.map(hora => (
            <React.Fragment key={hora}>
              <div className="font-bold">{hora}:</div>
              <div>
                <input
                  className={`w-full p-1 ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}
                  type="number"
                  value={medicamento.horario[hora]}
                  onChange={(e) => manejarCambio(index, hora, e.target.value)}
                  disabled={!medicamento.editable}
                />
              </div>
            </React.Fragment>
          ))}

          <div className="font-bold">Observaciones:</div>
          <div>
            <input
              className={`w-full p-1 ${!medicamento.editable ? 'bg-gray-200' : 'bg-white'}`}
              type="text"
              value={medicamento.observaciones}
              disabled={!medicamento.editable}
            />
          </div>

          <div className="font-bold">Acciones:</div>
          <div className="flex justify-between space-x-2">
            <button className="flex-1 bg-blue-500 text-white py-2 px-3 hover:bg-blue-600 transition duration-200" onClick={() => handleEditRow(index)}>
              {medicamento.editable ? "Guardar" : "Editar"}
            </button>
            <button className="flex-1 bg-red-500 text-white py-2 px-3 hover:bg-red-600 transition duration-200" onClick={() => handleRemoveRow(index)}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    ))}
    
    {/* Fila para agregar un nuevo medicamento en versión móvil */}
    <div className="border border-gray-600 p-2 rounded-md shadow-md">
      <div className="grid grid-cols-2 gap-2">
        <div className="font-bold">Medicamento:</div>
        <input className="col-span-1 w-full p-1 bg-white" type="text" placeholder="Nuevo medicamento" />
        
        {horasDelDia.map(hora => (
          <React.Fragment key={hora}>
            <div className="font-bold">{hora}:</div>
            <input className="col-span-1 w-full p-1 bg-white" type="number" placeholder={`Horario ${hora}`} />
          </React.Fragment>
        ))}
        
        <div className="font-bold">Observaciones:</div>
        <input className="col-span-1 w-full p-1 bg-white" type="text" placeholder="Observaciones" />

        <div className="font-bold">Acciones:</div>
        <button className="bg-green-500 text-white py-2 px-3 hover:bg-green-600 transition duration-200" onClick={handleAddRow}>
          Agregar
        </button>
      </div>
    </div>
  </div>
</div>