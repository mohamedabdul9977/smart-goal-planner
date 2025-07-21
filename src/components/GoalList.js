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
// This component renders a list of financial goals.
// It maps over the `goals` array and renders a `GoalCard` for each goal.
// Each `GoalCard` includes buttons to delete or edit the goal, which call the respective `onDelete` and `onEdit` functions passed as props.
// The component is designed to be reusable and can be styled with CSS to display the goals in a visually appealing manner.
