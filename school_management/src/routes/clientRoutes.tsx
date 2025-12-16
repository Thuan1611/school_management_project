import LayoutClient from '../layouts/LayoutClient';
import AdminPage from '../pages/Client/Admin/AdminPage';
import ClassPage from '../pages/Client/Class/ClassPage';
import ListStudent from '../pages/Client/Student/ListStudent';
import SubjectsPage from '../pages/Client/Subjects/SubjectsPage';
import TeacherPage from '../pages/Client/Teacher/TeacherPage';

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
                path: 'students',
                Component: ListStudent,
            },
            {
                path: 'students/:id',
                Component: ListStudent,
            },
            {
                path: 'teachers',
                Component: TeacherPage,
            },
            {
                path: 'teachers/:id',
                Component: TeacherPage,
            },
            {
                path: 'subjects',
                Component: SubjectsPage,
            },
            {
                path: 'subjects/:id',
                Component: SubjectsPage,
            },
            {
                path: 'classes',
                Component: ClassPage,
            },
            {
                path: 'classes/:id',
                Component: ClassPage,
            },
        ],
    },
];
export default clientRoutes;
