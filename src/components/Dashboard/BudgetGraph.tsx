// components/BudgetGraph.tsx
'use client';
import React from 'react';

interface Props {
  location: string;
  guestCount: number;
  totalBudget: number;
}

const BudgetGraph: React.FC<Props> = ({ location, guestCount, totalBudget }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl mx-auto text-center space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">
        Estimated Budget Distribution
      </h3>
      <p className="text-sm text-gray-600">
        Based on similar weddings in <strong>{location}</strong> with <strong>{guestCount}</strong> guests.
      </p>

      {/* Dummy visual */}
      <div className="w-full bg-gradient-to-r from-indigo-300 to-indigo-600 h-24 rounded-lg opacity-80" />

      <p className="text-sm text-gray-500">Estimated range: ₹90,000 – ₹1,50,000</p>
      <p className="text-sm text-gray-700 font-medium">Your entered budget: ₹{totalBudget.toLocaleString()}</p>
    </div>
  );
};

export default BudgetGraph;
