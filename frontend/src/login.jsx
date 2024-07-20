import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import './login.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      console.log('Login response:', response.data);

      if (response.status === 200) {
        onLogin(); // Call onLogin to update login state
        navigate('/'); // Redirect to home page
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      alert('Login failed');
    }
  };

  return (
    <Container maxWidth="sm" className="container-background">
      <Box className="form-container">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="MuiTextField-root"
            sx={{ backgroundColor: '#f7f7f7' }} // Add background color here
            autoFocus
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="MuiTextField-root"
            sx={{ backgroundColor: '#f7f7f7' }} // Add background color here
            autoFocus
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#333', // Add button background color here
              '&:hover': {
                backgroundColor: '#555' // Add button hover color here
              }
            }}
            className="MuiButton-containedPrimary"
          >
            Login
          </Button>
        </form>
      </Box>
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        If you don't have an account, please <a href="/register">register</a>.
      </Typography>
    </Container>
  );
};

export default Login;
