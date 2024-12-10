import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';

const CalendarParent = ({ userId, host, port }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadEventData = async () => {
            if (!userId) {
                setEvents([]);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://${host}:${port}/api/calendar`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        method: 'get',
                        user_id: userId
                    })
                });

                if (!response.ok) {
                    throw new Error(`Error fetching events: ${response.statusText}`);
                }

                const data = await response.json();

                if (data.events) {
                    setEvents(data.events);
                } else if (data.error) {
                    setError(data.error);
                } else if (data.message) {
                    setEvents([]);
                }
            } catch (error) {
                console.error('Error loading event data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadEventData();
    }, [userId, host, port]);

    if (!userId) {
        return (
            <Card className="w-full h-96 flex items-center justify-center">
                Please log in to view your calendar.
            </Card>
        );
    }

    if (loading) {
        return (
            <Card className="w-full h-96 flex items-center justify-center">
                <Spin size="large" />
            </Card>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const CalendarChild = require('./CalendarChild').default;

    return (
        <CalendarChild events={events} />
    );
};

export default CalendarParent;
