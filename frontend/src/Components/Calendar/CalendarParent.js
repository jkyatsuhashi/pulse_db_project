import React, { useEffect, useState, useCallback } from 'react';
import { Card, Spin, Button } from 'antd';
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs';
import AddEventModal from './AddEventModal';

const CalendarParent = ({ userId, host, port }) => {
    const location = useLocation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const showAddEventModal = () => setIsModalVisible(true);
    const hideAddEventModal = () => setIsModalVisible(false);
    
    const loadEventData = useCallback(async () => {
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
            console.log(data)

            if (data.events) {
                const normalizedEvents = data.events.map(evt => ({
                    ...evt,
                    date: dayjs(evt.date).format('YYYY-MM-DD')
                }));
                setEvents(normalizedEvents);
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
    }, [userId, host, port]);

    useEffect(() => {
        loadEventData();
    }, [userId, host, port, location, loadEventData]);

    const handleAddEvent = async (newEvent) => {
        try {
            const response = await fetch(`http://${host}:${port}/api/calendar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    method: "insert",
                    user_id: userId,
                    location: newEvent.location,
                    date: newEvent.date,
                    title: newEvent.title,
                    type: newEvent.type
                })
            });

            const data = await response.json();
            if (data.message === "Event added successfully") {
                await loadEventData();
            } else if (data.error) {
                setError(data.error);
            }
        } catch (err) {
            console.error('Error adding event:', err);
            setError('Failed to add event');
        } finally {
            hideAddEventModal();
        }
    };

    const handleRemoveEvent = async (eventToRemove) => {
        const { location, date } = eventToRemove;

        try {
            const response = await fetch(`http://${host}:${port}/api/calendar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    method: "remove",
                    user_id: userId,
                    location: location,
                    date: date
                })
            });

            const data = await response.json();
            if (data.message && data.message.includes("deleted successfully")) {
                await loadEventData();
            } else if (data.error) {
                setError(data.error);
            }
        } catch (err) {
            console.error('Error removing event:', err);
            setError('Failed to remove event.');
        }
    };

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
        <div>
            {/* Add Event Button and Modal */}
            <Button onClick={showAddEventModal} style={{ marginBottom: '16px' }}>
                Add Event
            </Button>
            <AddEventModal
                visible={isModalVisible}
                onCancel={hideAddEventModal}
                onAddEvent={handleAddEvent}
            />

            <CalendarChild events={events} onRemoveEvent={handleRemoveEvent}/>
        </div>
    );
};

export default CalendarParent;
