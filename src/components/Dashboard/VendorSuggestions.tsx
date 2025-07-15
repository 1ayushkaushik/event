// 'use client';
// import React from 'react';
// import { Vendor } from '../../types';
// import vendorData from '../../data/VendorData';

// interface Props {
//   totalBudget: number;
//   location: string;
// }

// const VendorSuggestions: React.FC<Props> = ({ totalBudget, location }) => {
//   const normalizedLocation = location?.trim().toLowerCase() || '';

//   const budgetFiltered = vendorData.filter(
//     (vendor) => typeof vendor.totalCost === 'number' && vendor.totalCost <= totalBudget
//   );

//   const locationMatched = budgetFiltered.filter(
//     (vendor) =>
//       vendor.location &&
//       vendor.location.toLowerCase().includes(normalizedLocation)
//   );

//   const filtered = locationMatched.length > 0 ? locationMatched : budgetFiltered;

//   const handleContactClick = (vendor: Vendor) => {
//     if (!vendor.contact && !vendor.email) {
//       alert('No contact information available.');
//       return;
//     }

//     if (!vendor.email) {
//       const msg = encodeURIComponent(`Hi ${vendor.name}, we’re interested in your services for our event.`);
//       const number = vendor.contact?.replace('+91', '').replace(/\s/g, '');
//       window.open(`https://wa.me/${number}?text=${msg}`, '_blank');
//       return;
//     }

//     if (!vendor.contact) {
//       window.location.href = `mailto:${vendor.email}`;
//       return;
//     }

//     const choice = window.confirm(`Contact ${vendor.name} via WhatsApp? Click Cancel for Email.`);
//     if (choice) {
//       const msg = encodeURIComponent(`Hi ${vendor.name}, we’re interested in your services for our event.`);
//       const number = vendor.contact.replace('+91', '').replace(/\s/g, '');
//       window.open(`https://wa.me/${number}?text=${msg}`, '_blank');
//     } else {
//       window.location.href = `mailto:${vendor.email}`;
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow space-y-6 max-w-5xl mx-auto">
//       <h3 className="text-xl font-semibold text-gray-800 text-center">
//         Vendors {location ? `in ${location}` : ''} Under ₹{totalBudget.toLocaleString()}
//       </h3>

//       {filtered.length === 0 ? (
//         <p className="text-center text-gray-500 italic">
//           No vendors found under ₹{totalBudget.toLocaleString()}.
//         </p>
//       ) : (
//         <div className="space-y-4">
//           {filtered.map((vendor) => (
//             <div
//               key={vendor.id}
//               className="flex flex-col md:flex-row justify-between items-start border p-4 rounded-lg shadow-sm bg-gray-50"
//             >
//               {/* Left: Vendor details */}
//               <div className="flex-1 space-y-2 pr-4">
//                 <h4 className="text-lg font-bold text-gray-800">{vendor.name}</h4>
//                 <p className="text-sm text-gray-600">Category: {vendor.category}</p>
//                 <div className="flex flex-wrap gap-2 text-xs text-violet-800">
//                   {vendor.services?.map((service, index) => (
//                     <span
//                       key={index}
//                       className="bg-violet-100 px-2 py-0.5 rounded-full"
//                     >
//                       {service}
//                     </span>
//                   ))}
//                 </div>
//                 <p className="text-sm text-green-700 font-medium">
//                   ₹{vendor.totalCost.toLocaleString()} {vendor.costPer && `(${vendor.costPer})`}
//                 </p>
//                 <p className="text-sm text-yellow-600">⭐ {vendor.rating}</p>
//                 <p className="text-xs text-gray-500">📍 {vendor.location}</p>
//                 <p className="text-xs text-gray-500">✉️ {vendor.email}</p>
//                 <p className="text-xs text-gray-500">📞 {vendor.contact}</p>

//                 <button
//                   className="mt-2 bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700 text-sm transition"
//                   onClick={() => handleContactClick(vendor)}
//                 >
//                   Contact Vendor
//                 </button>
//               </div>

//               {/* Right: Vendor Image */}
//               <div className="w-full md:w-60 h-48 md:h-48 rounded-md overflow-hidden mt-4 md:mt-0">
//                 <img
//                   src={vendor.imageUrl || '/placeholder.jpg'}
//                   alt={vendor.name}
//                   className="object-cover w-full h-full rounded-md"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VendorSuggestions;



'use client';
import React, { useState } from 'react';
import { Vendor } from '../../types';
import vendorData from '../../data/VendorData';

interface Props {
  totalBudget: number;
  location: string;
}

const VendorSuggestions: React.FC<Props> = ({ totalBudget, location }) => {
  const normalizedLocation = location?.trim().toLowerCase() || '';
  const filtered: Vendor[] = vendorData.filter(
    (vendor) =>
      vendor.totalCost <= totalBudget &&
      vendor.location.trim().toLowerCase() === normalizedLocation
  );

  const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([]);

  const handleAdd = (vendor: Vendor) => {
    const isAlreadySelected = selectedVendors.some((v) => v.id === vendor.id);
    if (isAlreadySelected) {
      setSelectedVendors((prev) => prev.filter((v) => v.id !== vendor.id));
    } else {
      setSelectedVendors((prev) => [...prev, vendor]);
    }
  };

  const handleContactClick = (vendor: Vendor) => {
    if (!vendor.contact && !vendor.email) {
      alert('No contact information available.');
      return;
    }

    const msg = encodeURIComponent(`Hi ${vendor.name}, we’re interested in your services for our event.`);

    if (!vendor.email) {
      const number = vendor.contact?.replace('+91', '').replace(/\s/g, '');
      window.open(`https://wa.me/${number}?text=${msg}`, '_blank');
      return;
    }

    if (!vendor.contact) {
      window.location.href = `mailto:${vendor.email}`;
      return;
    }

    const choice = window.confirm(`Contact ${vendor.name} via WhatsApp? Click Cancel for Email.`);
    if (choice) {
      const number = vendor.contact.replace('+91', '').replace(/\s/g, '');
      window.open(`https://wa.me/${number}?text=${msg}`, '_blank');
    } else {
      window.location.href = `mailto:${vendor.email}`;
    }
  };

  const totalSelectedCost = selectedVendors.reduce((sum, vendor) => sum + vendor.totalCost, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6 max-w-5xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 text-center">
        Vendors in <span className="text-indigo-600">{location}</span> Under ₹{totalBudget.toLocaleString()}
      </h3>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No vendors found under ₹{totalBudget.toLocaleString()} in {location}.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {filtered.map((vendor) => {
              const isSelected = selectedVendors.some((v) => v.id === vendor.id);

              return (
                <div
                  key={vendor.id}
                  className={`flex flex-col md:flex-row justify-between items-start border p-4 rounded-lg shadow-sm ${
                    isSelected ? 'bg-violet-100' : 'bg-gray-50'
                  }`}
                >
                  {/* Left: Vendor details */}
                  <div className="flex-1 space-y-2 pr-4">
                    <h4 className="text-lg font-bold text-gray-800">{vendor.name}</h4>
                    <p className="text-sm text-gray-600">Category: {vendor.category}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-violet-800">
                      {vendor.services?.map((service, index) => (
                        <span
                          key={index}
                          className="bg-violet-100 px-2 py-0.5 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-green-700 font-medium">
                      ₹{vendor.totalCost.toLocaleString()} {vendor.costPer && `(${vendor.costPer})`}
                    </p>
                    <p className="text-sm text-yellow-600">⭐ {vendor.rating}</p>
                    <p className="text-xs text-gray-500">📍 {vendor.location}</p>
                    <p className="text-xs text-gray-500">✉️ {vendor.email}</p>
                    <p className="text-xs text-gray-500">📞 {vendor.contact}</p>

                    <div className="flex gap-2 mt-2">
                      <button
                        className={`px-4 py-1.5 rounded text-sm transition font-semibold ${
                          isSelected
                            ? 'bg-violet-600 text-white hover:bg-violet-700'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                        onClick={() => handleAdd(vendor)}
                      >
                        {isSelected ? 'Added' : 'Add'}
                      </button>

                      <button
                        className="bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700 text-sm transition"
                        onClick={() => handleContactClick(vendor)}
                      >
                        Contact
                      </button>
                    </div>
                  </div>

                  {/* Right: Vendor Image */}
                  <div className="w-full md:w-48 h-32 md:h-32 rounded-md overflow-hidden mt-4 md:mt-0">
                    <img
                      src={vendor.imageUrl || '/placeholder.jpg'}
                      alt={vendor.name}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Cost of Selected Vendors */}
          <div className="text-right text-indigo-700 font-bold pt-4">
            Total Selected Cost: ₹{totalSelectedCost.toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
};

export default VendorSuggestions;

