import React from 'react';
import { Box } from '@mui/material';
import { LanguageDropdown } from '../LanguageDropdown/LanguageDropdown';
import AutoCorrectDropdown from '../AutoCorrectDropdown/AutoCorrectDropdown';
import AutoTextTimeout from '../AutoTextTimeout/AutoTextTimeout';

export const AutoCorrectSettings = ({
  autoCorrectEnabled, 
  handleAutoCorrectToggle, 
  language, 
  handleLanguageChange,
  textTimeoutEnabled, 
  handleAutoTextTimeoutToggle
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 2,
        padding: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        <AutoTextTimeout 
          textTimeoutEnabled={textTimeoutEnabled}
          handleAutoTextTimeoutToggle={handleAutoTextTimeoutToggle}
        />
        <AutoCorrectDropdown
          autoCorrectEnabled={autoCorrectEnabled}
          handleAutoCorrectToggle={handleAutoCorrectToggle}
        />
        <LanguageDropdown 
          language={language}
          onLanguageChange={handleLanguageChange} 
        />
      </Box>
    </Box>
  );
}