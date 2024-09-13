import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import { Alert, Button, Container, TextField, Typography } from '@mui/material';
import { DocumentLoader } from '../../components/forms';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  // Redirect to FormPage once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post(`${apiEndpoint}/login/`, { username, password });
      localStorage.setItem('token', response.data.token);
      login()
      navigate('/dashboard');
    } catch (error) {
      setError('Incorrect username or password');
    }
    setLoading(false)
  };

  if (loading) {
    return <DocumentLoader isLoading={loading} text={"Preparing Login"} />; // Show loading screen while fetching data
  }

  return (
    <>
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
    </>
  );
};

export default Login;