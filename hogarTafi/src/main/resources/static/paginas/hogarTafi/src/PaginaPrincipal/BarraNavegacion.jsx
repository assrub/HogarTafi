import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./BarraNavegacion.css";

function BarraNavegacion({ opcionElegida }) {
  return (

    <Navbar expand="lg" className="bg-transparent Navegacion"> 
        <Navbar.Brand href="#home" className="fs-1 text-light ms-4">
          Hogar Tafi
        </Navbar.Brand>
        <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title="Pacientes"
              className="fs-4 text-light"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => opcionElegida("mostrar")}>
                Mostrar
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => opcionElegida("cargar")}>
                Cargar
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => opcionElegida("modificar")}>
                Modificar
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => opcionElegida("dar de baja")}>
                Dar de baja
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#link" className="fs-4 text-light">
              Stock del hogar
            </Nav.Link>

            <Nav.Link href="#link " className="fs-4 text-light">
              Empleados
            </Nav.Link>

            <Nav.Link href="#link" className="fs-4 text-light">
              Pedidos
            </Nav.Link>

            <Nav.Link href="#link" className="fs-4 text-light">
              Lista de usuarios
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default BarraNavegacion;
