import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

const AutoCorrectDropdown = ({ autoCorrectEnabled, handleAutoCorrectToggle }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          size="small"
          checked={autoCorrectEnabled}
          onChange={(e) => handleAutoCorrectToggle(e.target.checked)}
          name="autoCorrect"
        />
      }
      label="Auto Correct"
    />
  );
};

export default AutoCorrectDropdown;