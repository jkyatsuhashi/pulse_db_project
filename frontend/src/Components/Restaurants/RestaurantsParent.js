import React, { useState } from 'react';
import GetComponent from './GetComponent';
import InsertDelete from './InsertDelete';
import UpdateRestaurant from './UpdateRestaurant';
import { Container, Row, Col, Form } from 'react-bootstrap';

export default function RestaurantsParent({ host, port }) {
    const [response, setResponse] = useState(null);
    const [action, setAction] = useState("insert");

    return (
        <Container className="mt-5">
            <Row>
                <Col md={12}>
                    <h3 className="text-center text-primary mb-4">Manage Restaurants</h3>

                    {/* Action Selection */}
                    <Form.Group controlId="formAction">
                        <Form.Label>Action</Form.Label>
                        <Form.Control
                            as="select"
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                            className="mb-4"
                        >
                            <option value="insert">Insert Restaurant</option>
                            <option value="remove">Remove Restaurant</option>
                            <option value="get">Get Restaurants</option>
                            <option value="update">Update Restaurant</option> 
                        </Form.Control>
                    </Form.Group>
                    {action === "get" ? ( 
                    <GetComponent host={host} port={port} setResponse={setResponse} />) : 
                    action === "update" ? (
                    <UpdateRestaurant host={host} port={port} setResponse={setResponse} /> ) : (
                    <InsertDelete host={host} port={port} action={action} setResponse={setResponse} />
                    )}
                </Col>
            </Row>
        </Container>
    );
}
