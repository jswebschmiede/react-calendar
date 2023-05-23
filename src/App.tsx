import de from 'date-fns/locale/de';
import { Calendar } from './components/Calendar';
import { CalendarBody } from './components/CalendarBody';
import { CalendarNavbar } from './components/CalendarNavbar';

function App() {
    return (
        <>
            <Calendar locale={de}>
                <CalendarNavbar />
                <CalendarBody />
            </Calendar>
        </>
    );
}

export default App;
