'use client';

import { useQuery } from '@tanstack/react-query';
import { getClass } from '../../../api/classes';
import BigCalendar from '../../../components/BigCalendar';
import { getEvent } from '../../../api/event';

export default function TeacherSchedulePage() {
    const user = localStorage.getItem(JSON.stringify('role'));
    console.log(user)

    // const { data: events = [] } = useQuery({
    //     queryKey: ['event', { teacherId: user?._id }],
    //     queryFn: () => getEvent({ teacherId: user?._id }),
    // });

    const { data: classes = [] } = useQuery({
        queryKey: ['class'],
        queryFn: getClass,
    });

    const classMap = new Map(classes.map((c: any) => [c._id, c.name]));

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Lịch dạy của tôi</h1>
            <BigCalendar events={events} classMap={classMap} isTeacherView={true} />
        </div>
    );
}
