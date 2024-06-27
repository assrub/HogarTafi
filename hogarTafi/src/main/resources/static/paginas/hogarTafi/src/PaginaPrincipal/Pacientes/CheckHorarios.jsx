import Form from 'react-bootstrap/Form';

function CheckHorarios( {habilitado} ) {
  return (
    <Form className="text-light" >
      {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="6:00"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
            disabled={habilitado}
          />
          <Form.Check
            inline
            label="Desayuno"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            disabled={habilitado}
          />
          <Form.Check
            inline
            label="Almuerzo"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            disabled={habilitado}
          />
          <Form.Check
            inline
            label="Merienda"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            disabled={habilitado}
          />
          <Form.Check
            inline
            label="Cena"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            disabled={habilitado}
          />
         <Form.Check
            inline
            label="22:00"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            disabled={habilitado}
          />
        </div>
      ))}
    </Form>
  );
}

export default CheckHorarios;