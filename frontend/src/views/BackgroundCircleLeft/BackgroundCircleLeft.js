import React from 'react';
import './BackgroundCircleLeft.css';

const BackgroundCircleLeft = ({ children }) => {
  return (
    <div className="background-container">
      <div className="circle-background"></div>
      <div className="content">{children}</div>
    </div>
  );
};

export default BackgroundCircleLeft;