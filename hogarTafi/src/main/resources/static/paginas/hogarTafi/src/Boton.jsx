import React from 'react'
import { Button } from 'react-bootstrap';

const Boton = ( {TextoBoton} ) => {
  return (
    <Button variant="primary">{TextoBoton}</Button>
  )
}

export default Boton