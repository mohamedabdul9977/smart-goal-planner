import React from 'react';

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-container">
      <div 
        className="progress-bar" 
        style={{ width: `${percentage}%` }}
      >
        <span className="progress-text">{percentage.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
// This component renders a progress bar to visually represent the progress of a financial goal.