
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const FinanceChart = () => {
    const data = [
        { name: 'Jan', income: 4000, expense: 2400 },
        { name: 'Feb', income: 3000, expense: 1398 },
        { name: 'Mar', income: 2000, expense: 9800 },
        { name: 'Apr', income: 2780, expense: 3908 },
        { name: 'May', income: 1890, expense: 4800 },
        { name: 'Jun', income: 2390, expense: 3800 },
        { name: 'Jul', income: 3490, expense: 4300 },
        { name: 'Aug', income: 3490, expense: 4300 },
        { name: 'Sep', income: 3490, expense: 4300 },
        { name: 'Oct', income: 3490, expense: 4300 },
        { name: 'Nov', income: 3490, expense: 4300 },
        { name: 'Dec', income: 3490, expense: 4300 },
    ];

    return (
        <div style={{ width: '100%', height: 350 }}>
            <LineChart width="100%" height="100%" data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#C3EBFA" strokeWidth={4} />
                <Line type="monotone" dataKey="expense" stroke="#82ca9d" strokeWidth={4} />
            </LineChart>
        </div>
    );
};

export default FinanceChart;
