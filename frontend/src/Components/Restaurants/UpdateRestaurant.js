import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function UpdateRestaurant({ host, port, setResponse }) {
    const [restaurantData, setRestaurantData] = useState({
        name: '',
        position: '',
        score: '',
        ratings: '',
        category: '',
        price_range: '',
        full_address: '',
        zip_code: '',
        lat: '',
        lng: '',
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

                <Form.Group controlId="formPosition">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                        type="number"
                        name="position"
                        value={restaurantData.position}
                        onChange={handleInputChange}
                        placeholder="Enter Position"
                    />
                </Form.Group>

                <Form.Group controlId="formScore">
                    <Form.Label>Score</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.1"
                        name="score"
                        value={restaurantData.score}
                        onChange={handleInputChange}
                        placeholder="Enter Score"
                    />
                </Form.Group>

                <Form.Group controlId="formRatings">
                    <Form.Label>Ratings</Form.Label>
                    <Form.Control
                        type="number"
                        name="ratings"
                        value={restaurantData.ratings}
                        onChange={handleInputChange}
                        placeholder="Enter Ratings"
                    />
                </Form.Group>

                <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={restaurantData.category}
                        onChange={handleInputChange}
                        placeholder="Enter Category"
                    />
                </Form.Group>

                <Form.Group controlId="formPriceRange">
                    <Form.Label>Price Range</Form.Label>
                    <Form.Control
                        type="text"
                        name="price_range"
                        value={restaurantData.price_range}
                        onChange={handleInputChange}
                        placeholder="Enter Price Range"
                    />
                </Form.Group>

                <Form.Group controlId="formFullAddress">
                    <Form.Label>Full Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="full_address"
                        value={restaurantData.full_address}
                        onChange={handleInputChange}
                        placeholder="Enter Full Address"
                    />
                </Form.Group>

                <Form.Group controlId="formZipCode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        type="text"
                        name="zip_code"
                        value={restaurantData.zip_code}
                        onChange={handleInputChange}
                        placeholder="Enter Zip Code"
                    />
                </Form.Group>

                <Form.Group controlId="formLat">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.000001"
                        name="lat"
                        value={restaurantData.lat}
                        onChange={handleInputChange}
                        placeholder="Enter Latitude"
                    />
                </Form.Group>

                <Form.Group controlId="formLng">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.000001"
                        name="lng"
                        value={restaurantData.lng}
                        onChange={handleInputChange}
                        placeholder="Enter Longitude"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update Restaurant
                </Button>
            </Form>
        </div>
    );
}
