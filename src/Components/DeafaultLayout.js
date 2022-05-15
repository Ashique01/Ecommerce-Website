import React, { useEffect, useState } from 'react';
import { Layout, Menu, Typography } from 'antd';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    HomeOutlined,
    ContactsTwoTone,
    UnorderedListOutlined,
    LogoutOutlined,
    FrownFilled,
    ShoppingCartOutlined
} from '@ant-design/icons';
import '../resources/defaulTlayout.css';
import { Link, useNavigate, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../resources/defaulTlayout.css'
import Search from 'antd/lib/transfer/search';
import { Footer } from 'antd/lib/layout/layout';



const { Header, Sider, Content } = Layout;
export const DefautLayout = (props) => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/cart`;
        navigate(path);
    }
    const [collapsed, setCollapsed] = useState(false)
    const { cartItems, loading } = useSelector(state => state.rootReducer)

    const toggle = () => {
        setCollapsed(!collapsed)
    };

    useEffect(() => {

        localStorage.setItem('cartItems', JSON.stringify(cartItems))

    }, [cartItems])

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

                <div className="logo">
                    <h3>{collapsed ? 'LSB' : 'LOCAL BOX STORE'}</h3>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={window.location.pathname}
                    items={[
                        {
                            key: '/home',
                            icon: <HomeOutlined />,
                            label: <Link to='/home'>Home</Link>,
                        },
                        {
                            key: '/allProducts',
                            icon: <UnorderedListOutlined />,
                            label: <Link to='/allProducts'>All Products</Link>,
                        },
                        {
                            key: '/myOrders',
                            icon: <ShoppingCartOutlined />,
                            label: <Link to='/myOrders'>My Orders</Link>
                        },
                        {
                            key: '/reviews',
                            icon: <FrownFilled />,
                            label: <Link to='/reviews'>Reviews</Link>
                        },
                        {
                            key: '/contactUs',
                            icon: <ContactsTwoTone />,
                            label: <Link to='/contactUs'>Contact Us</Link>
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

                    <p class="h3 fw-bolder text-warning bg-success text-center" >Local Box Store</p>
                    <div className='cart-count d-flex align-items-center'  >
                        <p className="fw-bolder text-danger text-center mt-3 ms-4 ">{cartItems.length}</p>
                        <ShoppingCartOutlined ShoppingCartOutlined className='me-2 ' onClick={routeChange} />

                        <div className="dropdown">
                            <p class="dropdown-toggle mt-3 fw-bolder mx-1 text-wrap text-uppercase text-muted" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {user.name}
                            </p>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Link to='/register' className='dropdown-item' onClick={logout}>logout</Link></li>
                            </ul>
                        </div>
                    </div>

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
                <Footer style={{ textAlign: 'center' }}>
                    <div className="container py-4">
                        <div className="row gy-4 gx-5">
                            <div className="col-lg-4 col-md-6">
                                <h5 className="h1 text-dark fw-bolder">Local Box Store.</h5>
                                <p className="small text-muted fw-bold ">A place where anyone can buy products with a affordable price.Yes we give the guarrenty and warrenty of our produts.So operate your life with modern facilities</p>
                                <p className="small text-muted mb-0">&copy; Copyrights. All rights reserved. <a class="text-primary" href="#">Team LSB</a></p>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <h5 className="text-dark fw-bold mb-3">Quick links</h5>
                                <ul className="list-unstyled text-muted">
                                    <li><Link to='/home'>Home</Link></li>
                                    <li><Link to='/contactUs'>Contact Us</Link></li>
                                    <li><Link to='/allproducts'>All Products</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <h5 className="text-dark fw-bold mb-3">Social Sites</h5>
                                <ul className="list-unstyled text-muted">
                                    <li><a href="#">Facebook</a></li>
                                    <li><a href="#">Tweeter</a></li>
                                    <li><a href="#">Instagram</a></li>
                                    <li><a href="#">FAQ</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <h5 className="text-dark fw-bold mb-3">Newsletter</h5>
                                <p className="small text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                                <form action="#">
                                    <div className="input-group mb-3">
                                        <input className="form-control" type="text" placeholder="Enter your email" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                        <button className="btn btn-primary" id="button-addon2" type="button">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Footer>
            </Layout>


        </Layout >
    );

}
export default DefautLayout

