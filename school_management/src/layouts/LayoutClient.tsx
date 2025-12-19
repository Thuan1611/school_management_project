import { Layout, Menu, theme, Typography } from 'antd';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
    HomeOutlined,
    TeamOutlined,
    UserOutlined,
    BookOutlined,
    ScheduleOutlined,
    CalendarOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Text } = Typography;

const menuItems = [
    {
        title: 'CHÍNH',
        items: [
            { icon: HomeOutlined, label: 'Trang chủ', href: '/', visible: ['admin', 'teacher', 'student'] },
            { icon: TeamOutlined, label: 'Giáo viên', href: '/teachers', visible: ['admin', 'teacher'] },
            { icon: UserOutlined, label: 'Học sinh', href: '/students', visible: ['admin', 'teacher'] },
            { icon: BookOutlined, label: 'Môn học', href: '/subjects', visible: ['admin'] },
            { icon: ScheduleOutlined, label: 'Lớp học', href: '/classes', visible: ['admin', 'teacher'] },
            // { icon: ProfileOutlined, label: 'Buổi học', href: '/lessons', visible: ['admin', 'teacher'] },
            // {
            //     icon: FileTextOutlined,
            //     label: 'Kỳ thi',
            //     href: '/list/exams',
            //     visible: ['admin', 'teacher', 'student'],
            // },
            // {
            //     icon: FileDoneOutlined,
            //     label: 'Bài tập',
            //     href: '/list/assignments',
            //     visible: ['admin', 'teacher', 'student'],
            // },
            // {
            //     icon: CheckSquareOutlined,
            //     label: 'Kết quả',
            //     href: '/list/results',
            //     visible: ['admin', 'teacher', 'student'],
            // },
            // {
            //     icon: CalendarOutlined,
            //     label: 'Điểm danh',
            //     href: '/list/attendance',
            //     visible: ['admin', 'teacher', 'student'],
            // },
            {
                icon: CalendarOutlined,
                label: 'Lịch học',
                href: '/events',
                visible: ['admin', 'teacher', 'student'],
            },
            // {
            //     icon: MessageOutlined,
            //     label: 'Tin nhắn',
            //     href: '/list/messages',
            //     visible: ['admin', 'teacher', 'student'],
            // },
            // {
            //     icon: NotificationOutlined,
            //     label: 'Thông báo',
            //     href: '/list/announcements',
            //     visible: ['admin', 'teacher', 'student'],
            // },
        ],
    },
];

const LayoutClient = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { borderRadiusLG },
    } = theme.useToken();
    const location = useLocation();

    // Thay bằng context/auth thực tế
    const userRole = 'admin'; // 'admin' | 'teacher' | 'student' | 'parent'

    const getMenuItems = () => {
        const items: any[] = [];

        menuItems.forEach((section) => {
            const visibleItems = section.items
                .filter((item) => item.visible.includes(userRole))
                .map((item) => {
                    const IconComponent = item.icon;
                    return {
                        key: item.href,
                        icon: <IconComponent />,
                        label: (
                            <NavLink
                                to={item.href}
                                className={({ isActive }) => (isActive ? 'ant-menu-item-selected' : '')}
                                style={{ borderRadius: 8 }}
                            >
                                {item.label}
                            </NavLink>
                        ),
                    };
                });

            if (visibleItems.length > 0) {
                items.push({
                    key: section.title,
                    label: (
                        <Text strong type="secondary" style={{ fontSize: 11, opacity: 0.6, letterSpacing: 0.5 }}>
                            {section.title}
                        </Text>
                    ),
                    type: 'group',
                    children: visibleItems,
                });
            }
        });

        return items;
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                trigger={null}
                width={250}
                style={{ backgroundColor: 'white' }}
            >
                <div className="p-5 text-center border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-indigo-600">SchoolHub</h1>
                </div>

                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={getMenuItems()}
                    style={{ borderRight: 0, height: '100%', paddingTop: 8 }}
                />
            </Sider>

            <Layout>
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        borderRadius: borderRadiusLG,
                        minHeight: 'calc(100vh - 64px)',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutClient;
