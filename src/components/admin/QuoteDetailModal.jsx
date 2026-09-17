import React, { useState } from 'react';
import { quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function QuoteDetailModal({ quote, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState('quote_studio'); // 'quote_studio' | 'full_details'
  const [status, setStatus] = useState(quote?.status || 'pending');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Reservation / Event Quote State
  const [price, setPrice] = useState(quote?.quotedPrice || '');
  const [turnaround, setTurnaround] = useState(quote?.estimatedTurnaround || 'Confirmed Table Hold / Instant Confirmation');
  const [warranty, setWarranty] = useState(quote?.warrantyNote || 'Premier Verandah Seating & Dedicated Sommelier Service');
  const [message, setMessage] = useState(
    quote?.adminMessage || 
    `Dear ${quote?.name || 'Valued Guest'}, warm greetings from ${BUSINESS_INFO.name} at Devon House. We have reviewed your table reservation request for ${quote?.modelAndYear || quote?.serviceCategory || 'your party'}. Please call our maître d' at ${BUSINESS_INFO.phone} or reply here with any special requests or wine pairings.`
  );
  
  const [isSendingQuote, setIsSendingQuote] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!quote) return null;

  const handleStatusChange = async (newStatus) => {
    setIsUpdatingStatus(true);
    try {
      const updated = await quotesApi.updateStatus(quote.id, newStatus);
      setStatus(newStatus);
      if (onUpdate) onUpdate(updated);
    } catch (err) {
      alert('Failed to update reservation status: ' + err.message);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSendQuote = async (e) => {
    e.preventDefault();
    if (!price.trim()) {
      setSendError('Please enter a quote or deposit amount before sending.');
      return;
    }

    setIsSendingQuote(true);
    setSendError('');
    setSendSuccess(false);

    try {
      const result = await quotesApi.sendQuote(quote.id, {
        price,
        turnaround,
        warranty,
        message
      });

      setSendSuccess(true);
      setStatus('quoted');
      if (onUpdate && result.quote) {
        onUpdate(result.quote);
      }
    } catch (err) {
      setSendError(err.data?.error || err.message || 'Failed to dispatch reservation confirmation.');
    } finally {
      setIsSendingQuote(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to remove Reservation #${quote.id}?`)) return;
    setIsDeleting(true);
    try {
      await quotesApi.deleteQuote(quote.id);
      if (onUpdate) onUpdate({ ...quote, _deleted: true });
      onClose();
    } catch (err) {
      alert('Error deleting reservation: ' + err.message);
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A1816]/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#D8D2C5] flex flex-wrap items-center justify-between gap-4 bg-[#FCFAF7]">
          <div className="flex items-center space-x-3.5">
            <img 
              src="/images/devon-mansion-real.jpg" 
              alt="Devon House" 
              className="w-12 h-12 rounded-2xl object-cover border-2 border-[#B38E5D]/40 shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-[#B38E5D] bg-[#F4EFE6] px-2.5 py-0.5 rounded-md border border-[#D8D2C5]">
                  RES-#{quote.id}
                </span>
                <span className="text-xs text-[#7A7265]">
                  {new Date(quote.createdAt).toLocaleDateString()} at {new Date(quote.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1816] mt-0.5">
                {quote.name} — {quote.serviceCategory || quote.make || 'Table Reservation'}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Status Selector */}
            <select
              value={status}
              disabled={isUpdatingStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition outline-none cursor-pointer ${
                status === 'pending' ? 'bg-[#FAF3E0] text-[#8C6B1B] border-[#E8D8A6]' :
                status === 'quoted' ? 'bg-[#EBF2F7] text-[#1E5275] border-[#B7D4E7]' :
                status === 'completed' ? 'bg-[#EDF5EC] text-[#2C6E33] border-[#B2D8B9]' :
                'bg-[#F4EFE6] text-[#7A7265] border-[#D8D2C5]'
              }`}
            >
              <option value="pending">Pending Review</option>
              <option value="in_review">Maître d' Checking</option>
              <option value="quoted">Confirmation Sent</option>
              <option value="completed">Seated & Completed</option>
              <option value="archived">Archived</option>
            </select>

            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl border border-[#D8D2C5] bg-[#F4EFE6] text-xs font-bold text-[#1A1816] hover:bg-[#EFECE6] transition"
              aria-label="Close modal"
            >
              Close
            </button>
          </div>
        </div>

        {/* Guest Quick Contact & Dining Info Bar */}
        <div className="px-6 py-3 bg-[#F4EFE6] border-b border-[#D8D2C5] flex flex-wrap items-center gap-4 text-xs text-[#4A443D]">
          <a 
            href={`tel:${quote.phone?.replace(/[^0-9]/g, '')}`}
            className="text-xs font-semibold text-[#1A1816] bg-[#FCFAF7] px-3 py-1.5 rounded-xl border border-[#D8D2C5] shadow-xs hover:border-[#B38E5D] transition"
          >
            Call: {quote.phone || 'No Phone'}
          </a>

          <a 
            href={`mailto:${quote.email}`}
            className="text-xs font-semibold text-[#1A1816] bg-[#FCFAF7] px-3 py-1.5 rounded-xl border border-[#D8D2C5] shadow-xs hover:border-[#B38E5D] transition"
          >
            Email: {quote.email}
          </a>

          {quote.location && (
            <div className="text-xs text-[#7A7265] bg-[#FCFAF7] px-3 py-1.5 rounded-xl border border-[#D8D2C5]">
              Area: <strong className="text-[#1A1816]">{quote.location}</strong>
            </div>
          )}

          {quote.propertyType && (
            <span className="bg-[#FAF3E0] text-[#8C6B1B] border border-[#E8D8A6] px-2.5 py-1 rounded-full font-bold text-[11px]">
              Seating: {quote.propertyType}
            </span>
          )}
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#D8D2C5] px-6 bg-[#FCFAF7]">
          <button
            onClick={() => setActiveTab('quote_studio')}
            className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 transition ${
              activeTab === 'quote_studio'
                ? 'border-[#B38E5D] text-[#1A1816]'
                : 'border-transparent text-[#7A7265] hover:text-[#1A1816]'
            }`}
          >
            Dispatch Guest Confirmation & Quote
          </button>
          <button
            onClick={() => setActiveTab('full_details')}
            className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 transition ${
              activeTab === 'full_details'
                ? 'border-[#B38E5D] text-[#1A1816]'
                : 'border-transparent text-[#7A7265] hover:text-[#1A1816]'
            }`}
          >
            Full Booking & Dining Specifications
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-[#EFECE6]/40">
          {activeTab === 'quote_studio' ? (
            /* TAB 1: Quote / Confirmation Dispatch Studio */
            <div className="space-y-6">
              {/* Previous Quote Alert Banner */}
              {quote.quotedPrice && (
                <div className="p-4 rounded-2xl bg-[#EBF2F7] border border-[#B7D4E7] text-xs sm:text-sm text-[#1E5275] shadow-xs">
                  <div className="font-bold">Previous Confirmation Sent on {quote.quoteSentAt ? new Date(quote.quoteSentAt).toLocaleString() : 'N/A'}</div>
                  <div>Estimated Cost / Deposit: <strong className="font-mono text-[#1E5275]">${quote.quotedPrice}</strong> • Seating: {quote.estimatedTurnaround || 'Verandah Dining'}</div>
                  <div className="text-[11px] text-[#2C6E33] mt-1">You may modify the estimate below and re-send anytime.</div>
                </div>
              )}

              {/* Success Banner */}
              {sendSuccess && (
                <div className="p-4 rounded-2xl bg-[#EDF5EC] border border-[#B2D8B9] text-[#2C6E33] text-sm shadow-xs">
                  <strong className="block font-bold">Confirmation Successfully Dispatched to {quote.email}!</strong>
                  <span>An official Devon House reservation confirmation and menu pricing notice has been sent.</span>
                </div>
              )}

              {/* Error Banner */}
              {sendError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm">
                  {sendError}
                </div>
              )}

              <form onSubmit={handleSendQuote} className="space-y-5 bg-[#FCFAF7] p-6 rounded-2xl border border-[#D8D2C5] shadow-xs">
                {/* Price & Turnaround Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">
                      Estimated Spend / Hold Deposit ($ USD) <span className="text-[#B38E5D]">*</span>
                    </label>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                      placeholder="e.g. 180.00"
                      className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-base text-[#1A1816] placeholder-[#7A7265]/50 outline-none font-bold font-mono transition"
                      required
                    />
                    <span className="text-[11px] text-[#7A7265] mt-1 block">Includes table reservation hold or multi-course price.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">
                      Table & Seating Assignment
                    </label>
                    <input
                      type="text"
                      value={turnaround}
                      onChange={(e) => setTurnaround(e.target.value)}
                      placeholder="e.g. Historic Verandah Table 4 (Garden View)"
                      className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] placeholder-[#7A7265]/50 outline-none transition"
                    />
                    <span className="text-[11px] text-[#7A7265] mt-1 block">Tells the guest their designated verandah section.</span>
                  </div>
                </div>

                {/* Hospitality Note */}
                <div>
                  <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">
                    Hospitality & Sommelier Experience
                  </label>
                  <input
                    type="text"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    placeholder="e.g. Complimentary welcome cocktail & reserved estate parking"
                    className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] placeholder-[#7A7265]/50 outline-none transition"
                  />
                </div>

                {/* Personal Message / Note to Guest */}
                <div>
                  <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">
                    Maître d' Personal Message to Guest
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a custom greeting, table allocation details, or chef recommendations..."
                    className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl p-4 text-sm text-[#1A1816] placeholder-[#7A7265]/50 outline-none leading-relaxed transition"
                  />
                  <span className="text-[11px] text-[#7A7265] mt-1 block">
                    This note is prominently highlighted in the guest's official confirmation email.
                  </span>
                </div>

                {/* Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-xs text-[#7A7265]">
                    Recipient: <strong className="text-[#1A1816]">{quote.email}</strong>
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingQuote}
                    className="w-full sm:w-auto py-3.5 px-7 bg-[#1A1816] hover:bg-[#2A2624] disabled:opacity-50 text-[#EFECE6] font-bold text-xs sm:text-sm rounded-xl transition border border-[#B38E5D] shadow-md flex items-center justify-center active:scale-95 cursor-pointer"
                  >
                    {isSendingQuote ? 'Dispatching Email Confirmation...' : 'Send Official Reservation Confirmation'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* TAB 2: Full Details */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Request / Dining Area Specs */}
                <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-2xl p-5 space-y-3 shadow-xs">
                  <span className="text-xs font-bold text-[#7A7265] uppercase tracking-wider block">
                    Dining & Reservation Details
                  </span>
                  <div className="flex justify-between text-sm border-b border-[#D8D2C5]/50 pb-2">
                    <span className="text-[#7A7265]">Guest Name:</span>
                    <span className="text-[#1A1816] font-bold">{quote.name}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-[#D8D2C5]/50 pb-2">
                    <span className="text-[#7A7265]">Experience / Area:</span>
                    <span className="text-[#1A1816] font-bold">{quote.serviceCategory || quote.make || 'Historic Verandah Dining'}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-[#D8D2C5]/50 pb-2">
                    <span className="text-[#7A7265]">Party Size:</span>
                    <span className="text-[#B38E5D] font-bold">{quote.modelAndYear || quote.propertyType || '2 - 4 Guests'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#7A7265]">Requested Date / Time:</span>
                    <span className="text-[#1A1816] font-medium">{quote.timeline || quote.specificDate || 'This Evening'}</span>
                  </div>
                </div>

                {/* Service Specs */}
                <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-2xl p-5 space-y-3 shadow-xs">
                  <span className="text-xs font-bold text-[#7A7265] uppercase tracking-wider block">Occasion & Dining Package</span>
                  <div className="flex justify-between text-sm border-b border-[#D8D2C5]/50 pb-2">
                    <span className="text-[#7A7265]">Category:</span>
                    <span className="text-[#1A1816] font-bold">{quote.serviceCategory || 'A La Carte Dinner'}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-[#D8D2C5]/50 pb-2">
                    <span className="text-[#7A7265]">Specific Course / Package:</span>
                    <span className="text-[#1A1816] font-bold">{quote.detailedService || 'Prime Dry-Aged Cuts'}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-[#D8D2C5]/50 pb-2">
                    <span className="text-[#7A7265]">Private Dining / Gazebo:</span>
                    <span className="text-[#1A1816] font-bold">
                      {quote.needsTowing ? 'Yes (Reserved Gazebo)' : 'Standard Verandah'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#7A7265]">Sommelier Pairing:</span>
                    <span className="text-[#1A1816] font-bold">
                      {quote.needsShuttle ? 'Yes (Wine Pairing Selected)' : 'A La Carte Selection'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Notes */}
              {quote.details && (
                <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-2xl p-5 space-y-2 shadow-xs">
                  <span className="text-xs font-bold text-[#7A7265] uppercase tracking-wider block">Guest Dietary Notes & Special Requests</span>
                  <p className="text-sm text-[#1A1816] leading-relaxed whitespace-pre-wrap">{quote.details}</p>
                </div>
              )}

              {/* Custom Issue / Special Arrangement */}
              {quote.customIssue && quote.customIssue !== 'N/A' && (
                <div className="bg-[#FAF3E0] border-2 border-[#E8D8A6] rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold text-[#8C6B1B] uppercase tracking-wider block">Special Arrangement Notes</span>
                  <p className="text-sm text-[#1A1816] leading-relaxed whitespace-pre-wrap">{quote.customIssue}</p>
                </div>
              )}

              {/* Delete / Cancel Reservation Button */}
              <div className="pt-4 border-t border-[#D8D2C5] flex justify-end">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition flex items-center space-x-1.5 border border-red-200"
                >
                  <span>{isDeleting ? 'Removing Reservation...' : 'Cancel & Remove Reservation'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
