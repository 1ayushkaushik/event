// components/VendorSuggestions.tsx
'use client';
import React from 'react';
import { useEventStore } from '../../store/eventStore';
import { Vendor } from '../../types';

interface Props {
  totalBudget: number;
}

const VendorSuggestions: React.FC<Props> = ({ totalBudget }) => {
  const { events } = useEventStore();

  // Flatten all vendors from all events
 const allVendors: Vendor[] = events.flatMap(event => event.vendors);

const uniqueVendors = Array.from(new Map(allVendors.map(v => [v.id, v])).values());

const filtered = uniqueVendors.filter((vendor) => vendor.totalCost <= totalBudget);


  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800">Vendors Under Your Budget</h3>

      {filtered.length === 0 ? (
        <p className="text-gray-500 italic">No vendors found under ₹{totalBudget.toLocaleString()}.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((vendor) => (
            <div
              key={vendor.id}
              className="border p-4 rounded shadow-sm bg-gray-50 space-y-1"
            >
              <p className="font-semibold text-gray-800">{vendor.name}</p>
              <p className="text-sm text-gray-600">Category: {vendor.category}</p>
              <p className="text-sm text-green-700 font-medium">
                ₹{vendor.totalCost.toLocaleString()}
              </p>
              <p className="text-sm text-yellow-600">⭐ {vendor.rating}</p>
              <p className="text-xs text-gray-500">{vendor.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorSuggestions;
