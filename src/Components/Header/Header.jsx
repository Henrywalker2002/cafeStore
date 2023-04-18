import logo from "./logo.png"
import user from "./user.png"
import cart from "./cart.png"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'

function Header(props) {
    return (
        <Navbar className="head" expand="sm">
            <Container>
                <Navbar.Brand href="#home">
                    <img className="img-left" src={logo} alt="logo"/>
                </Navbar.Brand>
                
                <Nav className="head-middle">
                    <Nav.Link href="#about">About us</Nav.Link>
                    <Nav.Link href="#product">Our Product</Nav.Link>
                    <Nav.Link href="#delivery">Delivery</Nav.Link>
                </Nav>

                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2 search-box img-right"
                    aria-label="Search"
                    />
                </Form>

                <Navbar.Brand href="#cart">
                    <img className="img-right" src={cart} alt="cart"/>
                </Navbar.Brand>
                <Navbar.Brand href="#user">
                    <img className="img-right" src={user} alt="user"/>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;