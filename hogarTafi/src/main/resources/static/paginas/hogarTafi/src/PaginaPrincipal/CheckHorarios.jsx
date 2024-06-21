import Form from 'react-bootstrap/Form';

function CheckHorarios() {
  return (
    <Form className="text-light">
      {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="6:00"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />
          <Form.Check
            inline
            label="Desayuno"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
          />
          <Form.Check
            inline
            label="Almuerzo"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
          />
          <Form.Check
            inline
            label="Merienda"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
          />
          <Form.Check
            inline
            label="Cena"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
          />
         <Form.Check
            inline
            label="22:00"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
          />
        </div>
      ))}
    </Form>
  );
}

export default CheckHorarios;