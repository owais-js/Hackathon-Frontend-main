import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2d3436',
        color: '#ffffff',
        py: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">&copy; {new Date().getFullYear()} Saylani Welfare. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
