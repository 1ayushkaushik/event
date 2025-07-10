import React from 'react';
import { Vendor } from '../../types';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { MapPin } from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
  onContactClick: (vendor: Vendor) => void;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor, onContactClick }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= vendor.rating ? (
          <AiFillStar key={i} className="text-indigo-500 text-sm" />
        ) : (
          <AiOutlineStar key={i} className="text-gray-400 text-sm" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="bg-white from-indigo-50 via-purple-50 to-violet-50 rounded-xl shadow hover:shadow-md transition-shadow w-full max-w-sm overflow-hidden">
      {/* Vendor Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={vendor.imageUrl || '/placeholder.jpg'}
          alt={vendor.name}
          className="object-cover h-full w-full rounded-t-xl"
        />
      </div>

      {/* Vendor Details */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">{vendor.name}</h3>
          <div className="flex items-center gap-1">
            {renderStars()}
          </div>
        </div>

        <div className="flex items-center text-gray-600 text-sm gap-2">
          <MapPin className="w-4 h-4" />
          {vendor.location || 'Location unknown'}
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          {vendor.services.map((service, index) => (
            <span
              key={index}
              className="bg-violet-100 text-violet-800 px-2 py-0.5 rounded-full text-xs font-medium"
            >
              {service}
            </span>
          ))}
        </div>

        {/* Price Section */}
        <div className="text-sm text-gray-700">
          <span className="font-semibold text-black">
            ₹{vendor.totalCost} {vendor.costPer || ''}
          </span>
        </div>

        {/* Contact Button */}
        <button
          className="mt-3 bg-indigo-500 text-white py-1.5 px-4 rounded hover:bg-indigo-600 text-sm self-start transition-colors"
          onClick={() => onContactClick(vendor)}
        >
          Contact Vendor
        </button>
      </div>
    </div>
  );
};

export default VendorCard;
