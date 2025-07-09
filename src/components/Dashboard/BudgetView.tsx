'use client';
import React, { useState } from 'react';
import BudgetForm from './BudgetForm';
import BudgetGraph from './BudgetGraph';
import VendorSuggestions from './VendorSuggestions';

const BudgetView: React.FC = () => {
  const [formData, setFormData] = useState<null | {
    location: string;
    guestCount: number;
    totalBudget: number;
  }>(null);

  const [showVendors, setShowVendors] = useState(false);

  return (
    <div className="space-y-8 p-6">
      <BudgetForm
        onSubmit={(data) => {
          setFormData(data);
          setShowVendors(false);
        }}
        onFindVendors={(data) => {
          setFormData(data);
          setShowVendors(true);
        }}
      />

      {formData && !showVendors && (
        <BudgetGraph
          location={formData.location}
          guestCount={formData.guestCount}
          totalBudget={formData.totalBudget}
        />
      )}

      {formData && showVendors && (
        <VendorSuggestions
          location={formData.location}
          guestCount={formData.guestCount}
          totalBudget={formData.totalBudget}
        />
      )}
    </div>
  );
};

export default BudgetView;
