import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const BurgerMenu = ({ steps, currentStep, onStepChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (index) => {
    setAnchorEl(null);
    if (typeof index === 'number') {
      onStepChange(index);
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
      >
        {steps.map((step, index) => (
          <MenuItem 
            key={index} 
            onClick={() => handleClose(index)}
            selected={index === currentStep}
          >
            <Typography variant="body1">{step}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default BurgerMenu;