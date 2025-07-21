import React, { useState, useRef, useEffect } from 'react';
import GoalList from './GoalList';
import AddGoalForm from './AddGoalForm';
import DepositForm from './DepositForm';
import Overview from './Overview';

const Dashboard = ({ 
  goals, 
  onAddGoal, 
  onDeleteGoal, 
  onUpdateGoal, 
  onDeposit 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
  if (showAddForm && formRef.current) {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [showAddForm]);


  const handleAddGoal = (newGoal) => {
    onAddGoal(newGoal);
    setShowAddForm(false);
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setShowAddForm(true);
  };

  const handleUpdateGoal = (updatedGoal) => {
    onUpdateGoal(updatedGoal);
    setShowAddForm(false);
    setEditingGoal(null);
  };

  const handleDeposit = (goalId, amount) => {
    onDeposit(goalId, amount);
    setShowDepositForm(false);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-controls">
        <button onClick={() => setShowAddForm(true)}>Add New Goal</button>
        <button onClick={() => setShowDepositForm(true)}>Make a Deposit</button>
      </div>
      
      {showAddForm && (
      <div ref={formRef}>
      <AddGoalForm
      onAddGoal={editingGoal ? handleUpdateGoal : handleAddGoal}
      onCancel={() => {
        setShowAddForm(false);
        setEditingGoal(null);
      }}
      initialData={editingGoal}
      />
     </div>
  )}

      
      {showDepositForm && (
        <DepositForm
          goals={goals}
          onDeposit={handleDeposit}
          onCancel={() => setShowDepositForm(false)}
        />
      )}
      
      <Overview goals={goals} />
      <GoalList 
        goals={goals} 
        onDelete={onDeleteGoal}
        onEdit={handleEditGoal}
      />
    </div>
  );
};

export default Dashboard;
// This component serves as the main dashboard for the application.
// It displays the list of financial goals, allows users to add new goals,
// edit existing goals, make deposits, and view an overview of their goals.
// The component uses React hooks for state management and references to handle form visibility and scrolling.