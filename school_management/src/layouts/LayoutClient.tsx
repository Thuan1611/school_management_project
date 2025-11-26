import { Layout, Menu, theme } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

const LayoutClient = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Sider collapsible collapsed={collapsed} trigger={null} width={250} style={{ backgroundColor: 'white' }}>
                <div className="text-black p-4 items-center justify-center flex">Logo</div>
                <Menu
                    theme="light"
                    mode="inline"
                    items={[
                        { key: '1', icon: <UserOutlined />, label: 'nav 1' },
                        { key: '2', icon: <VideoCameraOutlined />, label: 'nav 2' },
                        { key: '3', icon: <UploadOutlined />, label: 'nav 3' },
                    ]}
                />
            </Sider>

            <Layout>
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutClient;
