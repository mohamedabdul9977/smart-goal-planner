import React from 'react';

const Overview = ({ goals }) => {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  
  const today = new Date();
  const approachingDeadlineGoals = goals.filter(goal => {
    if (goal.savedAmount >= goal.targetAmount) return false;
    const deadline = new Date(goal.deadline);
    const timeDiff = deadline - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft > 0;
  });
  
  const overdueGoals = goals.filter(goal => {
    if (goal.savedAmount >= goal.targetAmount) return false;
    const deadline = new Date(goal.deadline);
    return deadline < today;
  });

  return (
    <div className="overview">
      <h2>Savings Overview</h2>
      <div className="overview-stats">
        <div className="stat-card">
          <h3>Total Goals</h3>
          <p>{totalGoals}</p>
        </div>
        <div className="stat-card">
          <h3>Total Saved</h3>
          <p>${totalSaved.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Total Target</h3>
          <p>${totalTarget.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedGoals}</p>
        </div>
      </div>
      <div className="overview-alerts">
        {approachingDeadlineGoals.length > 0 && (
          <div className="alert warning">
            <h3>Approaching Deadlines ({approachingDeadlineGoals.length})</h3>
            <ul>
              {approachingDeadlineGoals.map(goal => (
                <li key={goal.id}>
                  {goal.name} - {new Date(goal.deadline).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}
        {overdueGoals.length > 0 && (
          <div className="alert danger">
            <h3>Overdue Goals ({overdueGoals.length})</h3>
            <ul>
              {overdueGoals.map(goal => (
                <li key={goal.id}>
                  {goal.name} - was due {new Date(goal.deadline).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
// This component provides an overview of the user's financial goals.
// It calculates and displays total goals, total saved amount, total target amount, and completed goals