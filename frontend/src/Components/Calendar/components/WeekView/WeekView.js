import React from 'react';
import dayjs from 'dayjs';

const WeekView = ({ events = [], onEventClick, selectedDate }) => {
    const current = selectedDate ? dayjs(selectedDate) : dayjs();
    const startOfWeek = current.startOf('week');
    const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                {days.map(day => (
                    <div key={day.format('YYYY-MM-DD')} style={{ flex: 1, border: '1px solid #ddd', padding: '8px' }}>
                        <strong>{day.format('ddd, MMM D')}</strong>
                        <br />
                        {events
                            .filter(evt => evt.date === day.format('YYYY-MM-DD'))
                            .map((evt, idx) => (
                                <div
                                    key={idx}
                                    style={{ background: '#e6f7ff', marginTop: '4px', padding: '2px', cursor: 'pointer' }}
                                    onClick={() => onEventClick(evt)}
                                >
                                    {evt.title || 'Untitled Event'}
                                </div>
                            ))
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekView;
