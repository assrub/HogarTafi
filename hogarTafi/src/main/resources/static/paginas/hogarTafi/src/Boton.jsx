import React from 'react'
import { Button } from 'react-bootstrap';

const Boton = ({ TextoBoton, onClick }) => {
  return (
    <Button variant="primary" onClick={onClick}>{TextoBoton}</Button>
  );
}

export default Boton