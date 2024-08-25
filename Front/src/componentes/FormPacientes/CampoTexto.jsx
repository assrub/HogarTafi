import React from "react";

export default function CampoTexto({
  textoEtiqueta = "",
  propsInput,
  propsLabel,
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
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
          <input
            type={propsInput.type}
            name={`${propsInput.name}`}
            id={`${propsInput.id}`}
            
            className="block flex-1 border-0 py-1.5 pl-1
             text-gray-900 placeholder:text-gray-400
              focus:ring-0 sm:text-sm sm:leading-6
              disabled: bg-gray-300
              enabled:bg-transparent"
            {...propsInput} 
          />
        </div>
      </div>
    </div>
  );
}
