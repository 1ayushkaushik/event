'use client';
import React, { useMemo } from 'react';
import type { Vendor } from '../../types';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface VendorCardProps {
  vendor: Vendor;
  onClick?: () => void;
}

// Define your color themes
const cardColors = ['bg-blue-100', 'bg-violet-100', 'bg-purple-100'];
const badgeColors = ['bg-blue-500', 'bg-violet-500', 'bg-purple-500'];

const VendorCard: React.FC<VendorCardProps> = ({ vendor, onClick }) => {
  // Randomly choose a color combo (memoized so it doesn't change on every render)
  const { cardColor, badgeColor } = useMemo(() => {
    const index = Math.floor(Math.random() * cardColors.length);
    return {
      cardColor: cardColors[index],
      badgeColor: badgeColors[index],
    };
  }, []);

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer hover:shadow-lg p-4 rounded-lg transition space-y-2 ${cardColor}`}
    >
      <div className="flex justify-between items-center">
        <div className="font-bold text-lg">{vendor.name}</div>
        <span className={`text-white text-xs font-semibold px-2 py-1 rounded ${badgeColor}`}>
          {vendor.category}
        </span>
      </div>

      <div className="text-sm text-gray-700">
        <span className="font-medium">Services: </span>
        {vendor.services.join(', ')}
      </div>

      <div className="flex items-center space-x-1 pt-1">
        {[...Array(5)].map((_, index) =>
          index < vendor.rating ? (
            <AiFillStar key={index} className="text-yellow-500" />
          ) : (
            <AiOutlineStar key={index} className="text-gray-400" />
          )
        )}
      </div>
    </div>
  );
};

export default VendorCard;
