'use client';
import React from 'react';
import { useEventStore } from '../../store/eventStore';
import { FiArrowLeft, FiEdit2, FiTrash2, FiPhone, FiMail, FiTag, FiDollarSign, FiLayers, FiMessageSquare } from 'react-icons/fi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface VendorDetailsProps {
  vendorId: string;
  onEdit: (vendorId: string) => void;
  onComplete: () => void;
}

const VendorDetails: React.FC<VendorDetailsProps> = ({ vendorId, onEdit, onComplete }) => {
  const { currentEvent, deleteVendor } = useEventStore();

  if (!currentEvent) {
    return <div className="p-4 bg-white rounded-lg shadow-md">No event selected</div>;
  }

  const vendor = currentEvent.vendors.find((v) => v.id === vendorId);

  if (!vendor) {
    return <div className="p-4 bg-white rounded-lg shadow-md">Vendor not found</div>;
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${vendor.name}?`);
    if (!confirmDelete) return;
    deleteVendor(currentEvent.id, vendor.id);
    onComplete();
  };

     const handleContact = () => {
    if (vendor.contact && vendor.email) {
      const choice = window.confirm("Press OK to contact via WhatsApp or Cancel to contact via Email.");
      if (choice) {
        window.open(`https://wa.me/${vendor.contact}?text=Hello%20${encodeURIComponent(vendor.name)},%20we'd%20like%20to%20discuss%20the%20event.`, '_blank');
      } else {
        window.open(`mailto:${vendor.email}?subject=Event%20Inquiry&body=Hello%20${vendor.name},%0A%0AWe'd%20like%20to%20discuss%20the%20event.`, '_blank');
      }
    } else if (vendor.contact) {
      window.open(`https://wa.me/${vendor.contact}?text=Hello%20${encodeURIComponent(vendor.name)},%20we'd%20like%20to%20discuss%20the%20event.`, '_blank');
    } else if (vendor.email) {
      window.open(`mailto:${vendor.email}?subject=Event%20Inquiry&body=Hello%20${vendor.name},%0A%0AWe'd%20like%20to%20discuss%20the%20event.`, '_blank');
    } else {
      alert('No contact information available.');
    }
  }
  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg space-y-6 max-w-2xl mx-auto border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-purple-700">{vendor.name}</h2>
        <button
          onClick={onComplete}
          className="flex items-center space-x-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition text-sm"
        >
          <FiArrowLeft /> <span>Back</span>
        </button>
      </div>

      {/* Info Section */}
      <div className="space-y-3 text-gray-700">
        <div className="flex items-center space-x-2">
          <FiTag className="text-purple-600" />
          <span className="font-semibold">Category:</span>
          <span>{vendor.category}</span>
        </div>

        <div className="flex items-center space-x-2">
          <FiPhone className="text-purple-600" />
          <span className="font-semibold">Contact:</span>
          <span>{vendor.contact || 'N/A'}</span>
        </div>

        <div className="flex items-center space-x-2">
          <FiMail className="text-purple-600" />
          <span className="font-semibold">Email:</span>
          <span>{vendor.email || 'N/A'}</span>
        </div>

        <div className="flex items-center space-x-2">
          <FiLayers className="text-purple-600" />
          <span className="font-semibold">Services:</span>
          <span>{vendor.services.join(', ') || 'None'}</span>
        </div>

        <div className="flex items-center space-x-2">
          <FiDollarSign className="text-purple-600" />
          <span className="font-semibold">Total Cost:</span>
          <span>${vendor.totalCost}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-semibold">Rating:</span>
          <div className="flex">
            {[...Array(5)].map((_, index) =>
              index < vendor.rating ? (
                <AiFillStar key={index} className="text-yellow-500" />
              ) : (
                <AiOutlineStar key={index} className="text-gray-400" />
              )
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 pt-4">
        <button
          onClick={handleContact}
          className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <FiMessageSquare /> <span>Contact</span>
        </button>
        <button
          onClick={() => onEdit(vendor.id)}
          className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FiEdit2 /> <span>Edit</span>
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <FiTrash2 /> <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default VendorDetails;
