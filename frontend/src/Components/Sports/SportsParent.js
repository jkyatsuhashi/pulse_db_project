import React, { useState } from 'react';
import GetComponent from './GetComponent';
import InsertDelete from './InsertDelete.js';
import UpdateSport from './UpdateSport';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function SportsParent({ host, port }) {
    const [response, setResponse] = useState(null);
    const [action, setAction] = useState("insert");

    return (
        <Container fluid className="gradient-background d-flex justify-content-center align-items-center min-vh-100">
            <style>
                {`
                    /* Ombre background with animation */
                    .gradient-background {
                        background: linear-gradient(135deg, #004E98, #89DAFF, #BA274A, white);
                        background-size: 400% 400%;
                        animation: gradientAnimation 15s ease infinite;
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    @keyframes gradientAnimation {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    /* Form container styles */
                    .form-container {
                        background: rgba(255, 255, 255, 0.7);
                        backdrop-filter: blur(10px);
                        border-radius: 15px;
                        padding: 2rem;
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                        width: 80%;
                        max-width: 900px;
                    }

                    .form-container h3 {
                        text-align: center;
                        margin-bottom: 1.5rem;
                    }

                    .form-container input, .form-container select {
                        height: 45px;
                        border-radius: 5px;
                        border: 1px solid #ced4da;
                        padding: 0.5rem 1rem;
                        margin-bottom: 1rem;
                        width: 100%;
                    }

                    .form-container input:focus, .form-container select:focus {
                        border-color: #007bff;
                        outline: none;
                        box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
                    }

                    .form-container button {
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        height: 45px;
                        transition: background-color 0.3s ease;
                        width: 100%;
                    }

                    .form-container button:hover {
                        background-color: #0056b3;
                    }

                    .alert-container {
                        margin-top: 1rem;
                    }
                `}
            </style>

            <Row className="form-container">
                <Col md={12}>
                    <h3 className="text-primary mb-4">Manage Sports</h3>

                    {/* Action Selection */}
                    <Form.Group controlId="formAction">
                        <Form.Label>Action</Form.Label>
                        <Form.Control
                            as="select"
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                            className="mb-4"
                        >
                            <option value="insert">Insert Sporting Event</option>
                            <option value="remove">Remove Sporting Event</option>
                            <option value="get">Get Todays Events</option>
                            <option value="update">Update Sporting Event</option> 
                        </Form.Control>
                    </Form.Group>

                    {/* Render components based on selected action */}
                    {action === "get" ? ( 
                        <GetComponent host={host} port={port} setResponse={setResponse} />) : 
                        action === "update" ? (
                        <UpdateSport host={host} port={port} setResponse={setResponse} /> ) : (
                        <InsertDelete host={host} port={port} action={action} setResponse={setResponse} />
                    )}
                </Col>
            </Row>
        </Container>
    );
}
