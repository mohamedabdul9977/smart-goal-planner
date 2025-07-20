import React from 'react';
import GoalCard from './GoalCard';

const GoalList = ({ goals, onDelete, onEdit }) => {
  return (
    <div className="goal-list">
      {goals.map(goal => (
        <GoalCard 
          key={goal.id} 
          goal={goal} 
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default GoalList;