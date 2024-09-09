import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import { Alert, Box, Button, Container, Snackbar, TextField, Typography } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiEndpoint}/login/`, { username, password });
      localStorage.setItem('token', response.data.token);
      login()
      navigate('/form');
    } catch (error) {
      setError('Incorrect username or password');
      setOpenSnackbar(true);
      console.error('Login failed:', error);
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <Container 
      maxWidth="xs" 
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {/* Error message positioned below the heading */}
        {error && (
          <Alert severity="error" variant="filled" style={{ marginBottom: '16px' }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ padding: '10px' }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;