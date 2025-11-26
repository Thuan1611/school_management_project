import {
    CommentOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Input, Space, type DropdownProps, type MenuProps } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;
type Props = {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
};
const Navbar = ({ collapsed, setCollapsed }: Props) => {
    const navi = useNavigate();
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case 'Logout':
                localStorage.clear();
                navi('/auth/login');
                break;
            case 'Profile':
                console.log('Profile');
                break;
            case 'Settings':
                console.log('Settings');
                break;
            default:
                break;
        }
    };
    const items: MenuProps['items'] = [
        {
            key: 'Profile',
            label: 'Profile',
        },
        {
            key: 'Settings',
            label: 'Settings',
            icon: <SettingOutlined />,
        },
        {
            type: 'divider',
        },
        {
            key: 'Logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            danger: true,
        },
    ];
    const sharedProps: DropdownProps = {
        menu: { items, onClick: handleMenuClick },
        placement: 'bottomLeft',
    };
    return (
        <div className="flex justify-between items-center  mx-4">
            <div className="flex items-center justify-center gap-2">
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
                <Search placeholder="Search ..." />
            </div>
            <div className="flex items-center justify-center gap-2">
                <div>
                    <Button>
                        <Space>
                            <CommentOutlined />
                        </Space>
                    </Button>
                </div>
                <div>
                    <Dropdown {...sharedProps} trigger={['click']}>
                        <Button type="primary">
                            <Space>
                                <UserOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
