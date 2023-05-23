import { Calendar } from './components/Calendar';
import { CalendarBody } from './components/CalendarBody';
import { CalendarNavbar } from './components/CalendarNavbar';

function App() {
    return (
        <>
            <Calendar>
                <CalendarNavbar />
                <CalendarBody />
            </Calendar>
        </>
    );
}

export default App;
