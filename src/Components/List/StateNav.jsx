import React from 'react'
import './StateNav.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function StateNav() {
  return (
        <div>
            <Navbar className="nav" bg="#F6EBDA">
                <Container>
                <Nav className="state-list">
                    <Nav.Link className='state' href="#orders">All orders</Nav.Link>
                    <Nav.Link className='state' href="#processing">Processing</Nav.Link>
                    <Nav.Link className='state' href="#shipping">Shipping</Nav.Link>
                    <Nav.Link className='state' href="#success">Success</Nav.Link>
                    <Nav.Link className='state' href="#cancelation">Cancelation</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </div>
  )
}

export default StateNav