import React, { useState } from 'react';
import GetComponent from './GetComponent';
import InsertDelete from './InsertDelete';
import UpdateRestaurant from './UpdateRestaurant';
import { Container, Row, Col, Form } from 'react-bootstrap';

export default function RestaurantsParent({ host, port }) {
    const [response, setResponse] = useState(null);
    const [action, setAction] = useState("insert");

    return (
        <div className="gradient-background">
            <style>
                {`
                    /* Ombre background with animation */
                    .gradient-background {
                        background: linear-gradient(135deg, #050404, #AFBBF2, #A4508B, #5F0A87, #2F004F);
                        background-size: 400% 400%;
                        animation: gradientAnimation 15s ease infinite;
                        min-height: 100vh; /* Ensure full viewport height */
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 2rem;
                    }

                    @keyframes gradientAnimation {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                  

                    .header-bar {
                        margin-bottom: 1.5rem;
                        text-align: center;
                    }

                    .action-bar {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 2rem;
                    }

                    .action-bar select {
                        width: 300px;
                        height: 40px;
                        border-radius: 5px;
                        border: 1px solid #ced4da;
                        padding: 0.5rem;
                    }

                    .action-bar label {
                        margin-right: 10px;
                        color: white;
                    }
                `}
            </style>

            {/* Header */}
            <div className="header-bar">
                <h3 style={{ color: "white" }}>Manage Restaurants</h3>
            </div>

            {/* Action Dropdown */}
            <div className="action-bar">
                <Form.Label htmlFor="formAction">Action:</Form.Label>
                <Form.Control
                    as="select"
                    id="formAction"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    style={{ textAlign: "center", textAlignLast: "center" }}
                >
                    <option value="insert">Insert Restaurant</option>
                    <option value="remove">Remove Restaurant</option>
                    <option value="get">Get Restaurants</option>
                    <option value="update">Update Restaurant</option>
                </Form.Control>
            </div>

            {/* Inner Container */}
            <Container className="restaurants-container">
                <Row>
                    <Col md={12}>
                        {action === "get" ? (
                            <GetComponent host={host} port={port} setResponse={setResponse} />
                        ) : action === "update" ? (
                            <UpdateRestaurant host={host} port={port} setResponse={setResponse} />
                        ) : (
                            <InsertDelete host={host} port={port} action={action} setResponse={setResponse} />
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}