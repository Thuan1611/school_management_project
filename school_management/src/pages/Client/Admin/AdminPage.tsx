import { Card } from 'antd';
import React from 'react';

import CountChart from '../../../components/CountChart';

import AttendanceChart from '../../../components/AttendanceChart';

const dashboardStats = [
    {
        id: 1,
        title: 'Students',
        value: 6123,
        date: '2024/2/15',
        bg: '#D9CCFF',
    },
    {
        id: 2,
        title: 'Teachers',
        value: 1123,
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

const AdminPage = () => {
    return (
        <div className="flex gap-4">
            {/* LEFT MAIN */}
            <div className="w-5/6 flex flex-col gap-6">
                {/* TOP CARDS */}
                <div className="grid grid-cols-4 gap-4">
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
                            bodyStyle={{ padding: 20 }}
                        >
                            <p className="font-bold text-3xl">{item.value.toLocaleString()}</p>
                            <p className="text-gray-700">{item.title}</p>
                        </Card>
                    ))}
                </div>

                {/* STUDENT ATTENDANCE SECTION */}
                <div className="flex gap-4">
                    {/* Chart */}
                    <div className="w-1/3 ">
                        <p className="font-bold text-2xl items-start">Students</p>

                        <CountChart />
                    </div>

                    {/* Right info */}
                    <div className="w-2/3 bg-gray-100 p-4 rounded-lg">
                        <p className="text-xl font-bold mb-2">Attendance </p>
                        <AttendanceChart />
                    </div>
                </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="w-1/3 bg-blue-500 p-4 rounded-lg text-white">Sidebar Content Here</div>
        </div>
    );
};

export default AdminPage;
