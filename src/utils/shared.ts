import { Locale } from 'date-fns';
import { enUS } from 'date-fns/locale';

export type DaysInWeekProps = {
    locale?: Locale;
};

// Returns an array of objects with the day number and label
export const daysInWeek = ({ locale = enUS }: DaysInWeekProps) => [
    { day: 0, label: locale.localize?.day(0) ?? '' },
    { day: 1, label: locale.localize?.day(1) ?? '' },
    { day: 2, label: locale.localize?.day(2) ?? '' },
    { day: 3, label: locale.localize?.day(3) ?? '' },
    { day: 4, label: locale.localize?.day(4) ?? '' },
    { day: 5, label: locale.localize?.day(5) ?? '' },
    { day: 6, label: locale.localize?.day(6) ?? '' }
];
