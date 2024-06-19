import Table from 'react-bootstrap/Table';

function TablaMedicamentos() {
  return (
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
  );
}

export default TablaMedicamentos;