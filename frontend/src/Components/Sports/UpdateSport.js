import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function UpdateRestaurant({ host, port, setResponse }) {
    const [sportData, setSportData] = useState({
        homeTeam: '',
        opponent: '',
        sportType: '',
        date: '',
        location: '',
    });
    const [status, setStatus] = useState(null); // For displaying success or error messages

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSportData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            method: "update",
            ...sportData,
        };

        try {
            const response = await fetch(`http://${host}:${port}/api/sports`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();
            if (response.ok) {
                setResponse(result);
                setStatus({ type: 'success', message: 'Restaurant updated successfully!' });
            } else {
                setResponse({ error: result.error || "An error occurred" });
                setStatus({ type: 'error', message: result.error || "An error occurred during the update." });
            }
        } catch (error) {console.log(error)
            setResponse({ error: "Network error: " + error.message });
            setStatus({ type: 'error', message: "Network error: " + error.message });
        }
    };

    return (
        <div>
            <h4>Update Sporting Event</h4>
            
            {/* Display success or error messages */}
            {status && (
                <Alert variant={status.type === 'success' ? 'success' : 'danger'} onClose={() => setStatus(null)} dismissible>
                    {status.message}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formSportType">
                    <Form.Label>Sport Type</Form.Label>
                    <Form.Control
                        type="text"
                        name="sportType"
                        value={sportData.sportType}
                        onChange={handleInputChange}
                        placeholder="Enter Sport Type"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="forHomeTeam">
                    <Form.Label>Home Team</Form.Label>
                    <Form.Control
                        type="text"
                        name="homeTeam"
                        value={sportData.homeTeam}
                        onChange={handleInputChange}
                        placeholder="Enter HomeTeam"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formOpponent">
                    <Form.Label>Opponent</Form.Label>
                    <Form.Control
                        type="text"
                        name="opponent"
                        value={sportData.opponent}
                        onChange={handleInputChange}
                        placeholder="Enter Opponent"
                    />
                </Form.Group>

                <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        value={sportData.location}
                        onChange={handleInputChange}
                        placeholder="Enter Location"
                    />
                </Form.Group>

                <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        value={sportData.date}
                        onChange={handleInputChange}
                        placeholder="Enter Date"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update Sport
                </Button>
            </Form>
        </div>
    );
}
