import React, { useState, useEffect } from 'react';
import { submitQuoteRequest } from '../../services/quoteService';

export default function QuoteWizardModal({ isOpen, onClose, initialCategory = null }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    seatingArea: initialCategory || 'Historic Devon House Verandah',
    partySize: '2 Guests',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '7:30 PM',
    occasion: 'Anniversary / Celebration',
    culinaryNotes: '',
    wineService: true,
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentStep(1);
      setSubmissionResult(null);
      setErrorMsg('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const seatingOptions = [
    {
      title: 'Historic Devon House Verandah',
      desc: 'Our signature candlelit wraparound colonial terrace with lush garden breezes.',
      badge: 'Most Popular'
    },
    {
      title: 'Intimate Georgian Dining Room',
      desc: 'Antique chandeliers, cool air-conditioned luxury, and mahogany accents.',
      badge: 'Quiet & Formal'
    },
    {
      title: 'South Lawn Garden Terrace',
      desc: 'Open-air dining under tropical night skies and glowing lanterns.',
      badge: 'Romantic'
    },
    {
      title: 'Private VIP Verandah Alcove',
      desc: 'Dedicated butler service and bespoke tasting menu consultation.',
      badge: 'Exclusive'
    }
  ];

  const timeSlots = [
    '12:00 PM', '1:00 PM', '2:00 PM', '5:30 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  const partySizes = [
    '2 Guests (Romantic)', '3–4 Guests', '5–6 Guests', '7–8 Guests (Celebratory)', '9+ Banquet / Buyout'
  ];

  const occasions = [
    'Anniversary / Romance', 'Birthday Celebration', 'Executive / Business Dinner', 'Diplomatic Banquet', 'Visiting Jamaica / Traveler', 'Casual Gourmet Dinner'
  ];

  const handleNext = () => {
    setErrorMsg('');
    if (currentStep === 1 && !formData.seatingArea) {
      setErrorMsg('Please select your preferred seating atmosphere.');
      return;
    }
    if (currentStep === 2 && (!formData.date || !formData.timeSlot)) {
      setErrorMsg('Please select your dining date and time slot.');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setErrorMsg('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please provide your name, email, and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitQuoteRequest(formData);
      setSubmissionResult(res);
      setCurrentStep(4);
    } catch (err) {
      setErrorMsg('Something went wrong. Please call us directly at (876) 616-8831.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      {/* Dim Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border-2 border-[#E5DFD4] rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-charcoal-900 transition-all">
        
        {/* Top Header Bar */}
        <div className="bg-[#1A1816] text-white px-6 sm:px-8 py-5 flex items-center justify-between border-b border-gold-600/30">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full border border-gold-400/60 flex items-center justify-center text-xs font-serif font-bold text-gold-400">
              SV
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-cream-100">
                Reserve Your Table
              </h3>
              <p className="text-[10px] sm:text-xs text-gold-400 tracking-wider uppercase font-medium">
                The Steak House on the Verandah • Devon House
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition active:scale-95"
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="bg-[#F2ECE1] px-6 py-3 flex items-center justify-between border-b border-[#E2DBD0] text-xs">
          {[
            { num: 1, label: 'Atmosphere' },
            { num: 2, label: 'Date & Guests' },
            { num: 3, label: 'Guest Details' },
            { num: 4, label: 'Confirmed' }
          ].map((s) => (
            <div key={s.num} className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                currentStep === s.num 
                  ? 'bg-gold-600 text-white shadow-sm' 
                  : currentStep > s.num 
                    ? 'bg-charcoal-900 text-cream-100' 
                    : 'bg-charcoal-300 text-charcoal-700'
              }`}>
                {currentStep > s.num ? '✓' : s.num}
              </div>
              <span className={`hidden sm:inline font-medium ${currentStep === s.num ? 'text-charcoal-900 font-bold' : 'text-charcoal-600'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs font-semibold flex items-center space-x-2">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Atmosphere Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-left mb-2">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">
                  Select Seating Atmosphere
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-700 font-light">
                  Choose your preferred setting on the Devon House grounds.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {seatingOptions.map((opt) => {
                  const isSelected = formData.seatingArea === opt.title;
                  return (
                    <div
                      key={opt.title}
                      onClick={() => setFormData(prev => ({ ...prev, seatingArea: opt.title }))}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 text-left ${
                        isSelected
                          ? 'border-gold-600 bg-gold-50/70 shadow-md -translate-y-0.5'
                          : 'border-[#E0D8CA] bg-white hover:border-gold-500/50 hover:bg-[#FCFBF8]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif font-bold text-sm sm:text-base text-charcoal-900">
                          {opt.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-charcoal-100 text-charcoal-800 font-medium">
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Date, Time & Party Size */}
          {currentStep === 2 && (
            <div className="space-y-5 text-left">
              <div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">
                  Party Size & Reservation Time
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-700 font-light">
                  When will you be joining us at Devon House?
                </p>
              </div>

              {/* Party Size */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-800 mb-2">
                  Party Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {partySizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, partySize: size }))}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition ${
                        formData.partySize === size
                          ? 'bg-charcoal-900 text-white border-charcoal-950 shadow-sm'
                          : 'bg-white border-[#E0D8CA] text-charcoal-800 hover:bg-[#F8F5EF]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-800 mb-1.5">
                    Dining Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full rounded-xl border border-[#D5CABB] bg-white px-3.5 py-2.5 text-sm font-medium text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-800 mb-1.5">
                    Preferred Time
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeSlot: e.target.value }))}
                    className="w-full rounded-xl border border-[#D5CABB] bg-white px-3.5 py-2.5 text-sm font-medium text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-800 mb-1.5">
                  Dining Occasion
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
                  className="w-full rounded-xl border border-[#D5CABB] bg-white px-3.5 py-2.5 text-sm font-medium text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  {occasions.map((occ) => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
              </div>

              {/* Sommelier Consultation Toggle */}
              <label className="flex items-center space-x-3 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.wineService}
                  onChange={(e) => setFormData(prev => ({ ...prev, wineService: e.target.checked }))}
                  className="w-4 h-4 rounded text-gold-600 focus:ring-gold-500 border-gray-300"
                />
                <span className="text-xs sm:text-sm text-charcoal-800">
                  Request sommelier wine & vintage rum pairing consultation
                </span>
              </label>
            </div>
          )}

          {/* STEP 3: Guest Contact & Notes */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">
                  Guest Contact & Reservation Notes
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-700 font-light">
                  We will send your table confirmation and directions directly.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-800 mb-1">
                    Primary Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lorde Sterling / Dr. Campbell"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-xl border border-[#D5CABB] bg-white px-3.5 py-2.5 text-sm text-charcoal-900 focus:ring-2 focus:ring-gold-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-800 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="guest@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-xl border border-[#D5CABB] bg-white px-3.5 py-2.5 text-sm text-charcoal-900 focus:ring-2 focus:ring-gold-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-800 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(876) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full rounded-xl border border-[#D5CABB] bg-white px-3.5 py-2.5 text-sm text-charcoal-900 focus:ring-2 focus:ring-gold-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-800 mb-1">
                    Dietary Restrictions or Special Requests
                  </label>
                  <textarea
                    rows={2}
                    placeholder="E.g. anniversary champagne toast, window table preference, gluten sensitive, specific cut..."
                    value={formData.culinaryNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, culinaryNotes: e.target.value }))}
                    className="w-full rounded-xl border border-[#D5CABB] bg-white px-3.5 py-2 text-sm text-charcoal-900 focus:ring-2 focus:ring-gold-500 outline-none"
                  />
                </div>
              </div>

              {/* Reservation Overview Card */}
              <div className="p-3.5 rounded-2xl bg-[#F4EFE6] border border-[#DDD5C6] text-xs space-y-1">
                <div className="flex justify-between font-semibold text-charcoal-900">
                  <span>Atmosphere:</span>
                  <span className="text-gold-800">{formData.seatingArea}</span>
                </div>
                <div className="flex justify-between text-charcoal-700">
                  <span>Date & Time:</span>
                  <span>{formData.date} at {formData.timeSlot}</span>
                </div>
                <div className="flex justify-between text-charcoal-700">
                  <span>Party:</span>
                  <span>{formData.partySize}</span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: Success Confirmation */}
          {currentStep === 4 && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold-100 border-2 border-gold-500 text-gold-700 mx-auto flex items-center justify-center text-2xl shadow-sm">
                🍷
              </div>

              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                Table Reservation Received!
              </h4>

              <p className="text-sm text-charcoal-700 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your reservation request for <strong>{formData.partySize}</strong> on <strong>{formData.date} at {formData.timeSlot}</strong> has been received by our Maitre d' at Devon House.
              </p>

              <div className="p-4 rounded-2xl bg-[#F5EFEB] border border-[#DDD5C6] max-w-sm mx-auto text-xs text-charcoal-800 space-y-1">
                <p><strong>Reservation Ref:</strong> {submissionResult?.quoteId || 'RES-VERANDAH'}</p>
                <p><strong>Area:</strong> {formData.seatingArea}</p>
                <p><strong>Concierge:</strong> (876) 616-8831</p>
              </div>

              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="rounded-full bg-charcoal-900 text-white px-8 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-black transition shadow"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {currentStep < 4 && (
          <div className="bg-[#F2ECE1] px-6 py-4 flex items-center justify-between border-t border-[#E2DBD0]">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2 rounded-full border border-charcoal-400 text-xs font-semibold text-charcoal-800 hover:bg-white transition active:scale-95"
              >
                ← Back
              </button>
            ) : <div />}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-full bg-charcoal-900 hover:bg-black text-white px-7 py-2.5 text-xs font-semibold uppercase tracking-wider transition active:scale-95 shadow-md"
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-full bg-gold-600 hover:bg-gold-700 text-white px-8 py-2.5 text-xs font-semibold uppercase tracking-wider transition active:scale-95 shadow-md disabled:opacity-50"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Table Reservation'}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
