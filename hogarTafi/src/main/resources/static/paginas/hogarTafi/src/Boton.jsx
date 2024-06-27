import React from 'react'
import { Button } from 'react-bootstrap';

const Boton = ({ TextoBoton, onClick, habilitado }) => {
  return (
    <Button disabled={habilitado} variant="primary" onClick={onClick}>{TextoBoton}</Button>
  );
}

export default Boton