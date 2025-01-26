import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="user" element={<UserDashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
