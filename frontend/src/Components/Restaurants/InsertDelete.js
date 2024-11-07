import React, { useState } from "react";
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';

const InsertDelete = ({ host, port, action, setResponse }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("cafe");
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages
    const [successMessage, setSuccessMessage] = useState(""); // State for success messages

    const handleSubmit = async () => {
        const dataToSend =
        action === "insert"
            ? {
                method: "insert",
                name,
                type,
                action: "Inserting new restaurant",
            }
            : {
                method: "remove",
                name,
                action: "Deleting restaurant",
            };

        try {
        const res = await fetch(`http://${host}:${port}/api/restaurants`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        });

        if (!res.ok) {
            // Handle the error based on action type
            setErrorMessage(action === 'insert' ? "Restaurant exists" : "Restaurant Not Found");
            setSuccessMessage(""); 
            return; 
        }

        const result = await res.json();

        // Clear previous messages
        setErrorMessage("");
        setSuccessMessage("");

        // Success case
        setResponse(result);
        if (action === "insert") {
            setSuccessMessage("Restaurant added successfully.");
        } else if (action === "remove") {
            setSuccessMessage("Restaurant removed successfully.");
        }
        
        } catch (error) {
        // Network-related errors will be caught here
        setErrorMessage("An error occurred while processing your request.");
        setSuccessMessage(""); 
        }
    };

    return (
        <Container className="mt-4">
        <Row>
            <Col md={12}>
            <Form>
                <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter restaurant name"
                />
                </Form.Group>

                {action === "insert" && (
                <Form.Group controlId="formType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                    as="select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    >
                    <option value="cafe">Cafe</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="sports bar">Sports Bar</option>
                    <option value="fast food">Fast Food</option>
                    <option value="fast food">Wine Bar</option>
                    <option value="fast food">Irish Pub</option>
                    <option value="fast food">Micro-Restaurant</option>
                    <option value="fast food">Bar & Grill</option>
                    </Form.Control>
                </Form.Group>
                )}

                <Button
                onClick={handleSubmit}
                variant="primary"
                size="lg"
                className="w-100"
                >
                {action === "insert" ? "Add Restaurant" : "Remove Restaurant"}
                </Button>
            </Form>
            </Col>
        </Row>

        {errorMessage && (
            <Row className="mt-3">
            <Col md={12}>
                <Alert variant="danger">{errorMessage}</Alert>
            </Col>
            </Row>
        )}

        {successMessage && (
            <Row className="mt-3">
            <Col md={12}>
                <Alert variant="success">{successMessage}</Alert>
            </Col>
            </Row>
        )}
        </Container>
    );
    };

export default InsertDelete;
