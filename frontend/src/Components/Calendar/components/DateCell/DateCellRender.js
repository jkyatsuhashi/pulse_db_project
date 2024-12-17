const DateCellRender = ({ value, events, handleEventClick, onRemoveEvent }) => {
    const dayEvents = events.filter(event => event.date === value.format('YYYY-MM-DD'));

    const handleRemoveClick = (event, e) => {
        e.stopPropagation(); // Prevent event click handler from being triggered
        onRemoveEvent(event);
    };

    return (
        <div>
            {dayEvents.map(event => (
                <div key={event.event_id} className="event-item">
                    <div
                        onClick={(e) => handleEventClick(event, e)} 
                        className="event-details"
                    >
                        {event.title}
                    </div>
                    <button 
                        onClick={(e) => handleRemoveClick(event, e)} 
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
};
export default DateCellRender
