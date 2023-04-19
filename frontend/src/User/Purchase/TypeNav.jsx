import React from 'react'
import './TypeNav.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function TypeNav() {
  return (
    <div>
            <Navbar className="type-nav" bg="#F6EBDA">
                <Container className='type-nav-container'>
                <Nav className="type-list">
                    <Nav.Link className='type' href="#all">All order</Nav.Link>
                    <Nav.Link className='type' href="#processing">Processing</Nav.Link>
                    <Nav.Link className='type' href="#shipping">Shipping</Nav.Link>
                    <Nav.Link className='type' href="#success">Success</Nav.Link>
                    <Nav.Link className='type' href="#cancelation">Cancelation</Nav.Link>
                    <Nav.Link className='type' href="#rated">Rated</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
    </div>
  )
}

export default TypeNav