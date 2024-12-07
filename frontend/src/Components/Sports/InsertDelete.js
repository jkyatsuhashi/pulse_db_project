import React, { useState } from "react";
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';

const InsertDelete = ({ host, port, action, setResponse }) => {
    const [homeTeam, setHomeTeam] = useState("");
    const [opponent, setOpponent] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [sportType, setSportType] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async () => {
        const dataToSend = action === "insert"
            ? {
                method: "insert",
                homeTeam,
                opponent,
                location,
                date,
                sportType
                
            }
            : {
                method: "remove",
                homeTeam,
                sportType,
                date
            };

        try {
            const res = await fetch(`http://${host}:${port}/api/sports`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (!res.ok) {
                setErrorMessage(action === 'insert' ? "Restaurant exists" : "Restaurant Not Found");
                setSuccessMessage(""); 
                return; 
            }

            const result = await res.json();
            setErrorMessage("");
            setSuccessMessage("");
            setResponse(result);
            setSuccessMessage(action === "insert" ? "Restaurant added successfully." : "Restaurant removed successfully.");
        } catch (error) {
            setErrorMessage("An error occurred while processing your request.");
            setSuccessMessage(""); 
        }
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col md={12}>
                    <Form>
                        <Form.Group controlId="formHomeTeam">
                            <Form.Label>Home Team</Form.Label>
                            <Form.Control
                                type="text"
                                value={homeTeam}
                                onChange={(e) => setHomeTeam(e.target.value)}
                                placeholder="Enter home team"
                            />
                        </Form.Group>
                        <Form.Group controlId="formDate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        placeholder="Enter date"
                                    />
                        </Form.Group>
                        <Form.Group controlId="formType">
                                    <Form.Label>Sport Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={sportType}
                                        onChange={(e) => setSportType(e.target.value)}
                                        placeholder="Enter sport type"
                                    />
                        </Form.Group>

                        {action === "insert" && (
                            <>
                                <Form.Group controlId="formOpponent">
                                    <Form.Label>Opponent</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={opponent}
                                        onChange={(e) => setOpponent(e.target.value)}
                                        placeholder="Enter Opponent"
                                    >
                                    </Form.Control>
                                </Form.Group>
                                
                                <Form.Group controlId="formLocation">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Enter location"
                                    />
                                </Form.Group>
                            </>
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
