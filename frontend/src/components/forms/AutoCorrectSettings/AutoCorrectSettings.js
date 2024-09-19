import React from 'react';
import { LanguageDropdown } from '../LanguageDropdown/LanguageDropdown';
import AutoCorrectDropdown from '../AutoCorrectDropdown/AutoCorrectDropdown';
import AutoTextTimeout from '../AutoTextTimeout/AutoTextTimeout';

export const AutoCorrectSettings = ({
  autoCorrectEnabled, 
  handleAutoCorrectToggle, 
  selectedLanguage, 
  handleLanguageChange,
  textTimeoutEnabled, 
  handleAutoTextTimeoutToggle}) => {

  return (
    <div>
      <AutoTextTimeout 
      textTimeoutEnabled = {textTimeoutEnabled}
      handleAutoTextTimeoutToggle = {handleAutoTextTimeoutToggle}
      />
       <AutoCorrectDropdown
        autoCorrectEnabled={autoCorrectEnabled}
        handleAutoCorrectToggle={handleAutoCorrectToggle}
      />
      <LanguageDropdown 
      language = {selectedLanguage}
      onLanguageChange={handleLanguageChange} 
      />
    </div>
  );
};
