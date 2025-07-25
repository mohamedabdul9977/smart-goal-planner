import React, { useState, useEffect } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import '../App.css';
import API_BASE_URL from '../config';


const API_URL = `${API_BASE_URL}/goals`; // Adjust the endpoint as needed






const App = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch goals');
      const data = await response.json();
      setGoals(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addGoal = async (newGoal) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoal),
      });
      if (!response.ok) throw new Error('Failed to add goal');
      const addedGoal = await response.json();
      setGoals(prev => [...prev, addedGoal]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateGoal = async (updatedGoal) => {
  try {
    const response = await fetch(`${API_URL}/${updatedGoal.id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGoal),
    });

    if (!response.ok) throw new Error('Failed to update goal');

    const data = await response.json(); 

    setGoals(prev =>
      prev.map(goal => goal.id === data.id ? data : goal)
    );
  } catch (err) {
    setError(err.message);
  }
};


  const deleteGoal = async (goalId) => {
    try {
      const response = await fetch(`${API_URL}/${goalId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete goal');
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
    } catch (err) {
      setError(err.message);
    }
  };

  const makeDeposit = async (goalId, amount) => {
    try {
      const goalToUpdate = goals.find(goal => goal.id === goalId);
      if (!goalToUpdate) throw new Error('Goal not found');
      
      const updatedGoal = {
        ...goalToUpdate,
        savedAmount: goalToUpdate.savedAmount + amount
      };
      
      const response = await fetch(`${API_URL}/${goalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ savedAmount: updatedGoal.savedAmount }),
      });
      
      if (!response.ok) throw new Error('Failed to update deposit');
      setGoals(prev => 
        prev.map(goal => goal.id === goalId ? updatedGoal : goal)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app">
      <Header />
      <Dashboard
        goals={goals}
        onAddGoal={addGoal}
        onDeleteGoal={deleteGoal}
        onUpdateGoal={updateGoal}
        onDeposit={makeDeposit}
      />
    </div>
  );
};

export default App;
// This component serves as the main application container.
// It fetches financial goals from an API and manages the state of the application.
// It includes functionality to add, update, delete goals, and make deposits towards goals.
// The component uses React hooks for state management and side effects.