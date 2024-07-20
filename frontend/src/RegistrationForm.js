import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import './RegistrationForm.css'; // Import the CSS file

const RegistrationForm = () => {
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
//         console.log('Plaintext password:', password);
// console.log('Hashed password:', hashedPassword);

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            
            alert(data.message); // Display registration status
            // Optionally, redirect to another page on successful registration
            if (data.message === 'Registration successful') {
                // Redirect or perform other actions
                
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm" className="container-background">
            <Box className="form-container">
                <Typography variant="h4" gutterBottom>
                    Registration
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        className="custom-textfield"
                        required
                        autoFocus 
                    />
                    <TextField
                         InputLabelProps={{
                            shrink: true,
                          }}

                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        className="custom-textfield"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="custom-button"
                    >
                        Register
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default RegistrationForm;
