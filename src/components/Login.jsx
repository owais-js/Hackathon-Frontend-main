import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from '../API/ApiFunctions';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading('Signing in...');

    try {
      const response = await signInWithEmailAndPassword(formData.email, formData.password);
      toast.success('Signed in successfully!', { id: loadingToast });

      navigate('/user');
    } catch (error) {
      toast.dismiss(loadingToast);
      setLoading(false);
      if (error.message.includes('auth/wrong-password')) {
        toast.error('Incorrect password. Please try again.');
      } else if (error.message.includes('auth/user-not-found')) {
        toast.error('No user found with this email. Please sign up first.');
      } else if (error.message.includes('auth/invalid-email')) {
        toast.error('Invalid email address. Please check and try again.');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <>
      <Toaster />
      <Grid
        container
        sx={{
          height: "100vh",
          background: "linear-gradient(135deg, #2d3436, #00cec9)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={8}
          sx={{
            borderRadius: 6,
            p: 4,
            background: "#ffffff",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
            margin: 0,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#2d3436",
                mb: 1,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Login
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#636e72",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Enter your credentials to continue
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <TextField
                fullWidth
                required
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                autoComplete="current-password"
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 8,
                  },
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <TextField
                fullWidth
                required
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                autoComplete="current-password"
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 8,
                  },
                }}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 8,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  backgroundColor: "#00cec9",
                  "&:hover": {
                    backgroundColor: "#01a3a4",
                  },
                }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>
            </motion.div>
          </form>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: "#636e72" }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#00cec9",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
