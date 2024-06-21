import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Medicamentos from './Medicamentos'
import './FormularioDatosPacientes.css'
import Imagenes from './Imagenes'
import Boton from '../Boton';

function FormularioDatosPacientes() {
  return (
    <Container className="mt-5">
      <Row>
        <Col lg={4}>
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
            
            <div className="Botones d-grid gap-2">
              <Boton className="w-100 fs-5 mb-3" TextoBoton={"Stock"}></Boton>
              <Boton className="w-100 fs-5 mb-3" TextoBoton={"Recetas"}></Boton>
              <Boton className="w-100 fs-5 mb-3" TextoBoton={"Historial medico"}></Boton>
            </div>
          </Form>
        </Col>
        <Col lg={8} className="mb-2 mt-4 d-flex flex-column align-items-end">
          <Row className="w-100">
            <Col md={6} className="p-2">
              <Imagenes TextoFoto={"Foto del frente del DNI"} TextoBoton={"Cargar imagen"}/>
            </Col>
            <Col md={6} className="p-2">
              <Imagenes TextoFoto={"Foto del frente del DNI"} TextoBoton={"Cargar imagen"}/>
            </Col>
            <Col md={6} className="p-2">
              <Imagenes TextoFoto={"Foto del frente del DNI"} TextoBoton={"Cargar imagen"}/>
            </Col>
            <Col md={6} className="p-2">
              <Imagenes TextoFoto={"Foto del frente del DNI"} TextoBoton={"Cargar imagen"}/>
            </Col>
          </Row>
        </Col>
      </Row>

      <Medicamentos />
    </Container>
  )
}

export default FormularioDatosPacientes