import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../AuthContext'; // Import your Auth context
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Get authentication status and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/'); // Redirect to the login page after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          {/* Logo and user session number */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src="/path/to/logo.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            User Session: {isAuthenticated ? 'Active' : 'None'}
          </Typography>
        </Box>
        <Box>
          {/* Navigation buttons */}
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;