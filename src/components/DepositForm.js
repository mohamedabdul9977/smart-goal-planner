import React, { useState } from 'react';

const DepositForm = ({ goals, onDeposit, onCancel }) => {
  const [formData, setFormData] = useState({
    goalId: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDeposit(formData.goalId, parseFloat(formData.amount));
  };

  return (
    <div className="form-container">
      <h2>Make a Deposit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Goal:</label>
          <select
            name="goalId"
            value={formData.goalId}
            onChange={handleChange}
            required
          >
            <option value="">Select a goal</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>
                {goal.name} (${goal.savedAmount} of ${goal.targetAmount})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Amount to Deposit ($):</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Deposit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default DepositForm;
// This component allows users to make deposits towards their financial goals.
// It includes a dropdown to select a goal and an input field for the deposit amount.
// The form handles the submission of the deposit and calls the provided `onDeposit` function with the selected goal ID and deposit amount.
// The component also includes a cancel button to close the form without making a deposit.
// The form ensures that the user selects a goal and enters a valid deposit amount before submission.
// The deposit amount must be a positive number, and the goal selection is required.