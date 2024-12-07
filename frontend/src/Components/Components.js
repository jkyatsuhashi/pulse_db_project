import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from "react-bootstrap";
import MoviesContainer from "./Movies/MoviesContainer";
import RestaurantsContainer from "./Restaurants/RestaurantsContainer";
import SportsContainer from "./Sports/SportsContainer";
import Dashboard from "./Dashboard/Dashboard"; // Assuming you have a Dashboard component

const Components = () => {
  const host = 'db8.cse.nd.edu';
  const port = '5071';

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">My Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className="ms-3">Dashboard</Nav.Link>
              <Nav.Link href="/restaurants" className="ms-3">Restaurants</Nav.Link>
              <Nav.Link href="/movies" className="ms-3">Movies</Nav.Link>
              <Nav.Link href="/sports" className="ms-3">Sports</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/restaurants" element={<RestaurantsContainer host={host} port={port} />} />
        <Route path="/movies" element={<MoviesContainer host={host} port={port} />} />
        <Route path="/sports" element={<SportsContainer host={host} port={port} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default Components;
