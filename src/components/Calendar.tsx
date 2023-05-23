import React from 'react';
import { CalendarProvider } from './CalendarContext';

interface CalendarProps {
    locale?: Locale;
    children: React.ReactNode;
}

const Calendar: React.FC<CalendarProps> = ({ locale, children }) => {
    return (
        <CalendarProvider>
            <div className='calendar'>{children}</div>
        </CalendarProvider>
    );
};

export { Calendar };
