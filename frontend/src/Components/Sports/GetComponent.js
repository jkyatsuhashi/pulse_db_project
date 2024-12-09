import React, { useState } from "react";
import { Button, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const GetComponent = ({ host, port, setResponse }) => {
  const [sports, setSports] = useState([]);

  const fetchSports = async () => {
    try {
      const res = await fetch(`http://${host}:${port}/api/sports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: 'get',
          action: 'Getting list of sports'
        }),
      });
  
      const result = await res.json();
      console.log(result)
      setResponse(result);
      setSports(result.message)
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };
  

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12} className="text-center">
          <Button 
            onClick={fetchSports} 
            variant="primary" 
            size="lg"
          >
            Get Sports
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <h2 className="text-center">Sporting Events Today</h2>
          {sports.length > 0 && (
            <Card className="mt-4">
              <Card.Body>
                <Card.Title className="text-center">Sports</Card.Title>
                <ListGroup variant="flush">
                  {sports.map((sport, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                      <span className="font-weight-bold">{sport.home_team}</span>
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
