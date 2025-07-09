'use client';
import React from 'react';
import { useEventStore } from '../../store/eventStore';
import VendorCard from './VendorCard';
import type { Vendor } from '../../types';

interface VendorListProps {
  onCardClick?: (vendorId: string) => void; // properly typed click handler
}

const VendorList: React.FC<VendorListProps> = ({ onCardClick }) => {
  const { currentEvent } = useEventStore();

  if (!currentEvent) {
    return <div className="p-4 bg-white rounded-lg shadow-md">No event selected</div>;
  }

  return (
    <div>
      {currentEvent.vendors.length === 0 ? (
        <div className="p-4 bg-white rounded-lg shadow-md">No vendors available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentEvent.vendors.map((vendor: Vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onClick={() => onCardClick && onCardClick(vendor.id)} // safe check
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorList;
