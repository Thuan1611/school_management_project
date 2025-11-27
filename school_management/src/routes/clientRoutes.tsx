import LayoutClient from '../layouts/LayoutClient';
import AdminPage from '../pages/Client/Admin/AdminPage';
import StudentPage from '../pages/Client/Student/StudentPage';

const clientRoutes = [
    {
        path: '/',
        element: <LayoutClient />,
        children: [
            {
                index: true,
                Component: AdminPage,
            },
            {
                path: 'student',
                Component: StudentPage,
            },
        ],
    },
];
export default clientRoutes;
