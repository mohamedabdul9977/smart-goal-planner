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