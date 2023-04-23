import logo from "./logo.png"
import user from "./user.png"
import cart from "./cart.png"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css'
import { useEffect, useState } from "react"

function Header(props) {
    let url = window.location.href
    const [render, setRender] = useState();

    useEffect(() => {
        async function checkurl() {    
            if(url === "http://localhost:3000/user/product") {
                setRender(<Nav.Link href="/user/product" active><p className="header-active">Our Product</p></Nav.Link>)
            }
            else {
                setRender(<Nav.Link href="/user/product">Our Product</Nav.Link>)
            }
        }
        checkurl()
    } , [url])
    

    return (
        <Navbar className="head">
            <Container>
                <Navbar.Brand href="/">
                    <img className="img-left" src={logo} alt="logo"/>
                </Navbar.Brand>
                <Nav className="head-middle">
                    <Nav.Link href="/">About us</Nav.Link>
                    {render}
                    <Nav.Link href="/">Delivery</Nav.Link>
                </Nav>
                <NavDropdown title={<img className="img-right" src={user} alt="user"/>} id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/user/edit">Edit profile</NavDropdown.Item>
                    <NavDropdown.Item href="/user/purchase">My purchase</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/client/logout">Logout</NavDropdown.Item>
                </NavDropdown>
                <Navbar.Brand href="/user/cart">
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