import React from 'react';
import { Box, Typography, Grid, Paper, Button, Card, CardContent } from '@mui/material';

const UserDashboard = () => {
  const user = { name: 'Ahmed Ali' };
  const loanDetails = {
    category: 'Wedding Loans',
    subcategory: 'Valima',
    loanAmount: 'PKR 5,00,000',
    loanPeriod: '3',
    guarantor1: { name: 'Ali Khan' },
    guarantor2: { name: 'Sara Ahmed' },
  };

  return (
    <Grid
      container
      sx={{
        height: '100vh',
        background: 'linear-gradient(135deg, #2d3436, #00cec9)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        component={Paper}
        elevation={8}
        sx={{
          borderRadius: 6,
          p: 4,
          background: '#ffffff',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#2d3436',
              mb: 2,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Welcome, {user.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: '#636e72',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Here's a summary of your loan application.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                borderRadius: 6,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                padding: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Loan Details
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <strong>Category:</strong> {loanDetails.category}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Subcategory:</strong> {loanDetails.subcategory}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Loan Amount:</strong> {loanDetails.loanAmount}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Loan Period:</strong> {loanDetails.loanPeriod} years
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    mt: 2,
                    color: '#00cec9',
                    borderColor: '#00cec9',
                    '&:hover': {
                      borderColor: '#01a3a4',
                      color: '#01a3a4',
                    },
                  }}
                >
                  View Loan Slip
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                borderRadius: 6,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                padding: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Guarantor Information
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <strong>Guarantor 1:</strong> {loanDetails.guarantor1.name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Guarantor 2:</strong> {loanDetails.guarantor2.name}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    mt: 2,
                    color: '#00cec9',
                    borderColor: '#00cec9',
                    '&:hover': {
                      borderColor: '#01a3a4',
                      color: '#01a3a4',
                    },
                  }}
                >
                  Update Guarantor Info
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#00cec9',
                  py: 1.5,
                  borderRadius: 8,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#01a3a4',
                  },
                }}
              >
                Edit Loan Request
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserDashboard;
