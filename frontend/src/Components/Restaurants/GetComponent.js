import React, { useState } from "react";
import { Button, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const GetComponent = ({ host, port, setResponse }) => {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const res = await fetch(`http://${host}:${port}/api/restaurants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: 'get',
          action: 'Getting list of restaurants'
        }),
      });
  
      const result = await res.json();
      console.log(result)
      setResponse(result);
  
      if (Array.isArray(result.message)) {
        const sortedRestaurants = [...result.message].sort((a, b) => a.av - b.av);
        setRestaurants(sortedRestaurants);
      } else {
        console.error("Expected result.message to be an array");
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };
  

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12} className="text-center">
          <Button 
            onClick={fetchRestaurants} 
            variant="primary" 
            size="lg"
          >
            Get Restaurants
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <h2 className="text-center">Most Affordable Options</h2>
          {restaurants.length > 0 && (
            <Card className="mt-4">
              <Card.Body>
                <Card.Title className="text-center">Top 20 Cheap Options</Card.Title>
                <ListGroup variant="flush">
                  {restaurants.map((restaurant, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                      <span className="font-weight-bold">{restaurant.name}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GetComponent;
