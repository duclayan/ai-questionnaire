import React from 'react';

export const LanguageDropdown = ({language, onLanguageChange}) => {


  return (
    <div>
      <label htmlFor="language-select">Select AutoCorrect Output Language:</label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="">Select a language</option>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="it">Italiano</option>
      </select>
    </div>
  );
};
