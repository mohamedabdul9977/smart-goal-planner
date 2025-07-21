import React, { useState } from 'react';

const AddGoalForm = ({ onAddGoal, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
  name: initialData?.name || '',
  targetAmount: initialData?.targetAmount || '',
  category: initialData?.category || '',
  deadline: initialData?.deadline || ''
});

  const categories = [
    'Travel', 'Emergency', 'Electronics', 'Real Estate', 
    'Vehicle', 'Education', 'Shopping', 'Retirement', 'Home', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const isEditing = !!initialData;

  const newGoal = {
    ...formData,
    targetAmount: parseFloat(formData.targetAmount),
    savedAmount: isEditing ? initialData.savedAmount : 0,
    createdAt: isEditing ? initialData.createdAt : new Date().toISOString().split('T')[0],
    id: isEditing ? initialData.id : undefined,
  };

  onAddGoal(newGoal); 
};


  return (
    <div className="form-container">
      <h2>{initialData ? 'Edit Goal' : 'Add New Goal'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Goal Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Target Amount ($):</label>
          <input
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">
            {initialData ? 'Update Goal' : 'Add Goal'}
          </button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddGoalForm;
// This component allows users to add or edit a financial goal.
// It includes fields for goal name, target amount, category, and deadline.
// The form handles both adding a new goal and editing an existing one based on the presence of `initialData`.
