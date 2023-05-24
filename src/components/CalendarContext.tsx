import React, { createContext, useContext, useState } from 'react';
import { addDays, startOfMonth, isSameMonth, Locale, getDay } from 'date-fns';
import { de } from 'date-fns/locale';
import { daysInWeek, DaysInWeekProps } from '../utils/shared';

interface CalendarContextProps extends DaysInWeekProps {
    days: (Date | null)[];
    currentMonth: Date;
    locale: Locale;
    weekdayNames: { day: number; label: string }[];
    daysInPreviousMonth: Date[];
    onCurrentMonthChange: (date: Date) => void;
}

interface CalendarProviderProps {
    children: React.ReactNode;
}

// Create the CalendarContext
const CalendarContext = createContext<CalendarContextProps>(
    {} as CalendarContextProps
);

// Custom hook to consume the CalendarContext
export const useCalendarContext = (): CalendarContextProps =>
    useContext(CalendarContext);

// CalendarProvider component
export const CalendarProvider: React.FC<CalendarProviderProps> = ({
    children
}) => {
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState<Date>(currentDate);
    const locale = de; // Set your desired locale here
    const weekdayNames = daysInWeek({ locale }); // Get the days of the week

    // Generate the days of the previous month to fill the first week of the current month
    const generatePreviousMonthDays = (date: Date): Date[] => {
        const firstDayOfMonth = startOfMonth(date);
        const firstDayOfWeek = getDay(firstDayOfMonth);
        const firstDayOfPreviousMonth = addDays(
            firstDayOfMonth,
            -firstDayOfWeek
        );

        const previousMonthDays: Date[] = [];

        for (let i = 0; i < firstDayOfWeek; i++) {
            const currentDate = addDays(firstDayOfPreviousMonth, i); // Add the current iteration to the first day of the previous month
            previousMonthDays.push(currentDate); // Push the current date to the array
        }

        return previousMonthDays;
    };

    // Generate the days of the current month
    const generateDaysArray = (date: Date): (Date | null)[] => {
        const firstDayOfMonth = startOfMonth(date); // Get the first day of the current month
        const daysInMonth: (Date | null)[] = []; // Create an empty array to hold the days of the month

        let currentDate = firstDayOfMonth;

        // While the current date is in the same month as the first day of the month
        while (isSameMonth(currentDate, firstDayOfMonth)) {
            daysInMonth.push(currentDate); // Push the current date to the array
            currentDate = addDays(currentDate, 1); // Add one day to the current date
        }

        return daysInMonth;
    };

    // Handle the current month change
    const handleCurrentMonthChange = (date: Date) => {
        setCurrentMonth(date); // Set the current month
    };

    const daysInCurrentMonth = generateDaysArray(currentMonth);
    const daysInPreviousMonth = generatePreviousMonthDays(currentMonth);

    // Create the CalendarContext value
    const calendarContextValue: CalendarContextProps = {
        days: [...daysInPreviousMonth, ...daysInCurrentMonth],
        currentMonth,
        locale,
        weekdayNames,
        daysInPreviousMonth,
        onCurrentMonthChange: handleCurrentMonthChange
    };

    return (
        <CalendarContext.Provider value={calendarContextValue}>
            {children}
        </CalendarContext.Provider>
    );
};
