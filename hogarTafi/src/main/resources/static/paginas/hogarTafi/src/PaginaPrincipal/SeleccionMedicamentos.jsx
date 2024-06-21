import Form from 'react-bootstrap/Form';

function SeleccionMedicamentos() {
  return (
    <Form.Select aria-label="Default select example">
      <option>Medicamento</option>
      <option value="1">Ibuprofeno</option>
      <option value="2">Paracetamol</option>
      <option value="3">BuscaPina</option>
      <option value="4">Buapina</option>
    </Form.Select>
  );
}

export default SeleccionMedicamentos;