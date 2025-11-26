import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const AttendanceChart = () => {
    const data = [
        {
            date: '2000-01',
            present: 4000,
            absent: 2400,
            amt: 2400,
        },
        {
            date: '2000-02',
            present: 3000,
            absent: 1398,
            amt: 2210,
        },
        {
            date: '2000-03',
            present: 2000,
            absent: 9800,
            amt: 2290,
        },
        {
            date: '2000-04',
            present: 2780,
            absent: 3908,
            amt: 2000,
        },
        {
            date: '2000-05',
            present: 1890,
            absent: 4800,
            amt: 2181,
        },
        {
            date: '2000-06',
            present: 2390,
            absent: 3800,
            amt: 2500,
        },
        {
            date: '2000-07',
            present: 3490,
            absent: 4300,
            amt: 2100,
        },
        {
            date: '2000-08',
            present: 4000,
            absent: 2400,
            amt: 2400,
        },
        {
            date: '2000-09',
            present: 3000,
            absent: 1398,
            amt: 2210,
        },
        {
            date: '2000-10',
            present: 2000,
            absent: 9800,
            amt: 2290,
        },
        {
            date: '2000-11',
            present: 2780,
            absent: 3908,
            amt: 2000,
        },
        {
            date: '2000-12',
            present: 1890,
            absent: 4800,
            amt: 2181,
        },
    ];

    // #endregion
    const monthTickFormatter = (tick: string | number | Date): string => {
        const date = new Date(tick);

        return String(date.getMonth() + 1);
    };
    const renderQuarterTick = (tickProps: any): ReactNode => {
        const { x, y, payload, width, visibleTicksCount } = tickProps;
        const { value, offset } = payload;
        const date = new Date(value);
        const month = date.getMonth();
        const quarterNo = Math.floor(month / 3) + 1;

        if (month % 3 === 1) {
            return (
                <text
                    x={x + width / visibleTicksCount / 2 - offset}
                    y={y - 4}
                    textAnchor="middle"
                >{`Q${quarterNo}`}</text>
            );
        }

        const isLast = month === 11;

        if (month % 3 === 0 || isLast) {
            const pathX = Math.floor(isLast ? x - offset + width / visibleTicksCount : x - offset) + 0.5;

            return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
        }
        return null;
    };
    return (
        <div>
            <BarChart
                style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                responsive
                data={data}
                margin={{
                    top: 25,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={monthTickFormatter} />
                <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    tick={renderQuarterTick}
                    height={1}
                    scale="band"
                    xAxisId="quarter"
                />
                <YAxis width="auto" />
                <Tooltip />
                <Legend wrapperStyle={{ paddingTop: '1em' }} />
                <Bar dataKey="present" fill="#8884d8" />
                <Bar dataKey="absent" fill="#82ca9d" />
            </BarChart>
        </div>
    );
};

export default AttendanceChart;
