import React from 'react';
import { Box } from '@mui/material';
import { LanguageDropdown } from '../LanguageDropdown/LanguageDropdown';
import AutoCorrectDropdown from '../AutoCorrectDropdown/AutoCorrectDropdown';
import AutoTextTimeout from '../AutoTextTimeout/AutoTextTimeout';

export const AutoCorrectSettings = ({
  autoCorrectEnabled, 
  handleAutoCorrectToggle, 
  selectedLanguage, 
  handleLanguageChange,
  textTimeoutEnabled, 
  handleAutoTextTimeoutToggle
}) => {
  return (
    <Box sx={{ 
      backgroundColor: '#f5f5f5', 
      padding: 1,
      borderTop: '1px solid #e0e0e0',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 2
    }}>
      {/* <AutoTextTimeout 
        textTimeoutEnabled={textTimeoutEnabled}
        handleAutoTextTimeoutToggle={handleAutoTextTimeoutToggle}
      /> */}
      <AutoCorrectDropdown
        autoCorrectEnabled={autoCorrectEnabled}
        handleAutoCorrectToggle={handleAutoCorrectToggle}
      />
      <LanguageDropdown 
        language={selectedLanguage}
        onLanguageChange={handleLanguageChange} 
      />
    </Box>
  );
};