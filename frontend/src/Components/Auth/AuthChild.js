import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function AuthChild({
  credentials,
  onChange,
  onSubmit,
  isLogin,
  setIsLogin,
}) {
  return (
    <Row className="justify-content-md-center mt-5">
      {/* Form to register or login */}
      <Col xs={12} md={6}>
        <Form onSubmit={onSubmit}>
          <h2 className="mb-4">{isLogin ? "Login" : "Register"}</h2>
          
          {/* Username Field */}
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Username"
              value={credentials.username}
              onChange={onChange}
              required
            />
          </Form.Group>
          
          {/* Password Field */}
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              value={credentials.password}
              onChange={onChange}
              required
            />
          </Form.Group>

          {/* Address Field (Only for Register) */}
          {!isLogin && (
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter Address"
                value={credentials.address}
                onChange={onChange}
                required
              />
            </Form.Group>
          )}
          
          {/* Submit Button */}
          <Button variant="primary" type="submit" className="w-100">
            {isLogin ? "Login" : "Register"}
          </Button>
          
          {/* Toggle between Login and Register */}
          <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Need to Register?" : "Already Have an Account?"}
          </Button>
          
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
}
