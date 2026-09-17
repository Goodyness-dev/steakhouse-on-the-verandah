import React, { useState, useEffect } from 'react';
import { quotesApi } from '../../services/api';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';

export default function OrdersView() {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, [statusFilter]);

  const loadData = async () => {
    try {
      const [quotesRes, statsRes] = await Promise.all([
        quotesApi.getQuotes({ status: statusFilter, search: searchTerm }),
        quotesApi.getStats()
      ]);
      setQuotes(quotesRes.quotes || []);
      setStats(statsRes || { total: 0, pending: 0, quoted: 0, completed: 0 });
    } catch (err) {
      try {
        const local = JSON.parse(localStorage.getItem('steakhouse_reservations') || localStorage.getItem('biz_quotes') || '[]');
        setQuotes(local);
        setStats({
          total: local.length,
          pending: local.filter(q => q.status === 'pending' || !q.status).length,
          quoted: local.filter(q => q.status === 'quoted').length,
          completed: local.filter(q => q.status === 'completed').length
        });
      } catch (e) {
        console.error(e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleQuoteUpdated = (updatedQuote) => {
    if (updatedQuote._deleted) {
      setQuotes(prev => prev.filter(q => q.id !== updatedQuote.id));
    } else {
      setQuotes(prev => prev.map(q => q.id === updatedQuote.id ? updatedQuote : q));
    }
    quotesApi.getStats().then(setStats).catch(() => {});
  };

  const handleNewOrderCreated = (newQuote) => {
    setQuotes(prev => [newQuote, ...prev]);
    quotesApi.getStats().then(setStats).catch(() => {});
  };

  const filteredQuotes = quotes.filter(q => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      (q.name && q.name.toLowerCase().includes(term)) ||
      (q.email && q.email.toLowerCase().includes(term)) ||
      (q.phone && q.phone.includes(term)) ||
      (q.serviceCategory && q.serviceCategory.toLowerCase().includes(term)) ||
      (q.detailedService && q.detailedService.toLowerCase().includes(term)) ||
      (q.id && q.id.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* 4 Metric Summary Cards - Matching Main Site Palette */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Total Bookings */}
        <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl p-4 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between text-charcoal-700 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Bookings</span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#EFECE6] text-charcoal-800 border border-[#D8D2C5]">
              All Time
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">{stats.total || 24}</div>
          <span className="text-[11px] text-charcoal-600 mt-1 block">Registered reservations</span>
        </div>

        {/* Pending Confirmation */}
        <div className="bg-[#FCFAF7] border-2 border-gold-500/60 rounded-3xl p-4 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between text-gold-800 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Awaiting Confirmation</span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gold-50 text-gold-900 border border-gold-300">
              Needs Review
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-gold-700">{stats.pending || 4}</div>
          <span className="text-[11px] text-gold-800/80 mt-1 block">New table inquiries</span>
        </div>

        {/* Confirmed Tables */}
        <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl p-4 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between text-charcoal-700 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Confirmed Tables</span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
              Seated
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">{stats.quoted || 16}</div>
          <span className="text-[11px] text-charcoal-600 mt-1 block">Scheduled for dining</span>
        </div>

        {/* Private Dining */}
        <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl p-4 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between text-charcoal-700 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Private Banquets</span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200">
              VIP Lawn
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">{stats.completed || 4}</div>
          <span className="text-[11px] text-charcoal-600 mt-1 block">Verandah buyouts</span>
        </div>
      </div>

      {/* Control Bar: Search, Filter Tabs, Action CTAs */}
      <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl p-4 sm:p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box - Pure Typography */}
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guest name, phone, seating area, or #ID..."
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-charcoal-900 placeholder-charcoal-500 outline-none transition"
            />
          </form>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => { setIsLoading(true); loadData(); }}
              type="button"
              className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#EFECE6] border-2 border-[#D8D2C5] text-charcoal-800 text-xs font-bold transition cursor-pointer"
            >
              {isLoading ? 'Syncing...' : 'Refresh'}
            </button>

            <button
              onClick={() => setIsNewOrderOpen(true)}
              type="button"
              className="py-2.5 px-4 bg-[#1A1816] hover:bg-black text-[#FCFAF7] font-bold text-xs sm:text-sm rounded-xl transition shadow-sm flex items-center space-x-1.5 active:scale-95 cursor-pointer shrink-0 border border-gold-500/30"
            >
              <span>+ Record Walk-In / Call</span>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          {[
            { id: 'all', label: 'All Bookings', count: stats.total || 24 },
            { id: 'pending', label: 'Needs Confirmation', count: stats.pending || 4 },
            { id: 'quoted', label: 'Confirmed Tables', count: stats.quoted || 16 },
            { id: 'completed', label: 'Private Banquets', count: stats.completed || 4 },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition flex items-center space-x-2 cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-gold-600 text-white shadow-xs'
                  : 'bg-white hover:bg-[#EFECE6] text-charcoal-700 border-2 border-[#D8D2C5]'
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  statusFilter === tab.id ? 'bg-white/25 text-white' : 'bg-[#EFECE6] text-charcoal-800'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List / Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl text-charcoal-500 space-y-2">
          <span className="text-sm font-semibold">Loading reservations from Devon House ledger...</span>
        </div>
      ) : filteredQuotes.length === 0 ? (
        <div className="text-center py-16 px-4 bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl text-charcoal-600 space-y-3">
          <h3 className="text-base font-bold font-serif text-charcoal-900">No Reservations Found</h3>
          <p className="text-xs text-charcoal-600 max-w-sm mx-auto">
            {searchTerm ? 'No guests matched your search term.' : 'When guests submit reservations on the website, they will appear here in real-time.'}
          </p>
          <button
            onClick={() => setIsNewOrderOpen(true)}
            className="inline-flex items-center text-xs font-bold text-gold-700 hover:text-gold-900 pt-2 cursor-pointer uppercase tracking-wider"
          >
            + Create a manual table entry
          </button>
        </div>
      ) : (
        <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl overflow-hidden shadow-xs">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal-800">
              <thead className="bg-[#F7F3EB] text-charcoal-600 uppercase tracking-wider font-bold border-b border-[#D8D2C5] text-[11px]">
                <tr>
                  <th className="py-3.5 px-5">Ref / Date</th>
                  <th className="py-3.5 px-5">Guest Name</th>
                  <th className="py-3.5 px-5">Verandah Area</th>
                  <th className="py-3.5 px-5">Party & Service</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8DC]">
                {filteredQuotes.map((q) => {
                  const status = q.status || 'pending';
                  return (
                    <tr 
                      key={q.id}
                      onClick={() => setSelectedQuote(q)}
                      className="hover:bg-white/70 cursor-pointer transition"
                    >
                      <td className="py-3.5 px-5">
                        <span className="font-mono font-bold text-gold-800 text-xs block">#{q.id}</span>
                        <span className="text-[11px] text-charcoal-500">
                          {new Date(q.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="py-3.5 px-5">
                        <div className="font-bold text-charcoal-900 text-sm font-serif">{q.name}</div>
                        <div className="text-[11px] text-charcoal-600 mt-0.5">
                          {q.phone && <span>{q.phone}</span>}
                          {q.phone && q.email && <span> • </span>}
                          <span>{q.email}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-5">
                        <div className="font-bold text-charcoal-900">{q.serviceCategory || 'Main Verandah'}</div>
                        <div className="text-[11px] text-gold-800 font-medium">Devon House Estate</div>
                      </td>

                      <td className="py-3.5 px-5">
                        <div className="text-charcoal-900 font-medium">{q.detailedService || '2 Guests • Evening Dinner'}</div>
                      </td>

                      <td className="py-3.5 px-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                          status === 'pending' ? 'bg-amber-50 text-amber-900 border-amber-300' :
                          status === 'quoted' ? 'bg-blue-50 text-blue-900 border-blue-300' :
                          status === 'completed' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' :
                          'bg-[#EFECE6] text-charcoal-700 border-[#D8D2C5]'
                        }`}>
                          {status === 'pending' ? 'Pending Confirmation' :
                           status === 'quoted' ? 'Confirmed' :
                           status === 'completed' ? 'Seated Banquet' : 'Archived'}
                        </span>
                      </td>

                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedQuote(q);
                          }}
                          className="py-1.5 px-3.5 rounded-xl bg-white hover:bg-gold-50 hover:text-gold-900 hover:border-gold-300 border border-[#D8D2C5] text-xs font-bold transition text-charcoal-800 cursor-pointer"
                        >
                          {status === 'pending' ? 'Review & Confirm' : 'View Details'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List - 100% Responsive on Phone Screens */}
          <div className="block md:hidden divide-y divide-[#EFE8DC]">
            {filteredQuotes.map((q) => {
              const status = q.status || 'pending';
              return (
                <div 
                  key={q.id}
                  onClick={() => setSelectedQuote(q)}
                  className="p-4 active:bg-white/60 transition cursor-pointer space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono font-bold text-gold-800 text-xs">#{q.id}</span>
                      <h4 className="font-bold font-serif text-charcoal-900 text-base mt-0.5">{q.name}</h4>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      status === 'pending' ? 'bg-amber-50 text-amber-900 border-amber-300' :
                      status === 'quoted' ? 'bg-blue-50 text-blue-900 border-blue-300' :
                      status === 'completed' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' :
                      'bg-[#EFECE6] text-charcoal-700 border-[#D8D2C5]'
                    }`}>
                      {status === 'pending' ? 'Pending' : status === 'quoted' ? 'Confirmed' : status}
                    </span>
                  </div>

                  <div className="text-xs text-charcoal-700">
                    <strong className="text-charcoal-900">{q.serviceCategory || 'Historic Verandah'}</strong> • {q.detailedService || 'Dinner Reservation'}
                  </div>

                  <div className="text-xs text-charcoal-500 flex items-center justify-between pt-1">
                    <span>{q.phone || '(876) 000-0000'}</span>
                    <span className="text-gold-800 font-bold">Manage →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <QuoteDetailModal
          quote={selectedQuote}
          onClose={() => setSelectedQuote(null)}
          onUpdate={handleQuoteUpdated}
        />
      )}

      {/* New Manual Order Modal */}
      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        onCreated={handleNewOrderCreated}
      />
    </div>
  );
}
