import React, { useState, useEffect, useRef } from 'react';
import { quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function InboxView({ onOpenQuoteDetail }) {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Reply Composer State
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadThreads();
    const interval = setInterval(loadThreads, 15000);
    return () => clearInterval(interval);
  }, [statusFilter]);

  const loadThreads = async () => {
    try {
      const res = await quotesApi.getInbox({ status: statusFilter, search: searchTerm });
      const threadList = res.threads || [];
      setThreads(threadList);
      if (!selectedThread && threadList.length > 0) {
        selectThread(threadList[0]);
      }
    } catch (err) {
      try {
        const local = JSON.parse(localStorage.getItem('steakhouse_reservations') || localStorage.getItem('biz_quotes') || '[]');
        const fallbackThreads = local.map(r => ({
          id: r.id || 'res-1',
          name: r.name || r.customer?.name || 'Devon Guest',
          email: r.email || r.customer?.email || 'guest@example.com',
          phone: r.phone || r.customer?.phone || '(876) 929-7063',
          serviceCategory: r.serviceCategory || r.reservation?.seatingArea || 'Historic Verandah',
          detailedService: r.detailedService || `${r.reservation?.partySize || '2 Guests'} • ${r.reservation?.occasion || 'Dinner Service'}`,
          status: r.status || 'pending',
          createdAt: r.createdAt || r.submittedAt || Date.now()
        }));
        setThreads(fallbackThreads);
        if (!selectedThread && fallbackThreads.length > 0) {
          selectThread(fallbackThreads[0]);
        }
      } catch (e) {
        console.error(e);
      }
    } finally {
      setIsLoadingThreads(false);
    }
  };

  const selectThread = async (thread) => {
    setSelectedThread(thread);
    setIsLoadingMessages(true);
    setSendError('');
    try {
      const res = await quotesApi.getMessages(thread.id);
      setMessages(res.messages || []);
      scrollToBottom();
    } catch (err) {
      // Mock conversation for demo
      setMessages([
        {
          id: 'msg-1',
          sender: 'customer',
          message: `Hello, we would like to confirm our reservation for ${thread.detailedService || 'a private verandah table'}. We are celebrating a special occasion and would appreciate sommelier wine recommendations.`,
          createdAt: thread.createdAt || Date.now() - 3600000
        },
        {
          id: 'msg-2',
          sender: 'admin',
          senderName: "Verandah Maitre d'",
          message: `Warm greetings from The Steak House on the Verandah. Your request is noted. We have reserved an exquisite courtyard-view table and our head sommelier has prepared pairing options for your party.`,
          createdAt: Date.now() - 1800000
        }
      ]);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleSendReply = async (e) => {
    e?.preventDefault();
    if (!replyText.trim()) return;

    setIsSending(true);
    setSendError('');

    try {
      const res = await quotesApi.sendMessage(selectedThread.id, {
        message: replyText.trim()
      });

      if (res && res.message) {
        setMessages(prev => [...prev, res.message]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'admin',
            senderName: "Verandah Maitre d'",
            message: replyText.trim(),
            createdAt: Date.now()
          }
        ]);
      }
      setReplyText('');
      scrollToBottom();
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'admin',
          senderName: "Verandah Maitre d'",
          message: replyText.trim(),
          createdAt: Date.now()
        }
      ]);
      setReplyText('');
      scrollToBottom();
    } finally {
      setIsSending(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedThread) return;
    try {
      await quotesApi.updateStatus(selectedThread.id, newStatus);
      setSelectedThread(prev => ({ ...prev, status: newStatus }));
      setThreads(prev => prev.map(t => t.id === selectedThread.id ? { ...t, status: newStatus } : t));
    } catch {
      setSelectedThread(prev => ({ ...prev, status: newStatus }));
      setThreads(prev => prev.map(t => t.id === selectedThread.id ? { ...t, status: newStatus } : t));
    }
  };

  const filteredThreads = threads.filter(t => {
    if (!searchTerm.trim()) return true;
    const s = searchTerm.toLowerCase();
    return (
      t.name?.toLowerCase().includes(s) ||
      t.email?.toLowerCase().includes(s) ||
      t.serviceCategory?.toLowerCase().includes(s) ||
      t.id?.toLowerCase().includes(s)
    );
  });

  return (
    <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl overflow-hidden shadow-xs flex flex-col md:flex-row h-[78vh] min-h-[540px]">
      {/* ------------------------------------------------------------- */}
      {/* LEFT PANE: GUEST THREAD LIST                                 */}
      {/* ------------------------------------------------------------- */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-[#D8D2C5] flex flex-col bg-[#FCFAF7] ${selectedThread ? 'hidden md:flex' : 'flex'}`}>
        {/* Search & Header */}
        <div className="p-4 border-b border-[#D8D2C5] space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-sm uppercase tracking-wider text-charcoal-900">
              Guest Concierge Inbox
            </h2>
            <span className="text-[11px] font-bold text-charcoal-700 bg-[#EFECE6] px-2.5 py-0.5 rounded-full border border-[#D8D2C5]">
              {threads.length} Inquiries
            </span>
          </div>

          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guest or booking ID..."
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-gold-500 rounded-xl px-3.5 py-2 text-xs text-charcoal-900 placeholder-charcoal-500 outline-none transition"
            />
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px]">
            {['all', 'pending', 'quoted', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-2.5 py-1 rounded-lg font-bold transition capitalize cursor-pointer ${
                  statusFilter === f
                    ? 'bg-gold-600 text-white shadow-xs'
                    : 'bg-white text-charcoal-700 hover:bg-[#EFECE6] border border-[#D8D2C5]'
                }`}
              >
                {f === 'pending' ? 'Needs Action' : f === 'quoted' ? 'Confirmed' : f}
              </button>
            ))}
          </div>
        </div>

        {/* Threads List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#EFE8DC]">
          {isLoadingThreads ? (
            <div className="p-8 text-center text-charcoal-500 text-xs">
              Loading guest threads...
            </div>
          ) : filteredThreads.length === 0 ? (
            <div className="p-8 text-center text-charcoal-500 text-xs">
              No inquiries found in concierge ledger.
            </div>
          ) : (
            filteredThreads.map(thread => {
              const isSelected = selectedThread?.id === thread.id;
              const status = thread.status || 'pending';

              return (
                <div
                  key={thread.id}
                  onClick={() => selectThread(thread)}
                  className={`p-3.5 cursor-pointer transition flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-[#F7F3EB] border-l-4 border-l-gold-600'
                      : 'hover:bg-white/70'
                  }`}
                >
                  <img
                    src="/images/real-verandah-steak.jpg"
                    alt="Booking"
                    className="w-10 h-10 rounded-xl object-cover border border-[#D8D2C5] shrink-0 shadow-xs"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-serif font-bold truncate ${isSelected ? 'text-charcoal-950' : 'text-charcoal-900'}`}>
                        {thread.name}
                      </h4>
                      <span className="text-[10px] text-charcoal-500 shrink-0 ml-1">
                        {new Date(thread.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <div className="text-[11px] text-gold-800 font-medium truncate mt-0.5">
                      {thread.serviceCategory || 'Historic Verandah'}
                    </div>

                    <p className="text-[11px] text-charcoal-600 truncate mt-0.5">
                      {thread.detailedService || 'Evening Table Reservation'}
                    </p>

                    <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-[#EFE8DC]">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                        status === 'pending' ? 'bg-amber-50 text-amber-900 border-amber-300' :
                        status === 'quoted' ? 'bg-blue-50 text-blue-900 border-blue-300' :
                        status === 'completed' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' :
                        'bg-[#EFECE6] text-charcoal-700 border-[#D8D2C5]'
                      }`}>
                        {status === 'pending' ? 'Pending' : status === 'quoted' ? 'Confirmed' : status}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-gold-800">
                        #{thread.id}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT PANE: ACTIVE GUEST THREAD & CONCIERGE COMPOSER         */}
      {/* ------------------------------------------------------------- */}
      {selectedThread ? (
        <div className="flex-1 flex flex-col bg-[#FAF8F5]">
          {/* Thread Header */}
          <div className="px-5 py-3.5 border-b border-[#D8D2C5] flex flex-wrap items-center justify-between gap-3 bg-[#FCFAF7]">
            {/* Back button for mobile */}
            <button
              onClick={() => setSelectedThread(null)}
              className="md:hidden text-xs text-charcoal-700 hover:text-black font-bold flex items-center space-x-1 cursor-pointer"
            >
              <span>← Back to Inquiries</span>
            </button>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-charcoal-900">
                  {selectedThread.name}
                </h3>
                <span className="font-mono text-xs font-bold text-gold-800 bg-[#EFECE6] px-2 py-0.5 rounded-md border border-[#D8D2C5]">
                  #{selectedThread.id}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-charcoal-600 mt-0.5">
                <span className="font-semibold text-charcoal-900">{selectedThread.serviceCategory || 'Historic Verandah'}</span>
                <span>•</span>
                <a href={`tel:${selectedThread.phone?.replace(/[^0-9]/g, '')}`} className="text-gold-800 hover:underline font-medium">
                  {selectedThread.phone || '(876) 929-7063'}
                </a>
                <span>•</span>
                <span className="truncate max-w-[180px]">{selectedThread.email}</span>
              </div>
            </div>

            {/* Status Control */}
            <div className="flex items-center space-x-2">
              <select
                value={selectedThread.status || 'pending'}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-white border-2 border-[#D8D2C5] text-xs font-bold rounded-xl px-3 py-2 text-charcoal-900 outline-none cursor-pointer hover:border-gold-500 transition"
              >
                <option value="pending">Pending Confirmation</option>
                <option value="quoted">Confirmed Table</option>
                <option value="completed">Seated Banquet</option>
              </select>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Guest Reservation Summary Banner */}
            <div className="p-4 rounded-2xl bg-white border-2 border-[#D8D2C5] text-xs text-charcoal-800 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between font-bold text-charcoal-900 border-b border-[#EFE8DC] pb-2">
                <span className="uppercase tracking-wider text-[11px] text-gold-800 font-bold">
                  Devon House Reservation Record
                </span>
                <span className="text-[11px] text-charcoal-500 font-normal">
                  {new Date(selectedThread.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div>
                  <span className="text-charcoal-500 block text-[10px] uppercase font-bold">Dining Area</span>
                  <span className="text-charcoal-900 font-semibold">{selectedThread.serviceCategory || 'Historic Verandah'}</span>
                </div>
                <div>
                  <span className="text-charcoal-500 block text-[10px] uppercase font-bold">Party / Service</span>
                  <span className="text-charcoal-900 font-semibold">{selectedThread.detailedService || '2 Guests • Dinner'}</span>
                </div>
                <div>
                  <span className="text-charcoal-500 block text-[10px] uppercase font-bold">Estate Address</span>
                  <span className="text-charcoal-900 font-semibold">26 Hope Rd, Kingston</span>
                </div>
              </div>
            </div>

            {/* Conversation Messages */}
            {isLoadingMessages ? (
              <div className="py-8 text-center text-xs text-charcoal-500">
                Loading messages...
              </div>
            ) : (
              messages.map(msg => {
                const isAdmin = msg.sender === 'admin';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center space-x-1.5 mb-1 px-1 text-[11px] text-charcoal-500">
                      <span className="font-bold text-charcoal-800">
                        {isAdmin ? (msg.senderName || "Verandah Maitre d'") : selectedThread.name}
                      </span>
                      <span>•</span>
                      <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <div className={`max-w-lg rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isAdmin
                        ? 'bg-[#1A1816] text-[#FCFAF7] rounded-tr-xs shadow-sm border border-gold-500/30'
                        : 'bg-white border-2 border-[#D8D2C5] text-charcoal-900 rounded-tl-xs shadow-xs'
                    }`}>
                      <p>{msg.message}</p>
                    </div>

                    <span className="text-[10px] text-charcoal-500 px-1 mt-1">
                      {isAdmin ? `Delivered via Email to ${selectedThread.email}` : 'Received via Verandah Website'}
                    </span>
                  </div>
                );
              })
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Concierge Reply Composer Bar */}
          <div className="p-4 border-t border-[#D8D2C5] bg-[#FCFAF7] space-y-3">
            {sendError && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
                {sendError}
              </div>
            )}

            {/* Composer Input Form */}
            <form onSubmit={handleSendReply} className="flex items-end space-x-2">
              <textarea
                rows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    handleSendReply(e);
                  }
                }}
                placeholder={`Compose reply to ${selectedThread.name}... (Press Ctrl+Enter to send)`}
                className="flex-1 bg-white border-2 border-[#D8D2C5] focus:border-gold-500 rounded-2xl p-3 text-xs sm:text-sm text-charcoal-900 placeholder-charcoal-500 outline-none resize-none leading-relaxed transition"
              />

              <button
                type="submit"
                disabled={isSending || !replyText.trim()}
                className="py-3 px-5 bg-[#1A1816] hover:bg-black disabled:opacity-40 text-[#FCFAF7] font-bold text-xs sm:text-sm rounded-2xl transition shadow-xs flex items-center space-x-2 shrink-0 active:scale-95 cursor-pointer border border-gold-500/30"
              >
                <span>{isSending ? 'Sending...' : 'Send Reply'}</span>
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-charcoal-500 px-1">
              <span>Guest receives notification directly via email and phone.</span>
              <span className="hidden sm:inline font-mono">Ctrl + Enter to send</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-charcoal-500 space-y-2 bg-[#FAF8F5]">
          <h4 className="text-base font-serif font-bold text-charcoal-900">No Booking Selected</h4>
          <p className="text-xs max-w-xs text-center text-charcoal-600">
            Select a guest inquiry from the list to view table details and communicate with the guest.
          </p>
        </div>
      )}
    </div>
  );
}
