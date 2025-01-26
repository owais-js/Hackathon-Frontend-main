import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <Box 
        component="main" 
        sx={{ 
          minHeight: '80vh', 
          py: 3, 
          width: '100%', 
          backgroundColor: 'transparent', 
          margin: 0, 
          padding: 0 
        }}
      >
        <Box sx={{ width: '100%', margin: 0, padding: 0 }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
