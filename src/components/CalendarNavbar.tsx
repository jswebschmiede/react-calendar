import React from 'react';
import { useCalendarContext } from './CalendarContext';
import { format, subMonths, addMonths } from 'date-fns';

const CalendarNavbar: React.FC = () => {
    const { currentMonth, onCurrentMonthChange, locale } = useCalendarContext();

    const handlePreviousMonth = () => {
        const previousMonth = subMonths(currentMonth, 1);
        onCurrentMonthChange(previousMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = addMonths(currentMonth, 1);
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
