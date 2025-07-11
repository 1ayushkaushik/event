// components/Modals/CreateEventModal.tsx
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useEventStore } from '../../store/eventStore';
import { Event } from '../../types';

const eventTypes: Event['type'][] = ['professional', 'personal', 'campus', 'cultural', 'community'];

export const CreateEventModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { addEvent } = useEventStore();

  const [formData, setFormData] = useState({
    title: '',
    type: 'professional' as Event['type'],
    description: '',
    startDate: '',
    endDate: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent: Event = {
      id: crypto.randomUUID(),
      title: formData.title,
      type: formData.type,
      description: formData.description,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      location: formData.location,
      status: 'planning',
      budget: { spent: 0, total: 0 },
      timeline: [],
      tasks: [],
      guests: [],
      vendors: [],
      assets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addEvent(newEvent);
    setFormData({ title: '', type: 'professional', description: '', startDate: '', endDate: '', location: '' });
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="scale-95 opacity-0" enterTo="scale-100 opacity-100"
            leave="ease-in duration-200" leaveFrom="scale-100 opacity-100" leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
              <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4">
                Create New Event
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  className="w-full border p-2 rounded"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />

                <select
                  className="w-full border p-2 rounded"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Event['type'] })}
                >
                  {eventTypes.map((t) => (
                    <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>

                <textarea
                  placeholder="Description"
                  className="w-full border p-2 rounded"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                <div className="flex gap-2">
                  <input
                    type="date"
                    className="w-1/2 border p-2 rounded"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                  <input
                    type="date"
                    className="w-1/2 border p-2 rounded"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Location"
                  className="w-full border p-2 rounded"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
