import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './styles/navBar.css'; // Import custom CSS file

export default function NavigationBar() {
  return (
    <div className="navbar-wrapper">
      <Navbar>
        <Container className="justify-content-center">
          <Navbar.Brand href="/">DEVICE HUB</Navbar.Brand>
              <Nav.Link className='ms' href="/addLocation">Add Location</Nav.Link>
        </Container>
      </Navbar>
    </div>
  );
}

