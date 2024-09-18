import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import { Alert, Button, TextField, Typography } from '@mui/material';
import { DocumentLoader } from '../../components/forms';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadCaptchaEnginge(6); // Load captcha with 6 characters
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if the user is locked out
    if (lockoutTime && Date.now() < lockoutTime) {
      setError('Too many failed attempts. Please try again later.');
      setLoading(false);
      return;
    }

    // Validate captcha
    if (!validateCaptcha(captcha)) {
      setAttempts(prev => prev + 1); // Increment attempts
      setError('Captcha does not match');

      // Lock the user out after 3 failed attempts
      if (attempts + 1 >= 3) {
        setLockoutTime(Date.now() + 3600000); // Lock out for 1 hour
        setError('Too many failed attempts.');
      }

      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiEndpoint}/api/token/`, { username, password });
      localStorage.setItem('token', response.data.access);
      console.log('local storage:', localStorage, response)
      login();
      setAttempts(0); // Reset attempts on successful login
      setLockoutTime(null); // Clear lockout time
      navigate('/dashboard');
    } catch (error) {
      setError('Incorrect username or password');
    }
    setLoading(false);
  };

  if (loading) {
    return <DocumentLoader isLoading={loading} text={"Preparing Login"} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

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

        {/* Render the captcha */}
        <LoadCanvasTemplate />

        <TextField
          label="Enter Captcha"
          variant="outlined"
          fullWidth
          margin="normal"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ padding: '10px' }}
          disabled={lockoutTime && Date.now() < lockoutTime} // Disable button if locked out
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
