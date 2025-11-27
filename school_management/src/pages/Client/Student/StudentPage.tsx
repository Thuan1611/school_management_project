import React from 'react';
import Announcements from '../../../components/Announcements';
import EventCalendar from '../../../components/EventCalendar';
import BigCalendar from '../../../components/BigCalendar';

const StudentPage = () => {
    return (
        <div className="flex gap-4 w-full">
            {/* LEFT MAIN */}
            <div className="w-3/4 flex  bg-gray-100 rounded-xl flex-col gap-6 min-w-0">
                <div className='bg-white p-4 rounded-2xl'>
                    <BigCalendar />
                </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="w-1/4 flex flex-col gap-8 ">
                <EventCalendar />
                <Announcements />
            </div>
        </div>
    );
};

export default StudentPage;
