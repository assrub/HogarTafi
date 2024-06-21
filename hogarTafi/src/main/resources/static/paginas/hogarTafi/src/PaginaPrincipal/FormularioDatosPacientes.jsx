import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import TablaMedicamentos from './TablaMedicamentos'
import './FormularioDatosPacientes.css'
import Imagenes from './Imagenes'

function FormularioDatosPacientes() {
  return (
    <Container className="mt-5 bg-dark">
      <Row>
        <Col md={4}>
          <Form className="text-light">
            <div className="Datos">
              <Form.Group className="mb-3" controlId="FormNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group className="mb-3" controlId="FormApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group className="mb-3" controlId="FormDni">
                <Form.Label>DNI</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group className="mb-4" controlId="FormObraSocial">
                <Form.Label>Obra Social</Form.Label>
                <Form.Control />
              </Form.Group>
            </div>
            
            <div className="botones">
              <Button className="w-100 fs-5 mb-3">Stock</Button>
              <Button className="w-100 fs-5 mb-3">Recetas</Button>
              <Button className="w-100 fs-5 mb-3">Stock</Button>
            </div>
          </Form>
        </Col>
        <Col md={8} className="mb-2 mt-4 d-flex flex-column align-items-end">
          <Row className="w-100">
            <Col md={6} className="p-2">
              <Imagenes TextoFoto={"Foto del frente del DNI"} />
            </Col>
            <Col md={6} className="p-2">
              <Imagenes TextoFoto={"Foto del frente del DNI"} />
            </Col>
            <Col md={6} className="p-2">
              <Imagenes TextoFoto={"Foto del frente del DNI"} />
            </Col>
            <Col md={6} className="p-2">
              <Imagenes TextoFoto={"Foto del frente del DNI"} />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Asegúrate de definir el componente TablaMedicamentos */}
      <TablaMedicamentos />
    </Container>
  )
}

export default FormularioDatosPacientes