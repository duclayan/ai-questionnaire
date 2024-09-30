import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

export const LanguageDropdown = ({ language, onLanguageChange }) => {
  return (
    <FormControl size="small" sx={{ minWidth: 80 }}>
      <Select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        displayEmpty
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="fr">Français</MenuItem>
        <MenuItem value="de">Deutsch</MenuItem>
        <MenuItem value="it">Italiano</MenuItem>
      </Select>
    </FormControl>
  );
};
