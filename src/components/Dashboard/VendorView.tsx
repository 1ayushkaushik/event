import React, { useState } from 'react';
import { useEventStore } from '../../store/eventStore';

const VendorView: React.FC = () => {
  const { currentEvent, addVendor, updateVendor, deleteVendor } = useEventStore();
  const [form, setForm] = useState({
    name: '',
    category: '',
    contact: '',
    email: '',
    rating: 5,
    services: '',
    totalCost: '',
  });

  if (!currentEvent) {
    return <div className="p-6 text-gray-600">No event selected.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category) return;
    addVendor(currentEvent.id, {
      id: Date.now().toString(),
      name: form.name,
      category: form.category,
      contact: form.contact,
      email: form.email,
      rating: Number(form.rating),
      services: form.services.split(',').map(s => s.trim()).filter(Boolean),
      contracts: [],
      totalCost: Number(form.totalCost) || 0,
    });
    setForm({ name: '', category: '', contact: '', email: '', rating: 5, services: '', totalCost: '' });
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Vendors for {currentEvent.title}</h2>
      <form onSubmit={handleAddVendor} className="mb-6 flex flex-wrap gap-4 items-end bg-gray-50 p-4 rounded-lg shadow">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Vendor Name" className="border rounded-lg p-2 flex-1 min-w-[150px]" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category (e.g. Catering, Decor)" className="border rounded-lg p-2 flex-1 min-w-[120px]" />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact Number" className="border rounded-lg p-2 flex-1 min-w-[120px]" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border rounded-lg p-2 flex-1 min-w-[120px]" />
        <input name="services" value={form.services} onChange={handleChange} placeholder="Services (comma separated)" className="border rounded-lg p-2 flex-1 min-w-[150px]" />
        <input name="totalCost" value={form.totalCost} onChange={handleChange} placeholder="Total Cost" type="number" className="border rounded-lg p-2 flex-1 min-w-[100px]" />
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <select name="rating" value={form.rating} onChange={handleChange} className="border rounded-lg p-2 min-w-[80px]">
          {[1,2,3,4,5].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Add Vendor</button>
      </form>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Vendor List</h3>
        {currentEvent.vendors.length === 0 ? (
          <div className="text-gray-500 italic">No vendors added yet.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {currentEvent.vendors.map(vendor => (
              <li key={vendor.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{vendor.name}</div>
                  <div className="text-sm text-gray-600">Category: {vendor.category}</div>
                  <div className="text-xs text-gray-500">Contact: {vendor.contact} | Email: {vendor.email}</div>
                  <div className="text-xs text-gray-500">Services: {vendor.services.join(', ')}</div>
                  <div className="text-xs text-gray-500">Total Cost: ${vendor.totalCost}</div>
                  <div className="text-xs text-yellow-600">Rating: {'★'.repeat(vendor.rating)}{'☆'.repeat(5-vendor.rating)}</div>
                </div>
                {/* You can add edit/delete buttons here if needed */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VendorView;
