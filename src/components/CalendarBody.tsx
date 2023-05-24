import React from 'react';
import { format, isSameMonth } from 'date-fns';
import { chunk } from 'lodash';
import { useCalendarContext } from './CalendarContext';

const CalendarBody: React.FC = () => {
    const { days, locale, weekdayNames, daysInPreviousMonth } =
        useCalendarContext();
    const weeks = Array.isArray(days) ? chunk(days, 7) : [];

    return (
        <div className='calendar__body border-l-2 border-t-2 bg-white'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7'>
                {weekdayNames.map(({ label }) => (
                    <div
                        key={label}
                        className='hidden border-b-2 border-r-2 p-2 lg:block'>
                        {label}
                    </div>
                ))}
            </div>

            {weeks.map((week, weekIndex) => (
                <div
                    key={weekIndex}
                    className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7'>
                    {week.map((day) =>
                        day ? (
                            <div
                                key={day.toISOString()}
                                className={`h-48 border-b-2 border-r-2 p-2 ${
                                    isSameMonth(day, Number(days[0])) &&
                                    daysInPreviousMonth.length !== 0
                                        ? 'bg-gray-100 text-gray-500'
                                        : 'bg-white text-black'
                                }`}
                                aria-label={`Events for day ${format(
                                    day,
                                    'd'
                                )}`}>
                                <div className='flex justify-between'>
                                    <div className='font-bold'>
                                        {format(day, 'd')}
                                    </div>
                                    <div className='block lg:hidden'>
                                        {format(day, 'EEEE', { locale })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div key='empty' />
                        )
                    )}
                </div>
            ))}
        </div>
    );
};

export { CalendarBody };
