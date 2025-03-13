import React from 'react';
import './BackgroundCircle.css';

const BackgroundCircle = ({ children }) => {
  return (
    <div className="background-container">
      <div className="circle-background"></div>
      <div className="content">{children}</div>
    </div>
  );
};

export default BackgroundCircle;