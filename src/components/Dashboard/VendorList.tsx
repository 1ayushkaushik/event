import React from 'react';
import type { Vendor } from '../../types';
import VendorCard from './VendorCard';

interface VendorListProps {
  vendors: Vendor[];
  category: string;
  onContactClick: (vendor: Vendor) => void;
  onBack?: () => void;
}

const VendorList: React.FC<VendorListProps> = ({ vendors, category, onContactClick, onBack }) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-center relative mb-4">
        <h2 className="text-2xl font-bold">Vendors for <span className="capitalize">{category}</span></h2>
        {onBack && (
          <div className="absolute right-0">
            <button
              onClick={onBack}
              className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-500 transition-colors"
            >
              Back to Categories
            </button>
          </div>
        )}
      </div>

      {vendors.length === 0 ? (
        <div className="text-center text-gray-500">
          No vendors available in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-lg p-4 rounded-lg bg-white">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} onContactClick={onContactClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorList;
