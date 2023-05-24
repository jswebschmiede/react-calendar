import React, { createContext, useContext, useState } from 'react';
import {
    addDays,
    startOfMonth,
    startOfWeek,
    isSameMonth,
    Locale,
    getDay
} from 'date-fns';
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

const CalendarContext = createContext<CalendarContextProps>(
    {} as CalendarContextProps
);

export const useCalendarContext = (): CalendarContextProps =>
    useContext(CalendarContext);

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
    children
}) => {
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState<Date>(currentDate);
    const locale = de; // Set your desired locale here
    const weekdayNames = daysInWeek({ locale });

    const generatePreviousMonthDays = (date: Date) => {
        const firstDayOfMonth = startOfMonth(date);
        const firstDayOfWeek = getDay(firstDayOfMonth);

        // Berechne das Datum des ersten Tages des vorherigen Monats
        const firstDayOfPreviousMonth = addDays(
            firstDayOfMonth,
            -firstDayOfWeek
        );

        const previousMonthDays: Date[] = [];
        let currentDate = firstDayOfPreviousMonth;

        // Generiere die Tage des vorherigen Monats
        for (let i = 0; i < firstDayOfWeek; i++) {
            previousMonthDays.push(currentDate);
            currentDate = addDays(currentDate, 1);
        }

        return previousMonthDays;
    };

    const generateDaysArray = (date: Date) => {
        const firstDayOfMonth = startOfMonth(date);
        const daysInMonth: (Date | null)[] = [];
        let currentDate = firstDayOfMonth;

        while (isSameMonth(currentDate, firstDayOfMonth)) {
            daysInMonth.push(currentDate);
            currentDate = addDays(currentDate, 1);

            if (!isSameMonth(currentDate, firstDayOfMonth)) {
                break; // Beende die Schleife, wenn der nächste Monat beginnt
            }
        }

        return daysInMonth;
    };

    const handleCurrentMonthChange = (date: Date) => {
        setCurrentMonth(date);
    };

    const daysInCurrentMonth = generateDaysArray(currentMonth);
    const daysInPreviousMonth = generatePreviousMonthDays(currentMonth);

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
