import 'temporal-polyfill/global';

export const mapEventsToScheduleX = (events: any[], classMap: Map<string, string>) => {
    if (!Array.isArray(events)) return [];

    return events?.map((event) => {
        const date = typeof event.date === 'string' ? event.date.split('T')[0] : event.date;

        const startString = `${date}T${event.startTime}:00+07:00[Asia/Ho_Chi_Minh]`;
        const endString = `${date}T${event.endTime}:00+07:00[Asia/Ho_Chi_Minh]`;

        return {
            id: String(event._id),
            calendarId: 'events',
            title: `${event.title} - Lớp ${classMap.get(String(event.class)) ?? 'N/A'}`,
            start: Temporal.ZonedDateTime.from(startString),
            end: Temporal.ZonedDateTime.from(endString),
        };
    });
};
