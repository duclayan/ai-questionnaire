import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../contexts/AuthContext";
export const Navbar = () => {
  const { user, handleLogout } = useAuth();
  console.log(user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {user ? (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Welcome User {user.user_id}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                GPT
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Log In
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
