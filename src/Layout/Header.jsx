import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#00cec9' }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Saylani Microfinance App
        </Typography>
        <Button color="inherit" onClick={() => navigate('/home')}>Home</Button>
        <Button color="inherit" onClick={() => navigate('/admin')}>Admin Dashboard</Button>
        <Button color="inherit" onClick={() => navigate('/user')}>User Dashboard</Button>
        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;