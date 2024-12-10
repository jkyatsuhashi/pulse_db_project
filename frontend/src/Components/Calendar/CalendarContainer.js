import React from 'react';
import CalendarParent from './CalendarParent';

const CalendarContainer = ({ user, host, port }) => {
    if (!user || !user.userId) {
      return <div>Please log in to view your calendar.</div>;
    }
  
    const currentUserId = user.userId;
  
    return (
      <CalendarParent userId={currentUserId} host={host} port={port} />
    );
  };

export default CalendarContainer;
