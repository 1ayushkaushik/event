'use client';
import React, { useEffect, useState } from 'react';
import type { Vendor } from '../../types';
import VendorList from './VendorList';
import vendorDataRaw from '../../data/VendorData';

interface Props {
  categoryId: string;
  location: string;
  totalBudget: number;
  onBack: () => void;
  onBookVendor: (categoryId: string, vendor: Vendor) => void; // 👈 NEW
}

const VendorSuggestions: React.FC<Props> = ({
  categoryId,
  location,
  totalBudget,
  onBack,
  onBookVendor, // 👈 NEW
}) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Loading vendors for category:', categoryId);

    const fetchVendors = async () => {
      setLoading(true);

      try {
        const vendorData: Vendor[] = Array.isArray(vendorDataRaw)
          ? vendorDataRaw
          : (vendorDataRaw as any).default || [];

        const filtered = vendorData.filter(
          (v) => v.category?.toLowerCase() === categoryId.toLowerCase()
        );

        console.log('Found vendors:', filtered.length);
        setVendors(filtered);
      } catch (err) {
        console.error('Error loading vendors:', err);
        setVendors([]);
      }

      setLoading(false);
    };

    fetchVendors();
  }, [categoryId]);

  if (loading) {
    return <div className="text-center text-gray-500 py-10">Loading vendors...</div>;
  }

  return (
    <VendorList
      vendors={vendors}
      category={categoryId}
      onBack={onBack}
      onContactClick={(vendor) => {
        // Replace this with book logic
        const confirmed = window.confirm(`Book ${vendor.name} for ₹${vendor.totalCost}?`);
        if (confirmed) {
          onBookVendor(categoryId, vendor); // 🔥 Send selected vendor to parent
          onBack(); // Go back to summary view
        }
      }}
    />
  );
};

export default VendorSuggestions;
