import logo from "./logo.png";
import user from "./user.png";
import cart from "./cart.png";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Header.css";

function Header(props) {
  return (
    <Navbar className="head">
      <Container>
        <Navbar.Brand href="/">
          <img className="img-left" src={logo} alt="logo" />
        </Navbar.Brand>
        <Nav className="head-middle">
          <Nav.Link href="/">About us</Nav.Link>
          <Nav.Link href="/user/product">Our Product</Nav.Link>
          {localStorage.getItem("type") === "user" ? (
            <Nav.Link href="/user/purchase">Purchases</Nav.Link>
          ) : null}
          {!localStorage.getItem("username") ? (
            <Nav.Link href="/client/login" className="right">
              {" "}
              Sign In{" "}
            </Nav.Link>
          ) : null}
          {!localStorage.getItem("username") ? (
            <Nav.Link href="/client/signup" className="right">
              {" "}
              Sign Up{" "}
            </Nav.Link>
          ) : null}
        </Nav>

        {localStorage.getItem("username") &&
        localStorage.getItem("type") === "user" ? (
          <NavDropdown
            title={<img className="img-right" src={user} alt="user" />}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item href="#">
              Point : {localStorage.getItem("point")}
            </NavDropdown.Item>
            <NavDropdown.Item href="/user/edit">Edit profile</NavDropdown.Item>
            <NavDropdown.Item href="/user/purchase">
              My purchase
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/user/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        ) : null}

        {localStorage.getItem("username") &&
        localStorage.getItem("type") === "admin" ? (
          <NavDropdown
            title={<img className="img-right" src={user} alt="user" />}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item href="/admin/acc-list">
              Account Management
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/menu">
              Menu Management
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/user/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        ) : null}

        {localStorage.getItem("username") &&
        localStorage.getItem("type") === "staff" ? (
          <NavDropdown
            title={<img className="img-right" src={user} alt="user" />}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item href="/staff/order-list">
              Order Management
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/user/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        ) : null}

        {localStorage.getItem("username") &&
        localStorage.getItem("type") === "user" ? (
          <Navbar.Brand href="/user/cart">
            <img className="img-right" src={cart} alt="cart" />
          </Navbar.Brand>
        ) : null}
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
