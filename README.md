# React Calendar

This project is a simple calendar component built with React.

## Features

-   Display a calendar with a monthly view
-   Show weekdays and the current month
-   Highlight the current day
-   Customizable locale settings for displaying weekdays
-   Switch between different months

## Usage

1. Install the dependencies by running `npm install`.

2. Run the project by executing `npm run dev`.

## Components

-   `Calendar`: The main component that renders the calendar and provides context for other components.
-   `CalendarContext`: The context that provides information about the current month and other relevant data.
-   `CalendarHeader`: The component that renders the header of the calendar, including month and navigation controls.
-   `CalendarBody`: The component that renders the actual calendar body, including weekdays and month days.
-   `CalendarNavigation`: The component that provides the forward and backward navigation for the calendar.

## Customization

You can customize the locale settings in the `CalendarProvider` component to display weekdays in your desired language. Simply modify the `locale` variable accordingly.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
