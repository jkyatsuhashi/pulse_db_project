import React, { useState } from 'react';
import GetComponent from './GetComponent';
import InsertDelete from './InsertDelete.js';
import UpdateSport from './UpdateSport';
import { Container, Row, Col, Form } from 'react-bootstrap';

export default function SportsParent({ host, port }) {
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
                            <option value="insert">Insert Sporting Event</option>
                            <option value="remove">Remove Sporting Event</option>
                            <option value="get">Get Todays Events</option>
                            <option value="update">Update Sporting Event</option> 
                        </Form.Control>
                    </Form.Group>
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
