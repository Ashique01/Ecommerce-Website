import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Hompage from './pages/Hompage';
import Products from './pages/Products';
import Cartitems from './pages/Cartitems';
import Register from './pages/Register';
import Login from './pages/Login';
import Customers from './pages/Customer';
import Bills from './pages/Bills';
import AllProduct from './pages/AllProduct';
import MyOrders from './pages/MyOrders';
import Reviews from './pages/Reviews';
import ContactUs from './pages/ContactUs';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path='/home' element={<ProtectedRoute><Hompage /></ProtectedRoute>} />
          <Route path='/cart' element={<ProtectedRoute><Cartitems /></ProtectedRoute>} />
          <Route path='/items' element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/bills" element={<ProtectedRoute><Bills /></ProtectedRoute>} />
          <Route path="/allProducts" element={<ProtectedRoute><AllProduct /></ProtectedRoute>} />
          <Route path="/myOrders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
          <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
          <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='*' element={<NotFound />} />



        </Routes>

      </Router>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {

  if (localStorage.getItem('pos-user')) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }

}
