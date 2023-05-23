import { createContext, useContext, useState } from 'react';
import { addDays } from 'date-fns';
import { de } from 'date-fns/locale';

interface CalendarContextProps {
    days: (Date | null)[];
    currentMonth: Date;
    locale?: Locale;
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
    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    );
    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();
    const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
    const totalDays = daysInMonth + startOffset;

    const days = Array.from({ length: totalDays }, (_, index) =>
        index >= startOffset
            ? addDays(firstDayOfMonth, index - startOffset)
            : null
    );

    const [currentMonth, setCurrentMonth] = useState<Date>(currentDate);

    const handleCurrentMonthChange = (date: Date) => {
        setCurrentMonth(date);
    };

    const calendarContextValue: CalendarContextProps = {
        days,
        currentMonth,
        locale: de, // Set your desired locale here
        onCurrentMonthChange: handleCurrentMonthChange
    };

    return (
        <CalendarContext.Provider value={calendarContextValue}>
            {children}
        </CalendarContext.Provider>
    );
};
