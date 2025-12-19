import LayoutClient from '../layouts/LayoutClient';
import AdminPage from '../pages/Client/Admin/AdminPage';
import ClassPage from '../pages/Client/Class/ClassPage';
import ListStudent from '../pages/Client/Student/ListStudent';
import StudentPage from '../pages/Client/Student/StudentPage';
import SubjectsPage from '../pages/Client/Subjects/SubjectsPage';
import TeacherPage from '../pages/Client/Teacher/TeacherPage';
import EventPage from '../pages/Client/Events/EventPage';
import ClassDetailPage from '../pages/Client/Class/ClassDetail';

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
                path: 'student',
                Component: StudentPage,
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
            {
                path: 'classes/detail/:id',
                Component: ClassDetailPage,
            },
            {
                path: 'events',
                Component: EventPage,
            }, {
                path: 'events/:id',
                Component: EventPage,
            },
        ],
    },
];
export default clientRoutes;
