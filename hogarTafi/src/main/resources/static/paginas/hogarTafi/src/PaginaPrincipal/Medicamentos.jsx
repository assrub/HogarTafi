import Table from 'react-bootstrap/Table';
import SeleccionMedicamentos from './SeleccionMedicamentos';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CheckHorarios from './CheckHorarios';

function Medicamentos() {
  return (
    <Container>
      <div className="BotonesSeleccionMedicamentos">
        <Row>
          <Col md={2} className="mb-2">
          <SeleccionMedicamentos></SeleccionMedicamentos>
          </Col>
          <Col className="d-flex align-items-center">
          <CheckHorarios></CheckHorarios>
          </Col>
        </Row>

      </div>   
    <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>Medicamento</th>
          <th>6:00</th>
          <th>Desayuno</th>
          <th>Almuerzo</th>
          <th>Merienda</th>
          <th>Cena</th>
          <th>22:00</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Paracetamol</td>
          <td>1</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Ibuprofeno</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>1</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
       
      </tbody>
    </Table>
    </Container>
  );
}

export default Medicamentos;