'use client';
import React, { useEffect } from 'react';
import { useEventStore } from '../../store/eventStore';
import type { Vendor } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface VendorFormProps {
    vendorId: string | null;
    onComplete: () => void;
}

const schema = yup.object().shape({
    name: yup.string().required('Vendor name is required'),
    category: yup.string().required('Category is required'),
    contact: yup.string(),
    email: yup.string().email('Invalid email'),
    services: yup.string().required('Services are required'),
    totalCost: yup.number().min(0, 'Total cost cannot be negative'),
    rating: yup.number().min(0).max(5),
});

const VendorForm: React.FC<VendorFormProps> = ({ vendorId, onComplete }) => {
    const { addVendor, updateVendor, currentEvent } = useEventStore();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
        name: '',
        category: '',
        contact: '',
        email: '',
        services: '',
        rating: 0,
        totalCost: 0,
    },
});


    useEffect(() => {
    if (vendorId && currentEvent) {
        const vendor = currentEvent.vendors.find(v => v.id === vendorId);
        if (vendor) {
            reset({
                name: vendor.name,
                category: vendor.category,
                contact: vendor.contact,
                email: vendor.email,
                services: vendor.services.join(', '),
                rating: vendor.rating,
                totalCost: vendor.totalCost,
            });
        }
    } else {
        // Reset to empty values when adding
        reset({
            name: '',
            category: '',
            contact: '',
            email: '',
            services: '',
            rating: 0,
            totalCost: 0,
        });
    }
}, [vendorId, currentEvent, reset]);


    const onSubmit = (data: any) => {
        if (!currentEvent) return;

        const vendorData: Vendor = {
            id: vendorId ? vendorId : uuidv4(),
            name: data.name,
            category: data.category,
            contact: data.contact,
            email: data.email,
            services: data.services.split(',').map((s: string) => s.trim()),
            rating: Number(data.rating),
            totalCost: Number(data.totalCost),
            contracts: [],
        };

        if (vendorId) {
            updateVendor(currentEvent.id, vendorId, vendorData);
        } else {
            addVendor(currentEvent.id, vendorData);
        }

        onComplete();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-white rounded-2xl shadow-lg space-y-3 max-w-2xl mx-auto border border-gray-200">
            <h2 className="text-2xl font-bold text-purple-700 mb-2">{vendorId ? 'Edit Vendor' : 'Add Vendor'}</h2>

            {(['name', 'category', 'contact', 'email', 'services', 'totalCost'] as const).map((field) => (
                <div key={field} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-600">
                        {field.charAt(0).toUpperCase() + field.slice(1).replace('totalCost', 'Total Cost')}
                    </label>
                    <input
                        type={field === 'totalCost' ? 'number' : 'text'}
                        placeholder={field === 'services' ? 'e.g. Catering, Decor' : field.charAt(0).toUpperCase() + field.slice(1)}
                        {...register(field)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors[field] && (
                        <p className="text-sm text-red-600">{errors[field]?.message}</p>
                    )}
                </div>
            ))}


            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600">Rating</label>
                <select
                    {...register('rating')}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    {[0, 1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    {vendorId ? 'Update Vendor' : 'Save Vendor'}
                </button>
                <button type="button" onClick={onComplete} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default VendorForm;