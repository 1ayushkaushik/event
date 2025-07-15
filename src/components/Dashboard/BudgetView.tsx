// components/Dashboard/BudgetView.tsx
'use client';
import React, { useState } from 'react';
import BudgetForm from './BudgetForm';
import BudgetGraph from './BudgetGraph';
import VendorSummary from './VendorSummary';
import VendorSuggestions from './VendorSuggestions';
import type { Vendor } from '../../types'; 


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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'default' | 'category'>('default');
  const [bookedVendors, setBookedVendors] = useState<Record<string, { name: string; cost: number ,contact:string}>>({});
  const totalActualCost = Object.values(bookedVendors).reduce((sum, v) => sum + v.cost, 0);
  const totalPaid = Object.values(bookedVendors).reduce((sum, v) => sum + (v.paid || 0), 0);



  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setShowGraph(true); // this shows graph + vendor summary
  };

  const handleBookVendor = (categoryId: string, vendor: Vendor) => {
  setBookedVendors(prev => ({
    ...prev,
    [categoryId]: {
      name: vendor.name,
      cost: vendor.totalCost,
      contact : vendor.contact,
      paid : 0,
    }
  }));
  setViewMode('default');
  setSelectedCategory(null);
};


  return (
    <div className="space-y-8 py-8 px-4">
      {/* Default view */}
      {viewMode === 'default' && (
        <>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
            <div className="w-full md:w-1/2">
              <BudgetForm onSubmit={handleFormSubmit} />
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

          {showGraph && (
            <VendorSummary
              totalBudget={formData.totalBudget}
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                setViewMode('category');
              }}
              bookedVendors={bookedVendors}
              onBookedVendorsChange={(vendors) => setBookedVendors(vendors)}

            />
          )}

         {showGraph && (
  <div className="flex justify-end gap-10 text-lg font-semibold text-gray-800 pr-6">
  <div>🎯 Your Budget: ₹{formData.totalBudget.toLocaleString()}</div>
  <div>💰 Total Actual Cost: ₹{totalActualCost.toLocaleString()}</div>
  <div>💸 Total Paid: ₹{totalPaid.toLocaleString()}</div>
</div>

)}


        </>
      )}

      {/* Category view */}
      {viewMode === 'category' && selectedCategory && (
        <VendorSuggestions
          categoryId={selectedCategory}
          location={formData.location}
          totalBudget={formData.totalBudget}
          onBack={() => {
            setViewMode('default');
            setSelectedCategory(null);
          }}
          onBookVendor={handleBookVendor}
        />
      )}
    </div>
  );
};

export default BudgetView;
