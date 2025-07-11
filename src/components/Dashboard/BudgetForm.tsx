// components/BudgetForm.tsx
'use client';
import React, { useState } from 'react';

interface BudgetFormProps {
  onSubmit: (formData: { location: string; guestCount: number; totalBudget: number }) => void;
  onFindVendors: (formData: { location: string; guestCount: number; totalBudget: number }) => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ onSubmit, onFindVendors }) => {
  const [form, setForm] = useState({
    location: '',
    guestCount: 0,
    totalBudget: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      location: form.location.trim(),
      guestCount: Number(form.guestCount),
      totalBudget: Number(form.totalBudget),
    });
  };

  const handleFindVendors = () => {
    onFindVendors({
      location: form.location.trim(),
      guestCount: Number(form.guestCount),
      totalBudget: Number(form.totalBudget),
    });
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="bg-violet-50 p-6 rounded-2xl shadow-md space-y-4 max-w-md mx-auto"
>
  <h2 className="text-xl font-semibold text-violet-700 text-center mb-2">
    Plan Your Wedding Budget
  </h2>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-violet-700">Wedding Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Enter location"
          className="border border-violet-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-violet-700">Guest Count</label>
        <input
          name="guestCount"
          type="number"
          value={form.guestCount}
          onChange={handleChange}
          placeholder="How many guests?"
          className="border border-violet-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-violet-700">Total Budget (in ₹)</label>
        <input
          name="totalBudget"
          type="number"
          value={form.totalBudget}
          onChange={handleChange}
          placeholder="Enter your budget"
          className="border border-violet-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
      </div>

      <div className="flex gap-4 pt-3 justify-center">
        <button
          type="submit"
          className="bg-violet-600 text-white px-4 py-2 rounded-md text-sm hover:bg-violet-700 transition"
        >
          Show Budget Graph
        </button>
        <button
          type="button"
          onClick={handleFindVendors}
          className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition"
        >
          Find Vendors
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
