import React from "react";

export default function CampoTexto({
  textoEtiqueta = "",
  propsInput,
  propsLabel,
  obligatorio,
  error,
}) {
  return (
    <div className="mt-4 text-md lg:text-xl">
      <label
        htmlFor={`${propsLabel.labelFor}`}
        className="block font-medium leading-6 text-gray-900"
      >
        {textoEtiqueta}
      </label>
      <div className="">
      {error && obligatorio && (
              <span className="text-sm text-red-500 font-bold ">Campo obligatorio</span>

      )}
        
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">          
          <input
            type={propsInput.type}
            name={`${propsInput.name}`}
            id={`${propsInput.id}`}
            
            className="block flex-1 border-0 py-1.5 pl-1
             text-gray-900 placeholder:text-gray-400
              focus:ring-0 sm:text-sm sm:leading-6
              enabled:bg-transparent
              read-only: bg-gray-300"
            {...propsInput} 
          />
        </div>
      </div>
    </div>
  );
}
