import moment from 'moment';
import Calendar from 'react-big-calendar';
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
const localizer = momentLocalizer(moment);
const calendarEvents = [
    {
        title: 'Math',
        allDay: false,
        start: new Date(2025, 10, 24, 8, 0), // Thứ Hai, 24/11/2025
        end: new Date(2025, 10, 24, 8, 45),
    },
    {
        title: 'English',
        allDay: false,
        start: new Date(2025, 10, 24, 9, 0),
        end: new Date(2025, 10, 24, 9, 45),
    },
    {
        title: 'Biology',
        allDay: false,
        start: new Date(2025, 10, 24, 10, 0),
        end: new Date(2025, 10, 24, 10, 45),
    },
    {
        title: 'Physics',
        allDay: false,
        start: new Date(2025, 10, 25, 11, 0), // Thứ Ba, 25/11
        end: new Date(2025, 10, 25, 11, 45),
    },
    {
        title: 'Chemistry',
        allDay: false,
        start: new Date(2025, 10, 26, 13, 0), // Thứ Tư, 26/11
        end: new Date(2025, 10, 26, 13, 45),
    },
    {
        title: 'History',
        allDay: false,
        start: new Date(2025, 10, 27, 14, 0), // Thứ Năm, 27/11
        end: new Date(2025, 10, 27, 14, 45),
    },
    {
        title: 'Math',
        allDay: false,
        start: new Date(2025, 10, 28, 8, 0), // HÔM NAY, 28/11/2025
        end: new Date(2025, 10, 28, 8, 45),
    },
    {
        title: 'English',
        allDay: false,
        start: new Date(2025, 10, 28, 9, 0),
        end: new Date(2025, 10, 28, 9, 45),
    },
    {
        title: 'Physics',
        allDay: false,
        start: new Date(2025, 10, 28, 11, 0),
        end: new Date(2025, 10, 28, 11, 45),
    },
    {
        title: 'History',
        allDay: false,
        start: new Date(2025, 10, 29, 14, 0), // Thứ Sáu, 29/11
        end: new Date(2025, 10, 29, 14, 45),
    },
];

const BigCalendar = () => {
    const [view, setView] = useState<string>(Views.WORK_WEEK);
    const handleOnChangeView = (selectedView: string) => {
        setView(selectedView);
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                views={['work_week', 'day']}
                view={view}
                style={{ height: 500 }}
                onView={handleOnChangeView}
                defaultDate={new Date()}
                min={new Date(2025, 0, 1, 7, 0)} // 7h sáng
                max={new Date(2025, 0, 1, 18, 0)} // 6h chiều
            />
        </div>
    );
};

export default BigCalendar;
