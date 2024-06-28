import React from 'react'

export  function CampoTexto({etiqueta ="",textoEtiqueta ="",tipo=""}) {
  return (
    <>
    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 ">
                    <div className="sm:col-span-4">
                        <label htmlFor={etiqueta} className="block text-lg font-medium leading-6 text-neutral-300">{textoEtiqueta}</label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset lg:max-w-md">
                                    <input type={tipo} name={etiqueta} id={etiqueta} className="block flex-1 border-0 text-neutral-300 bg-transparent py-1.5 pl-1  placeholder:text-white focus:ring-0  " />
                                </div>
                            </div>
                    </div>
                </div>
    </>
  )
}
export default CampoTexto