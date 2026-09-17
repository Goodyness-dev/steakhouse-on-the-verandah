import React, { useState } from 'react';
import { quotesApi } from '../../services/api';

export default function NewOrderModal({ isOpen, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    seatingArea: 'Historic Verandah',
    partySize: '2 Guests',
    occasion: 'Dinner & Wine Experience',
    date: new Date().toISOString().split('T')[0],
    time: '7:00 PM',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please provide guest name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        id: `RES-${Date.now().toString().slice(-4)}`,
        name: formData.name,
        phone: formData.phone,
        email: formData.email || 'walkin@devonhouse.com',
        serviceCategory: formData.seatingArea,
        detailedService: `${formData.partySize} • ${formData.occasion}`,
        notes: formData.notes,
        status: 'quoted',
        createdAt: Date.now()
      };
      
      try {
        await quotesApi.submitPublicQuote(payload);
      } catch {
        // Fallback local save
        const local = JSON.parse(localStorage.getItem('steakhouse_reservations') || '[]');
        localStorage.setItem('steakhouse_reservations', JSON.stringify([payload, ...local]));
      }

      if (onCreated) onCreated(payload);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to record reservation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl p-5 sm:p-8 shadow-2xl space-y-5 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#D8D2C5] pb-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/images/real-verandah-steak.jpg" 
              alt="Reservation" 
              className="w-10 h-10 rounded-xl object-cover border border-gold-500/60 shadow-xs"
            />
            <div>
              <h3 className="font-serif font-bold text-lg text-charcoal-900">
                Record Walk-In / Phone Booking
              </h3>
              <p className="text-xs text-charcoal-600">Devon House Verandah Intake</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-xs font-bold uppercase tracking-wider text-charcoal-500 hover:text-charcoal-900 bg-white border border-[#D8D2C5] px-2.5 py-1 rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wider mb-1">
              Guest Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Senator Michael Campbell"
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-gold-500 rounded-xl px-3.5 py-2.5 text-charcoal-900 outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(876) 929-7063"
                className="w-full bg-white border-2 border-[#D8D2C5] focus:border-gold-500 rounded-xl px-3.5 py-2.5 text-charcoal-900 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="guest@example.com"
                className="w-full bg-white border-2 border-[#D8D2C5] focus:border-gold-500 rounded-xl px-3.5 py-2.5 text-charcoal-900 outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Dining Area
              </label>
              <select
                value={formData.seatingArea}
                onChange={(e) => setFormData({ ...formData, seatingArea: e.target.value })}
                className="w-full bg-white border-2 border-[#D8D2C5] focus:border-gold-500 rounded-xl px-3 py-2.5 text-charcoal-900 outline-none transition cursor-pointer"
              >
                <option value="Historic Verandah">Historic Verandah (Garden View)</option>
                <option value="Devon Courtyard">Devon Courtyard (Under Stars)</option>
                <option value="Royal Garden Lawn">Royal Garden Lawn (Private)</option>
                <option value="Sommelier Wine Room">Sommelier Wine Room (VIP)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Party Size
              </label>
              <select
                value={formData.partySize}
                onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                className="w-full bg-white border-2 border-[#D8D2C5] focus:border-gold-500 rounded-xl px-3 py-2.5 text-charcoal-900 outline-none transition cursor-pointer"
              >
                <option value="2 Guests">2 Guests (Table for Two)</option>
                <option value="4 Guests">4 Guests (Family Table)</option>
                <option value="6-8 Guests">6–8 Guests (Verandah Round)</option>
                <option value="10+ VIP Banquet">10+ Guests (Private Banquet)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wider mb-1">
              Dietary Notes or Occasion
            </label>
            <input
              type="text"
              value={formData.occasion}
              onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
              placeholder="e.g. 25th Anniversary • Dry-Aged Ribeye & Wine Pairing"
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-gold-500 rounded-xl px-3.5 py-2.5 text-charcoal-900 outline-none transition"
            />
          </div>

          <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-[#D8D2C5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold rounded-xl text-charcoal-700 hover:bg-[#EFECE6] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#1A1816] hover:bg-black text-[#FCFAF7] text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-xs cursor-pointer border border-gold-500/40"
            >
              {isSubmitting ? 'Recording...' : 'Confirm Table Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
