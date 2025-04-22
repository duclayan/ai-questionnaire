import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from './logo-image.png';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [editorMenuAnchorEl, setEditorMenuAnchorEl] = useState(null);
  const editorMenuOpen = Boolean(editorMenuAnchorEl);

  const handleEditorMenuClick = (event) => {
    setEditorMenuAnchorEl(event.currentTarget);
  };

  const handleEditorMenuClose = () => {
    setEditorMenuAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  const handleConfirmLogout = () => {
    logout();
    setLogoutDialogOpen(false);
    navigate('/');
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#333333' }}>
        <Toolbar>
          {isAuthenticated ? (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="Logo" style={{ height: "70px", marginRight: '10px' }} />
              </Box>
              <Box>
                <Button
                  color="inherit"
                  onClick={handleEditorMenuClick}
                  endIcon={<ArrowDropDownIcon />}
                >
                  Editor
                </Button>
                <Menu
                  anchorEl={editorMenuAnchorEl}
                  open={editorMenuOpen}
                  onClose={handleEditorMenuClose}
                >
                  <MenuItem onClick={() => { navigate('/editor'); handleEditorMenuClose(); }}>Beta 1 Aqua Editor</MenuItem>
                  {/* <MenuItem onClick={() => { navigate('/editor-v3'); handleEditorMenuClose(); }}>Beta 1.1 Aqua Editor</MenuItem> */}
                  <MenuItem onClick={() => { navigate('/editor-v2'); handleEditorMenuClose(); }}>Beta 2 Editor DrawIO</MenuItem>
                  <MenuItem onClick={() => { navigate('/editor-v2-1'); handleEditorMenuClose(); }}>Beta 2.1 Editor DrawIO</MenuItem>


                  {/* <MenuItem onClick={() => { navigate('/test'); handleEditorMenuClose(); }}>Beta Flowdiagram DrawIO</MenuItem> */}

                </Menu>
                <Button color="inherit" onClick={() => navigate('/audio-1')}>Diagram Audio</Button>
                <Button color="inherit" onClick={() => navigate('/diagram')}>Mermaid</Button>


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

      <Dialog open={logoutDialogOpen} onClose={handleLogoutDialogClose}>
        <DialogTitle>Confirm Log Out</DialogTitle>
        <DialogContent>
          <Typography>
            By logging out of your account, you will end your current session. Please note the following important information:
            Data Security: Logging out ensures that your personal information is protected and prevents unauthorized access to your account. We recommend logging out when using shared or public devices.
            Session Data: Any unsaved changes or data may be lost upon logging out. Please ensure that you have saved all necessary information before proceeding.
            Cookies and Tracking: Your session cookies will be cleared upon logout. If you wish to manage your cookie preferences, please refer to our Cookie Policy.
            Re-login: You will need to enter your credentials again to access your account. If you have forgotten your password, please use the "Forgot Password" feature to reset it.
            Thank you for using our services! This disclaimer is compliant with German legal standards, emphasizing data protection and user awareness. Adjust the wording as necessary to fit the specific context of your website
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleConfirmLogout} color="primary">Continue Logout</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Navbar;
