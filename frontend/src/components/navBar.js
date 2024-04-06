import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './styles/navBar.css'; // Import custom CSS file

export default function NavigationBar() {
  return (
    <div className="navbar-wrapper">
      <Navbar>
        <Container className="justify-content-center">
          <Navbar.Brand href="/">DEVICE HUB</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className='ms-4' href="/">Location</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

