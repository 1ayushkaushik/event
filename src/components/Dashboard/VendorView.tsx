'use client';
import React, { useState, useRef } from 'react';
import { useEventStore } from '../../store/eventStore';
import VendorList from './VendorList';
import VendorForm from './VendorForm';
import VendorDetails from './VendorDetails';

const VendorView: React.FC = () => {
  const { currentEvent, addVendor } = useEventStore();

  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [showVendorDetails, setShowVendorDetails] = useState(false);

  if (!currentEvent) {
    return <div className="p-4 bg-white rounded-lg shadow-md">No event selected</div>;
  }


  // Inside VendorView component
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportButtonClick = () => {
    fileInputRef.current?.click(); // open the file dialog
  };


  const handleExportVendors = () => {
    if (!currentEvent) return;

    const vendorData = JSON.stringify(currentEvent.vendors, null, 2);

    const blob = new Blob([vendorData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentEvent.title.replace(/\s+/g, '_')}_vendors.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };


  const handleImportVendors = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentEvent) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const vendors = JSON.parse(e.target?.result as string);
        if (!Array.isArray(vendors)) throw new Error('Invalid file format');

        vendors.forEach((vendor) => {
          addVendor(currentEvent.id, vendor);
        });
        // alert('Vendors imported successfully!');
      } catch (error) {
        console.error('Error importing vendors:', error);
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);

    // Reset file input so that the same file can be re-uploaded if needed
    event.target.value = '';
  };


  const handleAddVendorClick = () => {
    setSelectedVendorId(null);
    setShowVendorForm(true);
    setShowVendorDetails(false);
  };

  const handleVendorCardClick = (vendorId: string) => {
    setSelectedVendorId(vendorId);
    setShowVendorDetails(true);
    setShowVendorForm(false);
  };

  const handleEditClick = (vendorId: string) => {
    setSelectedVendorId(vendorId);
    setShowVendorForm(true);
    setShowVendorDetails(false);
  };

  const handleComplete = () => {
    if (selectedVendorId) {
      // If there was a selectedVendorId, go back to details view
      setShowVendorForm(false);
      setShowVendorDetails(true);
    } else {
      // If you were adding a new vendor, go back to the list
      setSelectedVendorId(null);
      setShowVendorForm(false);
      setShowVendorDetails(false);
    }
  };

  const handleBackToList = () => {
    setSelectedVendorId(null);
    setShowVendorForm(false);
    setShowVendorDetails(false);
  };



  return (
    <div className="p-6 bg-gray-50 rounded-lg  space-y-6">

      {showVendorForm ? (
        <VendorForm vendorId={selectedVendorId} onComplete={handleComplete} />
      ) : showVendorDetails ? (
        <VendorDetails
          vendorId={selectedVendorId!}
          onEdit={handleEditClick}
          onComplete={handleBackToList}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Vendors for {currentEvent.title}</h1>

            <div className="flex space-x-3">
              <div className="flex space-x-3">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={handleAddVendorClick}
                >
                  Add Vendor
                </button>

                <button
                  className="px-4 py-2 text-white rounded-lg hover:bg-violet-700 transition bg-violet-500"
                  onClick={handleImportButtonClick}
                >
                  Import Vendors
                </button>

                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  onClick={handleExportVendors}
                >
                  Export Vendors
                </button>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="application/json"
                  ref={fileInputRef}
                  onChange={handleImportVendors}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <VendorList onCardClick={handleVendorCardClick} />
        </>
      )}
    </div>
  );
};

export default VendorView;
