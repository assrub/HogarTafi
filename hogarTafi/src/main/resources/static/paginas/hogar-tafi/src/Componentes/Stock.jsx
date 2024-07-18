import React from 'react'
import TablaStock from './Stock/TablaStock'


export default function Stock() {
  return (
    <div>
        <div className="titulo flex text-neutral-300 text-4xl justify-center m-10">
            <h2>Stock de pepee </h2>    
        </div>
        <div className="tabla">
          <TablaStock></TablaStock>
        </div>
    </div>
  )
}