import React, { useState } from 'react';
import Modal from './Modal.tsx';

type CardType = {
  title: string;
  date: string;
  venue: string;
  names: string;
  image: string;
};

const initialCards = [
  {
    title: 'Blooming in Love',
    date: '20.10.2026',
    venue: 'Chattarpur Farms, Delhi',
    names: 'Ravi & Meera',
    image: 'src/images/cards/blooming.png',
  },
  {
    title: 'Black Garden',
    date: '14.11.2025',
    venue: 'Agra Palace',
    names: 'Ayaan & Zoya',
    image: 'src/images/cards/blackgarden.png',
  },
  {
    title: 'Scent Of Summer',
    date: '06.06.2023',
    venue: 'Taj Mahal',
    names: 'Shreya & Keshav',
    image: 'src/images/cards/scent.png',
  },
];

type EditableCardType = CardType & { index: number };

const EInviteView = () => {
  const [cards, setCards] = useState<CardType[]>(initialCards);
  const [editingCard, setEditingCard] = useState<EditableCardType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCustomizeClick = (cardIndex: number) => {
    setEditingCard({ ...cards[cardIndex], index: cardIndex });
    setModalOpen(true);
  };

  const handleSave = (updatedCard: any) => {
    const newCards = [...cards];
    newCards[updatedCard.index] = {
      ...updatedCard,
    };
    const { index, ...cardData } = updatedCard;
    newCards[index] = cardData;
    setCards(newCards);
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Wedding Cards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="shadow-lg rounded-xl overflow-hidden bg-white transition hover:shadow-xl relative"
          >
            <img src={card.image} alt={card.title} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.date}</p>
              <p className="text-sm text-gray-500">{card.venue}</p>
              <button
                onClick={() => handleCustomizeClick(idx)}
                className="mt-2 px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
              >
                Customize
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && editingCard && (
        <Modal card={editingCard} onSave={handleSave} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default EInviteView;
