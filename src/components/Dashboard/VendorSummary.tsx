'use client';
import React, { useState, useEffect } from 'react';
import weddingCategories from '../../data/VendorCategories';

interface BookedVendorInfo {
  name: string;
  cost: number;
  contact: string;
  paid: number;
}

interface Props {
  totalBudget: number;
  bookedVendors: Record<string, BookedVendorInfo>;
  onSelectCategory: (categoryId: string) => void;
  onBookedVendorsChange: (vendors: Record<string, BookedVendorInfo>) => void;
}

const VendorSummary: React.FC<Props> = ({
  totalBudget,
  bookedVendors: bookedVendorsProp,
  onSelectCategory,
  onBookedVendorsChange
}) => {
  const [bookedVendors, setBookedVendors] = useState<Record<string, BookedVendorInfo>>(bookedVendorsProp);
  const [addingCategory, setAddingCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ name: string; cost: string; contact: string }>({
    name: '',
    cost: '',
    contact: ''
  });
  const [editingPaid, setEditingPaid] = useState<string | null>(null);
  const [paidInput, setPaidInput] = useState<string>('');

  const [estimates] = useState<Record<string, number>>(() => {
    const initialEstimates: Record<string, number> = {};
    weddingCategories.forEach((cat) => {
      initialEstimates[cat.id] = Math.floor(Math.random() * 20000) + 10000;
    });
    return initialEstimates;
  });

  useEffect(() => {
    setBookedVendors(bookedVendorsProp);
  }, [bookedVendorsProp]);

  useEffect(() => {
    onBookedVendorsChange(bookedVendors);
  }, [bookedVendors]);

  const handleAddClick = (categoryId: string) => {
    setAddingCategory(categoryId);
    setFormData({ name: '', cost: '', contact: '' });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (categoryId: string) => {
    const { name, cost, contact } = formData;
    if (name && cost && contact) {
      setBookedVendors((prev) => ({
        ...prev,
        [categoryId]: { name, cost: Number(cost), contact, paid: 0 }
      }));
      setAddingCategory(null);
    }
  };

  const handleDeleteVendor = (categoryId: string) => {
    setBookedVendors((prev) => {
      const updated = { ...prev };
      delete updated[categoryId];
      return updated;
    });
  };

  const handlePaidSubmit = (categoryId: string) => {
    const paidValue = Number(paidInput);
    if (!isNaN(paidValue)) {
      setBookedVendors((prev) => ({
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          paid: paidValue
        }
      }));
      setEditingPaid(null);
      setPaidInput('');
    }
  };

  const totalPaid = Object.values(bookedVendors).reduce((sum, v) => sum + v.paid, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4 max-w-6xl mx-auto mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Vendor Summary</h3>

      <table className="w-full table-auto text-sm border-t border-gray-200">
        <thead className="text-left text-gray-500 border-b border-gray-200">
          <tr>
            <th className="py-2 px-2">Item name</th>
            <th className="py-2 px-2">Vendor/Merchant</th>
            <th className="py-2 px-2">Estimate <span className="text-xs">ℹ️</span></th>
            <th className="py-2 px-2">Actual cost</th>
            <th className="py-2 px-2 text-right pr-20">Paid</th>

          </tr>
        </thead>

        <tbody>
          {weddingCategories.map((cat) => {
            const isBooked = bookedVendors.hasOwnProperty(cat.id);
            const vendorInfo = bookedVendors[cat.id];

            return (
              <tr key={cat.id} className="border-b border-gray-100">
                <td className="py-3 px-2 text-gray-800">{cat.name}</td>

                <td className="py-3 px-2">
                  {isBooked ? (
                    <div className="flex flex-col">
                      <span className="text-green-600 text-sm font-medium">Booked</span>
                      <span className="text-sm text-gray-800">{vendorInfo.name}</span>
                      <span className="text-xs text-gray-500">📞 {vendorInfo.contact}</span>
                    </div>
                  ) : addingCategory === cat.id ? (
                    <div className="space-y-2">
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="border rounded px-2 py-1 w-full text-sm"
                        placeholder="Vendor name"
                      />
                      <input
                        name="cost"
                        value={formData.cost}
                        onChange={handleFormChange}
                        className="border rounded px-2 py-1 w-full text-sm"
                        placeholder="Actual cost (₹)"
                        type="number"
                      />
                      <input
                        name="contact"
                        value={formData.contact}
                        onChange={handleFormChange}
                        className="border rounded px-2 py-1 w-full text-sm"
                        placeholder="Contact number"
                        type="tel"
                      />
                      <button
                        className="text-white bg-indigo-500 hover:bg-indigo-600 px-2 py-1 rounded text-sm"
                        onClick={() => handleFormSubmit(cat.id)}
                      >
                        Add Vendor
                      </button>
                    </div>
                  ) : (
                    <div className="text-indigo-600 text-sm space-x-2">
                      <button onClick={() => handleAddClick(cat.id)} className="underline">
                        Add your vendor
                      </button>
                      <span>or</span>
                      <button onClick={() => onSelectCategory(cat.id)} className="underline">
                        See top {cat.name.toLowerCase()} matches
                      </button>
                    </div>
                  )}
                </td>

                <td className="py-3 px-2 text-gray-700">
                  {!isBooked ? `₹${estimates[cat.id].toLocaleString()}` : '—'}
                </td>

                <td className="py-3 px-2 text-gray-700">
                  {isBooked ? `₹${vendorInfo.cost.toLocaleString()}` : ''}
                </td>

                <td className="py-3 px-2 text-right">
  {isBooked && (
    <div className="flex items-center justify-end space-x-2">
      {editingPaid === cat.id ? (
        <>
          <input
            type="number"
            value={paidInput}
            onChange={(e) => setPaidInput(e.target.value)}
            className="border rounded px-1 py-0.5 w-20 text-sm"
            placeholder="₹ Paid"
          />
          <button
            onClick={() => handlePaidSubmit(cat.id)}
            className="bg-green-500 text-white px-2 py-0.5 rounded text-xs"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span className="text-gray-800">₹{vendorInfo.paid}</span>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => {
              setEditingPaid(cat.id);
              setPaidInput(vendorInfo.paid?.toString() || '');
            }}
          >
            💵
          </button>
          <button
            onClick={() => handleDeleteVendor(cat.id)}
            className="text-gray-400 hover:text-red-500"
          >
            🗑️
          </button>
        </>
      )}
    </div>
  )}
</td>

              </tr>
            );
          })}
        </tbody>
      </table>

      
    </div>
  );
};

export default VendorSummary;
