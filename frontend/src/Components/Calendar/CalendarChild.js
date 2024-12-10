import React, { useState } from 'react';
import { Calendar, Radio, Typography } from 'antd';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WeekView from './components/WeekView/WeekView';
import DateCellRender from './components/DateCell/DateCellRender.js';

const { Text } = Typography;

const CalendarChild = ({ events = [] }) => {
    const [view, setView] = useState('month');
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();

    const handleEventClick = (event) => {
        navigate(`/event/${event.event_user_id}`, { state: { event } });
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleViewChange = (e) => {
        const newView = e.target.value;
        setView(newView);
        setSelectedDate(null);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] min-h-[600px]">
            <div className="mb-4 p-4 bg-white border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 mb-3">
                        <CalendarIcon className="h-6 w-6 text-blue-500" />
                        <Text strong>Event Calendar</Text>
                    </div>
                    <Radio.Group value={view} onChange={handleViewChange}>
                        <Radio.Button value="month">Month</Radio.Button>
                        <Radio.Button value="week">Week</Radio.Button>
                    </Radio.Group>
                </div>
            </div>

            <div className="flex-grow overflow-auto p-4">
                {view === 'month' ? (
                    <Calendar
                        className="h-full"
                        cellRender={(value, info) => {
                            if (info.type === 'date') {
                                return (
                                    <DateCellRender 
                                        value={value} 
                                        events={events} 
                                        handleEventClick={handleEventClick}
                                    />
                                );
                            }
                            return info.originNode;
                        }}
                        fullscreen={true}
                        onSelect={handleDateSelect}
                        value={selectedDate}
                    />
                ) : (
                    <WeekView 
                        events={events} 
                        onEventClick={handleEventClick}
                        selectedDate={selectedDate}
                    />
                )}
            </div>
        </div>
    );
};

export default CalendarChild;
