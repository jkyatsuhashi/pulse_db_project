import React from 'react';
import dayjs from 'dayjs';

const DateCellRender = ({ value, events, handleEventClick }) => {
    const cellDate = value.format('YYYY-MM-DD');
    const dailyEvents = events.filter(evt => evt.date === cellDate);

    return (
        <div style={{ minHeight: '50px' }}>
            {dailyEvents.map((evt, index) => (
                <div
                    key={index}
                    style={{ background: '#e6f7ff', marginBottom: '2px', padding: '2px', cursor: 'pointer' }}
                    onClick={() => handleEventClick(evt)}
                >
                    {evt.title || 'Untitled Event'}
                </div>
            ))}
        </div>
    );
};

export default DateCellRender;
