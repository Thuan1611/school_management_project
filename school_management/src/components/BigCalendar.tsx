import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek } from '@schedule-x/calendar';
import { createResizePlugin } from '@schedule-x/resize';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import '@schedule-x/theme-default/dist/index.css';
import 'temporal-polyfill/global';

import { mapEventsToScheduleX } from '../ultis/mapEventsToScheduleX';
type Props = {
    events: any[];
    classMap: Map<any, any>;
    isTeacherView?: boolean; // true nếu là trang teacher
};
const BigCalendar = ({ events, classMap }: Props) => {
    const sxEvents = mapEventsToScheduleX(events, classMap);

    const eventModal = createEventModalPlugin();

    const calendar = useCalendarApp({
        views: [createViewDay(), createViewMonthAgenda(), createViewMonthGrid(), createViewWeek()],

        defaultView: createViewWeek().name,
        events: sxEvents,

        plugins: [eventModal, createDragAndDropPlugin(), createResizePlugin()],

        calendars: {
            events: {
                colorName: 'blue',
                lightColors: {
                    main: '#1c7ed6',
                    container: '#dbe9f9',
                    onContainer: '#0c4a6e',
                },
            },
        },

        callbacks: {
            onEventClick: (event) => {
                console.log(event);
            },
        },
    });
    return (
        <div className="h-[800px] w-full">
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    );
};

export default BigCalendar;
