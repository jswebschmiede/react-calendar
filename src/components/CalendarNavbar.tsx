import React from 'react';
import { useCalendarContext } from './CalendarContext';

const CalendarNavbar: React.FC = () => {
    const { locale } = useCalendarContext();

    // Restlicher Code für CalendarNavbar

    return (
        <div className='calendar__navbar'>
            {/* Render CalendarNavbar mit dem locale-Prop */}
        </div>
    );
};

export { CalendarNavbar };
