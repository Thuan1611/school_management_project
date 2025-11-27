import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { View } from 'react-calendar/dist/shared/types.js';
const localizer = momentLocalizer(moment);
const calendarEvents = [
    {
        title: 'Math',
        allDay: false,
        start: new Date(2024, 7, 12, 8, 0),
        end: new Date(2024, 7, 12, 8, 45),
    },
    {
        title: 'English',
        allDay: false,
        start: new Date(2024, 7, 12, 9, 0),
        end: new Date(2024, 7, 12, 9, 45),
    },
    {
        title: 'Biology',
        allDay: false,
        start: new Date(2024, 7, 12, 10, 0),
        end: new Date(2024, 7, 12, 10, 45),
    },
    {
        title: 'Physics',
        allDay: false,
        start: new Date(2024, 7, 12, 11, 0),
        end: new Date(2024, 7, 12, 11, 45),
    },
    {
        title: 'Chemistry',
        allDay: false,
        start: new Date(2024, 7, 12, 13, 0),
        end: new Date(2024, 7, 12, 13, 45),
    },
    {
        title: 'History',
        allDay: false,
        start: new Date(2024, 7, 12, 14, 0),
        end: new Date(2024, 7, 12, 14, 45),
    },
    {
        title: 'English',
        allDay: false,
        start: new Date(2024, 7, 13, 9, 0),
        end: new Date(2024, 7, 13, 9, 45),
    },
    {
        title: 'Biology',
        allDay: false,
        start: new Date(2024, 7, 13, 10, 0),
        end: new Date(2024, 7, 13, 10, 45),
    },
    {
        title: 'Physics',
        allDay: false,
        start: new Date(2024, 7, 13, 11, 0),
        end: new Date(2024, 7, 13, 11, 45),
    },

    {
        title: 'History',
        allDay: false,
        start: new Date(2024, 7, 13, 14, 0),
        end: new Date(2024, 7, 13, 14, 45),
    },
    {
        title: 'Math',
        allDay: false,
        start: new Date(2024, 7, 14, 8, 0),
        end: new Date(2024, 7, 14, 8, 45),
    },
    {
        title: 'Biology',
        allDay: false,
        start: new Date(2024, 7, 14, 10, 0),
        end: new Date(2024, 7, 14, 10, 45),
    },

    {
        title: 'Chemistry',
        allDay: false,
        start: new Date(2024, 7, 14, 13, 0),
        end: new Date(2024, 7, 14, 13, 45),
    },
    {
        title: 'History',
        allDay: false,
        start: new Date(2024, 7, 14, 14, 0),
        end: new Date(2024, 7, 13, 14, 45),
    },
    {
        title: 'English',
        allDay: false,
        start: new Date(2024, 7, 15, 9, 0),
        end: new Date(2024, 7, 15, 9, 45),
    },
    {
        title: 'Biology',
        allDay: false,
        start: new Date(2024, 7, 15, 10, 0),
        end: new Date(2024, 7, 15, 10, 45),
    },
    {
        title: 'Physics',
        allDay: false,
        start: new Date(2024, 7, 15, 11, 0),
        end: new Date(2024, 7, 15, 11, 45),
    },

    {
        title: 'History',
        allDay: false,
        start: new Date(2024, 7, 15, 14, 0),
        end: new Date(2024, 7, 15, 14, 45),
    },
    {
        title: 'Math',
        allDay: false,
        start: new Date(2024, 7, 16, 8, 0),
        end: new Date(2024, 7, 16, 8, 45),
    },
    {
        title: 'English',
        allDay: false,
        start: new Date(2024, 7, 16, 9, 0),
        end: new Date(2024, 7, 16, 9, 45),
    },

    {
        title: 'Physics',
        allDay: false,
        start: new Date(2024, 7, 16, 11, 0),
        end: new Date(2024, 7, 16, 11, 45),
    },
    {
        title: 'Chemistry',
        allDay: false,
        start: new Date(2024, 7, 16, 13, 0),
        end: new Date(2024, 7, 16, 13, 45),
    },
    {
        title: 'History',
        allDay: false,
        start: new Date(2024, 7, 16, 14, 0),
        end: new Date(2024, 7, 16, 14, 45),
    },
];
const BigCalendar = () => {
    const [view, setView] = useState<View>(Views.WORK_WEEKS);
    return (
        <div>
            <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                views={['work_weeks', 'day']}
                view={view}
                style={{ height: 500 }}
            />
        </div>
    );
};

export default BigCalendar;
