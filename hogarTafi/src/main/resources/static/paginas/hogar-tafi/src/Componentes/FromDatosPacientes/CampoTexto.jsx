import React from 'react';

function CampoTexto({ etiqueta, textoEtiqueta, tipo, readOnly = false }) {

  const inputClasses = `block flex-1 border-0 text-neutral-300 bg-transparent py-1.5 pl-1 placeholder:text-white focus:ring-0 ${readOnly ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8">
      <div className="sm:col-span-4">
        <label htmlFor={etiqueta} className="block text-lg font-medium leading-6 text-neutral-300">
          {textoEtiqueta}
        </label>
        <div className="mt-2">
          <div className={`flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset lg:max-w-md ${readOnly ? 'bg-gray-500' : ''}`}>
            <input
              readOnly={readOnly}
              type={tipo}
              name={etiqueta}
              id={etiqueta}
              className={inputClasses}
             
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CampoTexto