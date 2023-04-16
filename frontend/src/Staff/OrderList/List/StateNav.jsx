import React from "react";
import "./StateNav.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function StateNav() {
  const filterStatus = (status) => {
    console.log(status);
  };
  return (
    <div>
      <Navbar className="nav" bg="#F6EBDA">
        <Container>
          <Nav className="state-list">
            <Nav.Link className="state" onClick={filterStatus("all-order")}>
              All orders
            </Nav.Link>
            <Nav.Link className="state" onClick={filterStatus("processing")}>
              Processing
            </Nav.Link>
            <Nav.Link className="state" onClick={filterStatus("shipping")}>
              Shipping
            </Nav.Link>
            <Nav.Link className="state" onClick={filterStatus("success")}>
              Success
            </Nav.Link>
            <Nav.Link className="state" onClick={filterStatus("cancelation")}>
              Cancelation
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default StateNav;
