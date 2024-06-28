import React from 'react'

export function Link( {texto, link} ) {
  return (
    <a href={link} className="block px-2 py-2 text-neutral-300 hover:bg-gray-200 hover:text-gray-800 hover:rounded-lg"><span>{texto}</span></a>
  )
}

export default Link