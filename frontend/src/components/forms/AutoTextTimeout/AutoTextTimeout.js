import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

const AutoTextTimeout = ({ textTimeoutEnabled, handleAutoTextTimeoutToggle }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          size="small"
          checked={textTimeoutEnabled}
          onChange={(e) => handleAutoTextTimeoutToggle(e.target.checked)}
          name="textTimeout"
        />
      }
      label="Auto Text"
    />
  );
};

export default AutoTextTimeout;