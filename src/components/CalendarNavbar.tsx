import React from 'react';
import { useCalendarContext } from './CalendarContext';
import { format, subMonths, addMonths } from 'date-fns';

const CalendarNavbar: React.FC = () => {
    const { currentMonth, onCurrentMonthChange, locale } = useCalendarContext();

    const handlePreviousMonth = () => {
        const previousMonth = subMonths(currentMonth, 1); // Subtract a month from the current month
        onCurrentMonthChange(previousMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = addMonths(currentMonth, 1); // Add a month to the current month
        onCurrentMonthChange(nextMonth);
    };

    return (
        <div className='flex items-center justify-between'>
            <button onClick={handlePreviousMonth}>{'<'}</button>
            <div>{format(currentMonth, 'MMMM yyyy', { locale })}</div>
            <button onClick={handleNextMonth}>{'>'}</button>
        </div>
    );
};

export { CalendarNavbar };
