import React, { useState, useEffect } from 'react';
import DashboardOverview from './DashboardOverview';
import OrdersView from './OrdersView';
import InboxView from './InboxView';
import AdminSettings from './AdminSettings';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';
import { authApi, quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

function getInitials(name) {
  if (!name) return 'MD';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AdminLayout({ user, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'orders' | 'inbox' | 'settings'
  const [modalQuote, setModalQuote] = useState(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });

  useEffect(() => {
    quotesApi.getStats().then(setStats).catch(() => {});
  }, [activeTab]);

  const handleLogout = async () => {
    await authApi.logout();
    onLogout();
  };

  const navItems = [
    { id: 'dashboard', label: 'Maitre d\' Overview', badge: null },
    { id: 'orders', label: 'Table Reservations', badge: stats.total > 0 ? stats.total : null },
    { id: 'inbox', label: 'Guest Inbox', badge: stats.pending > 0 ? stats.pending : null },
  ];

  return (
    <div className="min-h-screen bg-[#F4EFE8] text-charcoal-900 font-sans flex antialiased">
      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Luxury Left Sidebar matching template aesthetic */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#181715] text-cream-100 border-r border-[#2F2C27] flex flex-col justify-between transition-transform duration-300 ease-in-out ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Sidebar Header & Monogram */}
        <div>
          <div className="h-20 flex items-center px-6 border-b border-[#2A2823] space-x-3">
            <div className="w-10 h-10 rounded-full border border-gold-500/70 bg-black/40 flex items-center justify-center font-serif font-bold text-gold-400 text-sm">
              SV
            </div>
            <div className="overflow-hidden">
              <span className="font-serif font-bold text-cream-100 text-sm tracking-tight block truncate">
                The Steak House
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 block">
                Maitre d' Concierge
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gold-600 text-white shadow-md'
                      : 'text-cream-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== null && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#2A2823] space-y-3">
          <button
            onClick={onBackToSite}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-white/15 text-cream-300 hover:text-white hover:bg-white/5 text-xs font-medium transition"
          >
            <span>← View Public Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/30 transition font-medium"
          >
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-[#FAF8F5] border-b border-[#E2DBD0] px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-charcoal-700 hover:text-black"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 capitalize">
              {activeTab === 'dashboard' ? "Maitre d' Management Overview" :
               activeTab === 'orders' ? "Table Reservations & Private Banquets" :
               "Guest Concierge Inbox"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsNewOrderOpen(true)}
              className="rounded-full bg-gold-600 hover:bg-gold-700 text-white px-5 py-2 text-xs font-semibold uppercase tracking-wider transition shadow active:scale-95 flex items-center space-x-1.5"
            >
              <span>+ New Booking</span>
            </button>

            <div className="w-9 h-9 rounded-full bg-charcoal-900 text-gold-400 font-serif font-bold text-xs flex items-center justify-center border border-gold-500/40">
              {getInitials(user?.username || 'Admin')}
            </div>
          </div>
        </header>

        {/* View Component Render */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              stats={stats}
              onViewAllOrders={() => setActiveTab('orders')}
              onOpenQuoteDetail={(q) => setModalQuote(q)}
              onNewOrder={() => setIsNewOrderOpen(true)}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView 
              onOpenQuoteDetail={(q) => setModalQuote(q)}
              onNewOrder={() => setIsNewOrderOpen(true)}
            />
          )}

          {activeTab === 'inbox' && (
            <InboxView 
              onOpenQuoteDetail={(q) => setModalQuote(q)}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettings />
          )}
        </main>
      </div>

      {/* Quote Detail Modal */}
      {modalQuote && (
        <QuoteDetailModal 
          quote={modalQuote}
          onClose={() => setModalQuote(null)}
          onUpdated={() => {
            quotesApi.getStats().then(setStats).catch(() => {});
          }}
        />
      )}

      {/* New Order Modal */}
      {isNewOrderOpen && (
        <NewOrderModal 
          isOpen={isNewOrderOpen}
          onClose={() => setIsNewOrderOpen(false)}
          onCreated={() => {
            setIsNewOrderOpen(false);
            quotesApi.getStats().then(setStats).catch(() => {});
            setActiveTab('orders');
          }}
        />
      )}
    </div>
  );
}
