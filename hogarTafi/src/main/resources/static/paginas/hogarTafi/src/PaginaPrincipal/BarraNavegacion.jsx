import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './BarraNavegacion.css'

function BarraNavegacion() {
    return (
        <Navbar expand="lg" className="bg-transparent Navegacion">
            <Container >
                <Navbar.Brand href="#home">Hogar Tafi</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="me-auto">

                        <NavDropdown title="Pacientes" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.2">Mostrar</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Cargar</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Modificar</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Dar de baja</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link href="#link">Stock del hogar</Nav.Link>

                        <Nav.Link href="#link">Empleados</Nav.Link>

                        <Nav.Link href="#link">Pedidos</Nav.Link>

                        <Nav.Link href="#link">Lista de usuarios</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BarraNavegacion;