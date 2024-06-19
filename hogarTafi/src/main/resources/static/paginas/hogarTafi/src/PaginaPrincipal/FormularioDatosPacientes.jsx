import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import TablaMedicamentos from './TablaMedicamentos'
import './FormularioDatosPacientes.css'
import Imagenes from './Imagenes'

function FormularioDatosPacientes() {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Form className="text-dark">
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

            <Form.Group className="mb-3" controlId="FormObraSocial">
              <Form.Label>Obra Social</Form.Label>
              <Form.Control />
            </Form.Group>

          </Form>
        </Col>
        <Col md={8} className="mb-2">
          <Row>
            <Col md={6} className="p-2">
              <Imagenes TetxtoFoto = {"Foto del frente del DNI"}></Imagenes>
            </Col>
            <Col md={6} className="p-2">
              <Imagenes TetxtoFoto = {"Foto del frente del DNI"}></Imagenes>
            </Col>
            <Col md={6} className="p-2">
              <Imagenes TetxtoFoto = {"Foto del frente del DNI"}></Imagenes>
            </Col>
            <Col md={6} className="p-2">
              <Imagenes TetxtoFoto = {"Foto del frente del DNI"}></Imagenes>
            </Col>
          </Row>
        </Col>
      </Row>

      <TablaMedicamentos></TablaMedicamentos>
      
    </Container>
  )
}

export default FormularioDatosPacientes