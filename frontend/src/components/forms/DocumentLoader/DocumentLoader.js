import React, { useState, useEffect } from 'react';
import './DocumentLoader.css';

export const DocumentLoader = ({ isLoading }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="typing-loader">
          <span>We are preparing your document</span>
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
};