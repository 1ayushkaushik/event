import React, { useMemo } from 'react';
import type { VendorCategory } from '../../types';

interface Props {
    category: VendorCategory;
    onClick: (categoryId: string) => void;
}

const VendorCategoryCard: React.FC<Props> = ({ category, onClick }) => {
    const gradients = [
    'bg-gradient-to-r from-blue-100 via-purple-100 to-violet-100',
    'bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100',
    'bg-gradient-to-r from-indigo-100 via-blue-100 to-cyan-100',
    'bg-gradient-to-r from-violet-100 via-indigo-100 to-blue-100',
    'bg-gradient-to-r from-fuchsia-100 via-pink-100 to-rose-100',
    'bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100',
];

    const backgroundClass = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
}, []);


    return (
        <div
            onClick={() => onClick(category.id)}
            className={`relative flex items-center ${backgroundClass} rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-[130px]`}
        >

            {/* Left Text Section */}
            <div className="flex-1 p-4">
                <h2 className="text-lg font-bold">
                    {category.name}
                </h2>
                <p className="text-sm text-gray-700 truncate max-w-full">
                    {category.subcategories.join(', ')}
                </p>
            </div>

            {/* Right Image Section */}
            <div className="relative w-[30%] h-full">
                <img
                    src={category.imageUrl}
                    alt={category.name}
                    style={{overflowClipMargin: 'content-box', overflow: 'clip', objectFit: 'cover', clipPath: 'ellipse(99% 140px at 100% 50%)', height: '100%', width: '100%'}}
                />
            </div>
        </div>
    );
};

export default VendorCategoryCard;
