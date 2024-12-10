import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import MoviesContainer from "./Movies/MoviesContainer";
import RestaurantsContainer from "./Restaurants/RestaurantsContainer";
import SportsContainer from "./Sports/SportsContainer";
import Dashboard from "./Dashboard/Dashboard"; // Assuming you have a Dashboard component
import AuthContainer from "./Auth/AuthContainer"
import CalendarContainer from "./Calendar/CalendarContainer";

// ProtectedRoute component
const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const Components = ({ user, setUser, login, register, logout, host, port }) => {
  const isLoggedIn = !!user; // Check if a user is logged in (non-null)
  console.log(user)
  // Logout handler
  const handleLogout = () => {
    logout(); // Call the passed-in logout function
    setUser(null); // Clear the user state
  };

  return (
    <>
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
              <Nav.Link href="/calendar" className="ms-3">Calendar</Nav.Link>
            </Nav>
            {isLoggedIn && (
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<AuthContainer onLogin={login} onRegister={register} />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurants"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <RestaurantsContainer host={host} port={port} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MoviesContainer host={host} port={port} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sports"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SportsContainer host={host} port={port} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CalendarContainer host={host} port={port} user={user}/>
            </ProtectedRoute>
           }
         />

        {/* Redirect to dashboard or login */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
      </Routes>
    </>
  );
};

export default Components;
