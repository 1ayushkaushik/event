// components/Dashboard/BudgetView.tsx
'use client';
import React, { useState } from 'react';
import BudgetForm from './BudgetForm';
import BudgetGraph from './BudgetGraph';
import VendorSuggestions from './VendorSuggestions';

interface FormData {
  location: string;
  guestCount: number;
  totalBudget: number;
}

const BudgetView: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    location: '',
    guestCount: 0,
    totalBudget: 0
  });

  const [showGraph, setShowGraph] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (data: FormData) => {
    setFormData(data);
    setShowGraph(true);
    if(showSuggestions) setShowSuggestions(true);
  };

  const handleFindVendors = (data: FormData) => {
    setFormData(data);
    setShowSuggestions(true);
    if(showGraph) setShowGraph(true);
  };

  return (
    <div className="space-y-8 py-8 px-4">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
        <div className="w-full md:w-1/2">
          <BudgetForm onSubmit={handleSubmit} onFindVendors={handleFindVendors} />
        </div>
        <div className="w-full md:w-1/2">
          {showGraph && (
            <BudgetGraph
              location={formData.location}
              guestCount={formData.guestCount}
              totalBudget={formData.totalBudget}
            />
          )}
        </div>
      </div>

      {showSuggestions && (
        <VendorSuggestions
          totalBudget={formData.totalBudget}
          location={formData.location}
        />
      )}
    </div>
  );
};

export default BudgetView;
