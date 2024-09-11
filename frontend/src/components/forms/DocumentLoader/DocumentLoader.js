import React, { useState, useEffect } from 'react';
import './DocumentLoader.css';

export const DocumentLoader = ({ isLoading, text: propText }) => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    setLoading(isLoading);
    setText(propText);
  }, [isLoading, propText]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="typing-loader">
          <span>{text}</span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  return null; 
}