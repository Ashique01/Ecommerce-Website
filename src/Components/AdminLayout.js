import React, { useEffect, useState } from 'react';
import { Layout, Menu, Typography } from 'antd';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    HomeOutlined,
    BarChartOutlined,
    UnorderedListOutlined,
    LogoutOutlined,
    FrownFilled,
    ShoppingCartOutlined,
    ProfileOutlined
} from '@ant-design/icons';
import '../resources/defaulTlayout.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../resources/AdminLayout.css"



const { Header, Sider, Content } = Layout;
export const AdminLayout = (props) => {
    const { loading } = useSelector(state => state.rootReducer)
    const [collapsed, setCollapsed] = useState(false)
    const [control, setControl] = useState("addServices");

    const toggle = () => {
        setCollapsed(!collapsed)
    };

    let user = JSON.parse(localStorage.getItem('pos-user'))
    const history = useNavigate();
    function logout() {
        localStorage.clear();
        history.push('/login');
    }

    return (
        <Layout>
            {loading && (
                <div className='custom-spinner'>
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <h6 className='text-center'><Link to='/home' className='fs-3 fw-bolder text-center text-warning ms-3'>LBS</Link></h6>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={window.location.pathname}
                    items={[
                        {
                            key: '/Items',
                            icon: <ProfileOutlined />,
                            label: <Link to='/items' onClick={() => setControl('items')}>Items</Link>,
                        },

                        {
                            key: '/customers',
                            icon: <UserOutlined />,
                            label: <Link to='/customers' onClick={() => setControl('customers')}>Customers</Link>,
                        },

                        {
                            key: '/bills',
                            icon: <BarChartOutlined />,
                            label: <Link to='/bills' onClick={() => setControl('bills')}>Bills</Link>,
                        },
                        {
                            key: '/register',
                            icon: <LogoutOutlined />,
                            label: <Link to='/register' onClick={logout}>logout</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                    <p class="h4 fw-bolder text-warning bg-success text-center" >Local Box Store</p>
                    <p className='h6 folder text-danger'>Admin Section</p>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '10px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout >
    );

}
export default AdminLayout

