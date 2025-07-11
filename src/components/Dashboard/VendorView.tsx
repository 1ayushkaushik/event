'use client';
import React, { useState } from 'react';
import weddingCategories from '../../data/VendorCategories';
import vendorData from '../../data/VendorData';
import WeddingCategoryCard from './VendorCategoryCards';
import VendorList from './VendorList';
import { Vendor } from '../../types';

const WeddingCategoriesPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleBack = () => {
        setSelectedCategory(null);
    };
                          
    const handleContactClick = (vendor: Vendor) => {
        if (!vendor.contact || !vendor.email) {
            alert('Contact information is not available for this vendor.');
            return;
        }

        if(!vendor.contact){
            window.location.href = `mailto:${vendor.email}`;
            return;
        }

        if(vendor.contact.startsWith('+91 ')){
            vendor.contact = vendor.contact.replace('+91 ', '');
        } else if(vendor.contact.startsWith('+91')){
            vendor.contact = vendor.contact.replace('+91', '');
        }

        if(!vendor.email){
            const message = encodeURIComponent(`Hi ${vendor.name}, we would like to talk to you about an event!`);
            window.open(`https://wa.me/${vendor.contact}?text=${message}`, '_blank');
            return;
        }

        const choice = window.confirm(`Contact ${vendor.name} via WhatsApp? Click Cancel for Email.`);
        if (choice) {
            const message = encodeURIComponent(`Hi ${vendor.name}, we would like to talk to you about an event!`);
            window.open(`https://wa.me/${vendor.contact}?text=${message}`, '_blank');
        } else {
            window.location.href = `mailto:${vendor.email}`;
        }
    };

    return (
        <div className="p-4">
            {selectedCategory ? (
                <VendorList
                    vendors={vendorData.filter(vendor => vendor.category === selectedCategory)}
                    category= {selectedCategory}
                    onContactClick={handleContactClick}
                    onBack={handleBack}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {weddingCategories.map((category) => (
                        <WeddingCategoryCard key={category.id} category={category} onClick={handleCategoryClick} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeddingCategoriesPage;
