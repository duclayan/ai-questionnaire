import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAuth } from '../AuthContext'; // Import your Auth context
import { useNavigate } from 'react-router-dom';
import logo from './logo-image.png';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Get authentication status and logout function
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // State to control the dialog visibility

  const handleLogoutClick = () => {
    setOpen(true); // Open the confirmation dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog without logging out
  };

  const handleConfirmLogout = () => {
    logout(); // Call the logout function
    setOpen(false); // Close the dialog
    navigate('/'); // Redirect to the homepage after logout
  };

  return (
    <Box>
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
                <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
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

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Congrats Log Out</DialogTitle>
        <DialogContent>
          <Typography>
            By logging out of your account, you will end your current session. Please note the following important information:
            Data Security: Logging out ensures that your personal information is protected and prevents unauthorized access to your account. We recommend logging out when using shared or public devices.
            Session Data: Any unsaved changes or data may be lost upon logging out. Please ensure that you have saved all necessary information before proceeding.
            Cookies and Tracking: Your session cookies will be cleared upon logout. If you wish to manage your cookie preferences, please refer to our Cookie Policy.
            Re-login: You will need to enter your credentials again to access your account. If you have forgotten your password, please use the “Forgot Password” feature to reset it.
            Thank you for using our services! This disclaimer is compliant with German legal standards, emphasizing data protection and user awareness. Adjust the wording as necessary to fit the specific context of your website
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleConfirmLogout} color="primary">Continue Logout</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Navbar;