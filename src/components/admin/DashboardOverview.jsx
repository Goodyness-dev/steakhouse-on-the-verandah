import React, { useState, useEffect } from 'react';
import { quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function DashboardOverview({ onViewAllOrders, onOpenQuoteDetail, onNewOrder }) {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });
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
      if (statsRes) {
        setStats({
          total: statsRes.total || 0,
          pending: statsRes.pending || 0,
          quoted: statsRes.quoted || 0,
          completed: statsRes.completed || 0
        });
      } else {
        setStats({ total: 0, pending: 0, quoted: 0, completed: 0 });
      }
    } catch (err) {
      // Local fallback
      try {
        const local = JSON.parse(localStorage.getItem('steakhouse_reservations') || '[]');
        if (local.length > 0) {
          setQuotes(local.map(r => ({
            id: r.id,
            name: r.customer?.name || r.name,
            email: r.customer?.email || r.email,
            phone: r.customer?.phone || r.phone,
            serviceCategory: r.reservation?.seatingArea || r.serviceCategory,
            detailedService: `${r.reservation?.partySize || ''} • ${r.reservation?.occasion || ''}`,
            status: r.status || 'pending',
            created_at: r.submittedAt || r.createdAt
          })));
          setStats({
            total: local.length,
            pending: local.filter(q => q.status === 'pending' || !q.status).length,
            quoted: local.filter(q => q.status === 'quoted').length,
            completed: local.filter(q => q.status === 'completed').length
          });
        } else {
          setQuotes([]);
          setStats({ total: 0, pending: 0, quoted: 0, completed: 0 });
        }
      } catch (e) {
        setQuotes([]);
        setStats({ total: 0, pending: 0, quoted: 0, completed: 0 });
      }
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
        <div className="bg-black/70 border border-gold-500/30 rounded-2xl p-4 sm:p-5 flex items-center space-x-4 shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
              Evening Shift Elapsed
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {formatTimer(serviceTimerSeconds)}
            </span>
          </div>
          <img 
            src="/images/gallery-cocktails.jpg" 
            alt="Estate Wine & Cocktails" 
            className="w-11 h-11 rounded-xl object-cover border border-gold-500/60 shadow-xs"
          />
        </div>
      </div>

      {/* KPI Cards Grid - Matching Main Site Palette */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {[
          { label: 'Total Reservations', val: stats.total ?? 0, badge: 'This Week', color: 'border-[#D8D2C5] text-charcoal-900' },
          { label: 'Pending Confirmation', val: stats.pending ?? 0, badge: 'Needs Action', color: 'border-gold-500 bg-gold-50/40 text-gold-950' },
          { label: 'Confirmed Tables', val: stats.quoted ?? 0, badge: 'Seated', color: 'border-emerald-300 bg-emerald-50/40 text-emerald-950' },
          { label: 'Private Verandah Events', val: 0, badge: 'VIP Lawn', color: 'border-purple-300 bg-purple-50/40 text-purple-950' },
        ].map((kpi, i) => (
          <div key={i} className={`p-4 sm:p-6 rounded-3xl bg-[#FCFAF7] border-2 ${kpi.color} shadow-xs space-y-1.5`}>
            <div className="flex justify-between items-start">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-600">
                {kpi.label}
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-white border border-[#D8D2C5] font-bold uppercase text-charcoal-800">
                {kpi.badge}
              </span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              {kpi.val}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reservations Table Container */}
      <div className="rounded-3xl bg-[#FCFAF7] border-2 border-[#D8D2C5] p-4 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-800 font-bold">
              Real-Time Table Intake
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">
              Upcoming Reservations & Inquiries
            </h3>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={onViewAllOrders}
              type="button"
              className="rounded-full border-2 border-charcoal-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal-900 hover:bg-charcoal-900 hover:text-white transition cursor-pointer"
            >
              All Bookings →
            </button>
            <button
              onClick={onNewOrder}
              type="button"
              className="rounded-full bg-gold-600 hover:bg-gold-700 text-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition shadow cursor-pointer whitespace-nowrap"
            >
              + Walk-In / Call
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#D8D2C5] text-charcoal-600 uppercase tracking-wider text-[11px]">
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
                  <tr key={q.id} className="hover:bg-white/70 transition group cursor-pointer" onClick={() => onOpenQuoteDetail(q)}>
                    <td className="py-3.5 font-bold text-charcoal-900 font-serif">
                      {q.name}
                    </td>
                    <td className="py-3.5 text-charcoal-700">
                      <div className="font-semibold text-gold-800">{q.serviceCategory || 'Historic Verandah'}</div>
                      <div className="text-[11px] text-charcoal-500">{q.detailedService || '2 Guests • Dinner'}</div>
                    </td>
                    <td className="py-3.5 text-charcoal-600">
                      <div>{q.phone || '(876) 000-0000'}</div>
                      <div className="text-[11px] text-charcoal-500">{q.email}</div>
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        q.status === 'completed' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' :
                        q.status === 'quoted' ? 'bg-blue-50 text-blue-900 border-blue-300' :
                        'bg-amber-50 text-amber-900 border-amber-300'
                      }`}>
                        {q.status === 'completed' ? 'Seated' : q.status === 'quoted' ? 'Confirmed' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenQuoteDetail(q);
                        }}
                        className="text-gold-800 hover:text-gold-950 font-bold text-xs underline cursor-pointer"
                      >
                        Manage →
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-charcoal-500">
                    No active reservations recorded. Book a table on the public site or use "+ Walk-In / Call" above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Responsive Cards - Clean Stacked Layout on Phones */}
        <div className="block md:hidden divide-y divide-[#EFE8DC]">
          {quotes.length > 0 ? (
            quotes.slice(0, 6).map((q) => (
              <div 
                key={q.id}
                onClick={() => onOpenQuoteDetail(q)}
                className="py-3.5 first:pt-0 last:pb-0 space-y-1.5 cursor-pointer active:bg-white/60 transition"
              >
                <div className="flex items-start justify-between">
                  <span className="font-serif font-bold text-charcoal-900 text-sm">{q.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                    q.status === 'completed' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' :
                    q.status === 'quoted' ? 'bg-blue-50 text-blue-900 border-blue-300' :
                    'bg-amber-50 text-amber-900 border-amber-300'
                  }`}>
                    {q.status === 'completed' ? 'Seated' : q.status === 'quoted' ? 'Confirmed' : 'Pending'}
                  </span>
                </div>
                <div className="text-xs text-gold-800 font-medium">
                  {q.serviceCategory || 'Historic Verandah'} • <span className="text-charcoal-600">{q.detailedService || '2 Guests'}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-charcoal-500 pt-0.5">
                  <span>{q.phone || '(876) 000-0000'}</span>
                  <span className="text-gold-800 font-bold">Manage Booking →</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-xs text-charcoal-500">
              No active reservations recorded.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
