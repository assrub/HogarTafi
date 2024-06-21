import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './BarraNavegacion.css'

function BarraNavegacion() {
    return (
        <Navbar expand="lg" className="bg-transparent Navegacion">
            <Container >
                <Navbar.Brand href="#home" className="fs-1 text-light">Hogar Tafi</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="me-auto">

                        <NavDropdown title="Pacientes" className="fs-4 text-light" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.2">Mostrar</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Cargar</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Modificar</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Dar de baja</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link href="#link" className="fs-4 text-light">Stock del hogar</Nav.Link>

                        <Nav.Link href="#link " className="fs-4 text-light">Empleados</Nav.Link>

                        <Nav.Link href="#link" className="fs-4 text-light">Pedidos</Nav.Link>

                        <Nav.Link href="#link" className="fs-4 text-light">Lista de usuarios</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BarraNavegacion;