import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const AttendanceChart = () => {
    const data = [
        { name: 'Mon', present: 60, absent: 40 },
        { name: 'Tue', present: 70, absent: 60 },
        { name: 'Wed', present: 90, absent: 75 },
        { name: 'Thu', present: 90, absent: 75 },
        { name: 'Fri', present: 65, absent: 55 },
    ];

    return (
        <div>
            <BarChart
                width={700}
                style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                height={400}
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#8884d8" />
                <Bar dataKey="absent" fill="#82ca9d" />
            </BarChart>
        </div>
    );
};

export default AttendanceChart;
