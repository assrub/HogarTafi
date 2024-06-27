import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Medicamentos from "./Medicamentos";
import "./FormularioDatosPacientes.css";
import Imagenes from "./Imagenes";
import Boton from "../../Boton";

function FormularioDatosPacientes({ habilitarCampos = false }) {
  const opcionElegida = () => {
    return habilitarCampos;
  };

  return (
    <div>
      <Row>
        <Col lg={4}>
          <Form className="text-light m-5">
            <div className="Datos">
              <Form.Group className="mb-3" controlId="FormNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control disabled={!opcionElegida()} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="FormApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control disabled={!opcionElegida()} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="FormDni">
                <Form.Label>DNI</Form.Label>
                <Form.Control disabled={!opcionElegida()} />
              </Form.Group>

              <Form.Group className="mb-4" controlId="FormObraSocial">
                <Form.Label>Obra Social</Form.Label>
                <Form.Control disabled={!opcionElegida()} />
              </Form.Group>
            </div>

            <div className="Botones d-grid gap-2">
              <Boton
                habilitado={!opcionElegida()}
                className="w-100 fs-5 mb-3"
                TextoBoton={"Stock"}
              ></Boton>
              <Boton
                habilitado={!opcionElegida()}
                className="w-100 fs-5 mb-3"
                TextoBoton={"Recetas"}
              ></Boton>
              <Boton
                habilitado={!opcionElegida()}
                className="w-100 fs-5 mb-3"
                TextoBoton={"Historial medico"}
              ></Boton>
            </div>
          </Form>
        </Col>
        <Col lg={8} className="mb-2 mt-5">
        <Container>
          <Row className="justify-content-end">
            <Col md={6} className="p-2 text-right bg-dark ">
              <Imagenes
                habilitado={!opcionElegida()}
                TextoFoto={"Foto del frente del DNI"}
                TextoBoton={"Cargar imagen"}
              />
            </Col>
            <Col md={6} className="p-2 text-right bg-dark">
              <Imagenes
                habilitado={!opcionElegida()}
                TextoFoto={"Foto de atrás del DNI"}
                TextoBoton={"Cargar imagen"}
              />
            </Col>
            <Col md={6} className="p-2 text-right">
              <Imagenes
                habilitado={!opcionElegida()}
                TextoFoto={"Foto del frente del carnet de la obra social"}
                TextoBoton={"Cargar imagen"}
              />
            </Col>
            <Col md={6} className="p-2 text-right">
              <Imagenes
                habilitado={!opcionElegida()}
                TextoFoto={"Foto de atrás del carnet de la obra social"}
                TextoBoton={"Cargar imagen"}
              />
            </Col>
          </Row>
          </Container>
        </Col>
      </Row>

      <Medicamentos habilitado={!opcionElegida()} />
    </div>
  );
}

export default FormularioDatosPacientes;