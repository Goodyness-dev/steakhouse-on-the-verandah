import React, { useState, useEffect } from 'react';
import { quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function DashboardOverview({ onViewAllOrders, onOpenQuoteDetail, onNewOrder }) {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ total: 12, pending: 3, quoted: 6, completed: 3 });
  const [isLoading, setIsLoading] = useState(true);

  // Table Service Timer
  const [serviceTimerSeconds, setServiceTimerSeconds] = useState(3840);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setServiceTimerSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadData = async () => {
    try {
      const [quotesRes, statsRes] = await Promise.all([
        quotesApi.getQuotes({ limit: 8 }),
        quotesApi.getStats()
      ]);
      setQuotes(quotesRes.quotes || []);
      if (statsRes && statsRes.total > 0) setStats(statsRes);
    } catch (err) {
      // Local fallback
      try {
        const local = JSON.parse(localStorage.getItem('steakhouse_reservations') || '[]');
        if (local.length > 0) {
          setQuotes(local.map(r => ({
            id: r.id,
            name: r.customer.name,
            email: r.customer.email,
            phone: r.customer.phone,
            serviceCategory: r.reservation.seatingArea,
            detailedService: `${r.reservation.partySize} • ${r.reservation.occasion}`,
            status: 'pending',
            created_at: r.submittedAt
          })));
        }
      } catch (e) {}
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner with Maitre d' Status */}
      <div className="rounded-3xl bg-[#1A1816] text-white p-6 sm:p-8 border border-gold-600/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-semibold tracking-wider uppercase border border-gold-500/30">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span>Devon House Dinner Service Live</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream-100">
            Welcome to the Verandah Concierge
          </h2>
          <p className="text-xs sm:text-sm text-cream-300 font-light max-w-xl">
            Manage table reservations, guest seating preferences, sommelier wine consultations, and private verandah banquets.
          </p>
        </div>

        {/* Live Service Clock Card */}
        <div className="bg-black/50 border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center space-x-5 flex-shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
              Evening Shift Elapsed
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {formatTimer(serviceTimerSeconds)}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-gold-400 text-lg">
            🍷
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Total Reservations', val: stats.total || 24, badge: 'This Week', color: 'border-[#D5CABB] text-charcoal-900' },
          { label: 'Pending Confirmation', val: stats.pending || 4, badge: 'Immediate Action', color: 'border-gold-500 bg-gold-50/50 text-gold-900' },
          { label: 'Confirmed Tables', val: stats.quoted || 16, badge: 'Seated / Reserved', color: 'border-emerald-300 bg-emerald-50/40 text-emerald-900' },
          { label: 'Private Verandah Events', val: 3, badge: 'VIP Banquets', color: 'border-purple-300 bg-purple-50/40 text-purple-900' },
        ].map((kpi, i) => (
          <div key={i} className={`p-5 sm:p-6 rounded-3xl bg-[#FAF8F5] border-2 ${kpi.color} shadow-lg space-y-2`}>
            <div className="flex justify-between items-start">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-600">
                {kpi.label}
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/80 border border-charcoal-200 font-bold uppercase">
                {kpi.badge}
              </span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold">
              {kpi.val}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reservations Table */}
      <div className="rounded-3xl bg-[#FAF8F5] border-2 border-[#E5DFD4] p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-700 font-semibold">
              Real-Time Table Intake
            </span>
            <h3 className="font-serif text-2xl font-bold text-charcoal-900">
              Upcoming Reservations & Inquiries
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onViewAllOrders}
              className="rounded-full border border-charcoal-900 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-charcoal-900 hover:bg-charcoal-900 hover:text-white transition"
            >
              All Bookings →
            </button>
            <button
              onClick={onNewOrder}
              className="rounded-full bg-gold-600 hover:bg-gold-700 text-white px-5 py-2 text-xs font-semibold uppercase tracking-wider transition shadow"
            >
              + Walk-In / Phone
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E0D8CA] text-charcoal-500 uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Guest</th>
                <th className="pb-3 font-semibold">Area & Party</th>
                <th className="pb-3 font-semibold">Contact</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE8DC]">
              {quotes.length > 0 ? (
                quotes.slice(0, 6).map((q) => (
                  <tr key={q.id} className="hover:bg-white/60 transition group cursor-pointer" onClick={() => onOpenQuoteDetail(q)}>
                    <td className="py-4 font-bold text-charcoal-900 font-serif">
                      {q.name}
                    </td>
                    <td className="py-4 text-charcoal-700">
                      <div className="font-medium text-gold-800">{q.serviceCategory || 'Historic Verandah'}</div>
                      <div className="text-[11px] text-charcoal-500">{q.detailedService || '2 Guests • Dinner'}</div>
                    </td>
                    <td className="py-4 text-charcoal-600">
                      <div>{q.phone || '(876) 000-0000'}</div>
                      <div className="text-[11px] text-charcoal-400">{q.email}</div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        q.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        q.status === 'quoted' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                        'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {q.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenQuoteDetail(q);
                        }}
                        className="text-gold-700 hover:text-gold-900 font-semibold underline text-xs"
                      >
                        Manage →
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-charcoal-500">
                    No active reservations recorded. Book a table on the public site or use "+ Walk-In / Phone" above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
