import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, ListGroup, Button, Card } from "react-bootstrap";
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

export default function EventDetail() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const event = location.state?.event;
    const host = "db8.cse.nd.edu";
    const port = 5077;

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://${host}:${port}/api/event`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        eventId: event.event_id
                    })
                });
                
                const data = await response.json();
                
                if (data.status === "success") {
                    // Note: using 'message' instead of 'response'
                    setUsers(data.message);
                    
                    // Find the current user based on the user_id passed in event state
                    const currentUserData = data.message.find(
                        user => user.user_id === event.user_id
                    );
                    
                    setCurrentUser(currentUserData || null);
                } else {
                    console.error("Error fetching users:", data);
                }
            } catch (error) {
                console.error("Error fetching event users:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (event?.event_id) {
            loadData();
        }
    }, [event?.event_id]);

    const handleAttendanceToggle = async () => {
        if (!currentUser) return;

        try {
            const response = await fetch(`http://${host}:${port}/api/event`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    method: "update",
                    eventId: event.event_id,
                    userId: currentUser.user_id,
                    isAttending: currentUser.is_attending ? 0 : 1
                })
            });

            const data = await response.json();

            if (data.status === "success") {
                // Update local state to reflect the change
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user.user_id === currentUser.user_id 
                            ? {...user, is_attending: user.is_attending ? 0 : 1} 
                            : user
                    )
                );
                
                // Update current user state
                setCurrentUser(prev => ({
                    ...prev,
                    is_attending: prev.is_attending ? 0 : 1
                }));
            }
        } catch (error) {
            console.error("Error updating attendance:", error);
        }
    };

    if (isLoading) {
        return <Container className="mt-4">Loading...</Container>;
    }

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h2">{event?.event_name || "Event Details"}</Card.Header>
                <Card.Body>
                    <h3>Attendees</h3>
                    <ListGroup>
                        {users.map(user => (
                            <ListGroup.Item 
                                key={user.user_id} 
                                className="d-flex justify-content-between align-items-center"
                            >
                                {user.username}
                                {user.is_attending === 1 ? (
                                    <CheckCircleFill color="green" />
                                ) : (
                                    <XCircleFill color="red" />
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    {currentUser && (
                        <div className="mt-3">
                            <h4>Your Attendance</h4>
                            <Button 
                                variant={currentUser.is_attending ? "danger" : "success"}
                                onClick={handleAttendanceToggle}
                            >
                                {currentUser.is_attending ? "Not Going" : "I'm Going"}
                            </Button>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}