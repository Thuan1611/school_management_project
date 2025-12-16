import { Card } from 'antd';

import CountChart from '../../../components/CountChart';

import AttendanceChart from '../../../components/AttendanceChart';
import FinanceChart from '../../../components/FinanceChart';
import EventCalendar from '../../../components/EventCalendar';
import Announcements from '../../../components/Announcements';
import { useQuery } from '@tanstack/react-query';
import { getStudent } from '../../../api/student';
import { getTeacher } from '../../../api/teacher';

const AdminPage = () => {
    const { data: students } = useQuery({
        queryKey: ['student'],
        queryFn: async () => {
            const { data } = await getStudent();
            return data;
        },
    });
    const { data: teacher } = useQuery({
        queryKey: ['teacher'],
        queryFn: async () => {
            const { data } = await getTeacher();

            return data;
        },
    });
    const dashboardStats = [
        {
            id: 1,
            title: 'Students',
            value: students?.length,
            date: '2024/2/15',
            bg: '#D9CCFF',
        },
        {
            id: 2,
            title: 'Teachers',
            value: teacher?.length,
            date: '2024/2/15',
            bg: '#FFEAA7',
        },
        {
            id: 3,
            title: 'Parents',
            value: 1123,
            date: '2024/2/15',
            bg: '#D9CCFF',
        },
        {
            id: 4,
            title: 'Staffs',
            value: 1123,
            date: '2024/2/15',
            bg: '#FFEAA7',
        },
    ];
    return (
        <div className="flex gap-4 w-full">
            {/* LEFT MAIN */}
            <div className="w-3/4 flex  bg-gray-100 rounded-xl flex-col gap-6 min-w-0">
                {/* TOP CARDS */}
                <div className=" bg-white p-4 grid grid-cols-4 gap-4">
                    {dashboardStats.map((item) => (
                        <Card
                            key={item.id}
                            title={
                                <span className="bg-white px-3 py-1 rounded-md text-sm font-semibold">{item.date}</span>
                            }
                            variant="borderless"
                            style={{
                                backgroundColor: item.bg,
                                borderRadius: 16,
                                width: '100%',
                            }}
                        >
                            <p className="font-bold text-3xl">{item?.value?.toLocaleString()}</p>
                            <p className="text-gray-700">{item.title}</p>
                        </Card>
                    ))}
                </div>

                {/* STUDENT ATTENDANCE SECTION */}
                <div className="flex gap-4 p-4">
                    {/* Chart */}
                    <div className="w-1/3 bg-white p-4 rounded-lg">
                        <p className="font-bold text-xl mb-2 ">Students</p>
                        <CountChart students={students} />
                    </div>

                    {/* Right info */}
                    <div className="w-2/3 bg-white p-4 rounded-lg">
                        <p className="text-xl font-bold mb-2">Attendance </p>
                        <AttendanceChart />
                    </div>
                </div>
                <div className="flex flex-col p-4 gap-4 w-full bg-white h-[500px] min-w-0 ">
                    <p className="text-xl font-bold mb-2">Finance </p>
                    <div style={{ width: '100%', height: '400px' }}>
                        <FinanceChart />
                    </div>
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

export default AdminPage;
