import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Imagenes.css'

function Imagenes({TextoFoto}) {
  return (
    <Card style={{ width: '18rem' }} className="bg-light">
      <Card.Img variant="top" src="https://via.placeholder.com/300" />
      <Card.Body className="d-flex flex-column">
        <Card.Title> { TextoFoto } </Card.Title>
        <Button variant="light" className="Boton">Cargar imagen</Button>
      </Card.Body>
    </Card>
  );
}

export default Imagenes;