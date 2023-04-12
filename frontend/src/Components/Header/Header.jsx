import logo from "./logo.png"
import user from "./user.png"
import cart from "./cart.png"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css'

function Header(props) {
    return (
        <Navbar className="head">
            <Container>
                <Navbar.Brand href="#home">
                    <img className="img-left" src={logo} alt="logo"/>
                </Navbar.Brand>
                
                <Nav className="head-middle">
                    <Nav.Link href="#About">About us</Nav.Link>
                    <Nav.Link href="#Product">Our Product</Nav.Link>
                    <Nav.Link href="#Home">Delivery</Nav.Link>
                </Nav>

                <Navbar.Brand href="#User">
                    <img className="img-right" src={user} alt="user"/>
                </Navbar.Brand>
                <Navbar.Brand href="#Cart">
                    <img className="img-right" src={cart} alt="cart"/>
                </Navbar.Brand>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2 search-box img-right"
                    aria-label="Search"
                  />
                </Form>
            </Container>
        </Navbar>
    );
}

export default Header;