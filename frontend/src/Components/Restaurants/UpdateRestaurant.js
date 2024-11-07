import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function UpdateRestaurant({ host, port, setResponse }) {
    const [restaurantData, setRestaurantData] = useState({
        name: '',
        type: '',
    });
    const [status, setStatus] = useState(null); // For displaying success or error messages

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRestaurantData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            method: "update",
            ...restaurantData,
        };

        try {
            const response = await fetch(`http://${host}:${port}/api/restaurants`, {
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
        } catch (error) {
            setResponse({ error: "Network error: " + error.message });
            setStatus({ type: 'error', message: "Network error: " + error.message });
        }
    };

    return (
        <div>
            <h4>Update Restaurant</h4>
            
            {/* Display success or error messages */}
            {status && (
                <Alert variant={status.type === 'success' ? 'success' : 'danger'} onClose={() => setStatus(null)} dismissible>
                    {status.message}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formRestaurantName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={restaurantData.name}
                        onChange={handleInputChange}
                        placeholder="Enter Restaurant Name"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formRestaurantType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        type="text"
                        name="type"
                        value={restaurantData.type}
                        onChange={handleInputChange}
                        placeholder="Enter Restaurant Type"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update Restaurant
                </Button>
            </Form>
        </div>
    );
}
