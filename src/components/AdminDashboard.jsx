import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const AdminDashboard = () => {

  const pendingApplications = [
    {
      id: 1,
      name: 'Ahmed Ali',
      loanCategory: 'Wedding Loans',
      amount: 'PKR 5,00,000',
    },
    {
      id: 2,
      name: 'Sara Khan',
      loanCategory: 'Education Loans',
      amount: 'PKR 3,00,000',
    },
    {
      id: 3,
      name: 'Ali Raza',
      loanCategory: 'Business Loans',
      amount: 'PKR 10,00,000',
    },
  ];

  return (
    <Grid
      container
      sx={{
        height: '100vh',
        background: 'linear-gradient(135deg, #1e272e, #0984e3)',
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
            Admin Dashboard
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: '#636e72',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Manage pending applications and approved loans.
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
                  Pending Applications
                </Typography>
                <List sx={{ mt: 2 }}>
                  {pendingApplications.map((application) => (
                    <React.Fragment key={application.id}>
                      <ListItem>
                        <ListItemText
                          primary={application.name}
                          secondary={`Category: ${application.loanCategory}, Amount: ${application.amount}`}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
                <Button
                  variant="outlined"
                  sx={{
                    mt: 2,
                    color: '#0984e3',
                    borderColor: '#0984e3',
                    '&:hover': {
                      borderColor: '#0652DD',
                      color: '#0652DD',
                    },
                  }}
                >
                  View All Applications
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
                  Approved Loans
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <strong>Total Approved:</strong> 15 Loans
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Total Amount:</strong> PKR 50,00,000
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    mt: 2,
                    color: '#0984e3',
                    borderColor: '#0984e3',
                    '&:hover': {
                      borderColor: '#0652DD',
                      color: '#0652DD',
                    },
                  }}
                >
                  View Approved Loans
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#0984e3',
                  py: 1.5,
                  borderRadius: 8,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#0652DD',
                  },
                }}
              >
                Generate Loan Report
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
