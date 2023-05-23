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

// eslint-disable-next-line
export const useCalendarContext = (): CalendarContextProps =>
    useContext(CalendarContext);

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
    children
}) => {
    const currentDate = new Date(); // Get current date
    const firstDayOfMonth = new Date(
        currentDate.getFullYear(), // Get year
        currentDate.getMonth(), // Get month (no need to add 1 because we want first day of month)
        1
    );
    const daysInMonth = new Date(
        currentDate.getFullYear(), // Get year
        currentDate.getMonth() + 1, // Get month (add 1 because month index starts at 0)
        0
    ).getDate();
    const startOffset = (firstDayOfMonth.getDay() + 6) % 7; // 0 = Monday, 6 = Sunday
    const totalDays = daysInMonth + startOffset; // Total days in month + days before first day of month

    // Create array of days in month
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
