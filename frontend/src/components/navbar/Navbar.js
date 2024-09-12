import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../AuthContext'; // Import your Auth context
import { useNavigate } from 'react-router-dom';
import logo from './logo-image.png';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Get authentication status and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/'); // Redirect to the login page after logout
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333333' }}>
      <Toolbar>

          {/* Navigation buttons */}
          {isAuthenticated ? (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="Logo" style={{ height: "70px", marginRight: '10px' }} />
              </Box>
              <Box>
                <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </Box>
            </>
          ) : (
          <>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                AI help for report creation
              </Typography>
            </Box>
            <Box>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            </Box>
          </>
          )}

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;