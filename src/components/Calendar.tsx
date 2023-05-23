import React from 'react';
import { CalendarProvider } from './CalendarContext';

interface CalendarProps {
    children: React.ReactNode;
}

const Calendar: React.FC<CalendarProps> = ({ children }) => {
    return (
        <CalendarProvider>
            <div className='calendar'>{children}</div>
        </CalendarProvider>
    );
};

export { Calendar };
