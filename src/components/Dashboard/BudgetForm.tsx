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
      className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl mx-auto"
    >
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Wedding Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Enter city or venue"
          className="border rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Guest Count</label>
        <input
          name="guestCount"
          type="number"
          value={form.guestCount}
          onChange={handleChange}
          placeholder="How many guests?"
          className="border rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Total Budget (in ₹)</label>
        <input
          name="totalBudget"
          type="number"
          value={form.totalBudget}
          onChange={handleChange}
          placeholder="Your max budget"
          className="border rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm shadow hover:bg-blue-700 transition"
        >
          Show Budget Graph
        </button>
        <button
          type="button"
          onClick={handleFindVendors}
          className="bg-green-600 text-white px-4 py-2 rounded-md text-sm shadow hover:bg-green-700 transition"
        >
          Find Vendors
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
