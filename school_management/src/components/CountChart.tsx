import React from 'react';
import { RadialBar, RadialBarChart } from 'recharts';

const CountChart = () => {
    const data = [
        { uv: 31.47, pv: 2400, fill: '#4A90E2' },
        { uv: 26.69, pv: 4567, fill: '#FF69B4' },
    ];
    return (
        <div className="flex flex-col items-center">
            <RadialBarChart
                width={260}
                height={260}
                cx="50%"
                cy="50%"
                innerRadius="10%"
                outerRadius="80%"
                barSize={20}
                data={data}
            >
                <RadialBar background dataKey="uv" />
            </RadialBarChart>

            <div className="flex gap-6 text-lg font-semibold mt-2">
                <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full" style={{ background: '#4A90E2' }}></span>
                    <span className="text-blue-600">Boys: 200</span>
                </span>

                <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full" style={{ background: '#FF69B4' }}></span>
                    <span className="text-pink-600">Girls: 200</span>
                </span>
            </div>
        </div>
    );
};

export default CountChart;
