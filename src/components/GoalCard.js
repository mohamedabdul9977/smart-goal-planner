import React from 'react';
import ProgressBar from './ProgressBar';

const GoalCard = ({ goal, onDelete, onEdit }) => {
  const remainingAmount = goal.targetAmount - goal.savedAmount;
  const progressPercentage = (goal.savedAmount / goal.targetAmount) * 100;
  
  const deadlineDate = new Date(goal.deadline);
  const today = new Date();
  const timeDiff = deadlineDate - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  let status = 'On Track';
  if (daysLeft <= 0 && progressPercentage < 100) {
    status = 'Overdue';
  } else if (daysLeft <= 30 && progressPercentage < 100) {
    status = 'Approaching Deadline';
  } else if (progressPercentage >= 100) {
    status = 'Completed';
  }

  return (
    <div className={`goal-card ${status.toLowerCase().replace(' ', '-')}`}>
      <div className="goal-header">
        <h3>{goal.name}</h3>
        <span className={`status-badge ${status.toLowerCase().replace(' ', '-')}`}>
          {status}
        </span>
      </div>
      <p className="category">{goal.category}</p>
      <ProgressBar percentage={progressPercentage} />
      <div className="goal-details">
        <div>
          <span>Saved: ${goal.savedAmount.toLocaleString()}</span>
          <span>Target: ${goal.targetAmount.toLocaleString()}</span>
          <span>Remaining: ${remainingAmount.toLocaleString()}</span>
        </div>
        <div>
          <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
          <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}</span>
        </div>
      </div>
      <div className="goal-actions">
        <button onClick={() => onEdit(goal)}>Edit</button>
        <button onClick={() => onDelete(goal.id)}>Delete</button>
      </div>
    </div>
  );
};

export default GoalCard;
// This component represents a single financial goal card.
// It displays the goal's name, category, progress bar, and details such as saved amount, target amount, remaining amount, deadline, and status.
// It also includes buttons to edit or delete the goal.
// The status of the goal is determined based on the saved amount, target amount, and deadline.
// The component uses a progress bar to visually represent the goal's progress towards the target amount.