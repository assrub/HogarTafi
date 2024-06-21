import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Imagenes.css'
import Boton from '../Boton'

const Imagenes = ({ TextoFoto, TextoBoton }) => {
  return (
    <Card style={{ width: '18rem' }} className="bg-light">
      <Card.Img variant="top" src="https://via.placeholder.com/300" />
      <Card.Body className="d-flex flex-column text-center">
        <Card.Title> { TextoFoto } </Card.Title>
        <Boton variant="primary" className="Boton" TextoBoton={TextoBoton}></Boton>
      </Card.Body>
    </Card>
  );
}

export default Imagenes;