import React from 'react';
import dayjs from 'dayjs';
import { Button } from 'antd';

const DateCellRender = ({ value, events, handleEventClick, onRemoveEvent }) => {
    const cellDate = value.format('YYYY-MM-DD');
    const dailyEvents = events.filter(evt => evt.date === cellDate);

    return (
        <div style={{ minHeight: '50px' }}>
            {dailyEvents.map((evt, index) => (
                <div
                    key={index}
                    style={{ background: '#e6f7ff', marginBottom: '2px', padding: '2px', cursor: 'pointer' }}
                    //onClick={() => handleEventClick(evt)} 
                >
                    {evt.title || 'Untitled Event'}
                    <Button
                     onClick={() => onRemoveEvent(evt)}
                     style={{ marginLeft: '8px', color: 'red'}}
                    >
                     Remove
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default DateCellRender;
