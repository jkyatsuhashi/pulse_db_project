import React, { useState } from "react";
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';

const InsertDelete = ({ host, port, action, setResponse }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("cafe");
    const [position, setPosition] = useState("");
    const [score, setScore] = useState("");
    const [ratings, setRatings] = useState("");
    const [category, setCategory] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [fullAddress, setFullAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async () => {
        const dataToSend = action === "insert"
            ? {
                method: "insert",
                name,
                type,
                position: position || null,
                score: score || null,
                ratings: ratings || null,
                category: category || null,
                price_range: priceRange || null,
                full_address: fullAddress || null,
                zip_code: zipCode || null,
                lat: lat || null,
                lng: lng || null,
            }
            : {
                method: "remove",
                name,
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
                            <>
                                <Form.Group controlId="formType">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="cafe">Cafe</option>
                                        <option value="restaurant">Restaurant</option>
                                        {/* Add other options here */}
                                    </Form.Control>
                                </Form.Group>
                                
                                <Form.Group controlId="formPosition">
                                    <Form.Label>Position</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                        placeholder="Enter position"
                                    />
                                </Form.Group>
                                
                                <Form.Group controlId="formScore">
                                    <Form.Label>Score</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.1"
                                        value={score}
                                        onChange={(e) => setScore(e.target.value)}
                                        placeholder="Enter score"
                                    />
                                </Form.Group>
                                
                                <Form.Group controlId="formRatings">
                                    <Form.Label>Ratings</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={ratings}
                                        onChange={(e) => setRatings(e.target.value)}
                                        placeholder="Enter number of ratings"
                                    />
                                </Form.Group>
                                
                                <Form.Group controlId="formCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        placeholder="Enter category"
                                    />
                                </Form.Group>
                                
                                <Form.Group controlId="formPriceRange">
                                    <Form.Label>Price Range</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(e.target.value)}
                                        placeholder="Enter price range"
                                    />
                                </Form.Group>
                                
                                <Form.Group controlId="formFullAddress">
                                    <Form.Label>Full Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={fullAddress}
                                        onChange={(e) => setFullAddress(e.target.value)}
                                        placeholder="Enter full address"
                                    />
                                </Form.Group>
                                
                                <Form.Group controlId="formZipCode">
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                        placeholder="Enter zip code"
                                    />
                                </Form.Group>
                                
                                <Form.Group controlId="formLat">
                                    <Form.Label>Latitude</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.0001"
                                        value={lat}
                                        onChange={(e) => setLat(e.target.value)}
                                        placeholder="Enter latitude"
                                    />
                                </Form.Group>
                                
                                <Form.Group controlId="formLng">
                                    <Form.Label>Longitude</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.0001"
                                        value={lng}
                                        onChange={(e) => setLng(e.target.value)}
                                        placeholder="Enter longitude"
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
