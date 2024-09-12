import React from 'react';
import { LanguageDropdown } from '../LanguageDropdown/LanguageDropdown';
import AutoCorrectDropdown from '../AutoCorrectDropdown/AutoCorrectDropdown';

export const AutoCorrectSettings = ({
  autoCorrectEnabled, 
  handleAutoCorrectToggle, 
  selectedLanguage, 
  handleLanguageChange}) => {

  return (
    <div>
       <AutoCorrectDropdown
        autoCorrectEnabled={autoCorrectEnabled}
        handleAutoCorrectToggle={handleAutoCorrectToggle}
      />
        <LanguageDropdown 
        language = {selectedLanguage}
        onLanguageChange={handleLanguageChange} />
    </div>
  );
};
