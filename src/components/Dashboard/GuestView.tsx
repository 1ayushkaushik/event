import React, { useState } from 'react';
import { Guest } from '../../types';
import { useEventStore } from '../../store/eventStore';

const GuestView: React.FC = () => {
  const { currentEvent, addGuest } = useEventStore();
  const [form, setForm] = useState({ name: '', whatsapp: '', email: '' });
  // Dropdown state for invite menu
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  if (!currentEvent) {
    return <div className="p-6 text-gray-600">No event selected.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.whatsapp || !form.email) return;
    const newGuest: Guest = {
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      phone: form.whatsapp,
      rsvpStatus: 'pending',
      checkedIn: false
    };
    addGuest(currentEvent.id, newGuest);
    setForm({ name: '', whatsapp: '', email: '' });
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Guests for {currentEvent.title}</h2>
      <form onSubmit={handleAddGuest} className="mb-6 flex flex-wrap gap-4 items-end">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Guest Name" className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="WhatsApp Number" className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Add Guest</button>
      </form>
      <div className="bg-white rounded-lg shadow p-4 border">
        <h3 className="text-xl font-semibold mb-2 text-blue-700">{currentEvent.title}</h3>
        {currentEvent.guests && currentEvent.guests.length > 0 ? (
          <ul className="space-y-2">
            {currentEvent.guests.map((guest: Guest) => (
              <li key={guest.id} className="border-b pb-2 flex items-center justify-between">
                <div>
                  <div className="font-medium">{guest.name}</div>
                  <div className="text-sm text-gray-600">WhatsApp: {guest.phone}</div>
                  <div className="text-sm text-gray-600">Email: {guest.email}</div>
                </div>
                <div className="relative flex items-center gap-2">
                  <button
                    className="ml-4 px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-700 hover:bg-green-200 transition"
                    onClick={() => setDropdownOpen(dropdownOpen === guest.id ? null : guest.id)}
                  >
                    Invite
                  </button>
                  {/* RSVP Status Button */}
                  <button
                    className={`px-3 py-1 rounded text-xs font-semibold transition ${guest.rsvpStatus === 'accepted' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-blue-200'}`}
                    onClick={() => {
                      if (guest.rsvpStatus !== 'accepted') {
                        // Accept the invite
                        useEventStore.getState().updateGuest(currentEvent.id, guest.id, { rsvpStatus: 'accepted' });
                      }
                    }}
                    disabled={guest.rsvpStatus === 'accepted'}
                  >
                    {guest.rsvpStatus === 'accepted' ? 'Accepted' : 'Mark as Accepted'}
                  </button>
                  {dropdownOpen === guest.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => {
                          const message = encodeURIComponent(`Hi ${guest.name}, you're invited to ${currentEvent.title}!`);
                          window.open(`https://wa.me/${guest.phone}?text=${message}`, '_blank');
                          setDropdownOpen(null);
                        }}
                      >
                        Digital Invite
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => {
                          alert('Physical invite selected. Please arrange for a physical invitation to be sent.');
                          setDropdownOpen(null);
                        }}
                      >
                        Physical Invite
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 italic">No guests added yet.</div>
        )}
      </div>
    </div>
  );
};

export default GuestView;
