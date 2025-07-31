import React, { useState } from 'react';

const Modal = ({ card, onSave, onClose }: any) => {
  const [formData, setFormData] = useState(card);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl relative">
        <h3 className="text-xl font-semibold mb-4">Customize Your Invite</h3>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Editable form */}
          <div className="flex-1">
            <label className="block mb-2">Event Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <label className="block mb-2">Names</label>
            <input
              type="text"
              name="names"
              value={formData.names}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <label className="block mb-2">Date</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <label className="block mb-2">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-4"
            />
          </div>

          {/* Live preview */}
          <div className="flex-1 relative">
            <img
              src={card.image}
              alt="preview"
                className="w-full max-w-md mx-auto rounded shadow-md" 
                style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
            <div className="absolute top-[10%] w-full text-center text-gray-700 drop-shadow text-xl font-dancing">{formData.title}</div>
            <div className="absolute top-[20%] w-full text-center drop-shadow text-gray-700 text-lg">{formData.names}</div>
            <div className="absolute top-[47%] w-full left-[43%] drop-shadow text-[10px]">{formData.date}</div>
            <div className="absolute bottom-[40%] w-full text-center drop-shadow text-brown-400 text-sm">{formData.venue}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
          <button onClick={() => onSave(formData)} className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
