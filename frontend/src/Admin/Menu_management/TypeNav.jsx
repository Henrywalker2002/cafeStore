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
                    <Nav.Link className='type' href="#all-items">All items</Nav.Link>
                    <Nav.Link className='type' href="#coffee">Coffee</Nav.Link>
                    <Nav.Link className='type' href="#dessert">Dessert</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
    </div>
  )
}

export default TypeNav